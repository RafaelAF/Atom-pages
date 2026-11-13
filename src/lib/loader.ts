// src/lib/loader.ts
import { get } from '@vercel/edge-config';
import stelaLocal from '@/config/clients/stela.json';
import { LandingConfig } from '@/types/landing';

export async function getLandingConfig(slug: string): Promise<LandingConfig | null> {
  try {
    // 1. Tenta buscar dinamicamente no Edge Config da Vercel (tempo de leitura < 5ms)
    const landings = await get<Record<string, LandingConfig>>('landings');

    if (landings && landings[slug]) {
      return landings[slug];
    }
  } catch (error) {
    console.warn('Edge Config não configurado localmente, usando fallback estático.');
  }

  // 2. Fallback local (garante que o projeto funcione offline e preserve a Stela)
  if (slug === 'stela') {
    return stelaLocal as LandingConfig;
  }

  return null;
}