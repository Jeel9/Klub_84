export type Member = {
  member_id: string;
  company_id: number;

  name: string;
  city?: string;
  address?: string;
  phone?: string;
  aadhar?: string;
  pan_number?: string;
  business?: string;
  business_address?: string;
  email?: string;
  gender?: string;
  dob?: string;

  family_member1?: string;
  family_member2?: string;
  family_member3?: string;
  family_member4?: string;

  join_date?: string;
  status: "active" | "inactive";
  update_date?: string;
};

export type ShareScheme = {
  scheme_id: string;
  company_id: number;
  scheme_name: string;
  face_value: number;
  status: "active" | "inactive";
  created_at?: string;
  updated_at?: string;
};

export type SharePurchase = {
  purchase_id: string;
  member_id: string;
  company_id: number;
  scheme_id: string;

  quantity: number;
  price_per_share: number;
  total_amount: number;

  paid_amount: number;
  pending_amount: number;

  status: string;
  created_at?: string;
};

export type Payment = {
  payment_id: string;
  purchase_id: string;
  member_id: string;
  amount: number;
  payment_mode: string;
  payment_type?: "normal" | "penalty";
  status?: "cleared" | "bounced" | "void";
  reference_number?: string;
  created_at?: string;
};