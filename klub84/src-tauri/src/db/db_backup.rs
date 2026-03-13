use std::fs;
use std::path::Path;
use chrono::Local;

pub fn backup_database(db_path: &str) -> Result<(), String> {

    let db = Path::new(db_path);

    if !db.exists() {
        return Ok(());
    }

    let backup_dir = db.parent().unwrap().join("backups");

    if !backup_dir.exists() {
        fs::create_dir_all(&backup_dir).map_err(|e| e.to_string())?;
    }

    let timestamp = Local::now().format("%Y_%m_%d_%H_%M_%S");

    let backup_file = backup_dir.join(format!("klub84_{}.db", timestamp));

    fs::copy(db, backup_file).map_err(|e| e.to_string())?;

    let mut backups: Vec<_> = fs::read_dir(&backup_dir)
                .unwrap()
                .filter_map(|e| e.ok())
                .collect();

    backups.sort_by_key(|f| f.metadata().unwrap().modified().unwrap());

    while backups.len() > 5 {
        let old = backups.remove(0);
        fs::remove_file(old.path()).ok();
    }

    Ok(())
}