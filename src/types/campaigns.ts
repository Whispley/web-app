// Campaign Management Types

export interface Campaign {
  campaign_id: string;
  name: string;
  description: string;
  type: 'email';
  status: 'draft' | 'scheduled' | 'active' | 'paused' | 'completed';
  template_id: string;
  contact_list_ids: string[];
  domain_id?: string;
  scheduled_at?: string;
  created_at: string;
  updated_at?: string;
  delivery_stats: DeliveryStats;
  subject?: string;
  from_name?: string;
  from_email?: string;
}

export interface DeliveryStats {
  total_recipients: number;
  delivered: number;
  opened: number;
  clicked: number;
  failed: number;
  bounced?: number;
  unsubscribed?: number;
}

export interface CampaignMetrics extends DeliveryStats {
  delivery_rate: number;
  open_rate: number;
  click_rate: number;
  bounce_rate: number;
  unsubscribe_rate: number;
}

export interface Template {
  template_id: string;
  name: string;
  subject: string;
  content: string;
  html_content?: string;
  thumbnail?: string;
  category: 'marketing' | 'transactional' | 'newsletter' | 'promotional';
  is_default: boolean;
  created_at: string;
  updated_at?: string;
  tags?: string[];
}

export interface ContactList {
  list_id: string;
  name: string;
  description?: string;
  total_contacts: number;
  active_contacts: number;
  created_at: string;
  updated_at?: string;
  tags?: string[];
}

export interface Domain {
  domain_id: string;
  domain: string;
  status: 'verified' | 'pending' | 'failed';
  verification_records: DnsRecord[];
  created_at: string;
  verified_at?: string;
  is_default: boolean;
}

export interface DnsRecord {
  id: string;
  type: 'TXT' | 'CNAME' | 'MX';
  name: string;
  value: string;
  status: 'verified' | 'pending' | 'failed';
  ttl?: number;
}

export interface CampaignCreateRequest {
  name: string;
  description?: string;
  template_id: string;
  contact_list_ids: string[];
  domain_id?: string;
  subject?: string;
  from_name?: string;
  from_email?: string;
  scheduled_at?: string;
}

export interface CampaignUpdateRequest {
  name?: string;
  description?: string;
  template_id?: string;
  contact_list_ids?: string[];
  domain_id?: string;
  subject?: string;
  from_name?: string;
  from_email?: string;
  scheduled_at?: string;
  status?: Campaign['status'];
}

// UI-specific types
export type CampaignSortField = 'name' | 'status' | 'created_at' | 'scheduled_at' | 'delivery_rate' | 'open_rate';
export type SortDirection = 'asc' | 'desc';

export interface CampaignFilters {
  status?: Campaign['status'][];
  template_id?: string;
  contact_list_ids?: string[];
  date_range?: {
    start: string;
    end: string;
  };
  search?: string;
}

export interface CampaignSort {
  field: CampaignSortField;
  direction: SortDirection;
}

// Campaign wizard steps
export type CampaignWizardStep = 'template' | 'recipients' | 'settings' | 'schedule' | 'review';

export interface CampaignWizardData {
  step: CampaignWizardStep;
  template?: Template;
  contact_lists: ContactList[];
  domain?: Domain;
  settings: {
    name: string;
    description?: string;
    subject?: string;
    from_name?: string;
    from_email?: string;
  };
  schedule: {
    send_now: boolean;
    scheduled_at?: string;
  };
}

// Status badges configuration
export const CAMPAIGN_STATUS_CONFIG = {
  draft: {
    label: 'Draft',
    variant: 'secondary' as const,
    color: 'bg-gray-100 text-gray-800',
  },
  scheduled: {
    label: 'Scheduled',
    variant: 'default' as const,
    color: 'bg-blue-100 text-blue-800',
  },
  active: {
    label: 'Active',
    variant: 'default' as const,
    color: 'bg-green-100 text-green-800',
  },
  paused: {
    label: 'Paused',
    variant: 'secondary' as const,
    color: 'bg-yellow-100 text-yellow-800',
  },
  completed: {
    label: 'Completed',
    variant: 'outline' as const,
    color: 'bg-purple-100 text-purple-800',
  },
} as const;