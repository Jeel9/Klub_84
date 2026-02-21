// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// fn main() {
//   app_lib::run();
// }

mod db;
mod services;
mod models;
mod repos;
use db::connection::establish_connection;
use rusqlite::Connection;
use std::sync::Mutex;
use tauri::Manager;
use services::member_serv::{create_member, get_members, update_member, deactivate_member};
use services::share_serv::{create_share_scheme, get_company_share_schemes, update_share_price, deactivate_share_scheme};
use services::purchase_serv::{create_share_purchase, get_member_share_purchases};
use services::payment_serv::{get_purchase_payments, add_purchase_payment};

struct AppState {
    db: Mutex<Connection>,
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let conn = establish_connection(app.handle())?;
            app.manage(AppState {
                db: Mutex::new(conn),
            });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            create_member,
            get_members,
            update_member,
            deactivate_member,
            create_share_scheme,
            get_company_share_schemes,
            update_share_price,
            deactivate_share_scheme,
            get_purchase_payments,
            add_purchase_payment,
            create_share_purchase,
            get_member_share_purchases
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
