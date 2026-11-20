import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "ATL in 60 Seconds: Atlanta, one bite at a time.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const badge = await readFile(join(process.cwd(), "public/brand/atl60-badge.png"));
  const src = `data:image/png;base64,${badge.toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0908",
          color: "#f4efe6",
          padding: 64,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} width={96} height={96} alt="" style={{ borderRadius: 999 }} />
          <div style={{ display: "flex", fontSize: 26, letterSpacing: 4, color: "#9b948a" }}>EST. 2017 · METRO ATLANTA</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 112, fontWeight: 900, lineHeight: 0.9, letterSpacing: -3 }}>
          <span>ATLANTA,</span>
          <span style={{ color: "#ee1b2c", fontStyle: "italic" }}>ONE BITE</span>
          <span>AT A TIME.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#9b948a" }}>
          <span>Food reviews · UGC · Food marketing</span>
          <span style={{ color: "#f4efe6" }}>@atlin60sec</span>
        </div>
      </div>
    ),
    size,
  );
}
