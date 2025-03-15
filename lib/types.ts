export interface User {
  id: number;
  clerk_id: string;
  email: string;
  created_at: string;
}

export interface Photo {
  id: number;
  user_id: number;
  file_url: string;
  uploaded_at: string;
}

export interface Model {
  id: number;
  user_id: number;
  model_id: string;
  trigger_word: string;
  status: 'Processing' | 'Ready' | 'Failed';
  parameters: Record<string, any>;
  created_at: string;
}

export interface Generation {
  id: number;
  user_id: number;
  model_id: number;
  prompt: string;
  enhanced_prompt?: string;
  image_url: string;
  created_at: string;
}

export interface Payment {
  id: number;
  user_id: number;
  stripe_charge_id: string;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
}

export interface AuditLog {
  id: number;
  user_id?: number;
  action: string;
  details: Record<string, any>;
  created_at: string;
}

export interface UserQuota {
  modelsCreated: number;
  modelsLimit: number;
  dailyGenerations: number;
  dailyGenerationsLimit: number;
  plan: 'Free' | 'Premium';
} 