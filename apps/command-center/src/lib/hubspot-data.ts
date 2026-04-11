// ---------------------------------------------------------------------------
// HubSpot Live Data Snapshot — pulled 2026-04-11
// This is seeded from live MCP data. In production, this would be fetched
// from API routes that call HubSpot's API in real-time.
// ---------------------------------------------------------------------------

export const HS_PORTAL = "39497563";
export const HS_DOMAIN = "https://app-na2.hubspot.com";

export function hsRecordUrl(objectTypeId: string, recordId: string | number) {
  return `${HS_DOMAIN}/contacts/${HS_PORTAL}/record/${objectTypeId}/${recordId}`;
}

export function hsObjectListUrl(objectTypeId: string) {
  return `${HS_DOMAIN}/contacts/${HS_PORTAL}/objects/${objectTypeId}`;
}

// ─── Summary Counts ───────────────────────────────────────────────────────────
export const HUBSPOT_SUMMARY = {
  contacts: { total: 24004, label: "Contacts" },
  deals: { total: 9201, label: "Deals" },
  companies: { total: 655, label: "Companies" },
  invoices: { total: 16, label: "Invoices" },
  tickets: { total: 0, label: "Tickets" },
};

// ─── Pipelines ────────────────────────────────────────────────────────────────
export interface Pipeline {
  id: string;
  name: string;
  stages: { id: string; label: string }[];
}

export const PIPELINES: Pipeline[] = [
  {
    id: "39495447",
    name: "Residential Sales Pipeline",
    stages: [
      { id: "93739425", label: "Rug Form Submitted" },
      { id: "83626253", label: "Estimate Emailed" },
      { id: "83990409", label: "Final Negotiation" },
      { id: "83626252", label: "Scheduled Pickup / Walk-in" },
      { id: "83626254", label: "Closed Won" },
      { id: "83626255", label: "Closed Lost" },
    ],
  },
  {
    id: "39494468",
    name: "Rug Service Pipeline",
    stages: [
      { id: "83639101", label: "Service Started" },
      { id: "83639102", label: "Dusting Area" },
      { id: "83639103", label: "Washing Area" },
      { id: "83639104", label: "Detail Area" },
      { id: "85826197", label: "Rug Repair" },
      { id: "85826198", label: "Rug Storage" },
      { id: "85826200", label: "Customer Accepts" },
      { id: "85826199", label: "Redo's" },
      { id: "85826201", label: "Paid in Full" },
    ],
  },
  {
    id: "756928677",
    name: "Designer Pipeline",
    stages: [
      { id: "1101261081", label: "Incoming Project" },
      { id: "1101261082", label: "Estimate Emailed" },
      { id: "1101261083", label: "Projects Approved" },
      { id: "1101261084", label: "In Transit" },
      { id: "1101261085", label: "We Received" },
      { id: "1101146456", label: "Inspection Complete" },
      { id: "1101146457", label: "In Service" },
      { id: "1101146458", label: "Services Complete" },
      { id: "1101146459", label: "Delivered / Picked Up" },
      { id: "1101261086", label: "Closed Won" },
      { id: "1101261087", label: "Closed Lost" },
    ],
  },
  {
    id: "46696458",
    name: "Luxury Apartments (Service)",
    stages: [
      { id: "96360454", label: "Incoming Lead" },
      { id: "1001918054", label: "Booked Estimates" },
      { id: "1001918055", label: "Pending Approval" },
      { id: "1002535809", label: "Pick Up Scheduled" },
      { id: "96360459", label: "Closed Won" },
      { id: "96360460", label: "Closed Lost" },
    ],
  },
  {
    id: "683669635",
    name: "Property Managers (Service)",
    stages: [
      { id: "1001921574", label: "New Leads" },
      { id: "1001921576", label: "Presentation Scheduled" },
      { id: "1001921575", label: "Accepted to Review" },
      { id: "1001921577", label: "Scheduled Estimates" },
      { id: "1001921578", label: "Quotes Sent" },
      { id: "1001921603", label: "Pending" },
      { id: "1003401095", label: "Pick Up Scheduled" },
      { id: "1001921579", label: "Closed Won" },
      { id: "1001921580", label: "Closed Lost" },
    ],
  },
  {
    id: "default",
    name: "Woolle Sales",
    stages: [
      { id: "appointmentscheduled", label: "New Lead" },
      { id: "qualifiedtobuy", label: "Emailed Product Info" },
      { id: "presentationscheduled", label: "New Orders" },
      { id: "decisionmakerboughtin", label: "Purchase Order Complete" },
      { id: "contractsent", label: "Ready to Ship" },
      { id: "1001662108", label: "Order Shipped" },
      { id: "closedwon", label: "Closed Won" },
      { id: "closedlost", label: "Closed Lost" },
    ],
  },
  {
    id: "1295397567",
    name: "Simonian Rug Marketplace",
    stages: [
      { id: "2084864708", label: "Form Submitted" },
    ],
  },
  {
    id: "1534966458",
    name: "New Rug Pipeline",
    stages: [],
  },
];

// ─── Recent Deals ─────────────────────────────────────────────────────────────
export interface RecentDeal {
  id: string;
  name: string;
  amount: number | null;
  stage: string;
  pipelineId: string;
  closeDate: string;
  url: string;
}

export const RECENT_DEALS: RecentDeal[] = [
  {
    id: "320544706235",
    name: "1 Rugs 4/10/26 walk in Elena Canova",
    amount: null,
    stage: "83639101",
    pipelineId: "39494468",
    closeDate: "2026-04-15",
    url: `${HS_DOMAIN}/contacts/${HS_PORTAL}/record/0-3/320544706235`,
  },
  {
    id: "320346381019",
    name: "PU 4/13/26 ELENA CANOVA",
    amount: 10.5,
    stage: "83626252",
    pipelineId: "39495447",
    closeDate: "2026-04-30",
    url: `${HS_DOMAIN}/contacts/${HS_PORTAL}/record/0-3/320346381019`,
  },
  {
    id: "320346378970",
    name: "PU 4/10/26 STEPHEN SAGAR",
    amount: 249.04,
    stage: "83626252",
    pipelineId: "39495447",
    closeDate: "2026-04-30",
    url: `${HS_DOMAIN}/contacts/${HS_PORTAL}/record/0-3/320346378970`,
  },
  {
    id: "320346377919",
    name: "4/10/26 walk in Elena Canova",
    amount: 724.94,
    stage: "83626254",
    pipelineId: "39495447",
    closeDate: "2026-04-10",
    url: `${HS_DOMAIN}/contacts/${HS_PORTAL}/record/0-3/320346377919`,
  },
  {
    id: "320497681085",
    name: "PU 4/13/26 LINDA BAULD",
    amount: 519.75,
    stage: "83626252",
    pipelineId: "39495447",
    closeDate: "2026-04-30",
    url: `${HS_DOMAIN}/contacts/${HS_PORTAL}/record/0-3/320497681085`,
  },
  {
    id: "320452162264",
    name: "1 Rugs WALK-IN 4/10/26 SHARINI BALASURIYA",
    amount: null,
    stage: "83639102",
    pipelineId: "39494468",
    closeDate: "2026-04-15",
    url: `${HS_DOMAIN}/contacts/${HS_PORTAL}/record/0-3/320452162264`,
  },
  {
    id: "320448535232",
    name: "1 Rugs REDO PU 4/7/26 CHRIS MURTAGH",
    amount: null,
    stage: "83639102",
    pipelineId: "39494468",
    closeDate: "2026-04-15",
    url: `${HS_DOMAIN}/contacts/${HS_PORTAL}/record/0-3/320448535232`,
  },
  {
    id: "320459078375",
    name: "3 Rugs PU 4/6/26 DIEDRE SHAW",
    amount: null,
    stage: "83639102",
    pipelineId: "39494468",
    closeDate: "2026-04-15",
    url: `${HS_DOMAIN}/contacts/${HS_PORTAL}/record/0-3/320459078375`,
  },
  {
    id: "320569576153",
    name: "3 Rugs PU 4/8/26 MARTHA NORA",
    amount: null,
    stage: "85826197",
    pipelineId: "39494468",
    closeDate: "2026-04-15",
    url: `${HS_DOMAIN}/contacts/${HS_PORTAL}/record/0-3/320569576153`,
  },
  {
    id: "320443150073",
    name: "2 Rugs PU 4/8/26 STACY FARNER",
    amount: null,
    stage: "83639102",
    pipelineId: "39494468",
    closeDate: "2026-04-15",
    url: `${HS_DOMAIN}/contacts/${HS_PORTAL}/record/0-3/320443150073`,
  },
];

// ─── Recent Contacts ──────────────────────────────────────────────────────────
export interface RecentContact {
  id: string;
  name: string;
  email: string;
  lifecycleStage: string;
  createdAt: string;
  url: string;
}

export const RECENT_CONTACTS: RecentContact[] = [
  {
    id: "468873309941",
    name: "Stacy Elizondo",
    email: "stacy@elizondodesign.com",
    lifecycleStage: "subscriber",
    createdAt: "2026-04-09",
    url: `${HS_DOMAIN}/contacts/${HS_PORTAL}/record/0-1/468873309941`,
  },
  {
    id: "468872549072",
    name: "Michael DeMaria",
    email: "demo3948@hotmail.com",
    lifecycleStage: "subscriber",
    createdAt: "2026-04-09",
    url: `${HS_DOMAIN}/contacts/${HS_PORTAL}/record/0-1/468872549072`,
  },
  {
    id: "468959827688",
    name: "Suki Scott",
    email: "",
    lifecycleStage: "lead",
    createdAt: "2026-04-09",
    url: `${HS_DOMAIN}/contacts/${HS_PORTAL}/record/0-1/468959827688`,
  },
  {
    id: "468265760483",
    name: "David Martens",
    email: "hayes.martens@gmail.com",
    lifecycleStage: "customer",
    createdAt: "2026-04-08",
    url: `${HS_DOMAIN}/contacts/${HS_PORTAL}/record/0-1/468265760483`,
  },
  {
    id: "468267914998",
    name: "Virginia Rock",
    email: "ginidr@sbcglobal.net",
    lifecycleStage: "lead",
    createdAt: "2026-04-08",
    url: `${HS_DOMAIN}/contacts/${HS_PORTAL}/record/0-1/468267914998`,
  },
  {
    id: "468211089101",
    name: "Matthew Leverone",
    email: "matthew@leveronedesign.com",
    lifecycleStage: "subscriber",
    createdAt: "2026-04-08",
    url: `${HS_DOMAIN}/contacts/${HS_PORTAL}/record/0-1/468211089101`,
  },
  {
    id: "468211801799",
    name: "Marcos Villa",
    email: "marcosvilla78@gmail.com",
    lifecycleStage: "customer",
    createdAt: "2026-04-08",
    url: `${HS_DOMAIN}/contacts/${HS_PORTAL}/record/0-1/468211801799`,
  },
  {
    id: "467572845243",
    name: "Anita Yu",
    email: "westlyfamily@yahoo.com",
    lifecycleStage: "subscriber",
    createdAt: "2026-04-08",
    url: `${HS_DOMAIN}/contacts/${HS_PORTAL}/record/0-1/467572845243`,
  },
];

// ─── Invoices ─────────────────────────────────────────────────────────────────
export interface InvoiceRecord {
  id: string;
  number: string;
  status: "open" | "paid" | "draft" | "voided";
  amount: number;
  dueDate: string;
}

export const RECENT_INVOICES: InvoiceRecord[] = [
  { id: "753842846453", number: "INV-1010", status: "open", amount: 9.0, dueDate: "2026-03-29" },
  { id: "750119364341", number: "INV-1009", status: "open", amount: 600.0, dueDate: "2026-03-21" },
  { id: "746065259227", number: "INV-1008", status: "paid", amount: 530.25, dueDate: "2026-03-12" },
  { id: "742423793358", number: "INV-DRAFT", status: "draft", amount: 421.88, dueDate: "2026-03-07" },
  { id: "742361039572", number: "INV-1007", status: "paid", amount: 421.87, dueDate: "2026-03-07" },
];

// ─── Recent Companies ─────────────────────────────────────────────────────────
export interface CompanyRecord {
  id: string;
  name: string;
  city: string;
  url: string;
}

export const RECENT_COMPANIES: CompanyRecord[] = [
  { id: "316441030352", name: "WRJ Design Associates LTD", city: "Jackson, WY", url: `${HS_DOMAIN}/contacts/${HS_PORTAL}/record/0-2/316441030352` },
  { id: "316161007290", name: "Persian Rug Clinic", city: "Menlo Park, CA", url: `${HS_DOMAIN}/contacts/${HS_PORTAL}/record/0-2/316161007290` },
  { id: "315140164287", name: "Deluxe Cleaners", city: "San Carlos, CA", url: `${HS_DOMAIN}/contacts/${HS_PORTAL}/record/0-2/315140164287` },
  { id: "315138722528", name: "White Oak Cleaners", city: "San Carlos, CA", url: `${HS_DOMAIN}/contacts/${HS_PORTAL}/record/0-2/315138722528` },
  { id: "315134403299", name: "Dynasty Cleaners", city: "San Mateo, CA", url: `${HS_DOMAIN}/contacts/${HS_PORTAL}/record/0-2/315134403299` },
];
