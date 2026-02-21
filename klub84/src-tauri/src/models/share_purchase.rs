use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct SharePurchase {
    pub purchase_id: Option<String>,
    pub member_id: String,
    pub company_id: i32,
    pub scheme_id: String,

    pub quantity: i32,
    pub price_per_share: Option<f64>,
    pub total_amount: f64,

    pub paid_amount: f64,
    pub pending_amount: f64,

    pub status: String,

    pub created_at: Option<String>,
    pub updated_at: Option<String>,
}
