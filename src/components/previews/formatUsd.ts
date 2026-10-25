/** "$24,500" – prices use Western digits in every language, like the rest of the site */
const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export function formatUsd(value: number): string {
  return usd.format(value);
}
