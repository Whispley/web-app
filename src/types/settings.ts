export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
}

export interface AccountStatus {
  emailVerified: boolean;
  accountStatus: 'active' | 'inactive' | 'suspended';
  accountType: 'basic' | 'pro' | 'enterprise';
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed?: string;
}

export interface TeamMember {
  id: string;
  email: string;
  role: 'owner' | 'admin' | 'member';
  status: 'active' | 'pending' | 'inactive';
  invitedAt: string;
}

export interface SpendingLimits {
  monthlyLimit: number;
  dailyLimit: number;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank';
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  brand: string;
  isDefault: boolean;
}

export interface NotificationPreferences {
  email: string;
  frequency: 'immediate' | 'daily' | 'weekly';
}

export type SettingsTab = 'profile' | 'security' | 'team' | 'billing' | 'notifications';