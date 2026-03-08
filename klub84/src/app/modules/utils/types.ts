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
  profile_image?: string;
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

export interface SharePurchase {
  purchaseId: string;
  companyId: number;
  memberId: string;

  schemeId: string;
  schemeName: string;

  quantity: number;
  sharePrice: number;
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;

  status: "active" | "completed";
  createdAt: string;
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