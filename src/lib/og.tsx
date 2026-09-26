import "server-only";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const ogSize = { width: 1200, height: 630 };
export const ogAlt = "DocsFlow AI — Turn business documents into data your systems can actually use.";

const fontDir = join(process.cwd(), "node_modules/geist/dist/fonts");

async function loadFonts() {
  const [regular, semibold, mono] = await Promise.all([
    readFile(join(fontDir, "geist-sans/Geist-Regular.ttf")),
    readFile(join(fontDir, "geist-sans/Geist-SemiBold.ttf")),
    readFile(join(fontDir, "geist-mono/GeistMono-Regular.ttf")),
  ]);
  return [
    { name: "Geist", data: regular, weight: 400 as const, style: "normal" as const },
    { name: "Geist", data: semibold, weight: 600 as const, style: "normal" as const },
    { name: "GeistMono", data: mono, weight: 400 as const, style: "normal" as const },
  ];
}

function Mark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="#0B1220" />
      <path d="M10 8h1l2 2v12.5a1.5 1.5 0 0 1-1.5 1.5H10a1.5 1.5 0 0 1-1.5-1.5v-13A1.5 1.5 0 0 1 10 8Z" fill="#fff" />
      <rect x="14.5" y="8" width="6.2" height="2.8" rx="1.4" fill="#3B82F6" />
      <rect x="14.5" y="12.4" width="8.8" height="2.8" rx="1.4" fill="#3194F1" />
      <rect x="14.5" y="16.8" width="8.8" height="2.8" rx="1.4" fill="#27AAE8" />
      <rect x="14.5" y="21.2" width="6.2" height="2.8" rx="1.4" fill="#22C4E4" />
    </svg>
  );
}

const jsonLines: [string, string, boolean][] = [
  ["document_type", '"invoice"', false],
  ["vendor", '"Northstar Tech…"', false],
  ["invoice_number", '"INV-0428"', false],
  ["currency", '"USD"', false],
  ["total", "4820.00", true],
];

export async function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#FFFFFF",
          backgroundImage:
            "linear-gradient(to right, rgba(15,23,42,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          fontFamily: "Geist",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 620 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Mark size={52} />
            <div style={{ display: "flex", fontSize: 30, fontWeight: 600, color: "#0B1220", letterSpacing: -0.6 }}>
              DocsFlow
              <span style={{ marginLeft: 8, color: "#64748B" }}>AI</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 58, lineHeight: 1.06, fontWeight: 600, color: "#0B1220", letterSpacing: -2 }}>
              Turn business documents into data your systems can use.
            </div>
            <div style={{ marginTop: 24, fontSize: 24, color: "#64748B" }}>AI document processing & data extraction</div>
          </div>
          <div style={{ display: "flex", fontFamily: "GeistMono", fontSize: 20, color: "#94A3B8" }}>{siteConfig.domain}</div>
        </div>

        <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "flex-end" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 380,
              borderRadius: 20,
              background: "#0B1220",
              boxShadow: "0 30px 60px -20px rgba(15,23,42,0.45)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "16px 22px",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                fontFamily: "GeistMono",
                fontSize: 15,
                color: "#94A3B8",
              }}
            >
              <span>result.json</span>
              <span style={{ color: "#34D399" }}>● completed</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", padding: "18px 22px 22px", fontFamily: "GeistMono", fontSize: 17, lineHeight: 1.9 }}>
              <span style={{ color: "#64748B" }}>{"{"}</span>
              {jsonLines.map(([k, v, num]) => (
                <div key={k} style={{ display: "flex", paddingLeft: 20 }}>
                  <span style={{ color: "#93C5FD" }}>{`"${k}"`}</span>
                  <span style={{ color: "#64748B" }}>:&nbsp;</span>
                  <span style={{ color: num ? "#FCD34D" : "#A5F3FC" }}>{v}</span>
                </div>
              ))}
              <span style={{ color: "#64748B" }}>{"}"}</span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: await loadFonts() },
  );
}

export async function renderAppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0B1220" }}>
        <svg width={180} height={180} viewBox="0 0 32 32" fill="none">
          <path d="M10 8h1l2 2v12.5a1.5 1.5 0 0 1-1.5 1.5H10a1.5 1.5 0 0 1-1.5-1.5v-13A1.5 1.5 0 0 1 10 8Z" fill="#fff" />
          <rect x="14.5" y="8" width="6.2" height="2.8" rx="1.4" fill="#3B82F6" />
          <rect x="14.5" y="12.4" width="8.8" height="2.8" rx="1.4" fill="#3194F1" />
          <rect x="14.5" y="16.8" width="8.8" height="2.8" rx="1.4" fill="#27AAE8" />
          <rect x="14.5" y="21.2" width="6.2" height="2.8" rx="1.4" fill="#22C4E4" />
        </svg>
      </div>
    ),
    { width: 180, height: 180 },
  );
}
