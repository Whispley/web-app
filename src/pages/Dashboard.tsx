import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  RiBarChartBoxLine,
  RiArrowUpSLine,
  RiArrowDownSLine,
  RiSubtractLine,
  RiDownloadLine,
  RiRefreshLine,
  RiFilterLine,
  RiCalendarLine,
  RiGlobalLine,
  RiUserLine,
  RiMailLine,
  RiCodeLine,
  RiServerLine,
  RiSettingsLine,
  RiBankCardLine,
  RiTeamLine,
  RiTimeLine,
  RiEyeLine,
} from "@remixicon/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TransactionTable from "@/components/common/transaction-table";

const quickActions = [
  {
    title: "Create New Template",
    description: "Design and build new email templates",
    icon: RiMailLine,
    color: "bg-blue-500",
    shortcut: "Ctrl+N",
  },
  {
    title: "Generate API Key",
    description: "Create new API keys for integrations",
    icon: RiCodeLine,
    color: "bg-green-500",
    shortcut: "Ctrl+K",
  },
  {
    title: "Invite Team Member",
    description: "Add new members to your workspace",
    icon: RiTeamLine,
    color: "bg-purple-500",
    shortcut: "Ctrl+I",
  },
  {
    title: "View Analytics",
    description: "Check detailed usage and performance",
    icon: RiBarChartBoxLine,
    color: "bg-orange-500",
    shortcut: "Ctrl+A",
  },
  {
    title: "Billing Settings",
    description: "Manage subscription and payments",
    icon: RiBankCardLine,
    color: "bg-red-500",
    shortcut: "Ctrl+B",
  },
  {
    title: "Account Settings",
    description: "Update profile and preferences",
    icon: RiSettingsLine,
    color: "bg-gray-500",
    shortcut: "Ctrl+S",
  },
];

const widgetData = [
  {
    title: "Active Customers",
    value: "2,847",
    change: "+12.5%",
    trend: "up",
    subtitle: "total customers",
    icon: RiUserLine,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "API Usage",
    value: "89.2K",
    change: "-2.4%",
    trend: "down",
    subtitle: "requests/month",
    icon: RiCodeLine,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    title: "Email Delivery",
    value: "99.7%",
    change: "+0.3%",
    trend: "up",
    subtitle: "success rate",
    icon: RiMailLine,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    title: "System Uptime",
    value: "99.9%",
    change: "0%",
    trend: "stable",
    subtitle: "last 30 days",
    icon: RiServerLine,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
  {
    title: "Global Reach",
    value: "47",
    change: "+3",
    trend: "up",
    subtitle: "countries served",
    icon: RiGlobalLine,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
  },
];

export default function Dashboard() {
  return (
    <div className="flex flex-1 flex-col gap-6 py-6">
      {/* Header with Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/avatars/01.png" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">Welcome back, John!</h1>
            <p className="text-muted-foreground">
              Here's what's happening with your account today.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RiCalendarLine className="mr-2 h-4 w-4" />
            Last 30 Days
          </Button>
          <Button variant="outline" size="sm">
            <RiFilterLine className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline" size="sm">
            <RiRefreshLine className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button size="sm">
            <RiDownloadLine className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Widgets Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
        {widgetData.map((widget, index) => (
          <Card
            key={index}
            className="relative overflow-hidden group hover:shadow-md transition-shadow"
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {widget.title}
                  </p>
                  <p className="text-xl font-bold">{widget.value}</p>
                  <div className="flex items-center text-xs">
                    {widget.trend === "up" && (
                      <RiArrowUpSLine className="mr-1 h-3 w-3 text-green-500" />
                    )}
                    {widget.trend === "down" && (
                      <RiArrowDownSLine className="mr-1 h-3 w-3 text-red-500" />
                    )}
                    {widget.trend === "stable" && (
                      <RiSubtractLine className="mr-1 h-3 w-3 text-gray-500" />
                    )}
                    <span
                      className={
                        widget.trend === "up"
                          ? "text-green-600 font-medium"
                          : widget.trend === "down"
                          ? "text-red-600 font-medium"
                          : "text-gray-600 font-medium"
                      }
                    >
                      {widget.change}
                    </span>
                    <span className="ml-1 text-muted-foreground">
                      {widget.subtitle}
                    </span>
                  </div>
                </div>
                <div className={`rounded-lg p-2 ${widget.bgColor}`}>
                  <widget.icon className={`h-4 w-4 ${widget.color}`} />
                </div>
              </div>
            </CardContent>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-8">
        <Card className="col-span-6">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Frequently used tools and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto flex-col gap-3 p-4 text-left relative group"
                >
                  <div className="flex items-center gap-3 w-full">
                    <div
                      className={`p-2 rounded-lg ${action.color} text-white`}
                    >
                      <action.icon className="h-4 w-4" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-sm">{action.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {action.description}
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Badge variant="secondary" className="text-xs">
                      {action.shortcut}
                    </Badge>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Quick Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-blue-100 p-1">
                  <RiArrowUpSLine className="h-3 w-3 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Peak Traffic Hour</p>
                  <p className="text-xs text-muted-foreground">
                    12:00 PM - 3,200 API calls
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-full bg-green-100 p-1">
                  <RiEyeLine className="h-3 w-3 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Top Template</p>
                  <p className="text-xs text-muted-foreground">
                    Welcome Email - 24% usage
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-full bg-orange-100 p-1">
                  <RiTimeLine className="h-3 w-3 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Avg Response Time</p>
                  <p className="text-xs text-muted-foreground">
                    135ms (improved 15ms)
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="min-h-[100vh] flex-1 md:min-h-min">
        <TransactionTable />
      </div>
    </div>
  );
}
