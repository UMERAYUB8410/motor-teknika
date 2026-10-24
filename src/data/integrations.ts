/* Integration system types */
export type Integration = {
  id: string;
  name: string;
  description: string;
  iconKey: string;
};

export const integrations: Integration[] = [
  {
    id: "dealer-management",
    name: "Dealer management",
    description: "Vehicles and stock",
    iconKey: "dealer",
  },
  {
    id: "crm",
    name: "CRM",
    description: "Leads and customers",
    iconKey: "crm",
  },
  {
    id: "accounting",
    name: "Accounting",
    description: "Invoices and payments",
    iconKey: "accounting",
  },
  {
    id: "listing-portals",
    name: "Listing portals",
    description: "Ads and photos",
    iconKey: "portals",
  },
  {
    id: "payments",
    name: "Payments",
    description: "Deposits and payouts",
    iconKey: "payments",
  },
  {
    id: "website",
    name: "Your website",
    description: "Valuations and listings",
    iconKey: "website",
  },
];