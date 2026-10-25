import type { Dictionary } from "@/data/dictionaries";

/** Card structure; the text for each card lives in the dictionaries under services.items[id] */
export type ServiceId = keyof Dictionary["services"]["items"];

export type Service = {
  id: ServiceId;
  isNew: boolean;
  badgeType: "sold" | "package";
  featured?: boolean;
  /** Real product image shown on the card front instead of the drawn preview */
  previewImage?: { src: string; width: number; height: number };
};

export const services: Service[] = [
  { id: "evaluation", isNew: true,  badgeType: "sold" },
  {
    id: "masking", isNew: true, badgeType: "sold",
    previewImage: { src: "/images/masking.png", width: 1024, height: 576 },
  },
  { id: "auction",    isNew: false, badgeType: "package" },
  { id: "api",        isNew: false, badgeType: "sold" },
  { id: "ecosystem",  isNew: false, badgeType: "package", featured: true },
];
