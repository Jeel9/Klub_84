use rusqlite::{Connection, Result, params};
use crate::models::payment::Payment;

fn generate_payment_id(conn: &Connection) -> Result<String> {
    let prefix = "PAY";
    let pattern = format!("{}-%", prefix);

    let mut stmt = conn.prepare(
        "SELECT payment_id FROM payments
         WHERE payment_id LIKE ?1
         ORDER BY payment_id DESC
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

pub fn insert_payment(conn: &Connection, payment: Payment) -> Result<()> {
    let new_id = generate_payment_id(conn)?;
    conn.execute(
        "INSERT INTO payments
        (payment_id, purchase_id, member_id, amount, payment_mode,
         reference_number, payment_type, status)
        VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)",
        params![
            new_id,
            payment.purchase_id,
            payment.member_id,
            payment.amount,
            payment.payment_mode,
            payment.reference_number,
            payment.payment_type,
            payment.status
        ],
    )?;
    Ok(())
}

pub fn get_purchase_payments(conn: &Connection, purchase_id: String) -> Result<Vec<Payment>> {
    let mut stmt = conn.prepare(
        "SELECT payment_id, purchase_id, member_id, amount, payment_mode,
        reference_number, payment_type, status, created_at, updated_at
        FROM payments
        WHERE purchase_id = ?1
        ORDER BY created_at DESC"
    )?;

    let rows = stmt.query_map([purchase_id], |row| {
        Ok(Payment {
            payment_id: row.get(0)?,
            purchase_id: row.get(1)?,
            member_id: row.get(2)?,
            amount: row.get(3)?,
            payment_mode: row.get(4)?,
            reference_number: row.get(5)?,
            payment_type: row.get(6)?,
            status: row.get(7)?,
            created_at: row.get(8)?,
            updated_at: row.get(9)?,
        })
    })?;

    Ok(rows.collect::<Result<Vec<_>>>()?)
}

pub fn update_payment_status(
    conn: &Connection,
    payment_id: String,
    status: String,
) -> Result<()> {

    conn.execute(
        "UPDATE payments
         SET status = ?1,
             updated_at = CURRENT_TIMESTAMP
         WHERE payment_id = ?2",
        params![status, payment_id],
    )?;

    Ok(())
}

pub fn get_payment(conn: &Connection, payment_id: String) -> Result<Payment> {
    conn.query_row(
        "SELECT payment_id, purchase_id, member_id, amount, payment_mode,
        reference_number, payment_type, status, created_at, updated_at
        FROM payments WHERE payment_id = ?1",
        [payment_id],
        |row| {
            Ok(Payment {
                payment_id: row.get(0)?,
                purchase_id: row.get(1)?,
                member_id: row.get(2)?,
                amount: row.get(3)?,
                payment_mode: row.get(4)?,
                reference_number: row.get(5)?,
                payment_type: row.get(6)?,
                status: row.get(7)?,
                created_at: row.get(8)?,
                updated_at: row.get(9)?,
            })
        },
    )
}