use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Payment {
    pub payment_id: Option<String>,
    pub purchase_id: Option<String>,
    pub member_id: String,

    pub amount: f64,
    pub payment_mode: String,
    pub reference_number: Option<String>,

    pub payment_type: String,
    pub status: String,

    pub created_at: Option<String>,
    pub updated_at: Option<String>,
}