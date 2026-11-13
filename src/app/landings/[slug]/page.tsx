import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLandingConfig } from "@/lib/loader";
import { BabyShowerBohoTemplate } from "@/components/templates/BabyShowerBohoTemplate";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
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

