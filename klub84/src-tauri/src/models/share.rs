// use serde::{Serialize, Deserialize};

// #[derive(Serialize, Deserialize, Clone)]
// pub struct Share {
//     pub share_id: Option<String>,
//     pub company_id: i32,
//     pub member_id: String,

//     pub share_number: Option<String>,
//     pub quantity: i32,
//     pub price_per_share: f64,
//     pub total_amount: f64,

//     pub issue_date: Option<String>,
//     pub status: Option<String>,
//     pub update_date: Option<String>,
// }


use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct ShareScheme {
    pub scheme_id: Option<String>,
    pub company_id: i32,
    pub scheme_name: String,
    pub face_value: f64,
    pub created_at: Option<String>,
    pub updated_at: Option<String>,
    pub status: Option<String>,
}