use rusqlite::{Connection, Result};

pub fn initialize_schema(conn: &Connection) -> Result<()> {
    conn.execute_batch(
        "
        CREATE TABLE IF NOT EXISTS companies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            gst_number TEXT,
            address TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS members (
            member_id TEXT PRIMARY KEY NOT NULL,
            company_id INTEGER NOT NULL,

            name TEXT NOT NULL,
            city TEXT,
            address TEXT,
            phone TEXT,
            aadhar TEXT,
            pan_number TEXT,
            business TEXT,
            business_address TEXT,
            email TEXT,
            gender TEXT,
            dob TEXT,

            family_member1 TEXT,
            family_member2 TEXT,
            family_member3 TEXT,
            family_member4 TEXT,

            join_date TEXT DEFAULT CURRENT_TIMESTAMP,
            status TEXT DEFAULT 'active',
            update_date TEXT,

            FOREIGN KEY (company_id) REFERENCES companies(id)
        );


        CREATE INDEX IF NOT EXISTS idx_member_company 
        ON members(company_id);

        CREATE INDEX IF NOT EXISTS idx_member_phone 
        ON members(phone);

        CREATE TABLE IF NOT EXISTS shares (
            share_id TEXT PRIMARY KEY NOT NULL,
            company_id INTEGER NOT NULL,
            member_id TEXT NOT NULL,

            share_number TEXT NOT NULL,
            quantity INTEGER NOT NULL,
            price_per_share REAL NOT NULL,
            total_amount REAL NOT NULL,

            issue_date TEXT DEFAULT CURRENT_TIMESTAMP,
            status TEXT DEFAULT 'active',
            update_date TEXT,

            FOREIGN KEY (company_id) REFERENCES companies(id),
            FOREIGN KEY (member_id) REFERENCES members(member_id)
        );

        CREATE INDEX IF NOT EXISTS idx_shares_member
        ON shares(member_id);

        CREATE INDEX IF NOT EXISTS idx_shares_company
        ON shares(company_id);


        CREATE TABLE IF NOT EXISTS share_schemes (
            scheme_id TEXT PRIMARY KEY NOT NULL,
            company_id INTEGER NOT NULL,

            scheme_name TEXT NOT NULL,
            face_value REAL NOT NULL,

            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            updated_at TEXT,

            status TEXT DEFAULT 'active'
        );

        CREATE TABLE IF NOT EXISTS share_purchases (
            purchase_id TEXT PRIMARY KEY NOT NULL,

            member_id TEXT NOT NULL,
            company_id INTEGER NOT NULL,
            scheme_id TEXT NOT NULL,

            quantity INTEGER NOT NULL,
            price_per_share REAL NOT NULL,
            total_amount REAL NOT NULL,

            paid_amount REAL DEFAULT 0,
            pending_amount REAL NOT NULL,

            status TEXT DEFAULT 'active',

            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            updated_at TEXT
        );

        CREATE TABLE IF NOT EXISTS payments (
            payment_id TEXT PRIMARY KEY NOT NULL,
            company_id INTEGER NOT NULL,
            member_id TEXT NOT NULL,

            amount REAL NOT NULL,
            payment_mode TEXT NOT NULL,
            reference_number TEXT,
            payment_type TEXT DEFAULT 'normal', -- normal / penalty
            status TEXT DEFAULT 'cleared', -- cleared / bounced / void
            linked_payment_id TEXT,
            notes TEXT,

            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            update_date TEXT,

            FOREIGN KEY (company_id) REFERENCES companies(id),
            FOREIGN KEY (member_id) REFERENCES members(member_id)
        );

        CREATE INDEX IF NOT EXISTS idx_payments_member
        ON payments(member_id);

        CREATE INDEX IF NOT EXISTS idx_payments_company
        ON payments(company_id);

        "
    )?;

    seed_companies(conn)?;

    Ok(())
}

fn seed_companies(conn: &Connection) -> Result<()> {
    conn.execute(
        "INSERT OR IGNORE INTO companies (id, name) VALUES (1, 'Klub84')",
        [],
    )?;

    conn.execute(
        "INSERT OR IGNORE INTO companies (id, name) VALUES (2, 'Umiya')",
        [],
    )?;

    Ok(())
}
