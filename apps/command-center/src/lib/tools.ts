export type ConnectionStatus = "connected" | "not_connected" | "needs_reauth";

export type ToolCategory =
  | "crm"
  | "accounting"
  | "communications"
  | "marketing"
  | "scheduling"
  | "reviews"
  | "analytics"
  | "design"
  | "documents"
  | "field_service";

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  loginUrl: string;
  iconEmoji: string;
  color: string;
  status: ConnectionStatus;
  dataEndpoints?: string[];
}

export const TOOL_CATEGORIES: Record<ToolCategory, { label: string; description: string }> = {
  crm: { label: "CRM & Sales", description: "Customer relationships and sales pipeline" },
  accounting: { label: "Accounting & Finance", description: "Invoicing, payments, and bookkeeping" },
  communications: { label: "Communications", description: "Phone, email, and messaging" },
  marketing: { label: "Marketing & Social", description: "Social media and advertising" },
  scheduling: { label: "Scheduling", description: "Appointments and job scheduling" },
  reviews: { label: "Reviews & Reputation", description: "Online reviews and reputation management" },
  analytics: { label: "Analytics", description: "Website and business analytics" },
  design: { label: "Design & Media", description: "Graphics, photos, and design tools" },
  documents: { label: "Documents & Storage", description: "Files, documents, and cloud storage" },
  field_service: { label: "Field Service", description: "Job management and field operations" },
};

export const TOOLS: Tool[] = [
  // CRM
  {
    id: "hubspot",
    name: "HubSpot",
    description: "CRM, contacts, deals, and marketing automation",
    category: "crm",
    loginUrl: "https://app.hubspot.com/login",
    iconEmoji: "🟠",
    color: "#ff7a59",
    status: "not_connected",
    dataEndpoints: ["contacts", "deals", "companies", "tickets"],
  },

  // Accounting
  {
    id: "quickbooks",
    name: "QuickBooks Online",
    description: "Accounting, invoicing, and financial reports",
    category: "accounting",
    loginUrl: "https://accounts.intuit.com/app/sign-in?app_group=QBO",
    iconEmoji: "💚",
    color: "#2ca01c",
    status: "not_connected",
    dataEndpoints: ["invoices", "payments", "expenses", "profit_loss"],
  },
  {
    id: "stripe",
    name: "Stripe",
    description: "Online payments and billing",
    category: "accounting",
    loginUrl: "https://dashboard.stripe.com/login",
    iconEmoji: "💜",
    color: "#635bff",
    status: "not_connected",
    dataEndpoints: ["payments", "customers", "subscriptions"],
  },
  {
    id: "square",
    name: "Square",
    description: "Point-of-sale and payment processing",
    category: "accounting",
    loginUrl: "https://squareup.com/login",
    iconEmoji: "⬛",
    color: "#006aff",
    status: "not_connected",
    dataEndpoints: ["transactions", "customers", "inventory"],
  },

  // Communications
  {
    id: "gmail",
    name: "Gmail",
    description: "Business email",
    category: "communications",
    loginUrl: "https://mail.google.com",
    iconEmoji: "📧",
    color: "#ea4335",
    status: "not_connected",
  },
  {
    id: "google-voice",
    name: "Google Voice / Phone",
    description: "Business phone and voicemail",
    category: "communications",
    loginUrl: "https://voice.google.com",
    iconEmoji: "📞",
    color: "#34a853",
    status: "not_connected",
  },
  {
    id: "slack",
    name: "Slack",
    description: "Team messaging and channels",
    category: "communications",
    loginUrl: "https://slack.com/signin",
    iconEmoji: "💬",
    color: "#4a154b",
    status: "not_connected",
  },

  // Marketing & Social
  {
    id: "facebook",
    name: "Facebook Business",
    description: "Business page, ads, and Messenger",
    category: "marketing",
    loginUrl: "https://business.facebook.com",
    iconEmoji: "📘",
    color: "#1877f2",
    status: "not_connected",
  },
  {
    id: "instagram",
    name: "Instagram Business",
    description: "Posts, stories, and engagement",
    category: "marketing",
    loginUrl: "https://www.instagram.com/accounts/login/",
    iconEmoji: "📸",
    color: "#e4405f",
    status: "not_connected",
  },
  {
    id: "google-ads",
    name: "Google Ads",
    description: "Search and display advertising",
    category: "marketing",
    loginUrl: "https://ads.google.com",
    iconEmoji: "📢",
    color: "#4285f4",
    status: "not_connected",
    dataEndpoints: ["campaigns", "ad_groups", "performance"],
  },
  {
    id: "mailchimp",
    name: "Mailchimp",
    description: "Email marketing and campaigns",
    category: "marketing",
    loginUrl: "https://login.mailchimp.com",
    iconEmoji: "🐵",
    color: "#ffe01b",
    status: "not_connected",
    dataEndpoints: ["campaigns", "lists", "reports"],
  },

  // Scheduling
  {
    id: "google-calendar",
    name: "Google Calendar",
    description: "Appointments and scheduling",
    category: "scheduling",
    loginUrl: "https://calendar.google.com",
    iconEmoji: "📅",
    color: "#4285f4",
    status: "not_connected",
  },
  {
    id: "calendly",
    name: "Calendly",
    description: "Customer appointment booking",
    category: "scheduling",
    loginUrl: "https://calendly.com/login",
    iconEmoji: "🗓️",
    color: "#006bff",
    status: "not_connected",
  },

  // Reviews
  {
    id: "google-business",
    name: "Google Business Profile",
    description: "Google Maps listing and reviews",
    category: "reviews",
    loginUrl: "https://business.google.com",
    iconEmoji: "⭐",
    color: "#4285f4",
    status: "not_connected",
    dataEndpoints: ["reviews", "insights", "posts"],
  },
  {
    id: "yelp",
    name: "Yelp for Business",
    description: "Yelp listing and reviews",
    category: "reviews",
    loginUrl: "https://biz.yelp.com/login",
    iconEmoji: "🔴",
    color: "#d32323",
    status: "not_connected",
    dataEndpoints: ["reviews", "messages"],
  },

  // Analytics
  {
    id: "google-analytics",
    name: "Google Analytics",
    description: "Website traffic and behavior analytics",
    category: "analytics",
    loginUrl: "https://analytics.google.com",
    iconEmoji: "📊",
    color: "#e37400",
    status: "not_connected",
    dataEndpoints: ["pageviews", "sessions", "conversions"],
  },
  {
    id: "google-search-console",
    name: "Google Search Console",
    description: "SEO performance and search visibility",
    category: "analytics",
    loginUrl: "https://search.google.com/search-console",
    iconEmoji: "🔍",
    color: "#4285f4",
    status: "not_connected",
    dataEndpoints: ["queries", "pages", "impressions"],
  },

  // Design
  {
    id: "canva",
    name: "Canva",
    description: "Marketing graphics and design",
    category: "design",
    loginUrl: "https://www.canva.com/login",
    iconEmoji: "🎨",
    color: "#00c4cc",
    status: "not_connected",
  },

  // Documents & Storage
  {
    id: "google-drive",
    name: "Google Drive",
    description: "Files, docs, and cloud storage",
    category: "documents",
    loginUrl: "https://drive.google.com",
    iconEmoji: "📁",
    color: "#0066da",
    status: "not_connected",
  },
  {
    id: "google-sheets",
    name: "Google Sheets",
    description: "Spreadsheets and data tracking",
    category: "documents",
    loginUrl: "https://sheets.google.com",
    iconEmoji: "📗",
    color: "#0f9d58",
    status: "not_connected",
  },

  // Field Service
  {
    id: "jobber",
    name: "Jobber",
    description: "Job scheduling, quoting, and invoicing for field service",
    category: "field_service",
    loginUrl: "https://secure.getjobber.com/session/new",
    iconEmoji: "🔧",
    color: "#7ac143",
    status: "not_connected",
    dataEndpoints: ["jobs", "clients", "invoices", "quotes"],
  },
  {
    id: "servicetitan",
    name: "ServiceTitan",
    description: "Field service management platform",
    category: "field_service",
    loginUrl: "https://go.servicetitan.com",
    iconEmoji: "⚙️",
    color: "#00263e",
    status: "not_connected",
    dataEndpoints: ["jobs", "customers", "dispatching"],
  },
];
