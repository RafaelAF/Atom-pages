# AGENTS.md — Guia de Arquitetura e Desenvolvimento

## 1. Visão Geral do Projeto
Este repositório hospeda uma plataforma multi-tenant estática (stateless) para criação e entrega de *landing pages* sob demanda (ex: Chá de Bebê, Chá de Fraldas, Aniversários e Convites Digitais), acessadas via `/landings/[slug]`.

* **Premissa Central:** Zero banco de dados e zero backend transacional. Toda interação do usuário (RSVP, PIX, Mapas) é resolvida 100% no cliente (*client-side*) por meio de protocolos nativos (`wa.me`, Clipboard API, URLs de geolocalização).
* **Template de Referência:** O cliente `stela` (`/landings/stela`) é o template canônico do tema *Baby Shower Boho/Artesanal* e deve ser preservado intacto em qualquer refatoração.

---

## 2. Stack Tecnológica
* **Framework:** Next.js (App Router) com TypeScript estrito (`strict: true`).
* **Estilização:** Tailwind CSS + CSS Variables dinâmicas injetadas por cliente (`--color-primary`, `--color-bg`, `--color-surface`, `--color-text`, `--color-accent`).
* **Deploy & Hospedagem:** Vercel (Static Site Generation via `generateStaticParams`).

---

## 3. Estrutura de Diretórios e Responsabilidades
* `src/config/clients/[slug].json`: Arquivos de configuração individuais de cada cliente. Contém textos, datas, paleta de cores, chave PIX, número de WhatsApp e lista sugerida de presentes.
* `src/types/landing.ts`: Tipagem central (`LandingConfig`). Nenhuma propriedade pode ser adicionada ao JSON sem antes ser tipada aqui.
* `src/lib/loader.ts`: Camada de resolução de dados. Carrega o JSON correspondente ao `slug`, valida o schema e aplica eventuais sobrescritas vindas de variáveis de ambiente da Vercel (`LANDING_OVERRIDE_<SLUG_UPPERCASE>`) em tempo de build.
* `src/app/landings/[slug]/page.tsx`: Entrypoint da rota. Responsável por gerar metadados dinâmicos (`generateMetadata` para Open Graph/WhatsApp preview) e selecionar o componente de template adequado (`config.templateId`).
* `src/components/templates/`: Layouts completos que recebem `config: LandingConfig` via props e aplicam o tema visual.
* `src/components/shared/`: Blocos funcionais reutilizáveis (Countdown, PixCard, RsvpForm) que herdam as cores via variáveis CSS do template pai.

---

## 4. Regras de Negócio e Segurança (Obrigatórias)
1. **Arquitetura Stateless:** Nunca adicione dependências de banco de dados (Prisma, Supabase, Firebase) ou API Routes para salvar RSVPs. O RSVP deve sempre construir uma string formatada e abrir `https://wa.me/<telefone>?text=<encodeURIComponent(msg)>`.
2. **Privacidade e Variáveis de Ambiente:**
   * Nunca exponha segredos administrativos ou tokens privados no código ou com prefixo `NEXT_PUBLIC_`.
   * Chaves PIX e telefones de contato dos eventos são dados públicos exibidos na interface, mas devem ser sanitizados (apenas dígitos no telefone para `wa.me`) antes da renderização.
3. **Preservação de Clientes Existentes:** Ao criar um novo template ou melhorar componentes compartilhados, garanta retrocompatibilidade total com `src/config/clients/stela.json`.
4. **Performance Mobile-First:** Mais de 90% do tráfego vem de links compartilhados no WhatsApp via smartphone. Evite bibliotecas pesadas de animação; priorize SVGs inline leves, CSS puro e carregamento otimizado de fontes (`next/font/google`).

---

## 5. Fluxo para Adicionar um Novo Cliente
1. Copie `src/config/clients/_template.json` para `src/config/clients/<novo-slug>.json`.
2. Preencha os dados do cliente, escolhendo um `templateId` existente (ex: `"baby-shower-boho"`).
3. Ajuste os tokens da paleta de cores no objeto `theme` do JSON.
4. Valide o build localmente (`npm run build`) garantindo que a rota `/landings/<novo-slug>` foi gerada estaticamente sem erros de tipagem.