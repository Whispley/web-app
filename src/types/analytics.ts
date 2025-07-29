// Analytics API Response Types
export interface UsageBalance {
  success: boolean;
  data: {
    balance: number;
    currency: string;
    last_updated: string;
  };
}

export interface PaymentHistoryItem {
  id: string;
  amount: number;
  currency: string;
  status: "succeeded" | "pending" | "failed";
  created_at: string;
  payment_method: string;
  description?: string;
}

export interface PaymentHistory {
  success: boolean;
  data: {
    payments: PaymentHistoryItem[];
    total_count: number;
    page: number;
    per_page: number;
  };
}

export interface CurrentPlan {
  success: boolean;
  data: {
    plan_id: string;
    plan_name: string;
    credits_included: number;
    price: number;
    currency: string;
    billing_period: "monthly" | "yearly";
    status: "active" | "canceled" | "expired";
    created_at: string;
    expires_at?: string;
  };
}

export interface CurrentPeriod {
  success: boolean;
  data: {
    period_start: string;
    period_end: string;
    credits_used: number;
    credits_remaining: number;
    credits_total: number;
    usage_percentage: number;
  };
}

export interface UsageHistoryItem {
  id: string;
  date: string;
  credits_used: number;
  activity_type: string;
  description: string;
  cost?: number;
}

export interface UsageHistory {
  success: boolean;
  data: {
    usage: UsageHistoryItem[];
    total_count: number;
    page: number;
    per_page: number;
  };
}

export interface UsageStats {
  success: boolean;
  data: {
    total_credits_used: number;
    total_credits_purchased: number;
    average_daily_usage: number;
    peak_usage_day: string;
    most_active_period: string;
    usage_by_type: Record<string, number>;
    monthly_trends: Array<{
      month: string;
      credits_used: number;
      credits_purchased: number;
    }>;
  };
}

export interface BehavioralAnalytics {
  success: boolean;
  data: {
    user_segments: Array<{
      segment: string;
      count: number;
      percentage: number;
    }>;
    usage_patterns: Array<{
      pattern: string;
      frequency: number;
      impact_score: number;
    }>;
    feature_adoption: Record<string, {
      adoption_rate: number;
      engagement_score: number;
      last_used: string;
    }>;
    session_analytics: {
      average_session_duration: number;
      sessions_per_day: number;
      bounce_rate: number;
    };
  };
}

export interface UsageInsights {
  success: boolean;
  data: {
    insights: Array<{
      type: "optimization" | "warning" | "recommendation" | "trend";
      title: string;
      description: string;
      impact: "high" | "medium" | "low";
      actionable: boolean;
      suggested_action?: string;
    }>;
    performance_metrics: {
      efficiency_score: number;
      cost_per_credit: number;
      usage_optimization_potential: number;
    };
    predictions: Array<{
      metric: string;
      current_value: number;
      predicted_value: number;
      confidence: number;
      timeframe: string;
    }>;
  };
}

// Combined Analytics Data for Components
export interface AnalyticsData {
  balance: UsageBalance;
  paymentHistory: PaymentHistory;
  currentPlan: CurrentPlan;
  currentPeriod: CurrentPeriod;
  usageHistory: UsageHistory;
  usageStats: UsageStats;
  behavioralAnalytics: BehavioralAnalytics;
  usageInsights: UsageInsights;
}

// Chart Data Types
export interface ChartDataPoint {
  name: string;
  value: number;
  date?: string;
  [key: string]: any;
}

export interface TimeSeriesData {
  date: string;
  credits_used: number;
  credits_purchased: number;
  balance: number;
}

// Filter and View Types
export interface DateRange {
  start: string;
  end: string;
}

export interface AnalyticsFilters {
  dateRange: DateRange;
  activityType?: string;
  planType?: string;
  paymentStatus?: string;
}

export interface ExportOptions {
  format: "csv" | "json" | "pdf";
  dateRange: DateRange;
  includeCharts: boolean;
}