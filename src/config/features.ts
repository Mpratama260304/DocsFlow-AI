/**
 * Product capability registry.
 * Every capability shown on the website reads its status from here.
 * Never mark a capability "available" until it works in production.
 */
export type FeatureStatus = "available" | "beta" | "coming-soon";

export type FeatureKey =
  | "dashboardUpload"
  | "aiExtraction"
  | "review"
  | "exportJson"
  | "exportCsv"
  | "exportExcel"
  | "customSchemas"
  | "restApi"
  | "webhooks"
  | "batchProcessing"
  | "sdks"
  | "documentation"
  | "selfServeAccounts";

export interface Feature {
  label: string;
  status: FeatureStatus;
}

export const features: Record<FeatureKey, Feature> = {
  dashboardUpload: { label: "Dashboard upload", status: "available" },
  aiExtraction: { label: "AI field extraction", status: "available" },
  review: { label: "Review extracted values", status: "available" },
  exportJson: { label: "JSON export", status: "available" },
  exportCsv: { label: "CSV export", status: "available" },
  exportExcel: { label: "Excel-compatible export", status: "available" },
  customSchemas: { label: "Custom schemas", status: "coming-soon" },
  restApi: { label: "REST API", status: "coming-soon" },
  webhooks: { label: "Webhooks", status: "coming-soon" },
  batchProcessing: { label: "Batch processing", status: "coming-soon" },
  sdks: { label: "SDKs", status: "coming-soon" },
  documentation: { label: "Developer documentation", status: "coming-soon" },
  selfServeAccounts: { label: "Self-serve accounts", status: "coming-soon" },
};

/** File types accepted for upload. Only list formats the pipeline actually accepts. */
export const supportedInputs = ["PDF", "PNG", "JPG", "Scanned documents"] as const;

export function isAvailable(key: FeatureKey): boolean {
  return features[key].status === "available";
}

export function statusLabel(status: FeatureStatus): string {
  switch (status) {
    case "available":
      return "Available";
    case "beta":
      return "Beta";
    case "coming-soon":
      return "Coming soon";
  }
}
