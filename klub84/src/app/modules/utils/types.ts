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

export type Share = {
  share_id?: string;
  company_id: number;
  member_id: string;

  share_number: string;
  quantity: number;
  price_per_share: number;
  total_amount: number;

  issue_date?: string;
  status?: "active" | "inactive";
  update_date?: string;
};

export type Payment = {
  payment_id?: string;
  company_id: number;
  member_id: string;

  amount: number;
  payment_mode: string;
  reference_number?: string;
  payment_type?: "normal" | "penalty";
  status?: "cleared" | "bounced" | "void";
  linked_payment_id?: string;
  notes?: string;

  created_at?: string;
  update_date?: string;
};
