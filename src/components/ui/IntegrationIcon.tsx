/* Integration icons */
export default function IntegrationIcon({ type }: { type: string }) {
  switch (type) {
    case "dealer":
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m4 11 1.2-4h9.6l1.2 4v4H4v-4Z" />
          <path d="M6.2 7 7 4.5h6L13.8 7M6 15.5v1.5M14 15.5v1.5" />
          <circle cx="6.5" cy="12" r=".75" fill="currentColor" /><circle cx="13.5" cy="12" r=".75" fill="currentColor" />
        </svg>
      );
    case "crm":
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 5h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H8l-4 2v-2a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
          <path d="M6 9h8M6 12h5" />
        </svg>
      );
    case "accounting":
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z" />
          <path d="M14 2v4H6" />
          <path d="M8 12h4M8 15h4" />
        </svg>
      );
    case "portals":
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="12" x="1" y="5" rx="2" />
          <circle cx="9" cy="2" r="1.5" />
          <circle cx="13" cy="11" r="1.5" />
        </svg>
      );
    case "payments":
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="12" x="2" y="6" rx="2" />
          <line x1="2" x2="20" y1="10" y2="10" />
        </svg>
      );
    case "website":
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="16" height="14" rx="2" />
          <path d="M2 7h16M5 5h.01M8 5h.01M6 10h8M6 13h5" />
        </svg>
      );
    default:
      return null;
  }
}