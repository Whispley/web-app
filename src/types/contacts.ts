export interface Contact {
  contact_id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  status: 'active' | 'inactive' | 'unsubscribed' | 'bounced';
  created_at: string;
  updated_at?: string;
  custom_fields?: Record<string, any>;
  tags?: string[];
  lists?: string[];
  last_activity?: string;
  source?: string;
}

export interface ContactList {
  contact_list_id: string;
  name: string;
  description?: string;
  contact_count: number;
  active_contacts: number;
  created_at: string;
  updated_at?: string;
  tags?: string[];
  created_by: string;
}

export interface ContactListWithContacts extends ContactList {
  contacts: Contact[];
}

export interface CreateContactRequest {
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  status?: Contact['status'];
  custom_fields?: Record<string, any>;
  tags?: string[];
  contact_list_ids?: string[];
}

export interface UpdateContactRequest extends Partial<CreateContactRequest> {
  contact_id: string;
}

export interface CreateContactListRequest {
  name: string;
  description?: string;
  tags?: string[];
}

export interface UpdateContactListRequest extends Partial<CreateContactListRequest> {
  contact_list_id: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  data: Contact;
}

export interface ContactsListResponse {
  success: boolean;
  data: {
    contacts: Contact[];
    total: number;
    limit: number;
    offset: number;
  };
}

export interface ContactListResponse {
  success: boolean;
  message: string;
  data: ContactList;
}

export interface ContactListsResponse {
  success: boolean;
  data: {
    contact_lists: ContactList[];
    total: number;
    limit: number;
    offset: number;
  };
}

export interface ImportProgress {
  import_id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  total_contacts: number;
  processed_contacts: number;
  successful_imports: number;
  failed_imports: number;
  errors?: Array<{
    row: number;
    error: string;
    data: Record<string, any>;
  }>;
  started_at: string;
  completed_at?: string;
  created_by: string;
}

export interface ImportProgressResponse {
  success: boolean;
  data: ImportProgress;
}

export interface ImportCsvRequest {
  contact_list_id: string;
  csvFile: File;
  mapping?: Record<string, string>;
  skip_duplicates?: boolean;
  update_existing?: boolean;
}

export interface User {
  user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'admin' | 'manager' | 'member';
  status: 'active' | 'inactive' | 'pending';
  created_at: string;
  updated_at?: string;
  last_login?: string;
  permissions: string[];
  profile_image?: string;
  phone?: string;
  timezone?: string;
}

export interface Team {
  team_id: string;
  name: string;
  description?: string;
  owner_id: string;
  members: TeamMember[];
  created_at: string;
  updated_at?: string;
  settings: {
    allow_member_invites: boolean;
    require_approval: boolean;
    max_members?: number;
  };
}

export interface TeamMember {
  user_id: string;
  team_id: string;
  role: 'owner' | 'admin' | 'manager' | 'member';
  status: 'active' | 'pending' | 'inactive';
  joined_at: string;
  invited_by: string;
  permissions: string[];
  user: Pick<User, 'email' | 'first_name' | 'last_name' | 'profile_image'>;
}

export interface InviteTeamMemberRequest {
  email: string;
  role: TeamMember['role'];
  permissions?: string[];
  message?: string;
}

export interface UpdateTeamMemberRequest {
  role?: TeamMember['role'];
  permissions?: string[];
  status?: TeamMember['status'];
}

export interface ContactStats {
  total_contacts: number;
  active_contacts: number;
  inactive_contacts: number;
  unsubscribed_contacts: number;
  bounced_contacts: number;
  total_lists: number;
  growth_rate: number;
  recent_imports: number;
}

// Contact filtering and sorting types
export type ContactSortField = 'email' | 'first_name' | 'last_name' | 'created_at' | 'last_activity' | 'status';
export type ContactSortDirection = 'asc' | 'desc';

export interface ContactFilters {
  status?: Contact['status'][];
  lists?: string[];
  tags?: string[];
  date_range?: {
    start: string;
    end: string;
  };
  search?: string;
  has_phone?: boolean;
  has_custom_fields?: boolean;
}

export interface ContactSort {
  field: ContactSortField;
  direction: ContactSortDirection;
}

// Status configuration for contacts
export const CONTACT_STATUS_CONFIG = {
  active: {
    label: 'Active',
    variant: 'default' as const,
    color: 'bg-green-100 text-green-800',
  },
  inactive: {
    label: 'Inactive',
    variant: 'secondary' as const,
    color: 'bg-gray-100 text-gray-800',
  },
  unsubscribed: {
    label: 'Unsubscribed',
    variant: 'destructive' as const,
    color: 'bg-red-100 text-red-800',
  },
  bounced: {
    label: 'Bounced',
    variant: 'destructive' as const,
    color: 'bg-orange-100 text-orange-800',
  },
} as const;