// pub mod models;
// pub mod repos;
use crate::{AppState};
use crate::models::member::Member;
use crate::repos::member_repo;

#[tauri::command]
pub fn create_member(state: tauri::State<AppState>, member: Member) -> Result<(), String> {
    let conn = state.db.lock().unwrap();
    member_repo::create_member(&conn, member)
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn get_members(state: tauri::State<AppState>, company_id: i32)
    -> Result<Vec<Member>, String>
{
    let conn = state.db.lock().unwrap();
    member_repo::get_members(&conn, company_id)
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn update_member(
    state: tauri::State<AppState>,
    member: Member,
) -> Result<(), String> {
    let conn = state.db.lock().unwrap();
    member_repo::update_member(&conn, member)
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn deactivate_member(
    state: tauri::State<AppState>,
    member_id: String,
) -> Result<(), String> {
    let conn = state.db.lock().unwrap();
    member_repo::deactivate_member(&conn, member_id)
        .map_err(|e| e.to_string())
}
