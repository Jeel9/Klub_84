use rusqlite::{params, Connection, Result};
use crate::models::share_purchase::SharePurchase;

pub fn generate_purchase_id(conn: &Connection) -> Result<String> {
    let prefix = "PUR";

    let pattern = format!("{}-%", prefix);

    let mut stmt = conn.prepare(
        "SELECT purchase_id FROM share_purchases 
         WHERE purchase_id LIKE ?1
         ORDER BY purchase_id DESC 
         LIMIT 1"
    )?;

    let last_id: Result<String> = stmt.query_row([pattern], |row| row.get(0));

    let next_number = match last_id {
        Ok(id) => {
            let parts: Vec<&str> = id.split('-').collect();
            if parts.len() == 2 {
                parts[1].parse::<i32>().unwrap_or(0) + 1
            } else {
                1
            }
        }
        Err(_) => 1,
    };

    Ok(format!("{}-{:04}", prefix, next_number))
}

pub fn create_purchase(conn: &Connection, purchase: SharePurchase) -> Result<()> {
    let new_id = generate_purchase_id(conn)?;

    conn.execute(
        "INSERT INTO share_purchases
        (purchase_id, member_id, company_id, scheme_id, quantity,
        price_per_share, total_amount, paid_amount, pending_amount, status)
        VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10)",
        params![
            new_id,
            purchase.member_id,
            purchase.company_id,
            purchase.scheme_id,
            purchase.quantity,
            purchase.price_per_share,
            purchase.total_amount,
            purchase.paid_amount,
            purchase.pending_amount,
            purchase.status
        ],
    )?;
    Ok(())
}

pub fn get_member_purchases(conn: &Connection, member_id: String) -> Result<Vec<SharePurchase>> {
    let mut stmt = conn.prepare(
        "SELECT purchase_id, member_id, company_id, scheme_id, quantity,
        price_per_share, total_amount, paid_amount, pending_amount,
        status, created_at, updated_at
        FROM share_purchases
        WHERE member_id = ?1
        ORDER BY created_at DESC"
    )?;

    let rows = stmt.query_map([member_id], |row| {
        Ok(SharePurchase {
            purchase_id: row.get(0)?,
            member_id: row.get(1)?,
            company_id: row.get(2)?,
            scheme_id: row.get(3)?,
            quantity: row.get(4)?,
            price_per_share: row.get(5)?,
            total_amount: row.get(6)?,
            paid_amount: row.get(7)?,
            pending_amount: row.get(8)?,
            status: row.get(9)?,
            created_at: row.get(10)?,
            updated_at: row.get(11)?,
        })
    })?;

    Ok(rows.collect::<Result<Vec<_>>>()?)
}

pub fn update_payment(
    conn: &Connection,
    purchase_id: Option<String>,
    paid: f64,
    pending: f64,
    status: String,
) -> Result<()> {

    conn.execute(
        "UPDATE share_purchases
         SET paid_amount = ?1,
             pending_amount = ?2,
             status = ?3,
             updated_at = CURRENT_TIMESTAMP
         WHERE purchase_id = ?4",
        params![paid, pending, status, purchase_id],
    )?;

    Ok(())
}
