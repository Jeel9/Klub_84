use rusqlite::Connection;
use crate::models::share_purchase::SharePurchase;
use crate::repos::purchase_repo;
use crate::{AppState};
use tauri::State;

pub fn create_purchase(
    conn: &Connection,
    member_id: String,
    company_id: i32,
    scheme_id: String,
    quantity: i32,
    price: f64,
    first_payment: f64,
) -> Result<(), String> {

    if first_payment <= 0.0 {
        return Err("First payment required".into());
    }

    let total = price * quantity as f64;

    if first_payment > total {
        return Err("Payment exceeds total amount".into());
    }

    let pending = total - first_payment;

    let status = if pending == 0.0 {
        "completed"
    } else {
        "active"
    };

    let purchase = SharePurchase {
        purchase_id: Some("".to_string()),
        member_id,
        company_id,
        scheme_id,
        quantity,
        price_per_share: Some(price),
        total_amount: total,
        paid_amount: first_payment,
        pending_amount: pending,
        status: status.to_string(),
        created_at: None,
        updated_at: None,
    };

    purchase_repo::create_purchase(conn, purchase)
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn create_share_purchase(
    state: State<AppState>,
    member_id: String,
    company_id: i32,
    scheme_id: String,
    quantity: i32,
    price_per_share: f64,
    first_payment: f64,
) -> Result<(), String> {

    let conn = state.db.lock().unwrap();

    create_purchase(
        &conn,
        member_id,
        company_id,
        scheme_id,
        quantity,
        price_per_share,
        first_payment,
    )
}

#[tauri::command]
pub fn get_member_share_purchases(
    state: State<AppState>,
    member_id: String,
) -> Result<Vec<SharePurchase>, String> {

    let conn = state.db.lock().unwrap();

    purchase_repo::get_member_purchases(&conn, member_id)
        .map_err(|e| e.to_string())
}