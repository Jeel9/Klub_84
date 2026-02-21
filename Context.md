# 📄 PROJECT_CONTEXT.md

## Club84 – Local-First Share & Payment Management System

### Tech Stack: React + Tauri + SQLite

---

# 1. PROJECT OVERVIEW

## 1.1 Product Name

Club84 Admin System

## 1.2 Purpose

Club84 is a Windows desktop application that:

* Manages club members
* Tracks share purchases
* Records payments
* Handles cheque bounce & penalties
* Generates receipts
* Tracks dues
* Produces reports
* Works fully offline
* Ensures zero data loss

This system is used only by admin users.

Members do NOT log in.

---

# 2. CORE PRINCIPLES

1. Offline-first architecture
2. SQLite file-based database
3. ACID-compliant transactions
4. WAL journal mode
5. Automated backups
6. Audit logging
7. Clean, modular architecture
8. Production-grade folder structure

---

# 3. TECHNICAL STACK

## Frontend

* React
* TypeScript
* Vite
* Zustand (state management)
* React Router
* Tailwind (UI)

## Desktop Runtime

* Tauri (Rust backend)

## Database

* SQLite
* WAL mode enabled
* Foreign keys enforced

## PDF Generation

* HTML template rendered → converted to PDF via Rust

---

# 4. SYSTEM ARCHITECTURE

## 4.1 Layered Architecture

### Layer 1 – Presentation

React UI components

### Layer 2 – Bridge

Tauri invoke commands

### Layer 3 – Application Services (Rust)

Business logic:

* validation
* transaction control
* receipt number generation
* penalty calculation

### Layer 4 – Repository Layer

Raw SQL queries
SQLite interaction

### Layer 5 – Persistence

SQLite database file

---

# 5. DATABASE DESIGN

## 5.1 Members Table

```sql
CREATE TABLE members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  member_code TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  address TEXT,
  join_date TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  notes TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT
);
```

---

## 5.2 Shares Table

```sql
CREATE TABLE shares (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  member_id INTEGER NOT NULL,
  certificate_no TEXT UNIQUE NOT NULL,
  shares_count INTEGER NOT NULL,
  price_per_share REAL NOT NULL,
  total_amount REAL NOT NULL,
  issue_date TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (member_id) REFERENCES members(id)
);
```

---

## 5.3 Payments Table

```sql
CREATE TABLE payments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  member_id INTEGER NOT NULL,
  share_id INTEGER,
  amount REAL NOT NULL,
  payment_mode TEXT NOT NULL,
  reference_number TEXT,
  payment_date TEXT NOT NULL,
  bank_name TEXT,
  status TEXT DEFAULT 'received',
  remarks TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (member_id) REFERENCES members(id),
  FOREIGN KEY (share_id) REFERENCES shares(id)
);
```

---

## 5.4 Penalties Table

```sql
CREATE TABLE penalties (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  member_id INTEGER NOT NULL,
  payment_id INTEGER,
  reason TEXT NOT NULL,
  amount REAL NOT NULL,
  status TEXT DEFAULT 'unpaid',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (member_id) REFERENCES members(id),
  FOREIGN KEY (payment_id) REFERENCES payments(id)
);
```

---

## 5.5 Receipts Table

```sql
CREATE TABLE receipts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  receipt_no TEXT UNIQUE NOT NULL,
  member_id INTEGER NOT NULL,
  related_payment_id INTEGER,
  type TEXT NOT NULL,
  amount REAL NOT NULL,
  pdf_path TEXT,
  generated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (member_id) REFERENCES members(id),
  FOREIGN KEY (related_payment_id) REFERENCES payments(id)
);
```

---

## 5.6 Audit Logs Table

```sql
CREATE TABLE audit_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  action_type TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id INTEGER,
  performed_by TEXT,
  timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
  details TEXT
);
```

---

# 6. ER RELATIONSHIPS

1 Member → Many Shares
1 Member → Many Payments
1 Payment → One Receipt
1 Member → Many Penalties

Foreign key constraints must be enforced.

---

# 7. FOLDER STRUCTURE

```
src-tauri/src/
│
├── main.rs
├── state.rs
├── db.rs
│
├── models/
│   ├── member.rs                (existing)
│   ├── company.rs
│   ├── share_scheme.rs          ← NEW (share types)
│   ├── share_purchase.rs        ← NEW (ownership lots)
│   └── payment.rs               ← UPDATED (now linked to purchase)
│
├── repositories/
│   ├── member_repository.rs     (existing)
│   ├── company_repository.rs
│   ├── share_scheme_repository.rs
│   ├── share_purchase_repository.rs
│   └── payment_repository.rs    (rewrite logic)
│
├── services/                    ← BUSINESS RULES LIVE HERE
│   ├── member_service.rs
│   ├── share_purchase_service.rs
│   └── payment_service.rs
│
├── commands/
│   ├── member_commands.rs
│   ├── share_scheme_commands.rs
│   ├── share_purchase_commands.rs
│   └── payment_commands.rs
│
└── utils/
    ├── id_generator.rs          ← purchase_id, payment_id generator
    └── calculations.rs          ← pending, penalty, completion logic



---

# 8. REQUIRED FEATURES

## Dashboard

* Total members
* Total shares
* Total collection
* Pending dues
* Recent payments

## Member Management

* Add
* Edit
* Deactivate
* Search
* View profile

## Share Management

* Issue shares
* Track total shares
* Certificate number auto-generation

## Payments

* Record payment
* Mark cheque bounce
* Partial payments
* Payment modes
* Dues calculation

## Penalties

* Add penalty
* Auto penalty for bounced cheque
* Waive penalty

## Receipts

* Auto receipt number
* Generate PDF
* Reprint
* Store file path

## Reports

* Member statement
* Due report
* Collection report
* Export CSV

## Backup

* Manual backup
* Auto daily backup
* Restore

---

# 9. BUSINESS LOGIC RULES

1. Receipt number format:
   CLUB84-YYYY-0001

2. Cheque bounce:

   * Payment status = bounced
   * Auto penalty created

3. Shares:
   total_amount = shares_count × price_per_share

4. Partial payments allowed.

5. Deleting financial records is not allowed.
   Only soft delete via status.

---

# 10. DATA SAFETY CONFIGURATION

Run on DB initialization:

```sql
PRAGMA journal_mode = WAL;
PRAGMA synchronous = NORMAL;
PRAGMA foreign_keys = ON;
```

Backup before:

* App close
* Record deletion
* App update

---

# 11. SECURITY

* Admin password hashed
* No plaintext storage
* No external network calls
* Database stored in app data folder

---

# 12. DEVELOPMENT PHASES

Phase 1:

* Setup Tauri + React
* Setup SQLite
* Member CRUD

Phase 2:

* Share issuance
* Payments

Phase 3:

* Receipts
* Reports

Phase 4:

* Backup system
* Audit logs
* UI polish

---

# 13. FUTURE ENHANCEMENTS

* Cloud sync
* Multi-admin support
* Export to Excel
* Email receipts
* Role-based permissions

---

# 14. AI INSTRUCTIONS

When building this system:

* Always use transactions for financial writes
* Never allow hard deletion of financial records
* Validate all foreign keys
* Keep repository layer separate from business logic
* Ensure UI reflects real-time DB updates
* Always log financial actions in audit_logs

---

# END OF DOCUMENT
