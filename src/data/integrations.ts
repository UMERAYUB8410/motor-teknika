import type { Dictionary } from "@/data/dictionaries";

/** Integration tiles; names and descriptions live in the dictionaries under integrations.items[id] */
export type Integration = {
  id: keyof Dictionary["integrations"]["items"];
  iconKey: string;
};

export const integrations: Integration[] = [
  { id: "dealer-management", iconKey: "dealer" },
  { id: "crm",               iconKey: "crm" },
  { id: "accounting",        iconKey: "accounting" },
  { id: "listing-portals",   iconKey: "portals" },
  { id: "payments",          iconKey: "payments" },
  { id: "website",           iconKey: "website" },
];
