import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllClientSlugs, getLandingConfig } from "@/lib/loader";
import { BabyShowerBohoTemplate } from "@/components/templates/BabyShowerBohoTemplate";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  const slugs = getAllClientSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
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
