use crate::{AppState};

#[tauri::command]
pub fn login(state: tauri::State<AppState>, username: String, password: String) -> Result<bool, String> {

    let conn = state.db.lock().unwrap();

    let mut stmt = conn.prepare(
        "SELECT COUNT(*) FROM admin_user WHERE username=?1 AND password=?2"
    ).map_err(|e| e.to_string())?;

    let count: i32 = stmt.query_row([username, password], |row| row.get(0))
        .map_err(|e| e.to_string())?;

    Ok(count > 0)
}