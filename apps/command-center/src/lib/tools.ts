// ---------------------------------------------------------------------------
// Simonian Rug Cleaners — RevOps Tool Registry
// Deep-link URLs go to the EXACT page you need, not generic login screens.
// ---------------------------------------------------------------------------

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
  | "field_service"
  | "ads";

export interface DeepLink {
  label: string;
  url: string;
  description: string;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  loginUrl: string;
  deepLinks: DeepLink[];
  iconEmoji: string;
  color: string;
  status: ConnectionStatus;
  dataEndpoints?: string[];
}

export const TOOL_CATEGORIES: Record<
  ToolCategory,
  { label: string; description: string }
> = {
  crm: {
    label: "CRM & Sales",
    description: "Customer relationships, deals, and sales pipeline",
  },
  accounting: {
    label: "Accounting & Finance",
    description: "Invoicing, payments, and bookkeeping",
  },
  communications: {
    label: "Communications",
    description: "Phone, email, and messaging",
  },
  marketing: {
    label: "Marketing & Email",
    description: "Email campaigns, automation, and content",
  },
  ads: {
    label: "Ads & Paid Media",
    description: "Google Ads, Facebook Ads, and paid campaigns",
  },
  scheduling: {
    label: "Scheduling",
    description: "Appointments and job scheduling",
  },
  reviews: {
    label: "Reviews & Reputation",
    description: "Online reviews and reputation management",
  },
  analytics: {
    label: "Analytics & SEO",
    description: "Website traffic, search, and business analytics",
  },
  design: {
    label: "Design & Media",
    description: "Graphics, photos, and design tools",
  },
  documents: {
    label: "Documents & Storage",
    description: "Files, spreadsheets, and cloud storage",
  },
  field_service: {
    label: "Field Service & Ops",
    description: "Job management, routing, and field operations",
  },
};

// HubSpot portal constants
const HS_PORTAL = "39497563";
const HS_DOMAIN = "https://app-na2.hubspot.com";

export const TOOLS: Tool[] = [
  // ─── CRM ────────────────────────────────────────────────────────────────────
  {
    id: "hubspot",
    name: "HubSpot CRM",
    description:
      "24K contacts, 9.2K deals, 655 companies — your central customer database",
    category: "crm",
    loginUrl: `${HS_DOMAIN}/contacts/${HS_PORTAL}`,
    deepLinks: [
      {
        label: "All Contacts",
        url: `${HS_DOMAIN}/contacts/${HS_PORTAL}/objects/0-1`,
        description: "Full contact list (24,004)",
      },
      {
        label: "All Deals",
        url: `${HS_DOMAIN}/contacts/${HS_PORTAL}/objects/0-3`,
        description: "All deals board (9,201)",
      },
      {
        label: "Residential Sales Pipeline",
        url: `${HS_DOMAIN}/contacts/${HS_PORTAL}/objects/0-3/views/all/board`,
        description: "Residential deals board",
      },
      {
        label: "Rug Service Pipeline",
        url: `${HS_DOMAIN}/contacts/${HS_PORTAL}/objects/0-3/views/all/board`,
        description: "Service jobs tracking",
      },
      {
        label: "Companies",
        url: `${HS_DOMAIN}/contacts/${HS_PORTAL}/objects/0-2`,
        description: "All companies (655)",
      },
      {
        label: "Invoices",
        url: `${HS_DOMAIN}/contacts/${HS_PORTAL}/objects/0-53`,
        description: "All invoices (16)",
      },
      {
        label: "Reports Dashboard",
        url: `${HS_DOMAIN}/reports-dashboard/${HS_PORTAL}`,
        description: "HubSpot reporting",
      },
      {
        label: "Forms",
        url: `${HS_DOMAIN}/forms/${HS_PORTAL}`,
        description: "Lead capture forms",
      },
    ],
    iconEmoji: "🟠",
    color: "#ff7a59",
    status: "connected",
    dataEndpoints: [
      "contacts",
      "deals",
      "companies",
      "invoices",
      "pipelines",
      "forms",
    ],
  },

  // ─── ACCOUNTING ─────────────────────────────────────────────────────────────
  {
    id: "quickbooks",
    name: "QuickBooks Online",
    description: "Accounting, invoicing, and financial reports",
    category: "accounting",
    loginUrl: "https://app.qbo.intuit.com/app/homepage",
    deepLinks: [
      {
        label: "Dashboard",
        url: "https://app.qbo.intuit.com/app/homepage",
        description: "QBO home dashboard",
      },
      {
        label: "Invoices",
        url: "https://app.qbo.intuit.com/app/invoices",
        description: "All invoices",
      },
      {
        label: "Expenses",
        url: "https://app.qbo.intuit.com/app/expenses",
        description: "Expense tracking",
      },
      {
        label: "Profit & Loss",
        url: "https://app.qbo.intuit.com/app/reports/ProfitAndLoss",
        description: "P&L report",
      },
      {
        label: "Balance Sheet",
        url: "https://app.qbo.intuit.com/app/reports/BalanceSheet",
        description: "Balance sheet",
      },
      {
        label: "Customers",
        url: "https://app.qbo.intuit.com/app/customers",
        description: "Customer list",
      },
    ],
    iconEmoji: "💚",
    color: "#2ca01c",
    status: "not_connected",
    dataEndpoints: ["invoices", "payments", "expenses", "profit_loss", "balance_sheet"],
  },
  {
    id: "stripe",
    name: "Stripe",
    description: "Online payments and billing",
    category: "accounting",
    loginUrl: "https://dashboard.stripe.com",
    deepLinks: [
      {
        label: "Payments",
        url: "https://dashboard.stripe.com/payments",
        description: "All payments",
      },
      {
        label: "Customers",
        url: "https://dashboard.stripe.com/customers",
        description: "Stripe customers",
      },
      {
        label: "Payouts",
        url: "https://dashboard.stripe.com/payouts",
        description: "Bank payouts",
      },
      {
        label: "Revenue",
        url: "https://dashboard.stripe.com/reports/revenue",
        description: "Revenue reports",
      },
    ],
    iconEmoji: "💜",
    color: "#635bff",
    status: "not_connected",
    dataEndpoints: ["payments", "customers", "payouts", "revenue"],
  },
  {
    id: "square",
    name: "Square",
    description: "Point-of-sale and in-store payments",
    category: "accounting",
    loginUrl: "https://squareup.com/dashboard",
    deepLinks: [
      {
        label: "Dashboard",
        url: "https://squareup.com/dashboard",
        description: "Square dashboard",
      },
      {
        label: "Transactions",
        url: "https://squareup.com/dashboard/sales/transactions",
        description: "Transaction history",
      },
      {
        label: "Items",
        url: "https://squareup.com/dashboard/items/library",
        description: "Product catalog",
      },
    ],
    iconEmoji: "⬛",
    color: "#006aff",
    status: "not_connected",
    dataEndpoints: ["transactions", "customers", "items"],
  },

  // ─── COMMUNICATIONS ─────────────────────────────────────────────────────────
  {
    id: "gmail",
    name: "Gmail",
    description: "Business email for Simonian Rug Cleaners",
    category: "communications",
    loginUrl: "https://mail.google.com",
    deepLinks: [
      {
        label: "Inbox",
        url: "https://mail.google.com/mail/u/0/#inbox",
        description: "Email inbox",
      },
      {
        label: "Sent",
        url: "https://mail.google.com/mail/u/0/#sent",
        description: "Sent messages",
      },
      {
        label: "Drafts",
        url: "https://mail.google.com/mail/u/0/#drafts",
        description: "Draft emails",
      },
      {
        label: "Contacts",
        url: "https://contacts.google.com",
        description: "Google Contacts",
      },
    ],
    iconEmoji: "📧",
    color: "#ea4335",
    status: "not_connected",
  },
  {
    id: "google-voice",
    name: "Google Voice / Phone",
    description: "Business phone, calls, and voicemail",
    category: "communications",
    loginUrl: "https://voice.google.com",
    deepLinks: [
      {
        label: "Calls",
        url: "https://voice.google.com/u/0/calls",
        description: "Call history",
      },
      {
        label: "Messages",
        url: "https://voice.google.com/u/0/messages",
        description: "Text messages",
      },
      {
        label: "Voicemail",
        url: "https://voice.google.com/u/0/voicemail",
        description: "Voicemail inbox",
      },
    ],
    iconEmoji: "📞",
    color: "#34a853",
    status: "not_connected",
  },
  {
    id: "slack",
    name: "Slack",
    description: "Team messaging and channels",
    category: "communications",
    loginUrl: "https://app.slack.com",
    deepLinks: [
      {
        label: "Open Slack",
        url: "https://app.slack.com",
        description: "Slack workspace",
      },
    ],
    iconEmoji: "💬",
    color: "#4a154b",
    status: "not_connected",
  },

  // ─── MARKETING & EMAIL ──────────────────────────────────────────────────────
  {
    id: "hubspot-marketing",
    name: "HubSpot Marketing",
    description: "Email campaigns, landing pages, and automation",
    category: "marketing",
    loginUrl: `${HS_DOMAIN}/email/${HS_PORTAL}`,
    deepLinks: [
      {
        label: "Marketing Email",
        url: `${HS_DOMAIN}/email/${HS_PORTAL}`,
        description: "Email campaigns",
      },
      {
        label: "Landing Pages",
        url: `${HS_DOMAIN}/content/${HS_PORTAL}/landing-pages`,
        description: "Landing pages",
      },
      {
        label: "Workflows",
        url: `${HS_DOMAIN}/workflows/${HS_PORTAL}`,
        description: "Automation workflows",
      },
      {
        label: "Social",
        url: `${HS_DOMAIN}/social/${HS_PORTAL}`,
        description: "Social publishing",
      },
    ],
    iconEmoji: "📨",
    color: "#ff8f59",
    status: "connected",
  },
  {
    id: "mailchimp",
    name: "Mailchimp",
    description: "Email marketing and audience management",
    category: "marketing",
    loginUrl: "https://us1.admin.mailchimp.com",
    deepLinks: [
      {
        label: "Campaigns",
        url: "https://us1.admin.mailchimp.com/campaigns",
        description: "All campaigns",
      },
      {
        label: "Audience",
        url: "https://us1.admin.mailchimp.com/lists",
        description: "Audience lists",
      },
      {
        label: "Reports",
        url: "https://us1.admin.mailchimp.com/reports",
        description: "Campaign reports",
      },
    ],
    iconEmoji: "🐵",
    color: "#ffe01b",
    status: "not_connected",
    dataEndpoints: ["campaigns", "lists", "reports"],
  },

  // ─── ADS & PAID MEDIA ──────────────────────────────────────────────────────
  {
    id: "google-ads",
    name: "Google Ads",
    description: "Search, display, and local service ads",
    category: "ads",
    loginUrl: "https://ads.google.com",
    deepLinks: [
      {
        label: "Overview",
        url: "https://ads.google.com/aw/overview",
        description: "Campaign overview",
      },
      {
        label: "Campaigns",
        url: "https://ads.google.com/aw/campaigns",
        description: "All campaigns",
      },
      {
        label: "Keywords",
        url: "https://ads.google.com/aw/keywords",
        description: "Keyword performance",
      },
      {
        label: "Conversions",
        url: "https://ads.google.com/aw/conversions",
        description: "Conversion tracking",
      },
    ],
    iconEmoji: "📢",
    color: "#4285f4",
    status: "not_connected",
    dataEndpoints: ["campaigns", "ad_groups", "keywords", "conversions"],
  },
  {
    id: "facebook-ads",
    name: "Meta Ads (Facebook/Instagram)",
    description: "Facebook and Instagram advertising",
    category: "ads",
    loginUrl: "https://adsmanager.facebook.com",
    deepLinks: [
      {
        label: "Ads Manager",
        url: "https://adsmanager.facebook.com/adsmanager/manage/campaigns",
        description: "All campaigns",
      },
      {
        label: "Audiences",
        url: "https://adsmanager.facebook.com/adsmanager/audiences",
        description: "Custom audiences",
      },
      {
        label: "Business Suite",
        url: "https://business.facebook.com/latest/home",
        description: "Meta Business Suite home",
      },
      {
        label: "Insights",
        url: "https://business.facebook.com/latest/insights",
        description: "Page & ad insights",
      },
    ],
    iconEmoji: "📘",
    color: "#1877f2",
    status: "not_connected",
    dataEndpoints: ["campaigns", "ad_sets", "audiences", "page_insights"],
  },
  {
    id: "instagram",
    name: "Instagram Business",
    description: "Posts, stories, reels, and engagement",
    category: "ads",
    loginUrl: "https://www.instagram.com",
    deepLinks: [
      {
        label: "Profile",
        url: "https://www.instagram.com",
        description: "Instagram profile",
      },
      {
        label: "Insights",
        url: "https://business.facebook.com/latest/insights/instagram_content",
        description: "Content insights",
      },
    ],
    iconEmoji: "📸",
    color: "#e4405f",
    status: "not_connected",
  },
  {
    id: "nextdoor-ads",
    name: "Nextdoor",
    description: "Local neighborhood advertising and business page",
    category: "ads",
    loginUrl: "https://nextdoor.com/business-profile",
    deepLinks: [
      {
        label: "Business Page",
        url: "https://nextdoor.com/business-profile",
        description: "Your Nextdoor business page",
      },
      {
        label: "Local Deals",
        url: "https://business.nextdoor.com/local-deals",
        description: "Create local deals",
      },
    ],
    iconEmoji: "🏘️",
    color: "#8ed500",
    status: "not_connected",
  },

  // ─── SCHEDULING ─────────────────────────────────────────────────────────────
  {
    id: "google-calendar",
    name: "Google Calendar",
    description: "Appointments, pickups, and team schedule",
    category: "scheduling",
    loginUrl: "https://calendar.google.com",
    deepLinks: [
      {
        label: "Today",
        url: "https://calendar.google.com/calendar/r/day",
        description: "Today's schedule",
      },
      {
        label: "Week View",
        url: "https://calendar.google.com/calendar/r/week",
        description: "Weekly overview",
      },
      {
        label: "Month View",
        url: "https://calendar.google.com/calendar/r/month",
        description: "Monthly calendar",
      },
    ],
    iconEmoji: "📅",
    color: "#4285f4",
    status: "not_connected",
  },
  {
    id: "calendly",
    name: "Calendly",
    description: "Customer appointment booking",
    category: "scheduling",
    loginUrl: "https://calendly.com/app/scheduled_events/upcoming",
    deepLinks: [
      {
        label: "Upcoming Events",
        url: "https://calendly.com/app/scheduled_events/upcoming",
        description: "Upcoming bookings",
      },
      {
        label: "Event Types",
        url: "https://calendly.com/event_types/user/me",
        description: "Booking page setup",
      },
      {
        label: "Analytics",
        url: "https://calendly.com/app/insights",
        description: "Booking analytics",
      },
    ],
    iconEmoji: "🗓️",
    color: "#006bff",
    status: "not_connected",
  },

  // ─── REVIEWS ────────────────────────────────────────────────────────────────
  {
    id: "google-business",
    name: "Google Business Profile",
    description: "Google Maps listing, reviews, and local SEO",
    category: "reviews",
    loginUrl: "https://business.google.com",
    deepLinks: [
      {
        label: "Dashboard",
        url: "https://business.google.com",
        description: "GBP dashboard",
      },
      {
        label: "Reviews",
        url: "https://business.google.com/reviews",
        description: "Customer reviews",
      },
      {
        label: "Performance",
        url: "https://business.google.com/performance",
        description: "Search & Maps performance",
      },
      {
        label: "Messages",
        url: "https://business.google.com/messages",
        description: "Customer messages",
      },
      {
        label: "Edit Profile",
        url: "https://business.google.com/edit",
        description: "Update business info",
      },
    ],
    iconEmoji: "⭐",
    color: "#4285f4",
    status: "not_connected",
    dataEndpoints: ["reviews", "performance", "messages"],
  },
  {
    id: "yelp",
    name: "Yelp for Business",
    description: "Yelp listing, reviews, and leads",
    category: "reviews",
    loginUrl: "https://biz.yelp.com",
    deepLinks: [
      {
        label: "Dashboard",
        url: "https://biz.yelp.com",
        description: "Yelp business dashboard",
      },
      {
        label: "Reviews",
        url: "https://biz.yelp.com/reviews",
        description: "Customer reviews",
      },
      {
        label: "Leads",
        url: "https://biz.yelp.com/leads",
        description: "Yelp request-a-quote leads",
      },
      {
        label: "Ads",
        url: "https://biz.yelp.com/ads",
        description: "Yelp advertising",
      },
    ],
    iconEmoji: "🔴",
    color: "#d32323",
    status: "not_connected",
    dataEndpoints: ["reviews", "leads", "messages"],
  },

  // ─── ANALYTICS ──────────────────────────────────────────────────────────────
  {
    id: "google-analytics",
    name: "Google Analytics",
    description: "Website traffic, conversions, and user behavior",
    category: "analytics",
    loginUrl: "https://analytics.google.com",
    deepLinks: [
      {
        label: "Realtime",
        url: "https://analytics.google.com/analytics/web/#/realtime",
        description: "Live visitors on site",
      },
      {
        label: "Acquisition",
        url: "https://analytics.google.com/analytics/web/#/report/acquisition-overview",
        description: "Traffic sources",
      },
      {
        label: "Pages",
        url: "https://analytics.google.com/analytics/web/#/report/content-pages",
        description: "Top pages",
      },
      {
        label: "Conversions",
        url: "https://analytics.google.com/analytics/web/#/report/conversions-goals-overview",
        description: "Goal conversions",
      },
    ],
    iconEmoji: "📊",
    color: "#e37400",
    status: "not_connected",
    dataEndpoints: ["pageviews", "sessions", "conversions", "traffic_sources"],
  },
  {
    id: "google-search-console",
    name: "Google Search Console",
    description: "SEO performance and search visibility",
    category: "analytics",
    loginUrl: "https://search.google.com/search-console",
    deepLinks: [
      {
        label: "Performance",
        url: "https://search.google.com/search-console/performance",
        description: "Search performance",
      },
      {
        label: "Pages",
        url: "https://search.google.com/search-console/index",
        description: "Page indexing status",
      },
      {
        label: "Experience",
        url: "https://search.google.com/search-console/core-web-vitals",
        description: "Core Web Vitals",
      },
    ],
    iconEmoji: "🔍",
    color: "#4285f4",
    status: "not_connected",
    dataEndpoints: ["queries", "pages", "impressions", "clicks"],
  },

  // ─── DESIGN & MEDIA ────────────────────────────────────────────────────────
  {
    id: "canva",
    name: "Canva",
    description: "Marketing graphics, social posts, and print materials",
    category: "design",
    loginUrl: "https://www.canva.com",
    deepLinks: [
      {
        label: "Home",
        url: "https://www.canva.com",
        description: "Canva home",
      },
      {
        label: "Brand Kit",
        url: "https://www.canva.com/brand",
        description: "Brand colors, logos, fonts",
      },
      {
        label: "All Designs",
        url: "https://www.canva.com/folder/all-designs",
        description: "All your designs",
      },
    ],
    iconEmoji: "🎨",
    color: "#00c4cc",
    status: "connected",
  },

  // ─── DOCUMENTS ──────────────────────────────────────────────────────────────
  {
    id: "google-drive",
    name: "Google Drive",
    description: "Files, documents, and cloud storage",
    category: "documents",
    loginUrl: "https://drive.google.com",
    deepLinks: [
      {
        label: "My Drive",
        url: "https://drive.google.com/drive/my-drive",
        description: "Personal files",
      },
      {
        label: "Shared Drives",
        url: "https://drive.google.com/drive/shared-drives",
        description: "Team shared drives",
      },
      {
        label: "Recent",
        url: "https://drive.google.com/drive/recent",
        description: "Recently accessed",
      },
    ],
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
    deepLinks: [
      {
        label: "All Sheets",
        url: "https://docs.google.com/spreadsheets",
        description: "All spreadsheets",
      },
    ],
    iconEmoji: "📗",
    color: "#0f9d58",
    status: "not_connected",
  },

  // ─── FIELD SERVICE ──────────────────────────────────────────────────────────
  {
    id: "jobber",
    name: "Jobber",
    description: "Job scheduling, quoting, invoicing, and dispatch",
    category: "field_service",
    loginUrl: "https://secure.getjobber.com/dashboard",
    deepLinks: [
      {
        label: "Dashboard",
        url: "https://secure.getjobber.com/dashboard",
        description: "Jobber dashboard",
      },
      {
        label: "Schedule",
        url: "https://secure.getjobber.com/calendar",
        description: "Job calendar",
      },
      {
        label: "Clients",
        url: "https://secure.getjobber.com/clients",
        description: "Client list",
      },
      {
        label: "Invoices",
        url: "https://secure.getjobber.com/invoices",
        description: "All invoices",
      },
      {
        label: "Quotes",
        url: "https://secure.getjobber.com/quotes",
        description: "All quotes",
      },
    ],
    iconEmoji: "🔧",
    color: "#7ac143",
    status: "not_connected",
    dataEndpoints: ["jobs", "clients", "invoices", "quotes"],
  },
  {
    id: "servicetitan",
    name: "ServiceTitan",
    description: "Field service management and dispatching",
    category: "field_service",
    loginUrl: "https://go.servicetitan.com",
    deepLinks: [
      {
        label: "Dashboard",
        url: "https://go.servicetitan.com/dashboard",
        description: "ST dashboard",
      },
      {
        label: "Dispatch",
        url: "https://go.servicetitan.com/dispatch",
        description: "Dispatch board",
      },
      {
        label: "Customers",
        url: "https://go.servicetitan.com/customers",
        description: "Customer records",
      },
    ],
    iconEmoji: "⚙️",
    color: "#00263e",
    status: "not_connected",
    dataEndpoints: ["jobs", "customers", "dispatching"],
  },
];
