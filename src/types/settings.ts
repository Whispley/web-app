// User Profile Management
export interface UserProfile {
  first_name: string;
  last_name: string;
  email: string;
  company_name: string;
  avatar?: string;
  timezone?: string;
  language?: string;
}

// Account Status and Security
export interface AccountStatus {
  emailVerified: boolean;
  accountStatus: 'active' | 'inactive' | 'suspended';
  accountType: 'basic' | 'pro' | 'enterprise';
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  totpEnabled: boolean;
  backupCodes: string[];
  lastPasswordChange: string;
  sessionTimeout: number; // in minutes
  loginNotifications: boolean;
}

// API Keys Management
export interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed?: string;
  permissions: string[];
  isActive: boolean;
}

// Team Management
export interface TeamMember {
  id: string;
  email: string;
  role: 'owner' | 'admin' | 'member';
  status: 'active' | 'pending' | 'inactive';
  invitedAt: string;
  spendingLimit?: number;
  permissions: string[];
}

export interface TeamSettings {
  members: TeamMember[];
  defaultRole: 'admin' | 'member';
  inviteExpiration: number; // in days
  requireApproval: boolean;
}

// Billing and Usage
export interface BillingInfo {
  currentBalance: number;
  monthlyUsage: number;
  plan: 'basic' | 'pro' | 'enterprise';
  billingCycle: 'monthly' | 'yearly';
  nextBillingDate: string;
  spendingLimits: SpendingLimits;
}

export interface SpendingLimits {
  monthlyLimit: number;
  dailyLimit: number;
  alertThreshold: number; // percentage
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

export interface PaymentHistory {
  id: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  description: string;
}

// Notification Preferences
export interface NotificationPreferences {
  emailNotifications: {
    campaigns: boolean;
    billing: boolean;
    security: boolean;
    marketing: boolean;
  };
  frequency: 'immediate' | 'daily' | 'weekly';
  webhookUrl?: string;
}

// Domain Management
export interface Domain {
  id: string;
  domain: string;
  status: 'verified' | 'pending' | 'failed';
  createdAt: string;
  dnsRecords: DnsRecord[];
}

export interface DnsRecord {
  type: 'TXT' | 'CNAME' | 'MX';
  name: string;
  value: string;
  status: 'verified' | 'pending';
}

// Template Management
export interface Template {
  id: string;
  name: string;
  subject: string;
  content: string;
  isDefault: boolean;
  createdAt: string;
  lastModified: string;
}

// Analytics Settings
export interface AnalyticsSettings {
  trackingEnabled: boolean;
  retentionPeriod: number; // in days
  exportFormat: 'csv' | 'json' | 'xlsx';
  anonymizeData: boolean;
}

// Blacklist/Ban Management
export interface BlacklistEntry {
  id: string;
  email: string;
  reason: string;
  createdAt: string;
  isActive: boolean;
}

// General Settings
export interface GeneralSettings {
  profile: UserProfile;
  security: SecuritySettings;
  team: TeamSettings;
  billing: BillingInfo;
  notifications: NotificationPreferences;
  domains: Domain[];
  templates: Template[];
  analytics: AnalyticsSettings;
  blacklist: BlacklistEntry[];
}

export type SettingsTab = 'profile' | 'security' | 'team' | 'billing' | 'notifications' | 'domains' | 'templates' | 'analytics';

export type SettingsSection = {
  id: SettingsTab;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
};