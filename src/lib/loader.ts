import fs from "fs";
import path from "path";
import { get } from "@vercel/edge-config";
import { LandingConfig } from "@/types/landing";
import stelaLocal from "@/config/clients/stela.json";

const CLIENTS_DIR = path.join(process.cwd(), "src", "config", "clients");

/**
 * Sanitiza números de telefone mantendo apenas dígitos numéricos (para wa.me)
 */
export function sanitizePhoneNumber(phone: string): string {
  return phone.replace(/\D/g, "");
}

/**
 * Retorna todos os slugs válidos de clientes para SSG (Static Site Generation),
 * ignorando arquivos de modelo (iniciados com _)
 */
export function getAllClientSlugs(): string[] {
  try {
    if (!fs.existsSync(CLIENTS_DIR)) {
      return ["stela"];
    }

    const files = fs.readdirSync(CLIENTS_DIR);
    const slugs = files
      .filter((file) => file.endsWith(".json") && !file.startsWith("_"))
      .map((file) => file.replace(/\.json$/, ""));

    return slugs.length > 0 ? slugs : ["stela"];
  } catch (err) {
    console.warn("[loader] Erro ao listar slugs dos clientes, usando fallback:", err);
    return ["stela"];
  }
}

/**
 * Fusão profunda simples para aplicar sobrescritas parciais
 */
function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
  const output = { ...target };
  for (const key of Object.keys(source) as Array<keyof T>) {
    const sourceVal = source[key];
    const targetVal = target[key];

    if (
      sourceVal &&
      typeof sourceVal === "object" &&
      !Array.isArray(sourceVal) &&
      targetVal &&
      typeof targetVal === "object" &&
      !Array.isArray(targetVal)
    ) {
      output[key] = deepMerge(targetVal, sourceVal);
    } else if (sourceVal !== undefined) {
      output[key] = sourceVal as any;
    }
  }
  return output;
}

/**
 * Carrega a configuração síncrona local do cliente a partir do sistema de arquivos ou fallback
 */
export function getClientConfig(slug: string): LandingConfig | null {
  try {
    const filePath = path.join(CLIENTS_DIR, `${slug}.json`);

    let config: LandingConfig | null = null;

    if (fs.existsSync(filePath)) {
      const rawData = fs.readFileSync(filePath, "utf-8");
      config = JSON.parse(rawData);
    } else if (slug === "stela") {
      config = stelaLocal as LandingConfig;
    }

    if (!config) {
      return null;
    }

    // Sobrescrita em tempo de build via Vercel Environment Variables
    const envKey = `LANDING_OVERRIDE_${slug.replace(/[^a-zA-Z0-9]/g, "_").toUpperCase()}`;
    const envOverride = process.env[envKey];

    if (envOverride) {
      try {
        const overrides = JSON.parse(envOverride);
        config = deepMerge(config, overrides);
      } catch (err) {
        console.warn(`[loader] Falha ao processar sobrescrita de ambiente para ${envKey}:`, err);
      }
    }

    // Sanitização de telefone (Regra de Negócio: apenas dígitos para wa.me)
    if (config.rsvp?.whatsappNumber) {
      config.rsvp.whatsappNumber = sanitizePhoneNumber(config.rsvp.whatsappNumber);
    }

    return config;
  } catch (error) {
    if (slug === "stela") {
      return stelaLocal as LandingConfig;
    }
    console.error(`[loader] Erro ao carregar configuração para o slug "${slug}":`, error);
    return null;
  }
}

/**
 * Carrega a configuração do cliente de forma assíncrona:
 * 1. Tenta buscar no Edge Config da Vercel (se configurado)
 * 2. Fallback para os arquivos JSON locais
 */
export async function getLandingConfig(slug: string): Promise<LandingConfig | null> {
  // 1. Tenta buscar dinamicamente no Edge Config da Vercel
  if (process.env.EDGE_CONFIG) {
    try {
      const landings = await get<Record<string, LandingConfig>>("landings");
      if (landings && landings[slug]) {
        const config = landings[slug];
        if (config.rsvp?.whatsappNumber) {
          config.rsvp.whatsappNumber = sanitizePhoneNumber(config.rsvp.whatsappNumber);
        }
        return config;
      }
    } catch (error) {
      console.warn("[loader] Edge Config indisponível ou falhou, usando fallback local:", error);
    }
  }

  // 2. Fallback local síncrono
  return getClientConfig(slug);
}
