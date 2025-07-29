import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { StatsGrid } from "@/components/common/stats-grid";
import {
  RiAddLine,
  RiEditLine,
  RiDeleteBinLine,
  RiEyeLine,
  RiCropLine,
  RiSaveLine,
  RiSendPlaneLine,
  RiCodeLine,
  RiPaletteLine,
  RiSearchLine,
  RiMore2Line,
} from "@remixicon/react";
import type {
  Template,
  CreateTemplateRequest,
  TemplateStats,
} from "@/types/templates";

// Mock data for development
const mockTemplates: Template[] = [
  {
    template_id: "1",
    name: "Welcome Email",
    description: "Welcome new subscribers with a friendly greeting",
    subject: "Welcome to Whispley!",
    content: "Welcome to our platform! We're excited to have you on board.",
    template_type: "email",
    status: "active",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
    created_by: "user1",
    tags: ["welcome", "onboarding"],
    variables: ["{{firstName}}", "{{companyName}}"],
  },
  {
    template_id: "2",
    name: "Product Launch",
    description: "Announce new product features",
    subject: "Exciting New Features Are Here!",
    content: "Check out our latest product updates and features.",
    template_type: "email",
    status: "draft",
    created_at: "2024-01-10T14:30:00Z",
    updated_at: "2024-01-12T09:15:00Z",
    created_by: "user2",
    tags: ["product", "announcement"],
    variables: ["{{productName}}", "{{releaseDate}}"],
  },
];

const mockStats: TemplateStats = {
  total_templates: 12,
  active_templates: 8,
  draft_templates: 3,
  email_templates: 10,
  sms_templates: 2,
  push_templates: 0,
};

interface EditorProps {
  template: Template | null;
  onSave: (template: CreateTemplateRequest) => void;
  onCancel: () => void;
}

function TemplateEditor({ template, onSave, onCancel }: EditorProps) {
  const [formData, setFormData] = useState<CreateTemplateRequest>({
    name: template?.name || "",
    description: template?.description || "",
    subject: template?.subject || "",
    content: template?.content || "",
    template_type: template?.template_type || "email",
    status: template?.status || "draft",
    tags: template?.tags || [],
  });

  const [currentTag, setCurrentTag] = useState("");
  const [activeTab, setActiveTab] = useState("content");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags?.includes(currentTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...(prev.tags || []), currentTag.trim()],
      }));
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags?.filter((tag) => tag !== tagToRemove) || [],
    }));
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <h2 className="text-xl font-semibold">
            {template ? "Edit Template" : "Create New Template"}
          </h2>
          <p className="text-sm text-muted-foreground">
            Design and customize your email template
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="gap-2">
            <RiSaveLine size={16} />
            {template ? "Update" : "Create"} Template
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="h-full flex flex-col"
        >
          <div className="px-6 pt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content" className="gap-2">
                <RiEditLine size={16} />
                Content
              </TabsTrigger>
              <TabsTrigger value="design" className="gap-2">
                <RiPaletteLine size={16} />
                Design
              </TabsTrigger>
              <TabsTrigger value="preview" className="gap-2">
                <RiEyeLine size={16} />
                Preview
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 px-6 pb-6">
            <TabsContent value="content" className="mt-4 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Template Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      placeholder="Enter template name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Describe this template"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="type">Type</Label>
                      <Select
                        value={formData.template_type}
                        onValueChange={(value: any) =>
                          setFormData((prev) => ({
                            ...prev,
                            template_type: value,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="sms">SMS</SelectItem>
                          <SelectItem value="push">
                            Push Notification
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value: any) =>
                          setFormData((prev) => ({ ...prev, status: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject Line</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          subject: e.target.value,
                        }))
                      }
                      placeholder="Enter email subject"
                    />
                  </div>

                  <div>
                    <Label>Tags</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        placeholder="Add tag"
                        onKeyPress={(e) =>
                          e.key === "Enter" && (e.preventDefault(), addTag())
                        }
                        className="flex-1"
                      />
                      <Button type="button" onClick={addTag} size="sm">
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.tags?.map((tag) => (
                        <Badge key={tag} variant="secondary" className="gap-1">
                          {tag}
                          <button
                            onClick={() => removeTag(tag)}
                            className="hover:text-destructive"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        content: e.target.value,
                      }))
                    }
                    placeholder="Enter your template content..."
                    className="min-h-[400px] font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Use variables like {"{{firstName}}"} and {"{{companyName}}"}{" "}
                    for personalization
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="design" className="mt-4">
              <div className="text-center py-12 text-muted-foreground">
                <RiPaletteLine size={48} className="mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">
                  Visual Design Editor
                </h3>
                <p>Advanced design tools coming soon</p>
              </div>
            </TabsContent>

            <TabsContent value="preview" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    {formData.subject || "Subject Preview"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    {formData.content || "Content preview will appear here..."}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

export default function Templates() {
  const [templates, setTemplates] = useState<Template[]>(mockTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || template.status === statusFilter;
    const matchesType =
      typeFilter === "all" || template.template_type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const handleCreateTemplate = () => {
    setSelectedTemplate(null);
    setIsEditorOpen(true);
  };

  const handleEditTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setIsEditorOpen(true);
  };

  const handleSaveTemplate = (templateData: CreateTemplateRequest) => {
    if (selectedTemplate) {
      // Update existing template
      setTemplates((prev) =>
        prev.map((t) =>
          t.template_id === selectedTemplate.template_id
            ? { ...t, ...templateData, updated_at: new Date().toISOString() }
            : t
        )
      );
    } else {
      // Create new template
      const newTemplate: Template = {
        ...templateData,
        template_id: Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: "current_user",
        variables: [],
        status: "draft",
      };
      setTemplates((prev) => [newTemplate, ...prev]);
    }
    setIsEditorOpen(false);
  };

  const handleDeleteTemplate = (templateId: string) => {
    setTemplates((prev) => prev.filter((t) => t.template_id !== templateId));
  };

  const handleDuplicateTemplate = (template: Template) => {
    const duplicatedTemplate: Template = {
      ...template,
      template_id: Math.random().toString(36).substr(2, 9),
      name: `${template.name} (Copy)`,
      status: "draft",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setTemplates((prev) => [duplicatedTemplate, ...prev]);
  };

  if (isEditorOpen) {
    return (
      <TemplateEditor
        template={selectedTemplate}
        onSave={handleSaveTemplate}
        onCancel={() => setIsEditorOpen(false)}
      />
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 lg:gap-6 py-4 lg:py-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Email Templates</h1>
          <p className="text-sm text-muted-foreground">
            Create and manage your email templates for campaigns
          </p>
        </div>
        <Button onClick={handleCreateTemplate} className="gap-2">
          <RiAddLine size={16} />
          Create Template
        </Button>
      </div>

      {/* Stats Grid */}
      <StatsGrid
        stats={[
          {
            title: "Total Templates",
            value: mockStats.total_templates.toString(),
            change: {
              value: "+8%",
              trend: "up",
            },
            icon: <RiCodeLine size={20} />,
          },
          {
            title: "Active Templates",
            value: mockStats.active_templates.toString(),
            change: {
              value: "+12%",
              trend: "up",
            },
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                fill="currentColor"
              >
                <path d="M10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0Zm3.707 7.293-4.086 4.086a1 1 0 0 1-1.414-1.414l4.793-4.793a1 1 0 0 1 1.414 1.414L13.707 7.293Z" />
              </svg>
            ),
          },
          {
            title: "Draft Templates",
            value: mockStats.draft_templates.toString(),
            change: {
              value: "-3%",
              trend: "down",
            },
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                fill="currentColor"
              >
                <path d="M8 2v2h8v8h2V2H8ZM6 4H2v16h16V6h-4V4H6Zm2 2v12h12V8H8Z" />
              </svg>
            ),
          },
          {
            title: "Email Templates",
            value: mockStats.email_templates.toString(),
            change: {
              value: "+15%",
              trend: "up",
            },
            icon: <RiSendPlaneLine size={20} />,
          },
        ]}
      />

      {/* Filters and Search */}
      <div className="w-full flex items-center gap-4">
        <div className="relative flex-1 w-full">
          <RiSearchLine
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            size={16}
          />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="sms">SMS</SelectItem>
            <SelectItem value="push">Push</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Templates Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map((template) => (
          <Card
            key={template.template_id}
            className="group hover:shadow-md transition-shadow"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-base line-clamp-1">
                    {template.name}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 mt-1">
                    {template.description}
                  </CardDescription>
                </div>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <RiMore2Line size={16} />
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Template Actions</SheetTitle>
                      <SheetDescription>
                        Choose an action for "{template.name}"
                      </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-2 py-4">
                      <Button
                        variant="ghost"
                        onClick={() => handleEditTemplate(template)}
                        className="justify-start gap-2"
                      >
                        <RiEditLine size={16} />
                        Edit Template
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => handleDuplicateTemplate(template)}
                        className="justify-start gap-2"
                      >
                        <RiCropLine size={16} />
                        Duplicate
                      </Button>
                      <Separator />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            className="justify-start gap-2 text-destructive hover:text-destructive"
                          >
                            <RiDeleteBinLine size={16} />
                            Delete Template
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Template</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{template.name}"?
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                handleDeleteTemplate(template.template_id)
                              }
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Badge
                  variant={
                    template.status === "active"
                      ? "default"
                      : template.status === "draft"
                      ? "secondary"
                      : "outline"
                  }
                  className="capitalize"
                >
                  {template.status}
                </Badge>
                <Badge variant="outline" className="capitalize">
                  {template.template_type}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <p className="text-sm font-medium">"{template.subject}"</p>
                <p className="text-xs text-muted-foreground line-clamp-3">
                  {template.content}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {template.tags?.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {template.tags && template.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{template.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t">
                <p className="text-xs text-muted-foreground">
                  {new Date(template.created_at).toLocaleDateString()}
                </p>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditTemplate(template)}
                    className="h-8 w-8 p-0"
                  >
                    <RiEditLine size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDuplicateTemplate(template)}
                    className="h-8 w-8 p-0"
                  >
                    <RiCropLine size={14} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <RiCodeLine
            size={48}
            className="mx-auto mb-4 text-muted-foreground"
          />
          <h3 className="text-lg font-medium mb-2">No templates found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery || statusFilter !== "all" || typeFilter !== "all"
              ? "Try adjusting your filters or search terms"
              : "Get started by creating your first template"}
          </p>
          {!searchQuery && statusFilter === "all" && typeFilter === "all" && (
            <Button onClick={handleCreateTemplate} className="gap-2">
              <RiAddLine size={16} />
              Create Your First Template
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
