# AGENTS.md — Guia de Arquitetura e Desenvolvimento

## 1. Visão Geral do Projeto
Este repositório hospeda uma plataforma multi-tenant stateless para criação e entrega de *landing pages* sob demanda (ex: Chá de Bebê, Chá de Fraldas, Aniversários e Convites Digitais), acessadas via `/landings/[slug]`.

* **Premissa Central:** Zero banco de dados relacional e zero backend transacional. Toda interação do usuário (RSVP, PIX, Mapas) é resolvida 100% no cliente (*client-side*) por meio de protocolos nativos (`wa.me`, Clipboard API, URLs de geolocalização).
* **Gestão de Configuração Dinâmica:** Suporte nativo ao **Vercel Global Config** (`@vercel/global-config` via variável de ambiente `GLOBAL_CONFIG`), com tempo de leitura ultra-rápido (< 5ms), permitindo atualizar dados dos clientes em tempo real na nuvem sem necessidade de novo deploy.
* **Template de Referência:** O cliente `stela` (`/landings/stela`) é o template canônico do tema *Baby Shower Boho/Artesanal* e deve ser preservado intacto em qualquer refatoração.

---

## 2. Stack Tecnológica
* **Framework:** Next.js (App Router) com TypeScript estrito (`strict: true`).
* **Renderização:** Server-Side Rendering dinâmico sob demanda (`force-dynamic`, `revalidate = 0`) para sincronização instantânea com Global Config.
* **Compartilhamento Social (OG Image):** Geração dinâmica de imagens de preview para WhatsApp e redes sociais via `@vercel/og` (`next/og` em Edge Runtime) e metadados dinâmicos com `generateMetadata`.
* **Armazenamento de Configurações:** Vercel Global Config (`@vercel/global-config`) com fallback local resiliente para arquivos JSON (`src/config/clients/`).
* **Estilização:** Tailwind CSS + CSS Variables dinâmicas injetadas por cliente (`--color-primary`, `--color-bg`, `--color-surface`, `--color-text`, `--color-accent`).
* **Deploy & Hospedagem:** Vercel.

---

## 3. Estrutura de Diretórios e Responsabilidades
* `src/config/clients/[slug].json`: Arquivos de configuração locais de cada cliente (fallback e ambiente offline). Contém textos, datas, paleta de cores, chave PIX, número de WhatsApp e lista sugerida de presentes.
* `src/types/landing.ts`: Tipagem central (`LandingConfig`). Nenhuma propriedade pode ser adicionada ao JSON ou ao Global Config sem antes ser tipada aqui.
* `src/lib/loader.ts`: Camada unificada de resolução de dados (`getLandingConfig(slug)` e `getClientConfig(slug)`).
  1. Consulta prioritariamente o **Vercel Global Config** (`import { get } from '@vercel/global-config'`) se `process.env.GLOBAL_CONFIG` (ou `EDGE_CONFIG`) estiver presente.
  2. Suporta tanto chaves agrupadas (`landings[slug]`) quanto chaves diretas na raiz (`[slug]`).
  3. Aplica fallback transparente para arquivos locais `src/config/clients/[slug].json`.
  4. Sanitiza telefones (apenas dígitos para `wa.me`) e aplica eventuais sobrescritas de ambiente (`LANDING_OVERRIDE_<SLUG_UPPERCASE>`).
  5. Compatível de forma híbrida com ambientes Node.js e Edge Runtime.
* `src/app/api/og/route.tsx`: Endpoint dinâmico de geração de imagem Open Graph (Edge Runtime via `ImageResponse`). Renderiza um card minimalista e artesanal com dimensões de 1200x630px baseado nos dados e paleta de cores do cliente.
* `src/app/landings/[slug]/page.tsx`: Entrypoint da rota. Declara `export const dynamic = 'force-dynamic'` e `export const revalidate = 0` para impedir cache estático desatualizado. Gera metadados dinâmicos (`generateMetadata`) para Open Graph / WhatsApp preview usando `getLandingConfig(slug)` com resolução de imagem absoluta.
* `src/components/templates/`: Layouts completos que recebem `config: LandingConfig` via props e aplicam o tema visual.
* `src/components/shared/`: Blocos funcionais reutilizáveis (Countdown, RsvpForm, MusicPlayer, PixCard) que herdam as cores via variáveis CSS do template pai.
  - `MusicPlayer.tsx`: Reprodução de trilha sonora em segundo plano (`config.musicUrl`), com autoplay inteligente (respeitando políticas de interação do navegador) e botão flutuante fixo de mute/unmute.
  - `RsvpForm.tsx`: Formulário de confirmação com bloqueio automático caso a data limite (`rsvp.deadline`) tenha expirado.
  - Traje Sugerido (Dress Code): Bloco dedicado para exibição da paleta/imagem de vestimenta (`event.dressCodeImage`).
  - Lista de Mimos & Fraldas: Estrutura modular sem necessidade de PIX ou lojas externas, categorizando fraldas prioritárias (M e G) e sugestões de mimos por departamento.

---

## 4. Regras de Negócio e Segurança (Obrigatórias)
1. **Arquitetura Stateless:** Nunca adicione dependências de banco de dados (Prisma, Supabase, Firebase) ou API Routes para salvar RSVPs. O RSVP deve sempre construir uma string formatada e abrir `https://wa.me/<telefone>?text=<encodeURIComponent(msg)>`.
2. **Atualização Instantânea sem Redeploy:** A rota `/landings/[slug]` deve obrigatoriamente exportar `dynamic = 'force-dynamic'` e `revalidate = 0`. Isso garante que edições salvas no Global Config sejam refletidas no ar em segundos sem precisar disparar um novo build na Vercel.
3. **Padrão de Imagens Open Graph e WhatsApp (SEO Dinâmico):**
   * **Resolução da Imagem OG:**
     1. Prioridade 1: `config.seo.ogImage` (se informada no Global Config ou no JSON local).
     2. Prioridade 2: Geração dinâmica via rota `/api/og?slug=${slug}`.
   * **Padrões Técnicos:**
     - Proporção e Dimensões: `1200 x 630 px` (1.91:1).
     - Peso recomendado: Menor que `300 KB` para resposta ultra-rápida no WhatsApp crawler.
     - URLs Absolutas: Metadados OG exigem obrigatoriamente URLs com protocolo (`https://`), resolvidas dinamicamente via `process.env.VERCEL_PROJECT_PRODUCTION_URL` ou `NEXT_PUBLIC_SITE_URL`.
4. **Padrão de Estrutura no Vercel Global Config:**
   * **Estrutura Agrupada (Recomendada):** Objeto com a chave `landings`, onde cada chave interna é o slug do evento:
     ```json
     {
       "landings": {
         "stela": { /* LandingConfig */ }
       }
     }
     ```
   * **Estrutura Direta na Raiz:** Chave no topo do Global Config nomeada com o próprio slug:
     ```json
     {
       "stela": { /* LandingConfig */ }
     }
     ```
   * O `loader` sempre tenta primeiro o grupo `landings` e depois a chave direta antes de acionar o fallback local.
5. **Privacidade e Sanitização:**
   * Nunca exponha segredos administrativos ou tokens privados no código ou com prefixo `NEXT_PUBLIC_`.
   * Chaves PIX e telefones de contato dos eventos são dados públicos exibidos na interface, mas devem ser sanitizados (apenas dígitos no telefone para `wa.me`) antes da renderização.
6. **Preservação de Clientes Existentes:** Ao criar um novo template ou melhorar componentes compartilhados, garanta retrocompatibilidade total com `src/config/clients/stela.json`.
7. **Performance Mobile-First:** Mais de 90% do tráfego vem de links compartilhados no WhatsApp via smartphone. Evite bibliotecas pesadas de animação; priorize SVGs inline leves, CSS puro e carregamento otimizado de fontes (`next/font/google`).

---

## 5. Fluxo para Adicionar ou Atualizar um Cliente
1. **Local / Fallback:**
   - Copie `src/config/clients/_template.json` para `src/config/clients/<novo-slug>.json`.
   - Preencha os dados do cliente, escolhendo um `templateId` existente (ex: `"baby-shower-boho"`).
   - Ajuste os tokens da paleta de cores no objeto `theme` do JSON.
2. **Nuvem (Global Config):**
   - No painel da Vercel > Storage > Global Config, adicione ou edite o slug desejado dentro do item `landings` ou crie uma chave direta com o slug.
   - A alteração entra no ar imediatamente no próximo acesso a `/landings/<slug>`.
3. **Validação:**
   - Execute a verificação de tipos e build localmente (`npx tsc --noEmit && npm run build`) antes de commitar.
