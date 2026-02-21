use crate::{AppState};
use tauri::State; // AppState;
use crate::models::share::ShareScheme;
use crate::repos::share_repository;

#[tauri::command]
pub fn create_share_scheme(
    state: State<AppState>,
    share_scheme: ShareScheme
) -> Result<(), String> {

    let conn = state.db.lock().unwrap();

    let scheme = ShareScheme {
        scheme_id: share_scheme.scheme_id,
        company_id: share_scheme.company_id,
        scheme_name: share_scheme.scheme_name,
        face_value: share_scheme.face_value,
        created_at: None,
        updated_at: None,
        status: Some("active".to_string()),
    };

    share_repository::create_scheme(&conn, scheme)
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn get_company_share_schemes(
    state: State<AppState>,
    company_id: i32,
) -> Result<Vec<ShareScheme>, String> {

    let conn = state.db.lock().unwrap();

    share_repository::get_company_schemes(&conn, company_id)
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn update_share_price(
    state: State<AppState>,
    scheme_id: String,
    new_price: f64,
) -> Result<(), String> {

    let conn = state.db.lock().unwrap();

    share_repository::update_scheme_price(&conn, scheme_id, new_price)
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn deactivate_share_scheme(
    state: State<AppState>,
    scheme_id: String,
) -> Result<(), String> {

    let conn = state.db.lock().unwrap();

    share_repository::deactivate_scheme(&conn, scheme_id)
        .map_err(|e| e.to_string())
}
