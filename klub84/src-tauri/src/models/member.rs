use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct Member {
    pub member_id: Option<String>,
    pub company_id: i32,
    pub name: String,
    pub city: Option<String>,
    pub address: Option<String>,
    pub phone: Option<String>,
    pub aadhar: Option<String>,
    pub pan_number: Option<String>,
    pub business: Option<String>,
    pub business_address: Option<String>,
    pub email: Option<String>,
    pub gender: Option<String>,
    pub dob: Option<String>,
    pub family_member1: Option<String>,
    pub family_member2: Option<String>,
    pub family_member3: Option<String>,
    pub family_member4: Option<String>,
    pub status: String,
}
