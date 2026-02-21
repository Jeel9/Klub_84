use rusqlite::{Connection, Result};
use std::fs;
use tauri::Manager;

use super::schema::initialize_schema;

pub fn establish_connection(app: &tauri::AppHandle) -> Result<Connection> {
    let app_dir = app
        .path()
        .app_data_dir()
        .expect("Failed to get app data directory");

    fs::create_dir_all(&app_dir).expect("Failed to create app data directory");

    let db_path = app_dir.join("klub84.db");

    println!("Database path: {:?}", db_path);

    let conn = Connection::open(db_path)?;

    conn.execute_batch(
        "
        PRAGMA journal_mode = WAL;
        PRAGMA synchronous = NORMAL;
        PRAGMA foreign_keys = ON;
        ",
    )?;

    initialize_schema(&conn)?;

    Ok(conn)
}
