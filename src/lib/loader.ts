import fs from "fs";
import path from "path";
import { get } from "@vercel/global-config";
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
 * Retorna todos os slugs válidos de clientes para geração de links e fallbacks,
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
    console.warn("[loader] Erro ao listar slugs dos clientes locais, usando fallback padrão:", err);
    return ["stela"];
  }
}

/**
 * Fusão profunda para aplicar sobrescritas parciais
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
      console.warn(`[loader] Arquivo local não encontrado para o slug "${slug}".`);
      return null;
    }

    // Sobrescrita em tempo de build/execução via Environment Variables
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

    // Sanitização de telefone (apenas dígitos numéricos para o protocolo wa.me)
    if (config.rsvp?.whatsappNumber) {
      config.rsvp.whatsappNumber = sanitizePhoneNumber(config.rsvp.whatsappNumber);
    }

    return config;
  } catch (error) {
    if (slug === "stela") {
      return stelaLocal as LandingConfig;
    }
    console.error(`[loader] Erro inesperado ao carregar arquivo local para o slug "${slug}":`, error);
    return null;
  }
}

/**
 * Carrega a configuração do cliente de forma prioritária e assíncrona:
 * 1. Consulta o Vercel Global Config (usando `@vercel/global-config` via `process.env.GLOBAL_CONFIG` ou fallback `EDGE_CONFIG`)
 *    - Suporta chave agrupada: `landings[slug]` (ex: { "landings": { "stela": { ... } } })
 *    - Suporta chave direta na raiz: `[slug]` (ex: { "stela": { ... } })
 * 2. Fallback seguro e resiliente para os arquivos JSON locais em `src/config/clients/[slug].json`
 */
export async function getLandingConfig(slug: string): Promise<LandingConfig | null> {
  const hasConfigEnv = !!(process.env.GLOBAL_CONFIG || process.env.EDGE_CONFIG);

  if (hasConfigEnv) {
    try {
      // Garante suporte tanto se a variável for GLOBAL_CONFIG quanto EDGE_CONFIG
      if (!process.env.GLOBAL_CONFIG && process.env.EDGE_CONFIG) {
        process.env.GLOBAL_CONFIG = process.env.EDGE_CONFIG;
      }

      // 1. Tenta buscar na estrutura agrupada 'landings'
      const landingsGroup = await get<Record<string, LandingConfig>>("landings");
      if (landingsGroup && typeof landingsGroup === "object" && landingsGroup[slug]) {
        console.info(`[loader] Configuração para "${slug}" obtida via Global Config (chave agrupada "landings").`);
        const config = landingsGroup[slug];
        if (config.rsvp?.whatsappNumber) {
          config.rsvp.whatsappNumber = sanitizePhoneNumber(config.rsvp.whatsappNumber);
        }
        return config;
      }

      // 2. Tenta buscar pela chave direta na raiz do Global Config
      const directConfig = await get<LandingConfig>(slug);
      if (directConfig && typeof directConfig === "object" && (directConfig.slug || directConfig.templateId)) {
        console.info(`[loader] Configuração para "${slug}" obtida via Global Config (chave direta raiz).`);
        if (directConfig.rsvp?.whatsappNumber) {
          directConfig.rsvp.whatsappNumber = sanitizePhoneNumber(directConfig.rsvp.whatsappNumber);
        }
        return directConfig;
      }

      console.warn(`[loader] Slug "${slug}" não localizado no Global Config (verificado em "landings" e na raiz). Acionando fallback local.`);
    } catch (error) {
      console.error(`[loader] Erro ao consultar o Vercel Global Config para "${slug}":`, error);
    }
  } else {
    console.warn(`[loader] GLOBAL_CONFIG não configurado no ambiente. Usando fallback local para "${slug}".`);
  }

  // Fallback local seguro
  const localConfig = getClientConfig(slug);
  if (localConfig) {
    console.info(`[loader] Configuração para "${slug}" carregada com sucesso do fallback local.`);
    return localConfig;
  }

  console.error(`[loader] Falha ao carregar configuração para "${slug}": não encontrado nem no Global Config nem no fallback local.`);
  return null;
}
