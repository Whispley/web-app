import { useState, useEffect } from "react";
import { StatsGrid } from "@/components/common/stats-grid";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
} from "recharts";
import {
  RiDownloadLine,
  RiRefreshLine,
  RiWalletLine,
  RiFlaskLine,
  RiGroupLine,
  RiArrowUpLine,
} from "@remixicon/react";
import type {
  AnalyticsData,
  TimeSeriesData,
  ChartDataPoint,
} from "@/types/analytics";

// Mock data generation
const generateMockData = (): AnalyticsData => {
  const today = new Date();
  const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

  return {
    balance: {
      success: true,
      data: {
        balance: 1247.5,
        currency: "USD",
        last_updated: new Date().toISOString(),
      },
    },
    paymentHistory: {
      success: true,
      data: {
        payments: [
          {
            id: "pay_1",
            amount: 500,
            currency: "USD",
            status: "succeeded",
            created_at: "2024-01-15T10:30:00Z",
            payment_method: "stripe",
            description: "Monthly plan renewal",
          },
        ],
        total_count: 12,
        page: 1,
        per_page: 10,
      },
    },
    currentPlan: {
      success: true,
      data: {
        plan_id: "pro_monthly",
        plan_name: "Pro Monthly",
        credits_included: 10000,
        price: 99,
        currency: "USD",
        billing_period: "monthly",
        status: "active",
        created_at: "2024-01-01T00:00:00Z",
      },
    },
    currentPeriod: {
      success: true,
      data: {
        period_start: "2024-01-01T00:00:00Z",
        period_end: "2024-01-31T23:59:59Z",
        credits_used: 7350,
        credits_remaining: 2650,
        credits_total: 10000,
        usage_percentage: 73.5,
      },
    },
    usageHistory: {
      success: true,
      data: {
        usage: [],
        total_count: 245,
        page: 1,
        per_page: 50,
      },
    },
    usageStats: {
      success: true,
      data: {
        total_credits_used: 7350,
        total_credits_purchased: 10000,
        average_daily_usage: 245,
        peak_usage_day: "2024-01-15",
        most_active_period: "14:00-16:00",
        usage_by_type: {
          "API Calls": 4200,
          "Data Processing": 2150,
          "AI Analysis": 1000,
        },
        monthly_trends: [
          { month: "Nov", credits_used: 6800, credits_purchased: 10000 },
          { month: "Dec", credits_used: 8200, credits_purchased: 10000 },
          { month: "Jan", credits_used: 7350, credits_purchased: 10000 },
        ],
      },
    },
    behavioralAnalytics: {
      success: true,
      data: {
        user_segments: [
          { segment: "Heavy Users", count: 156, percentage: 23.5 },
          { segment: "Regular Users", count: 342, percentage: 51.7 },
          { segment: "Light Users", count: 164, percentage: 24.8 },
        ],
        usage_patterns: [],
        feature_adoption: {
          "API Integration": {
            adoption_rate: 95,
            engagement_score: 8.7,
            last_used: "2024-01-15",
          },
          "Analytics Dashboard": {
            adoption_rate: 78,
            engagement_score: 7.2,
            last_used: "2024-01-14",
          },
        },
        session_analytics: {
          average_session_duration: 1847,
          sessions_per_day: 4.2,
          bounce_rate: 12.5,
        },
      },
    },
    usageInsights: {
      success: true,
      data: {
        insights: [
          {
            type: "optimization",
            title: "Peak Usage Optimization",
            description:
              "Your usage peaks at 2-4 PM. Consider scheduling non-critical tasks outside this window.",
            impact: "medium",
            actionable: true,
            suggested_action: "Implement usage scheduling",
          },
        ],
        performance_metrics: {
          efficiency_score: 87.5,
          cost_per_credit: 0.0099,
          usage_optimization_potential: 23,
        },
        predictions: [],
      },
    },
  };
};

const timeSeriesData: TimeSeriesData[] = [
  { date: "Jan 1", credits_used: 180, credits_purchased: 0, balance: 1890 },
  { date: "Jan 8", credits_used: 240, credits_purchased: 0, balance: 1650 },
  { date: "Jan 15", credits_used: 320, credits_purchased: 500, balance: 1830 },
  { date: "Jan 22", credits_used: 280, credits_purchased: 0, balance: 1550 },
  { date: "Jan 29", credits_used: 210, credits_purchased: 0, balance: 1340 },
];

const usageByTypeData: ChartDataPoint[] = [
  { name: "API Calls", value: 4200, fill: "#3b82f6" },
  { name: "Data Processing", value: 2150, fill: "#10b981" },
  { name: "AI Analysis", value: 1000, fill: "#f59e0b" },
];

export default function AnalyticsV1() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setData(generateMockData());
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleRefresh = () => {
    setData(generateMockData());
  };

  const handleExport = () => {
    console.log("Exporting analytics data...");
  };

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col gap-4 lg:gap-6 py-4 lg:py-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="h-32 bg-muted rounded"></div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const {
    balance,
    currentPlan,
    currentPeriod,
    usageStats,
    behavioralAnalytics,
    usageInsights,
  } = data;

  return (
    <div className="flex flex-1 flex-col gap-4 lg:gap-6 py-4 lg:py-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Analytics Overview</h1>
          <p className="text-sm text-muted-foreground">
            Comprehensive insights into your usage, spending, and performance
            metrics.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh} className="px-3">
            <RiRefreshLine size={16} className="mr-2" />
            Refresh
          </Button>
          <Button onClick={handleExport} className="px-3">
            <RiDownloadLine size={16} className="mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <StatsGrid
        stats={[
          {
            title: "Current Balance",
            value: `$${balance.data.balance.toFixed(2)}`,
            change: { value: "+$127.50", trend: "up" },
            icon: <RiWalletLine size={20} />,
          },
          {
            title: "Credits Used",
            value: currentPeriod.data.credits_used.toLocaleString(),
            change: {
              value: `${currentPeriod.data.usage_percentage.toFixed(1)}%`,
              trend: currentPeriod.data.usage_percentage > 75 ? "down" : "up",
            },
            icon: <RiFlaskLine size={20} />,
          },
          {
            title: "Efficiency Score",
            value: `${usageInsights.data.performance_metrics.efficiency_score}%`,
            change: { value: "+5.2%", trend: "up" },
            icon: <RiArrowUpLine size={20} />,
          },
          {
            title: "Active Sessions",
            value:
              behavioralAnalytics.data.session_analytics.sessions_per_day.toFixed(
                1
              ),
            change: { value: "+12%", trend: "up" },
            icon: <RiGroupLine size={20} />,
          },
        ]}
      />

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="usage">Usage Trends</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Current Plan Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Current Plan
                </CardTitle>
                <Badge
                  variant={
                    currentPlan.data.status === "active"
                      ? "default"
                      : "secondary"
                  }
                >
                  {currentPlan.data.status}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {currentPlan.data.plan_name}
                </div>
                <div className="text-sm text-muted-foreground mb-3">
                  ${currentPlan.data.price}/{currentPlan.data.billing_period}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Credits Used</span>
                    <span>
                      {currentPeriod.data.credits_used.toLocaleString()} /{" "}
                      {currentPeriod.data.credits_total.toLocaleString()}
                    </span>
                  </div>
                  <Progress
                    value={currentPeriod.data.usage_percentage}
                    className="h-2"
                  />
                  <div className="text-xs text-muted-foreground">
                    {currentPeriod.data.credits_remaining.toLocaleString()}{" "}
                    credits remaining
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Usage Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Usage Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    "API Calls": { label: "API Calls", color: "#3b82f6" },
                    "Data Processing": {
                      label: "Data Processing",
                      color: "#10b981",
                    },
                    "AI Analysis": { label: "AI Analysis", color: "#f59e0b" },
                  }}
                  className="h-[200px]"
                >
                  <PieChart>
                    <Pie
                      data={usageByTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {usageByTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Recent Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Recent Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {usageInsights.data.insights
                  .slice(0, 2)
                  .map((insight, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            insight.impact === "high"
                              ? "destructive"
                              : insight.impact === "medium"
                              ? "default"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          {insight.impact}
                        </Badge>
                        <span className="text-sm font-medium">
                          {insight.title}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {insight.description}
                      </p>
                    </div>
                  ))}
                <Button variant="link" className="text-xs p-0 h-auto">
                  View all insights →
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Usage Trends Chart */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Usage Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    credits_used: { label: "Credits Used", color: "#3b82f6" },
                    balance: { label: "Balance", color: "#10b981" },
                  }}
                  className="h-[300px]"
                >
                  <AreaChart data={timeSeriesData}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="credits_used"
                      stackId="1"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.2}
                    />
                    <Area
                      type="monotone"
                      dataKey="balance"
                      stackId="2"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Monthly Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Monthly Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    credits_used: { label: "Credits Used", color: "#3b82f6" },
                    credits_purchased: {
                      label: "Credits Purchased",
                      color: "#10b981",
                    },
                  }}
                  className="h-[200px]"
                >
                  <BarChart data={usageStats.data.monthly_trends}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="credits_used" fill="#3b82f6" />
                    <Bar dataKey="credits_purchased" fill="#10b981" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Session Analytics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Session Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Avg. Session Duration
                  </span>
                  <span className="font-medium">
                    {Math.floor(
                      behavioralAnalytics.data.session_analytics
                        .average_session_duration / 60
                    )}
                    m{" "}
                    {behavioralAnalytics.data.session_analytics
                      .average_session_duration % 60}
                    s
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Sessions per Day
                  </span>
                  <span className="font-medium">
                    {
                      behavioralAnalytics.data.session_analytics
                        .sessions_per_day
                    }
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Bounce Rate
                  </span>
                  <span className="font-medium">
                    {behavioralAnalytics.data.session_analytics.bounce_rate}%
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Efficiency Score
                    </span>
                    <span className="font-medium">
                      {usageInsights.data.performance_metrics.efficiency_score}%
                    </span>
                  </div>
                  <Progress
                    value={
                      usageInsights.data.performance_metrics.efficiency_score
                    }
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Cost per Credit
                    </span>
                    <span className="font-medium">
                      $
                      {usageInsights.data.performance_metrics.cost_per_credit.toFixed(
                        4
                      )}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Optimization Potential
                    </span>
                    <span className="font-medium">
                      {
                        usageInsights.data.performance_metrics
                          .usage_optimization_potential
                      }
                      %
                    </span>
                  </div>
                  <Progress
                    value={
                      usageInsights.data.performance_metrics
                        .usage_optimization_potential
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* User Segments */}
            <Card>
              <CardHeader>
                <CardTitle>User Segments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {behavioralAnalytics.data.user_segments.map(
                  (segment, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm">{segment.segment}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {segment.count}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {segment.percentage}%
                        </Badge>
                      </div>
                    </div>
                  )
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
