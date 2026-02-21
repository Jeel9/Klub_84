use rusqlite::{params, Connection, Result};
use crate::models::share::ShareScheme;

pub fn generate_scheme_id(conn: &Connection, company_id: i32) -> Result<String> {
    let prefix = match company_id {
        1 => "K84",
        2 => "UMI",
        _ => return Err(rusqlite::Error::InvalidQuery),
    };

    let pattern = format!("{}-%", prefix);

    let mut stmt = conn.prepare(
        "SELECT scheme_id FROM share_schemes 
         WHERE scheme_id LIKE ?1
         ORDER BY scheme_id DESC 
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

pub fn create_scheme(conn: &Connection, scheme: ShareScheme) -> Result<()> {
    let new_id = generate_scheme_id(conn, scheme.company_id)?;
    conn.execute(
        "INSERT INTO share_schemes
        (scheme_id, company_id, scheme_name, face_value, status)
        VALUES (?1, ?2, ?3, ?4, ?5)",
        params![
            new_id,
            scheme.company_id,
            scheme.scheme_name,
            scheme.face_value,
            scheme.status
        ],
    )?;

    Ok(())
}

pub fn get_company_schemes(conn: &Connection, company_id: i32) -> Result<Vec<ShareScheme>> {
    let mut stmt = conn.prepare(
        "SELECT scheme_id, company_id, scheme_name, face_value, created_at, updated_at, status
         FROM share_schemes
         WHERE company_id = ?1 AND status = 'active'
         ORDER BY created_at DESC"
    )?;

    let schemes = stmt
        .query_map([company_id], |row| {
            Ok(ShareScheme {
                scheme_id: row.get(0)?,
                company_id: row.get(1)?,
                scheme_name: row.get(2)?,
                face_value: row.get(3)?,
                created_at: row.get(4)?,
                updated_at: row.get(5)?,
                status: row.get(6)?,
            })
        })?
        .collect::<Result<Vec<_>>>()?;

    Ok(schemes)
}

pub fn update_scheme_price(
    conn: &Connection,
    scheme_id: String,
    new_price: f64,
) -> Result<()> {

    conn.execute(
        "UPDATE share_schemes
         SET face_value = ?1,
             updated_at = CURRENT_TIMESTAMP
         WHERE scheme_id = ?2",
        params![new_price, scheme_id],
    )?;

    Ok(())
}

pub fn deactivate_scheme(conn: &Connection, scheme_id: String) -> Result<()> {
    conn.execute(
        "UPDATE share_schemes
         SET status = 'inactive',
             updated_at = CURRENT_TIMESTAMP
         WHERE scheme_id = ?1",
        [scheme_id],
    )?;

    Ok(())
}
