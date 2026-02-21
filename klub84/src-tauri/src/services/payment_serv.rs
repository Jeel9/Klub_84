use crate::{AppState};
use tauri::State;
use rusqlite::Connection;
use crate::repos::payment_repository;
use crate::repos::purchase_repo;
use crate::models::payment::Payment;

const PENALTY_AMOUNT: f64 = 500.0;

pub fn add_payment(
    conn: &Connection,
    purchase_id: Option<String>,
    member_id: String,
    amount: f64,
    mode: String,
    reference: Option<String>,
) -> Result<(), String> {

    let mut purchases = purchase_repo::get_member_purchases(conn, member_id.clone())
        .map_err(|e| e.to_string())?;

    let purchase = purchases.iter_mut()
        .find(|p| p.purchase_id == purchase_id)
        .ok_or("Purchase not found")?;

    if amount > purchase.pending_amount {
        return Err("Payment exceeds pending amount".into());
    }

    let payment = Payment {
        payment_id: None,
        purchase_id: purchase_id.clone(),
        member_id: member_id.clone(),
        amount,
        payment_mode: mode,
        reference_number: reference,
        payment_type: "normal".into(),
        status: "cleared".into(),
        created_at: None,
        updated_at: None,
    };

    payment_repository::insert_payment(conn, payment)
        .map_err(|e| e.to_string())?;

    purchase.paid_amount += amount;
    purchase.pending_amount -= amount;

    let status = if purchase.pending_amount == 0.0 {
        "completed"
    } else {
        "active"
    };

    purchase_repo::update_payment(
        conn,
        purchase_id,
        purchase.paid_amount,
        purchase.pending_amount,
        status.into(),
    ).map_err(|e| e.to_string())?;

    Ok(())
}

#[tauri::command]
pub fn add_purchase_payment(
    state: State<AppState>,
    purchase_id: String,
    member_id: String,
    amount: f64,
    payment_mode: String,
    reference_number: Option<String>,
) -> Result<(), String> {

    let conn = state.db.lock().unwrap();

    add_payment(
        &conn,
        Some(purchase_id),
        member_id,
        amount,
        payment_mode,
        reference_number,
    )
}

#[tauri::command]
pub fn get_purchase_payments(
    state: State<AppState>,
    purchase_id: String,
) -> Result<Vec<Payment>, String> {

    let conn = state.db.lock().unwrap();

    payment_repository::get_purchase_payments(&conn, purchase_id)
        .map_err(|e| e.to_string())
}

pub fn bounce_payment(
    conn: &Connection,
    payment_id: String,
) -> Result<(), String> {

    let payment = payment_repository::get_payment(conn, payment_id.clone())
        .map_err(|e| e.to_string())?;

    if payment.status == "bounced" {
        return Err("Already bounced".into());
    }

    // 1 restore purchase pending
    let mut purchases = purchase_repo::get_member_purchases(
        conn,
        payment.member_id.clone(),
    ).map_err(|e| e.to_string())?;

    let purchase = purchases.iter_mut()
        .find(|p| p.purchase_id == payment.purchase_id)
        .ok_or("Purchase not found")?;

    purchase.paid_amount -= payment.amount;
    purchase.pending_amount += payment.amount;

    purchase_repo::update_payment(
        conn,
        purchase.purchase_id.clone(),
        purchase.paid_amount,
        purchase.pending_amount,
        "active".into(),
    ).map_err(|e| e.to_string())?;

    // 2 mark payment bounced
    payment_repository::update_payment_status(
        conn,
        payment_id.clone(),
        "bounced".into(),
    ).map_err(|e| e.to_string())?;

    // 3 add penalty
    let penalty = Payment {
        payment_id: None,
        purchase_id: purchase.purchase_id.clone(),
        member_id: purchase.member_id.clone(),
        amount: PENALTY_AMOUNT,
        payment_mode: "penalty".into(),
        reference_number: None,
        payment_type: "penalty".into(),
        status: "cleared".into(),
        created_at: None,
        updated_at: None,
    };

    payment_repository::insert_payment(conn, penalty)
        .map_err(|e| e.to_string())?;

    Ok(())
}