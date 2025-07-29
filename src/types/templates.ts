export interface Template {
  template_id: string;
  name: string;
  description?: string;
  subject: string;
  content: string;
  template_type: 'email' | 'sms' | 'push';
  status: 'active' | 'inactive' | 'draft';
  created_at: string;
  updated_at: string;
  created_by: string;
  tags?: string[];
  variables?: string[];
  preview_url?: string;
}

export interface CreateTemplateRequest {
  name: string;
  description?: string;
  subject: string;
  content: string;
  template_type: 'email' | 'sms' | 'push';
  status?: 'active' | 'inactive' | 'draft';
  tags?: string[];
}

export interface UpdateTemplateRequest extends Partial<CreateTemplateRequest> {
  template_id: string;
}

export interface TemplateResponse {
  success: boolean;
  message: string;
  data: Template;
}

export interface TemplatesListResponse {
  success: boolean;
  data: {
    templates: Template[];
    total: number;
    limit: number;
    offset: number;
  };
}

export interface TemplateStats {
  total_templates: number;
  active_templates: number;
  draft_templates: number;
  email_templates: number;
  sms_templates: number;
  push_templates: number;
}