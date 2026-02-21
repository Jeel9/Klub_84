use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Clone)]
pub struct Payment {
    pub payment_id: Option<String>,
    pub company_id: i32,
    pub member_id: String,

    pub amount: f64,
    pub payment_mode: String,
    pub reference_number: Option<String>,
    pub payment_type: Option<String>, // normal / penalty
    pub status: Option<String>,       // cleared / bounced / void
    pub linked_payment_id: Option<String>,
    pub notes: Option<String>,

    pub created_at: Option<String>,
    pub update_date: Option<String>,
}
