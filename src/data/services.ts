export type ServiceItem = {
  label: string;
  description: string;
};

export type Service = {
  id: string;
  eyebrow: string;
  /** Title with optional **bold** suffix; use array [normal, bold] */
  title: [string, string?];
  isNew: boolean;
  newBadge?: string;
  badgeType: "sold" | "package";
  description: string;
  bullets: string[];
  backDescription: string;
  featured?: boolean;
  items?: ServiceItem[];
};

export const services: Service[] = [
  {
    id: "evaluation",
    eyebrow: "AI VEHICLE VALUATION",
    title: ["Evaluation ", "Engine"],
    isNew: true,
    badgeType: "sold",
    description: "AI-powered vehicle valuation for accurate, real-time pricing.",
    bullets: ["Market-based pricing", "Localized AI models", "Multiple data sources"],
    backDescription:
      "Enter a car's make, year and mileage and get a fair market value in seconds, built from local sales data. Use it to price trade-ins and to decide what to pay when buying a car.",
  },
  {
    id: "masking",
    eyebrow: "AUTOMATED VISUAL PRIVACY",
    title: ["Masking", "Tech"],
    isNew: true,
    badgeType: "sold",
    description: "Automated visual anonymization for privacy and compliance.",
    bullets: ["Real-time plate & face masking", "Studio-grade background removal", "GDPR ready"],
    backDescription:
      "Upload vehicle photos and it blurs plates and faces and replaces messy backgrounds with a clean studio look, so listings stay private and compliant.",
  },
  {
    id: "auction",
    eyebrow: "GLOBAL BIDDING ENGINE",
    title: ["Auction ", "Platform"],
    isNew: false,
    badgeType: "package",
    description: "Real-time B2B auctioning with secure, trusted networks.",
    bullets: ["Live bidding", "Private dealer circles", "iOS & Android apps"],
    backDescription:
      "Live B2B bidding for your private dealer network, with iOS and Android apps. It runs together with the CRM, website and dashboard.",
  },
  {
    id: "api",
    eyebrow: "SEAMLESS CONNECTIVITY",
    title: ["API ", "Integration"],
    isNew: false,
    badgeType: "sold",
    description: "Connect with your existing systems or build custom workflows.",
    bullets: ["Flexible & secure APIs", "Real-time data sync", "Full technical support"],
    backDescription:
      "Connect Motor Teknika to the systems you already use and keep vehicle and bid data in sync in real time. You can buy it on its own, or get it included in the Complete Ecosystem.",
  },
  {
    id: "ecosystem",
    eyebrow: "COMPLETE AUTOMOTIVE TRADE ECOSYSTEM",
    title: ["Complete ", "Ecosystem"],
    isNew: false,
    newBadge: "ALL-IN-ONE",
    badgeType: "package",
    description:
      "The whole system in one subscription, under your brand. Source cars, value them, mask the photos, auction them to dealers and manage every lead.",
    bullets: ["All products included", "White-label ready", "Single subscription"],
    backDescription:
      "The whole system in one subscription, under your brand: the website and B2C sourcing portal, dashboard, CRM, auction platform with apps, plus Evaluation Engine, MaskingTech and API Integration.",
    featured: true,
    items: [
      { label: "Website", description: "B2C sourcing portal that captures and converts leads" },
      { label: "Dashboard", description: "Live view of valuations, bids and sales" },
      { label: "CRM", description: "Manage leads, dealers and follow-ups" },
      { label: "Auction Platform", description: "Live B2B bidding with iOS & Android apps" },
      { label: "Evaluation Engine", description: "AI valuation for buying and pricing" },
      { label: "MaskingTech + API", description: "Photo privacy and connection to your systems" },
    ],
  },
];