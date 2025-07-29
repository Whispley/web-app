import * as React from "react";
import { useState, useMemo } from "react";
import {
  RiAddLine,
  RiSearchLine,
  RiFilterLine,
  RiEditLine,
  RiPlayLine,
  RiPauseLine,
  RiCalendarLine,
  RiMailLine,
  RiTeamLine,
  RiGlobalLine,
  RiBarChartLine,
  RiTimeLine,
  RiGroupLine,
  RiCheckLine,
  RiSendPlaneLine,
  RiArrowLeftLine,
} from "@remixicon/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

import { cn } from "@/lib/utils";
import {
  type Campaign,
  type CampaignFilters,
  CAMPAIGN_STATUS_CONFIG,
  type Template,
  type ContactList,
  type Domain,
  type CampaignCreateRequest,
  type CampaignMetrics,
} from "@/types/campaigns";

// Mock data (same as previous versions)
const mockCampaigns: Campaign[] = [
  {
    campaign_id: "1",
    name: "Summer Sale 2024",
    description:
      "Promotional campaign for summer collection targeting returning customers with exclusive offers.",
    type: "email",
    status: "active",
    template_id: "template-1",
    contact_list_ids: ["list-1", "list-2"],
    domain_id: "domain-1",
    scheduled_at: "2024-07-15T09:00:00Z",
    created_at: "2024-07-01T10:00:00Z",
    delivery_stats: {
      total_recipients: 5000,
      delivered: 4850,
      opened: 2425,
      clicked: 485,
      failed: 150,
    },
    subject: "Don't miss our summer deals!",
    from_name: "Whispley Team",
    from_email: "team@whispley.com",
  },
  {
    campaign_id: "2",
    name: "Welcome Series",
    description:
      "Automated onboarding email sequence for new subscribers to introduce our services.",
    type: "email",
    status: "completed",
    template_id: "template-2",
    contact_list_ids: ["list-3"],
    created_at: "2024-06-15T14:30:00Z",
    delivery_stats: {
      total_recipients: 1200,
      delivered: 1185,
      opened: 830,
      clicked: 295,
      failed: 15,
    },
    subject: "Welcome to our community!",
    from_name: "Whispley Team",
    from_email: "welcome@whispley.com",
  },
  {
    campaign_id: "3",
    name: "Product Launch",
    description:
      "Announcing our new product features and improvements to existing users.",
    type: "email",
    status: "scheduled",
    template_id: "template-3",
    contact_list_ids: ["list-1"],
    scheduled_at: "2024-08-01T12:00:00Z",
    created_at: "2024-07-20T16:45:00Z",
    delivery_stats: {
      total_recipients: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      failed: 0,
    },
    subject: "Exciting new features are here!",
    from_name: "Product Team",
    from_email: "product@whispley.com",
  },
  {
    campaign_id: "4",
    name: "Monthly Newsletter",
    description:
      "Regular monthly update for subscribers with latest news and updates.",
    type: "email",
    status: "draft",
    template_id: "template-2",
    contact_list_ids: ["list-1"],
    created_at: "2024-07-25T11:00:00Z",
    delivery_stats: {
      total_recipients: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      failed: 0,
    },
    subject: "July Newsletter - What's New",
    from_name: "Newsletter Team",
    from_email: "newsletter@whispley.com",
  },
];

const mockTemplates: Template[] = [
  {
    template_id: "template-1",
    name: "Promotional Template",
    subject: "Special Offer",
    content: "",
    category: "promotional",
    is_default: false,
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    template_id: "template-2",
    name: "Welcome Template",
    subject: "Welcome!",
    content: "",
    category: "marketing",
    is_default: true,
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    template_id: "template-3",
    name: "Newsletter Template",
    subject: "Newsletter",
    content: "",
    category: "newsletter",
    is_default: false,
    created_at: "2024-01-01T00:00:00Z",
  },
];

const mockContactLists: ContactList[] = [
  {
    list_id: "list-1",
    name: "All Subscribers",
    total_contacts: 5000,
    active_contacts: 4850,
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    list_id: "list-2",
    name: "Premium Users",
    total_contacts: 1200,
    active_contacts: 1180,
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    list_id: "list-3",
    name: "New Subscribers",
    total_contacts: 800,
    active_contacts: 780,
    created_at: "2024-01-01T00:00:00Z",
  },
];

const mockDomains: Domain[] = [
  {
    domain_id: "domain-1",
    domain: "mail.whispley.com",
    status: "verified",
    verification_records: [],
    created_at: "2024-01-01T00:00:00Z",
    is_default: true,
  },
  {
    domain_id: "domain-2",
    domain: "newsletter.whispley.com",
    status: "verified",
    verification_records: [],
    created_at: "2024-01-01T00:00:00Z",
    is_default: false,
  },
];

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function calculateRate(numerator: number, denominator: number): number {
  return denominator > 0 ? Math.round((numerator / denominator) * 100) : 0;
}

function calculateMetrics(campaign: Campaign): CampaignMetrics {
  const deliveryRate = calculateRate(
    campaign.delivery_stats.delivered,
    campaign.delivery_stats.total_recipients
  );
  const openRate = calculateRate(
    campaign.delivery_stats.opened,
    campaign.delivery_stats.delivered
  );
  const clickRate = calculateRate(
    campaign.delivery_stats.clicked,
    campaign.delivery_stats.opened
  );
  const bounceRate = calculateRate(
    campaign.delivery_stats.failed,
    campaign.delivery_stats.total_recipients
  );

  return {
    ...campaign.delivery_stats,
    delivery_rate: deliveryRate,
    open_rate: openRate,
    click_rate: clickRate,
    bounce_rate: bounceRate,
    unsubscribe_rate: 0, // Mock data doesn't include unsubscribed
  };
}

// Campaign List Item Component
interface CampaignListItemProps {
  campaign: Campaign;
  isSelected: boolean;
  onClick: () => void;
}

function CampaignListItem({
  campaign,
  isSelected,
  onClick,
}: CampaignListItemProps) {
  const metrics = calculateMetrics(campaign);

  return (
    <div
      className={cn(
        "p-3 md:p-4 cursor-pointer border-b border-border transition-colors hover:bg-muted/50 active:bg-muted/70 touch-manipulation",
        isSelected && "bg-muted border-l-4 border-l-primary"
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
            <h3 className="font-semibold text-sm truncate">{campaign.name}</h3>
            <Badge
              variant={CAMPAIGN_STATUS_CONFIG[campaign.status].variant}
              className={cn(
                "text-xs w-fit",
                CAMPAIGN_STATUS_CONFIG[campaign.status].color
              )}
            >
              {CAMPAIGN_STATUS_CONFIG[campaign.status].label}
            </Badge>
          </div>
          {campaign.description && (
            <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
              {campaign.description}
            </p>
          )}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 text-xs text-muted-foreground">
            <span>{formatDate(campaign.created_at)}</span>
            {campaign.delivery_stats.total_recipients > 0 && (
              <div className="flex items-center gap-2 sm:gap-3">
                <span>{metrics.delivery_rate}% delivered</span>
                <span>{metrics.open_rate}% opened</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Campaign Details Panel
interface CampaignDetailsPanelProps {
  campaign: Campaign;
  onUpdate: (campaign: Campaign) => void;
  onDelete: (campaignId: string) => void;
  onStatusChange: (campaignId: string, status: Campaign["status"]) => void;
}

function CampaignDetailsPanel({
  campaign,
  onUpdate,
  onStatusChange,
}: CampaignDetailsPanelProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(campaign);
  const metrics = calculateMetrics(campaign);

  const handleSave = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(campaign);
    setIsEditing(false);
  };

  const getTemplate = (templateId: string) => {
    return mockTemplates.find((t) => t.template_id === templateId);
  };

  const getContactLists = (listIds: string[]) => {
    return mockContactLists.filter((list) => listIds.includes(list.list_id));
  };

  const getDomain = (domainId?: string) => {
    return mockDomains.find((d) => d.domain_id === domainId);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-3 md:p-6 border-b border-border">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <Input
                value={editData.name}
                onChange={(e) =>
                  setEditData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="text-lg md:text-xl font-bold mb-2"
              />
            ) : (
              <h1 className="text-xl md:text-2xl font-bold truncate pr-2">
                {campaign.name}
              </h1>
            )}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
              <Badge
                variant={CAMPAIGN_STATUS_CONFIG[campaign.status].variant}
                className={cn(
                  "capitalize w-fit",
                  CAMPAIGN_STATUS_CONFIG[campaign.status].color
                )}
              >
                {CAMPAIGN_STATUS_CONFIG[campaign.status].label}
              </Badge>
              <span className="text-sm text-muted-foreground">
                Created {formatDate(campaign.created_at)}
              </span>
            </div>
            {isEditing ? (
              <Textarea
                value={editData.description || ""}
                onChange={(e) =>
                  setEditData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Campaign description"
                rows={2}
              />
            ) : (
              campaign.description && (
                <p className="text-muted-foreground text-sm md:text-base">
                  {campaign.description}
                </p>
              )
            )}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {isEditing ? (
              <>
                <Button size="sm" onClick={handleSave}>
                  <RiCheckLine size={16} />
                  <span className="hidden sm:inline ml-1">Save</span>
                </Button>
                <Button size="sm" variant="outline" onClick={handleCancel}>
                  <span className="hidden sm:inline">Cancel</span>
                  <span className="sm:hidden">✕</span>
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                >
                  <RiEditLine size={16} />
                  <span className="hidden sm:inline ml-1">Edit</span>
                </Button>
                {campaign.status === "draft" || campaign.status === "paused" ? (
                  <Button
                    size="sm"
                    onClick={() =>
                      onStatusChange(campaign.campaign_id, "active")
                    }
                  >
                    <RiPlayLine size={16} />
                    <span className="hidden sm:inline ml-1">Start</span>
                  </Button>
                ) : campaign.status === "active" ? (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      onStatusChange(campaign.campaign_id, "paused")
                    }
                  >
                    <RiPauseLine size={16} />
                    <span className="hidden sm:inline ml-1">Pause</span>
                  </Button>
                ) : null}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <Tabs defaultValue="overview" className="h-full">
          <div className="px-3 md:px-6 py-3 md:py-4 border-b border-border">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview" className="text-xs md:text-sm">
                Overview
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-xs md:text-sm">
                Analytics
              </TabsTrigger>
              <TabsTrigger value="settings" className="text-xs md:text-sm">
                Settings
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent
            value="overview"
            className="p-3 md:p-6 space-y-4 md:space-y-6"
          >
            {/* Quick Stats */}
            {campaign.delivery_stats.total_recipients > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {metrics.delivery_rate}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Delivered
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {campaign.delivery_stats.delivered.toLocaleString()} /{" "}
                      {campaign.delivery_stats.total_recipients.toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {metrics.open_rate}%
                    </div>
                    <div className="text-sm text-muted-foreground">Opened</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {campaign.delivery_stats.opened.toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {metrics.click_rate}%
                    </div>
                    <div className="text-sm text-muted-foreground">Clicked</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {campaign.delivery_stats.clicked.toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {metrics.bounce_rate}%
                    </div>
                    <div className="text-sm text-muted-foreground">Failed</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {campaign.delivery_stats.failed.toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <RiBarChartLine
                    size={48}
                    className="mx-auto mb-4 text-muted-foreground/50"
                  />
                  <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                    No Analytics Yet
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    This campaign hasn't been sent yet. Start the campaign to
                    see analytics.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Campaign Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <RiMailLine size={20} />
                    Email Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Subject Line</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {campaign.subject || "No subject set"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">From</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {campaign.from_name} &lt;
                      {campaign.from_email || "Not set"}&gt;
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Template</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {getTemplate(campaign.template_id)?.name ||
                        "Unknown template"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Domain</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {getDomain(campaign.domain_id)?.domain ||
                        "Default domain"}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <RiGroupLine size={20} />
                    Recipients
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Contact Lists</Label>
                    <div className="mt-2 space-y-1">
                      {getContactLists(campaign.contact_list_ids).map(
                        (list) => (
                          <div
                            key={list.list_id}
                            className="flex items-center justify-between text-sm"
                          >
                            <span>{list.name}</span>
                            <span className="text-muted-foreground">
                              {list.active_contacts.toLocaleString()}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">
                      Total Recipients
                    </Label>
                    <span className="text-lg font-semibold">
                      {getContactLists(campaign.contact_list_ids)
                        .reduce((sum, list) => sum + list.active_contacts, 0)
                        .toLocaleString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Schedule Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RiCalendarLine size={20} />
                  Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                {campaign.scheduled_at ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Scheduled for</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(campaign.scheduled_at)}
                      </p>
                    </div>
                    <Badge variant="outline">
                      <RiTimeLine size={14} className="mr-1" />
                      Scheduled
                    </Badge>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground mb-2">
                      No schedule set - will send immediately when started
                    </p>
                    <Button size="sm" variant="outline">
                      <RiCalendarLine size={16} />
                      Schedule Campaign
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent
            value="analytics"
            className="p-3 md:p-6 space-y-4 md:space-y-6"
          >
            {campaign.delivery_stats.total_recipients > 0 ? (
              <>
                {/* Delivery Progress */}
                <Card>
                  <CardHeader>
                    <CardTitle>Delivery Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Delivered</span>
                        <span>
                          {campaign.delivery_stats.delivered} /{" "}
                          {campaign.delivery_stats.total_recipients}
                        </span>
                      </div>
                      <Progress value={metrics.delivery_rate} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Opened</span>
                        <span>
                          {campaign.delivery_stats.opened} /{" "}
                          {campaign.delivery_stats.delivered}
                        </span>
                      </div>
                      <Progress value={metrics.open_rate} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Clicked</span>
                        <span>
                          {campaign.delivery_stats.clicked} /{" "}
                          {campaign.delivery_stats.opened}
                        </span>
                      </div>
                      <Progress value={metrics.click_rate} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                {/* Detailed Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm">Delivery Rate</span>
                        <span className="font-semibold">
                          {metrics.delivery_rate}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Open Rate</span>
                        <span className="font-semibold">
                          {metrics.open_rate}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Click Rate</span>
                        <span className="font-semibold">
                          {metrics.click_rate}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Bounce Rate</span>
                        <span className="font-semibold">
                          {metrics.bounce_rate}%
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Engagement Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm">Total Recipients</span>
                        <span className="font-semibold">
                          {campaign.delivery_stats.total_recipients.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Successfully Delivered</span>
                        <span className="font-semibold">
                          {campaign.delivery_stats.delivered.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Unique Opens</span>
                        <span className="font-semibold">
                          {campaign.delivery_stats.opened.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Unique Clicks</span>
                        <span className="font-semibold">
                          {campaign.delivery_stats.clicked.toLocaleString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <RiBarChartLine
                    size={64}
                    className="mx-auto mb-4 text-muted-foreground/30"
                  />
                  <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                    No Analytics Available
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    This campaign hasn't been sent yet. Analytics will appear
                    here once the campaign is active.
                  </p>
                  {campaign.status === "draft" && (
                    <Button
                      onClick={() =>
                        onStatusChange(campaign.campaign_id, "active")
                      }
                    >
                      <RiSendPlaneLine size={16} />
                      Start Campaign
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent
            value="settings"
            className="p-3 md:p-6 space-y-4 md:space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="campaign-name">Campaign Name</Label>
                    <Input
                      id="campaign-name"
                      value={editData.name}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="campaign-description">Description</Label>
                    <Textarea
                      id="campaign-description"
                      value={editData.description || ""}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="campaign-subject">Email Subject</Label>
                    <Input
                      id="campaign-subject"
                      value={editData.subject || ""}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          subject: e.target.value,
                        }))
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sender Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="from-name">From Name</Label>
                    <Input
                      id="from-name"
                      value={editData.from_name || ""}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          from_name: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="from-email">From Email</Label>
                    <Input
                      id="from-email"
                      type="email"
                      value={editData.from_email || ""}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          from_email: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="domain">Sending Domain</Label>
                    <Select
                      value={editData.domain_id || mockDomains[0]?.domain_id}
                      onValueChange={(value) =>
                        setEditData((prev) => ({ ...prev, domain_id: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select domain" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockDomains.map((domain) => (
                          <SelectItem
                            key={domain.domain_id}
                            value={domain.domain_id}
                          >
                            <div className="flex items-center gap-2">
                              <RiGlobalLine size={16} />
                              {domain.domain}
                              {domain.is_default && (
                                <Badge variant="secondary" className="text-xs">
                                  Default
                                </Badge>
                              )}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleCancel}>
                Reset Changes
              </Button>
              <Button onClick={handleSave}>Save Settings</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Empty State Component
function EmptyState({ onCreateCampaign }: { onCreateCampaign: () => void }) {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center">
      <RiMailLine size={64} className="text-muted-foreground/50 mb-4" />
      <h3 className="text-xl font-semibold text-muted-foreground mb-2">
        Select a Campaign
      </h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        Choose a campaign from the list to view its details, analytics, and
        settings.
      </p>
      <Button onClick={onCreateCampaign}>
        <RiAddLine size={16} />
        Create New Campaign
      </Button>
    </div>
  );
}

// Inline Campaign Creation Component
interface InlineCampaignCreateProps {
  onSubmit: (data: CampaignCreateRequest) => void;
  onCancel: () => void;
}

function InlineCampaignCreate({
  onSubmit,
  onCancel,
}: InlineCampaignCreateProps) {
  const [formData, setFormData] = useState<Partial<CampaignCreateRequest>>({
    name: "",
    description: "",
    template_id: "",
    contact_list_ids: [],
    domain_id: mockDomains[0]?.domain_id,
    subject: "",
    from_name: "Whispley Team",
    from_email: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.template_id ||
      !formData.contact_list_ids?.length
    ) {
      return;
    }
    onSubmit(formData as CampaignCreateRequest);
  };

  const toggleContactList = (listId: string) => {
    setFormData((prev) => ({
      ...prev,
      contact_list_ids: prev.contact_list_ids?.includes(listId)
        ? prev.contact_list_ids.filter((id) => id !== listId)
        : [...(prev.contact_list_ids || []), listId],
    }));
  };

  return (
    <div className="h-full overflow-y-auto">
      <form
        onSubmit={handleSubmit}
        className="p-3 md:p-6 space-y-4 md:space-y-6"
      >
        <div className="border-b border-border pb-3 md:pb-4">
          <h2 className="text-lg md:text-xl font-semibold">
            Create New Campaign
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Fill in the details to create your email campaign
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Campaign Name</Label>
            <Input
              id="name"
              placeholder="Enter campaign name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Campaign description (optional)"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Email Subject</Label>
              <Input
                id="subject"
                placeholder="Enter email subject"
                value={formData.subject}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, subject: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="template">Email Template</Label>
              <Select
                value={formData.template_id}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, template_id: value }))
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  {mockTemplates.map((template) => (
                    <SelectItem
                      key={template.template_id}
                      value={template.template_id}
                    >
                      <div className="flex items-center gap-2">
                        <RiMailLine size={16} />
                        {template.name}
                        {template.is_default && (
                          <Badge variant="secondary" className="text-xs">
                            Default
                          </Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Contact Lists</Label>
            <div className="space-y-2 max-h-32 overflow-y-auto border rounded-md p-3">
              {mockContactLists.map((list) => (
                <div key={list.list_id} className="flex items-center space-x-2">
                  <Checkbox
                    id={list.list_id}
                    checked={formData.contact_list_ids?.includes(list.list_id)}
                    onCheckedChange={() => toggleContactList(list.list_id)}
                  />
                  <Label
                    htmlFor={list.list_id}
                    className="flex-1 cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <RiTeamLine size={16} />
                        {list.name}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {list.active_contacts.toLocaleString()}
                      </span>
                    </div>
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="from_name">From Name</Label>
              <Input
                id="from_name"
                placeholder="Sender name"
                value={formData.from_name}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    from_name: e.target.value,
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="from_email">From Email</Label>
              <Input
                id="from_email"
                type="email"
                placeholder="sender@domain.com"
                value={formData.from_email}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    from_email: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t border-border">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Create Campaign</Button>
        </div>
      </form>
    </div>
  );
}

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [filters, setFilters] = useState<CampaignFilters>({});
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null
  );
  const [isCreating, setIsCreating] = useState(false);
  const [showMobileDetail, setShowMobileDetail] = useState(false);

  const filteredCampaigns = useMemo(() => {
    let result = [...campaigns];

    if (filters.search) {
      const search = filters.search.toLowerCase();
      result = result.filter(
        (campaign) =>
          campaign.name.toLowerCase().includes(search) ||
          campaign.description?.toLowerCase().includes(search) ||
          campaign.subject?.toLowerCase().includes(search)
      );
    }

    if (filters.status?.length) {
      result = result.filter((campaign) =>
        filters.status?.includes(campaign.status)
      );
    }

    return result;
  }, [campaigns, filters]);

  const handleCreateCampaign = (data: CampaignCreateRequest) => {
    const newCampaign: Campaign = {
      description: "",
      campaign_id: Date.now().toString(),
      ...data,
      type: "email",
      status: "draft",
      created_at: new Date().toISOString(),
      delivery_stats: {
        total_recipients: 0,
        delivered: 0,
        opened: 0,
        clicked: 0,
        failed: 0,
      },
    };
    setCampaigns((prev) => [newCampaign, ...prev]);
    setSelectedCampaign(newCampaign);
    setIsCreating(false);
  };

  const handleUpdateCampaign = (updatedCampaign: Campaign) => {
    setCampaigns((prev) =>
      prev.map((campaign) =>
        campaign.campaign_id === updatedCampaign.campaign_id
          ? updatedCampaign
          : campaign
      )
    );
    setSelectedCampaign(updatedCampaign);
  };

  const handleDeleteCampaign = (campaignId: string) => {
    setCampaigns((prev) =>
      prev.filter((campaign) => campaign.campaign_id !== campaignId)
    );
    if (selectedCampaign?.campaign_id === campaignId) {
      setSelectedCampaign(null);
    }
  };

  const handleStatusChange = (
    campaignId: string,
    newStatus: Campaign["status"]
  ) => {
    setCampaigns((prev) =>
      prev.map((campaign) =>
        campaign.campaign_id === campaignId
          ? { ...campaign, status: newStatus }
          : campaign
      )
    );
    if (selectedCampaign?.campaign_id === campaignId) {
      setSelectedCampaign((prev) =>
        prev ? { ...prev, status: newStatus } : null
      );
    }
  };

  const handleCampaignSelect = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsCreating(false);
    setShowMobileDetail(true);
  };

  const handleBackToList = () => {
    setShowMobileDetail(false);
    setSelectedCampaign(null);
    setIsCreating(false);
  };

  return (
    <div className="flex h-full">
      {/* Left Sidebar - Campaign List */}
      <div
        className={cn(
          "flex flex-col border-r border-border bg-background",
          "w-full md:w-80",
          showMobileDetail && "hidden md:flex"
        )}
      >
        {/* Sidebar Header */}
        <div className="p-3 md:p-4 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-lg font-semibold">Campaigns</h1>
            <Button
              size="sm"
              onClick={() => {
                setIsCreating(true);
                setShowMobileDetail(true);
              }}
              disabled={isCreating}
            >
              <RiAddLine size={16} />
              <span className="hidden sm:inline ml-1">New</span>
            </Button>
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <RiSearchLine className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search campaigns..."
              value={filters.search || ""}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, search: e.target.value }))
              }
              className="pl-8"
            />
          </div>

          {/* Status Filter */}
          <Select
            value={filters.status?.[0] || "all"}
            onValueChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                status:
                  value === "all" ? undefined : [value as Campaign["status"]],
              }))
            }
          >
            <SelectTrigger className="w-full">
              <RiFilterLine size={16} />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                All Campaigns ({filteredCampaigns.length})
              </SelectItem>
              <SelectItem value="draft">
                Draft ({campaigns.filter((c) => c.status === "draft").length})
              </SelectItem>
              <SelectItem value="scheduled">
                Scheduled (
                {campaigns.filter((c) => c.status === "scheduled").length})
              </SelectItem>
              <SelectItem value="active">
                Active ({campaigns.filter((c) => c.status === "active").length})
              </SelectItem>
              <SelectItem value="paused">
                Paused ({campaigns.filter((c) => c.status === "paused").length})
              </SelectItem>
              <SelectItem value="completed">
                Completed (
                {campaigns.filter((c) => c.status === "completed").length})
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Campaign List */}
        <ScrollArea className="flex-1">
          {filteredCampaigns.length > 0 ? (
            <div>
              {filteredCampaigns.map((campaign) => (
                <CampaignListItem
                  key={campaign.campaign_id}
                  campaign={campaign}
                  isSelected={
                    selectedCampaign?.campaign_id === campaign.campaign_id
                  }
                  onClick={() => handleCampaignSelect(campaign)}
                />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <RiMailLine
                size={48}
                className="text-muted-foreground/50 mx-auto mb-4"
              />
              <h3 className="font-semibold text-muted-foreground mb-2">
                No campaigns found
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {filters.search || filters.status?.length
                  ? "Try adjusting your search or filter"
                  : "Create your first campaign to get started"}
              </p>
              {!filters.search && !filters.status?.length && (
                <Button
                  size="sm"
                  onClick={() => {
                    setIsCreating(true);
                    setShowMobileDetail(true);
                  }}
                >
                  <RiAddLine size={16} />
                  Create Campaign
                </Button>
              )}
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Right Panel - Campaign Details */}
      <div
        className={cn(
          "flex-1 flex flex-col bg-background",
          !showMobileDetail && "hidden md:flex"
        )}
      >
        {/* Mobile Header with Back Button */}
        <div className="md:hidden flex items-center gap-2 p-3 border-b border-border">
          <Button variant="ghost" size="sm" onClick={handleBackToList}>
            <RiArrowLeftLine size={16} />
          </Button>
          <span className="font-medium">
            {isCreating
              ? "Create Campaign"
              : selectedCampaign?.name || "Campaign Details"}
          </span>
        </div>

        {isCreating ? (
          <InlineCampaignCreate
            onSubmit={handleCreateCampaign}
            onCancel={() => {
              setIsCreating(false);
              setShowMobileDetail(false);
            }}
          />
        ) : selectedCampaign ? (
          <CampaignDetailsPanel
            campaign={selectedCampaign}
            onUpdate={handleUpdateCampaign}
            onDelete={handleDeleteCampaign}
            onStatusChange={handleStatusChange}
          />
        ) : (
          <EmptyState
            onCreateCampaign={() => {
              setIsCreating(true);
              setShowMobileDetail(true);
            }}
          />
        )}
      </div>
    </div>
  );
}
