use rusqlite::{Connection, Result, params};
use crate::models::member::Member;

pub fn generate_member_id(conn: &Connection, company_id: i32) -> Result<String> {
    let prefix = match company_id {
        1 => "K84",
        2 => "UMI",
        _ => return Err(rusqlite::Error::InvalidQuery),
    };

    let pattern = format!("{}-%", prefix);

    let mut stmt = conn.prepare(
        "SELECT member_id FROM members 
         WHERE member_id LIKE ?1
         ORDER BY member_id DESC 
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


pub fn create_member(conn: &Connection, member: Member) -> Result<()> {
    let new_id = generate_member_id(conn, member.company_id)?;
    eprintln!("Generated member ID: {}", new_id); // Debugging line
    conn.execute(
        "INSERT INTO members (
            member_id, company_id, name, city, address, phone,
            aadhar, pan_number, business, business_address,
            email, gender, dob,
            family_member1, family_member2, family_member3, family_member4,
            status
        ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10,
                  ?11, ?12, ?13, ?14, ?15, ?16, ?17, ?18)",
        params![
            new_id,
            member.company_id,
            member.name,
            member.city,
            member.address,
            member.phone,
            member.aadhar,
            member.pan_number,
            member.business,
            member.business_address,
            member.email,
            member.gender,
            member.dob,
            member.family_member1,
            member.family_member2,
            member.family_member3,
            member.family_member4,
            member.status
        ],
    )?;
    Ok(())
}

pub fn get_members(conn: &Connection, company_id: i32) -> Result<Vec<Member>> {
    let mut stmt = conn.prepare(
        "SELECT member_id, company_id, name, city, address, phone,
         aadhar, pan_number, business, business_address,
         email, gender, dob,
         family_member1, family_member2, family_member3, family_member4,
         status
         FROM members WHERE company_id = ?1"
    )?;

    let members = stmt.query_map([company_id], |row| {
        Ok(Member {
            member_id: row.get(0)?,
            company_id: row.get(1)?,
            name: row.get(2)?,
            city: row.get(3)?,
            address: row.get(4)?,
            phone: row.get(5)?,
            aadhar: row.get(6)?,
            pan_number: row.get(7)?,
            business: row.get(8)?,
            business_address: row.get(9)?,
            email: row.get(10)?,
            gender: row.get(11)?,
            dob: row.get(12)?,
            family_member1: row.get(13)?,
            family_member2: row.get(14)?,
            family_member3: row.get(15)?,
            family_member4: row.get(16)?,
            status: row.get(17)?,
        })
    })?
    .collect::<Result<Vec<Member>, _>>()?;

    Ok(members)
}

pub fn update_member(conn: &Connection, member: Member) -> Result<()> {
    conn.execute(
        "UPDATE members SET
            name = ?1,
            city = ?2,
            address = ?3,
            phone = ?4,
            aadhar = ?5,
            pan_number = ?6,
            business = ?7,
            business_address = ?8,
            email = ?9,
            gender = ?10,
            dob = ?11,
            family_member1 = ?12,
            family_member2 = ?13,
            family_member3 = ?14,
            family_member4 = ?15,
            status = ?16,
            update_date = CURRENT_TIMESTAMP
         WHERE member_id = ?17",
        params![
            member.name,
            member.city,
            member.address,
            member.phone,
            member.aadhar,
            member.pan_number,
            member.business,
            member.business_address,
            member.email,
            member.gender,
            member.dob,
            member.family_member1,
            member.family_member2,
            member.family_member3,
            member.family_member4,
            member.status,
            member.member_id
        ],
    )?;
    Ok(())
}

pub fn deactivate_member(conn: &Connection, member_id: String) -> Result<()> {
    conn.execute(
        "UPDATE members SET
            status = 'inactive',
            update_date = CURRENT_TIMESTAMP
         WHERE member_id = ?1",
        [member_id],
    )?;
    Ok(())
}