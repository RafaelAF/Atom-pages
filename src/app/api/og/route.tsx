import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { getLandingConfig } from "@/lib/loader";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug") || "stela";

    const titleParam = searchParams.get("title");
    const subtitleParam = searchParams.get("subtitle");
    const dateParam = searchParams.get("date");
    const bgParam = searchParams.get("bg");
    const primaryParam = searchParams.get("primary");
    const textParam = searchParams.get("text");

    let config = null;
    if (slug) {
      config = await getLandingConfig(slug);
    }

    const title = titleParam || config?.hero?.title || config?.seo?.title || "Stela";
    const subtitle = subtitleParam || config?.hero?.badgeSubtitle || "Chá de Bebê";
    const date = dateParam || config?.event?.dateDisplay || "";
    const location = config?.event?.locationName || "";

    const bg = bgParam || config?.theme?.colors?.bg || "#FAF6F0";
    const surface = config?.theme?.colors?.surface || "#F3E8DC";
    const primary = primaryParam || config?.theme?.colors?.primary || "#D89B9E";
    const primaryDark = config?.theme?.colors?.primaryDark || "#C48185";
    const text = textParam || config?.theme?.colors?.text || "#5C3A31";
    const accent = config?.theme?.colors?.accent || "#7C7859";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: bg,
            padding: "40px",
          }}
        >
          {/* Card com borda artesanal costurada */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              backgroundColor: surface,
              borderRadius: "32px",
              border: `4px dashed ${primary}`,
              padding: "48px 64px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
              textAlign: "center",
            }}
          >
            {/* Tag / Subtítulo superior com raminhos */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  letterSpacing: "4px",
                  textTransform: "uppercase",
                  color: accent,
                  display: "flex",
                }}
              >
                ♥ {subtitle} ♥
              </div>
            </div>

            {/* Nome / Título Principal */}
            <div
              style={{
                fontSize: "84px",
                fontWeight: "700",
                color: primaryDark,
                lineHeight: 1.1,
                marginBottom: "20px",
                display: "flex",
                fontFamily: "serif",
              }}
            >
              {title}
            </div>

            {/* Divisor Botânico sutil */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                width: "300px",
                justifyContent: "center",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  height: "2px",
                  backgroundColor: `${primary}66`,
                  flex: 1,
                  display: "flex",
                }}
              />
              <div style={{ color: primary, fontSize: "20px", display: "flex" }}>
                ♥
              </div>
              <div
                style={{
                  height: "2px",
                  backgroundColor: `${primary}66`,
                  flex: 1,
                  display: "flex",
                }}
              />
            </div>

            {/* Informações de Data e Local */}
            {(date || location) && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "20px",
                }}
              >
                {date && (
                  <div
                    style={{
                      fontSize: "26px",
                      fontWeight: "600",
                      color: text,
                      display: "flex",
                    }}
                  >
                    {date}
                  </div>
                )}
                {location && (
                  <div
                    style={{
                      fontSize: "20px",
                      color: `${text}B3`,
                      display: "flex",
                    }}
                  >
                    📍 {location}
                  </div>
                )}
              </div>
            )}

            {/* Rodapé do Convite */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "16px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: `${text}99`,
                marginTop: "auto",
              }}
            >
              Você é nosso convidado especial!
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (err) {
    console.error("[api/og] Erro ao gerar imagem Open Graph:", err);
    return new Response("Erro ao gerar imagem OG", { status: 500 });
  }
}

