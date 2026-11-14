import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLandingConfig } from "@/lib/loader";
import { BabyShowerBohoTemplate } from "@/components/templates/BabyShowerBohoTemplate";

// Força a renderização dinâmica no servidor (SSR) a cada requisição
// Garante que atualizações no Vercel Global Config reflitam em tempo real (< 5ms) sem necessidade de redeploy
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Resolve a URL base absoluta para garantir compatibilidade com Open Graph / WhatsApp
 */
function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(/\/$/, "")}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }
  return "http://localhost:3000";
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const config = await getLandingConfig(slug);

  if (!config) {
    return {
      title: "Landing Page Não Encontrada",
    };
  }

  const baseUrl = getBaseUrl();
  const rawOgImage = config.seo.ogImage?.trim();

  // Ordem de prioridade da imagem de compartilhamento:
  // 1. ogImage explícita no config (transformada em URL absoluta se for relativa)
  // 2. Rota dinâmica /api/og?slug=${slug}
  let ogImageUrl: string;
  if (rawOgImage && rawOgImage.length > 0) {
    ogImageUrl = rawOgImage.startsWith("http")
      ? rawOgImage
      : `${baseUrl}${rawOgImage.startsWith("/") ? "" : "/"}${rawOgImage}`;
  } else {
    ogImageUrl = `${baseUrl}/api/og?slug=${encodeURIComponent(slug)}`;
  }

  const title = config.seo.title;
  const description = config.seo.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: "pt_BR",
      url: `${baseUrl}/landings/${slug}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function LandingPage({ params }: PageProps) {
  const { slug } = await params;
  const config = await getLandingConfig(slug);

  if (!config) {
    notFound();
  }

  // Seletor de template baseado no ID do config
  switch (config.templateId) {
    case "baby-shower-boho":
    default:
      return <BabyShowerBohoTemplate config={config} />;
  }
}
