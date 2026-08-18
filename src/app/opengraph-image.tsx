import { ImageResponse } from "next/og";

/* Imagen Open Graph generada por Next (sin assets externos). */
export const alt = "Martinez Outlet | Belleza, Skincare y Cuidado Personal";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #F7F1FE 0%, #E3D3F8 55%, #FFD7EC 100%)",
          fontFamily: "sans-serif",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 8,
            color: "#6E42B5",
            fontWeight: 600,
          }}
        >
          BELLEZA · CUIDADO PERSONAL · ASEO
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 104,
            fontWeight: 800,
            color: "#24152F",
            letterSpacing: 2,
            marginTop: 18,
          }}
        >
          MARTINEZ
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 74,
            fontWeight: 800,
            color: "#D1007A",
            letterSpacing: 22,
            marginTop: -6,
          }}
        >
          OUTLET
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#5A4A69",
            marginTop: 28,
            textAlign: "center",
          }}
        >
          Skincare, maquillaje y cuidado personal a precios accesibles
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 36,
            background: "#D1007A",
            color: "#FFFFFF",
            fontSize: 26,
            fontWeight: 700,
            padding: "14px 34px",
            borderRadius: 999,
          }}
        >
          Pedidos por WhatsApp
        </div>
      </div>
    ),
    size,
  );
}
