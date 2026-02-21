use rusqlite::{Connection, Result, params};
use crate::models::payment::Payment;

fn generate_payment_id(conn: &Connection, company_id: i32) -> Result<String> {
    let prefix = match company_id {
        1 => "K84P",
        2 => "UMIP",
        _ => return Err(rusqlite::Error::InvalidQuery),
    };

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

fn calculate_pending_amount(
    conn: &Connection,
    member_id: &str,
) -> Result<f64> {

    let total_shares: f64 = conn.query_row(
        "SELECT COALESCE(SUM(total_amount), 0)
         FROM shares
         WHERE member_id = ?1 AND status = 'active'",
        [member_id],
        |row| row.get(0),
    )?;

    let total_paid: f64 = conn.query_row(
        "SELECT COALESCE(SUM(amount), 0)
         FROM payments
         WHERE member_id = ?1
         AND status = 'cleared'
         AND payment_type = 'normal'",
        [member_id],
        |row| row.get(0),
    )?;

    Ok(total_shares - total_paid)
}

pub fn create_payment(conn: &Connection, payment: Payment) -> Result<()> {
    // let tx = conn.transaction()?;

    let pending = calculate_pending_amount(conn, &payment.member_id)?;

    if payment.payment_type.as_deref() != Some("penalty") {
        if payment.amount > pending {
            return Err(rusqlite::Error::InvalidQuery);
        }
    }

    let new_id = generate_payment_id(conn, payment.company_id)?;

    conn.execute(
        "INSERT INTO payments (
            payment_id, company_id, member_id,
            amount, payment_mode, reference_number,
            payment_type, status, linked_payment_id, notes
        ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, 'cleared', ?8, ?9)",
        params![
            new_id,
            payment.company_id,
            payment.member_id,
            payment.amount,
            payment.payment_mode,
            payment.reference_number,
            payment.payment_type.unwrap_or("normal".into()),
            payment.linked_payment_id,
            payment.notes
        ],
    )?;

    // tx.commit()?;
    Ok(())
}

pub fn get_payments_by_member(
    conn: &Connection,
    member_id: String,
) -> Result<Vec<Payment>> {

    let mut stmt = conn.prepare(
        "SELECT payment_id, company_id, member_id,
                amount, payment_mode, reference_number,
                payment_type, status, linked_payment_id,
                notes, created_at, update_date
         FROM payments
         WHERE member_id = ?1
         ORDER BY created_at DESC"
    )?;

    let payments = stmt
        .query_map([member_id], |row| {
            Ok(Payment {
                payment_id: Some(row.get(0)?),
                company_id: row.get(1)?,
                member_id: row.get(2)?,
                amount: row.get(3)?,
                payment_mode: row.get(4)?,
                reference_number: row.get(5)?,
                payment_type: row.get(6)?,
                status: row.get(7)?,
                linked_payment_id: row.get(8)?,
                notes: row.get(9)?,
                created_at: row.get(10)?,
                update_date: row.get(11)?,
            })
        })?
        .collect::<Result<Vec<Payment>, _>>()?;

    Ok(payments)
}

pub fn mark_payment_bounced(
    conn: &Connection,
    payment_id: String,
    penalty_amount: f64,
) -> Result<()> {

    // let tx = conn.transaction()?;

    conn.execute(
        "UPDATE payments
         SET status = 'bounced',
             update_date = CURRENT_TIMESTAMP
         WHERE payment_id = ?1",
        [payment_id.clone()],
    )?;

    let penalty = Payment {
        payment_id: None,
        company_id: 1,
        member_id: "".to_string(),
        amount: penalty_amount,
        payment_mode: "penalty".to_string(),
        reference_number: None,
        payment_type: Some("penalty".into()),
        status: Some("cleared".into()),
        linked_payment_id: Some(payment_id),
        notes: Some("Bounce penalty".into()),
        created_at: None,
        update_date: None,
    };

    // tx.commit()?;
    Ok(create_payment(conn, penalty)?)
}

pub fn void_payment(
    conn: &Connection,
    payment_id: String,
) -> Result<()> {

    conn.execute(
        "UPDATE payments
         SET status = 'void',
             update_date = CURRENT_TIMESTAMP
         WHERE payment_id = ?1",
        [payment_id],
    )?;

    Ok(())
}
