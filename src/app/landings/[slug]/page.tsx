import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLandingConfig } from "@/lib/loader";
import { BabyShowerBohoTemplate } from "@/components/templates/BabyShowerBohoTemplate";

// Força a renderização dinâmica no servidor (SSR) a cada requisição
// Garante que atualizações no Vercel Edge Config reflitam em tempo real (< 5ms) sem necessidade de redeploy
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const config = await getLandingConfig(slug);

  if (!config) {
    return {
      title: "Landing Page Não Encontrada",
    };
  }

  return {
    title: config.seo.title,
    description: config.seo.description,
    openGraph: {
      title: config.seo.title,
      description: config.seo.description,
      type: "website",
      images: config.seo.ogImage ? [config.seo.ogImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: config.seo.title,
      description: config.seo.description,
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
