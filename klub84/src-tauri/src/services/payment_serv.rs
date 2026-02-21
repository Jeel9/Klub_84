use crate::{AppState};
use crate::models::payment::Payment;
use crate::repos::payment_repository;

#[tauri::command]
pub fn create_payment(
    state: tauri::State<AppState>,
    payment: Payment,
) -> Result<(), String> {

    let conn = state.db.lock().unwrap();
    payment_repository::create_payment(&conn, payment)
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn get_payments_by_member(
    state: tauri::State<AppState>,
    member_id: String,
) -> Result<Vec<Payment>, String> {

    let conn = state.db.lock().unwrap();
    payment_repository::get_payments_by_member(&conn, member_id)
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn void_payment(
    state: tauri::State<AppState>,
    payment_id: String,
) -> Result<(), String> {

    let conn = state.db.lock().unwrap();
    payment_repository::void_payment(&conn, payment_id)
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn mark_payment_bounced(
    state: tauri::State<AppState>,
    payment_id: String,
    penalty_amount: f64,
) -> Result<(), String> {    

    let conn = state.db.lock().unwrap();
    payment_repository::mark_payment_bounced(&conn, payment_id, penalty_amount)
        .map_err(|e| e.to_string())
}