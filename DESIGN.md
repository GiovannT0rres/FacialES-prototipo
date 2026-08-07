# Manager Redesign — Spec Completa

> Este documento é a fonte de verdade para implementar o redesign do Manager.
> Qualquer sessão de IA deve ler este arquivo antes de começar.
> Ele contém decisões visuais, comportamentos, estados e estrutura de dados.

## Contexto

O Manager é uma das 4 apps do PACC Clube (src/apps/manager no repositório
em C:\Clube\Prototipo2_0.1). É a interface de gestão operacional usada
pela equipe administrativa do clube.

**Stack**: React 18 + Vite + TypeScript + Tailwind 4 + Radix UI.
**Sem backend** — tudo mockado em src/apps/manager/mocks/.

O redesign atual segue uma abordagem **filter-first**: não há sidebar nem
menu de navegação. Toda interação começa pela barra de busca central.

---

## Princípios de design

1. **Filter-first** — toda navegação parte da busca. Sem sidebar, sem menu.
2. **Mobile-first** — responsivo, funciona em tela estreita primeiro.
3. **Operacional** — interface para quem trabalha, não para quem explora.
4. **Branco + acento azul** — interface predominantemente branca/neutra.

---

## Paleta de cores

### Superfícies
| Token | Valor | Uso |
|---|---|---|
| Fundo página | #FAFBFC | Background geral |
| Cards/inputs | #FFFFFF | Cards, barra de busca, chips |
| Header | #FFFFFF | Header com borda inferior |
| Borda padrão | #E5E7EB | Bordas de cards, inputs, chips |

### Acento (azul — única cor de ação)
| Token | Valor | Uso |
|---|---|---|
| Botão primário | #3B82F6 | Botão de busca, ações primárias |
| Chip ativo fundo | #EFF6FF | Fundo de chip selecionado |
| Chip ativo texto | #1E40AF | Texto de chip selecionado |
| Chip ativo borda | #93C5FD | Borda de chip selecionado |

### Status (badges nos resultados)
| Status | Fundo | Texto | Borda |
|---|---|---|---|
| Sócio | #F0FDF4 | #166534 | — |
| Dependente | #F0F9FF | #0C4A6E | — |
| Visitante | #FFFBEB | #92400E | — |
| Prestador | #EFF6FF | #1E40AF | — |
| No clube | #F0FDF4 | #166534 | #BBF7D0 |
| Pendência | #FEF3C7 | #92400E | #FDE68A |

### Outros
| Token | Valor | Uso |
|---|---|---|
| Badge sino | #EF4444 | Fundo do badge de notificações |
| Badge texto | #FFFFFF | Número do badge |
| Texto principal | Escuro (sistema) | Nomes, títulos |
| Texto secundário | Cinza médio | CPF, labels, subtítulos |
| Texto muted | Cinza claro | Placeholders, contadores |

### Tipografia
- **Font-family**: Inter (fallback: system-ui, -apple-system, sans-serif)
- **Marca no header**: 14px, weight 500
- **Título hero**: 22px, weight 500, letter-spacing -0.02em
- **Subtítulo hero**: 14px, cor muted
- **Input de busca**: 15px, weight 400
- **Chips**: 13px, weight 500
- **Nomes nos resultados**: 14px, weight 500
- **CPF nos resultados**: 12px, cor muted, font-variant-numeric: tabular-nums
- **Badges de status**: 11px, weight 500
- **Labels de seção**: 11px, weight 500, uppercase, letter-spacing 0.05em
- **Contadores**: 12.5px, cor muted

---

## Rotas

```
/manager            → Busca (tela principal, estado vazio ou com resultados)
/manager/pessoa/:id → Perfil (detalhe de uma pessoa)
/manager/notificacoes → Notificações
```

---

## Tela 1: Layout Shell + Header

### Estrutura
```
┌─────────────────────────────────────────────────┐
│ PACC Manager          [🔔 3] [Voltar ao Hub] [Sair] │
├─────────────────────────────────────────────────┤
│                    <Outlet />                    │
└─────────────────────────────────────────────────┘
```

### Header (fixo em todas as telas)
- Altura: 48px
- Background: branco, borda inferior 0.5px cinza
- Esquerda: "PACC Manager" (14px, weight 500)
- Direita (gap 12px):
  - Sino: ícone bell em caixa 32x32, borda arredondada, badge vermelho
    com contagem no canto superior direito (-5px, -5px). Badge: 16px
    altura, border 2px branco, font 9.5px bold.
  - "Voltar ao Hub": botão texto 12.5px, cor muted
  - "Sair": botão texto 12.5px, cor muted

---

## Tela 2: Busca (tela principal)

### Estados

#### Estado vazio (nada digitado, nenhum filtro ativo)
```
         Quem você procura?
   Busque por nome, CPF, placa ou use filtros.

   ┌──🔍─────────────────────────────── 🔵──┐
   │   Nome, CPF ou placa...                  │
   └──────────────────────────────────────────┘

   ─────────────────── (separador) ───────────────────

   ⚠ 2 alertas de segurança — restrição em prestador…  [Ver alertas]

   ┌─ No clube agora (12) ─┐ ┌─ Sua fila ──────────┐ ┌─ Últimos acessos ──┐
   │ RA Roberto Almeida 09:15│ │ Cadastros sem       │ │ → Ana Almeida 11:42│
   │ MS Maria Souza    10:32│ │ verificação    5     │ │ ← Fernando S. 11:30│
   │ RN Rafael Nunes   08:00│ │ Aguardando           │ │ → Bruno Tav.  11:05│
   │ BT Bruno Tavares  11:05│ │ autorização    3     │ │ → Maria Souza 10:32│
   │ FS Fernando Silva 09:40│ │                      │ │ ← Juliana C. 10:15│
   │   Ver todos (12) →     │ │ Clique para filtrar  │ │   Ver histórico →  │
   └────────────────────────┘ └──────────────────────┘ └────────────────────┘
```
- Conteúdo centralizado vertical e horizontalmente
- Título: 22px, weight 500
- Subtítulo: 14px, muted, margin-bottom 28px
- Barra: max-width 540px, altura 50px, border-radius 28px (pill shape)
  - Ícone search à esquerda (18px, muted)
  - Input flex-1
  - Botão circular azul (#3B82F6) 38px à direita com ícone search branco

**Painel Operacional** (só no estado vazio, abaixo da busca):

Separador: borda topo 0.5px #E5E7EB, max-width 960px, centralizado.

- **Alerta de segurança** (full-width, acima do grid):
  - Fundo #FEF2F2, borda 0.5px #FECACA, border-radius 10px
  - Ícone alert-triangle vermelho + texto #991B1B + botão "Ver alertas" outline
  - Hover: borda #F87171
  - Aparece quando há alertas de segurança não-lidos

- **Grid 3 colunas** (max-width 960px, gap 14px):
  - Cada card: fundo branco, borda 0.5px #E5E7EB, border-radius 12px, padding 14px
  - Header de card: flex, ícone + label uppercase 11px #6B7280 + contagem alinhada à direita

  **Coluna 1 — "No clube agora"**:
  - Bolinha verde 8px no header, contagem 20px weight 500 cor #059669
  - Lista de pessoas presentes: avatar 24px (cor do tipo) + nome 12px + hora 11px muted
  - Cada row clicável (hover #F9FAFB) → abre perfil da pessoa
  - "Ver todos (N) →" no final

  **Coluna 2 — "Sua fila"**:
  - Ícone clipboard-list âmbar no header
  - 2 sub-cards empilhados:
    - "Cadastros sem verificação" (âmbar: bg #FFFBEB, borda #FDE68A)
    - "Aguardando autorização" (azul: bg #EFF6FF, borda #93C5FD)
  - Cada sub-card: label 12px weight 500 + número 18px weight 500 + sub-texto 11px
  - Clicáveis → aplicam filtro "Pendências" na busca e ativam estado ativo
  - Rodapé: "Clique para filtrar na busca" 11px muted

  **Coluna 3 — "Últimos acessos"**:
  - Ícone history cinza no header
  - Lista de acessos recentes: ícone entrada (verde) ou saída (vermelho) + nome 12px + hora 11px
  - Cada row clicável → abre perfil da pessoa
  - "Ver histórico →" no final

#### Estado ativo (foco na barra, digitando, ou filtro selecionado)
- Título, subtítulo e **painel operacional** desaparecem (display: none)
- Conteúdo alinha ao topo (padding-top: 40px)
- Abaixo da barra aparecem duas seções:

**Seção "Filtros"** (sempre visível quando ativo)
```
FILTROS
[👤 Sócios] [👥 Dependentes] [🕐 Visitantes] [💼 Prestadores] [📍 No clube agora] [⚠ Pendências]
```
- Label: 11px, uppercase, tracking 0.05em, muted
- Chips: pill (border-radius 999px), 13px, weight 500, fundo branco,
  borda 0.5px cinza, ícone 13px à esquerda
- Ao clicar: chip fica azul (fundo #EFF6FF, texto #1E40AF, borda #93C5FD)
- Filtros ativos aparecem TAMBÉM dentro da barra de busca como tags
  azuis com X para remover

**Seção "Pessoas"** (só aparece quando há texto digitado)
```
PESSOAS
[🟢 CM Carlos Mendes] [🟡 AB Ana Beatriz Souza] ...
```
- Chips com avatar circular pequeno (22px) à esquerda com iniciais
- Avatar usa a cor do tipo da pessoa (mesma paleta dos badges)
- Ao clicar no chip da pessoa: preenche o input com o nome dela

#### Filtros dentro da barra
Quando um filtro é selecionado, ele aparece como tag dentro do input:
```
┌──🔍─[Sócios ✕]─[No clube ✕]──carlos_──── 🔵──┐
└──────────────────────────────────────────────────┘
```
- Tag: fundo #EFF6FF, texto #1E40AF, borda #93C5FD, border-radius 999px
- Font: 12px, weight 500
- X: ícone 11px, clicável, remove o filtro

### Resultados (abaixo das sugestões)
Aparecem quando há filtro ativo OU texto digitado.
```
4 pessoas

┌─ [CM]  Carlos Mendes          [Sócio] [No clube]  › ─┐
├─ [AB]  Ana Beatriz Souza      [Visitante]          › ─┤
├─ [RL]  Roberto Lima           [Prestador]          › ─┤
└─ [MF]  Marina Ferreira        [Visitante] [Pendência] › ─┘
```

Cada card de resultado:
- Padding: 12px 14px
- Background: branco
- Borda: 0.5px cinza, border-radius 12px
- Gap entre cards: 6px
- Layout: flex, align-items center, gap 12px
- Avatar: 40px circular, fundo da cor do tipo, iniciais no centro (14px, weight 500)
- Info (flex-1): nome (14px, weight 500) + CPF abaixo (12px, muted, tabular-nums)
- Badges de status: à direita, antes da seta
- Seta: ícone chevron-right 16px muted (indica que abre o perfil)
- Hover: border-color muda para azul leve
- Clique: navega para /manager/pessoa/:id

### Lógica de filtro
- Filtros combinam com AND (Sócios + No clube = só sócios no clube)
- Texto filtra por nome (contains, case-insensitive) E por CPF
- Filtros + texto combinam: resultado precisa casar com ambos
- Contagem atualiza em tempo real: "N pessoas" / "1 pessoa"

### Dados mock
A busca indexa todas as pessoas do sistema (sócios, dependentes, visitantes,
prestadores) a partir dos mocks existentes. Cada pessoa tem:
```ts
interface PessoaIndexada {
  id: string;
  nome: string;
  cpf: string;
  telefone?: string;
  placa?: string;
  avatar: string; // URL ou placeholder com iniciais
  tipo: 'socios' | 'dependentes' | 'visitantes' | 'prestadores';
  label: string; // "Sócio", "Dependente", "Visitante", "Prestador"
  noClube: boolean;
  pendencia: boolean;
  titularId?: string; // se dependente/patrocinado
  autorizacoes: Autorizacao[];
}
```

---

## Tela 3: Perfil

Rota: `/manager/pessoa/:id`
Otimizado para desktop 1920x1080.

### Layout: sidebar fixa + área principal
```
┌─ Header ──────────────────────────────────────────────┐
├─ ← Busca › Carlos Mendes (breadcrumb) ────────────────┤
│                                                        │
│ ┌──SIDEBAR 280px──┐ ┌──ÁREA PRINCIPAL──────────────┐  │
│ │                  │ │                              │  │
│ │  [Avatar 88px]   │ │ ⚠ Pendência + [Reenviar]    │  │
│ │  Nome            │ │                              │  │
│ │  [Badge tipo]    │ │ [metric][metric][met.][met.] │  │
│ │                  │ │                              │  │
│ │  CPF: xxx        │ │ ┌─ VÍNCULOS (grande) ──────┐ │  │
│ │  Tel: xxx        │ │ │ [card] [card] [card]     │ │  │
│ │                  │ │ └──────────────────────────┘ │  │
│ │  Placa: xxx      │ │                              │  │
│ │                  │ │ ┌─ Autorizações ─┐┌─ Aguard.┐│  │
│ │  ── Presença ──  │ │ │ (expandíveis)  ││ (lista) ││  │
│ │                  │ │ │                ││         ││  │
│ │  ── Presença ──  │ │ └────────────────┘└─────────┘│  │
│ │  🟢 No clube     │ │                              │  │
│ │  Histórico       │ └──────────────────────────────┘  │
│ │                  │                                    │
│ │  ── Observações  │                                    │
│ │  (compacto)      │                                    │
│ └──────────────────┘                                    │
└────────────────────────────────────────────────────────┘
```

### Sub-header (breadcrumb)
- "← Busca" (link azul) → nome da pessoa atual
- **Navegação recursiva**: ao clicar em qualquer pessoa vinculada, o
  perfil recarrega com os dados dessa pessoa e o breadcrumb acumula:
  `← Busca › Carlos Mendes › Lucia Mendes`
- Cada nome no breadcrumb é clicável (volta ao perfil daquela pessoa)
- Rota: `/manager/pessoa/:id` — mesma tela, ID diferente
- **SEM navegação anterior/próximo** (removido por decisão do dono)

### Sidebar (280px, fixa, branca, borda direita)
Empilha verticalmente, sem scroll (cabe em 1080px):

1. **Identificação**: avatar 88px centralizado + nome 18px + badge de tipo
2. **Dados**: CPF, Telefone, Placa — layout label:valor em flex space-between.
   Labels: 11px, uppercase, #6B7280. Valores: 13px.
3. **Presença**: indicador verde/cinza + hora de entrada + histórico 3 últimos
4. **Observações** (margin-top auto, cola no fundo): notas livres compactas

**SEM botão de WhatsApp na sidebar** — a ação de reenvio vive exclusivamente
no banner de pendência (área principal). Evita duplicação de CTAs.

### Área principal

#### Banner de pendência (condicional — ÚNICO ponto de ação de cadastro)
- Aparece no topo quando há pendência (foto ausente, cadastro incompleto etc)
- Fundo #FFFBEB, borda #FDE68A, ícone alert, botão de ação ESPECÍFICO
  (não "Resolver" genérico, mas "Reenviar link" com ícone WhatsApp quando
  a pendência é cadastro incompleto, ou "Solicitar foto" etc)
- **Este banner é o ÚNICO lugar com ação de cadastro/WhatsApp** — não há
  botão duplicado na sidebar. Consolidação feita por decisão do dono.

#### Métricas (4 cards em grid)
- Urgentes com cor: "Autorizações ativas" (fundo verde #F0FDF4, borda #BBF7D0),
  "Aguardando" (fundo âmbar #FFFBEB, borda #FDE68A)
- Neutras: "Pessoas vinculadas", "Visitas este mês" (fundo branco)
- Número: 22px weight 500, cor contextual (verde/âmbar/preto)
- Label: 11px uppercase #6B7280 (urgentes usam cor escura do ramp)

#### Vínculos (caixa grande, grid 3 colunas)
- Título: "Vínculos" + contagem "N pessoas autorizadas por [nome]"
- Cada pessoa = card com: avatar 36px (cor de fundo do tipo, iniciais) +
  nome + relação (ex: "Cônjuge", "Filho", "Convidado") + badge de tipo
- **SEM indicador de presença nos vínculos** (removido por decisão do dono
  — presença já está na sidebar do perfil da própria pessoa)
- Seta chevron-right à direita de cada card
- **CLICÁVEL**: navega para `/manager/pessoa/:id` daquela pessoa
  (mesmo componente de perfil, dados diferentes — navegação recursiva)
- Hover: border azul (#93C5FD) + shadow sutil
- Nota inferior: "Sócio titular — sem patrocinador acima" ou
  "Autorizado por [nome]" (clicável, abre perfil do autorizador)

#### Autorizações (expandíveis)
- Header: ícone shield + "Autorizações" + botão "+ Nova"
- Cada autorização = row com: bolinha status (verde=ativa, cinza=expirada),
  título, local/período, label de status
- Chevron down/up indica que é expandível
- **Ao clicar**: expande inline mostrando grid 2 colunas com Autorizador,
  Período, Observação + botão "Revogar acesso" (vermelho outline)
- Hover no header: fundo #FAFBFC
- Chevron rotaciona na transição (0.2s)

#### Aguardando autorização
- Header: ícone clock + "Aguardando autorização" + badge contagem (âmbar)
- Cada pessoa = card com avatar + nome + contexto + botão "Definir acesso"
  (azul preenchido)
- **Card clicável** (abre perfil), botão intercepta o click (stopPropagation)
  e abre modal de autorização

### Regra de navegação recursiva (IMPORTANTE para implementação)

Toda pessoa clicável em qualquer lugar do perfil abre o MESMO componente
de Perfil com o ID daquela pessoa. Isso inclui:

- Cards de vínculo na caixa Vínculos
- Pessoas na caixa Aguardando autorização
- Nome do autorizador no detalhe expandido de uma autorização
- Nome do patrocinador na nota inferior dos vínculos

O breadcrumb acumula os nomes: `← Busca › Carlos Mendes › Lucia Mendes`.
Cada segmento é clicável (navigate(-N) ou push direto). Em React Router
isso é só `navigate('/manager/pessoa/${id}')` — o componente Perfil já
recebe `useParams<{id}>` e re-renderiza.

---

## Tela 4: Notificações

Rota: `/manager/notificacoes`
Acesso: clique no sino do header.

### Breadcrumb
`← Busca › Notificações` + botão "Marcar todas como lidas" alinhado à direita.

### Abas filtráveis (topo)
Barra com fundo #F3F4F6, border-radius 8px, padding 3px. 4 botões:
- **Todas** (default ativo) | **Ação** | **Segurança** | **Atividade**
- Aba ativa: fundo branco, shadow sutil, texto preto
- Cada aba mostra contagem de não-lidas ao lado do label (11px, muted)
- Clicar filtra os grupos abaixo (não recarrega página)

### Grupos
Notificações agrupadas por categoria, cada grupo com label uppercase:
- **"Precisa de você"** (categoria `acao`) — ícone clock, cor azul
- **"Segurança"** (categoria `seguranca`) — ícone alert-triangle, cor vermelha
- **"Atividade"** (categoria `atividade`) — ícone shield-check, cor cinza

### Card de notificação
Layout: flex, align-items start, gap 12px, padding 12px 14px, border-radius 10px.

| Elemento | Spec |
|---|---|
| Ícone | 28x28px, border-radius 8px, borda 0.5px (azul p/ ação, vermelha p/ segurança, cinza p/ atividade), fundo branco, ícone Tabler 14px centralizado |
| Título | 13px, weight 500 (não-lida) ou weight 400 + cor #6B7280 (lida) |
| Detalhe | 12px, cor #6B7280 |
| Quando | 11px, cor #9CA3AF |
| Dot não-lida | 8px circular, cor da categoria (azul/vermelho/verde), some ao marcar como lida |

**Estados**:
- Não-lida ação: fundo #EFF6FF, hover #DBEAFE
- Não-lida segurança: fundo #FEF2F2, hover #FEE2E2
- Lida: fundo transparente, hover #F9FAFB

### Comportamento ao clicar
- Marca como lida (remove fundo tintado + dot)
- **Navega para `/manager/pessoa/:id`** da pessoa envolvida (quando há pessoa)
- Notificações sem pessoa associada (ex: alertas genéricos) são apenas informativas

### Dados
```ts
interface Notificacao {
  id: string;
  categoria: 'acao' | 'seguranca' | 'atividade';
  titulo: string;      // suporta <b> para destaque de nomes
  detalhe: string;
  quando: string;       // relativo ("há 8 min") ou absoluto ("hoje, 15:02")
  lida: boolean;
  pessoaId?: string;    // se presente, clique navega pro perfil
}
```

### Largura
Conteúdo centralizado com max-width 720px — mais estreito que o perfil,
otimizado para leitura vertical (scan rápido).

---

## Tela 5: Modais (a ser desenhados)

- **Definir acesso** — formulário CADASTRO → AUTORIZAÇÃO (§4.1 do CLAUDE.md)
  Abre ao clicar "Definir acesso" no Aguardando ou "+ Nova" em Autorizações
- **Criar Convite** — gera URL única por convite

---

## Animações e transições

- Chips/resultados: aparecem com opacity 0→1 + translateY(-4px→0), duration 0.2s ease
- Troca de estado vazio→ativo: título some, conteúdo sobe, transição 0.3s
- Hover em cards: border-color muda suavemente (0.15s)
- Chips: transição de cor/borda ao ativar (0.15s)

---

## Referências visuais do dono do produto

1. **Google** — barra centralizada grande, resultados abaixo (não dropdown)
2. **Protótipo Entrada Segura** — chips dinâmicos por tipo (empresa, autorizador)
3. **GitHub** — perfil com caixas de informação modulares
4. **App bancário** — sino com badge de notificações
5. **Entrada Segura (Concierge)** — barra de busca por CPF/Nome com resultados em lista

---

## Acessibilidade (correções aplicadas)

- Labels uppercase: cor #6B7280 (não #9CA3AF) — ratio ~4.6:1 contra branco
- Área clicável das autorizações expandíveis: row inteira, não só o chevron
- Botões de ação: labels específicos ("Solicitar foto", "Definir acesso",
  "Revogar acesso") em vez de genéricos ("Resolver", "Autorizar")
- Hover states visuais em todos os cards clicáveis (borda azul + shadow)

## Hierarquia de botões

- **Primário** (azul preenchido #3B82F6, texto branco): ação principal
  → "Definir acesso"
- **Contextual outline** (fundo/borda da cor do contexto):
  → "Solicitar foto" (âmbar), "Revogar acesso" (vermelho)
- **Texto** (cor azul, sem fundo): ação secundária
  → "+ Nova", ícones de adicionar

## Arquivos de mockup

- `mockups/01-busca-completa.html` — Busca com painel operacional (landing)
  + pesquisa interativa com filtros e resultados (v4 — aprovado)
- `mockups/02-perfil.html` — Perfil sidebar+main (interativo, v6 — sem
  bolinhas de presença nos vínculos, botão WhatsApp consolidado no banner)
- `mockups/03-notificacoes.html` — Notificações com abas filtráveis (aprovado v2)
