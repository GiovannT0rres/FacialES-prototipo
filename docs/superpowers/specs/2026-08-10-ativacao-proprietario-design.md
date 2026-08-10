# Ativação de Proprietário na plataforma — Design

## Contexto

Novo módulo do protótipo "Portaria Autônoma", acessível por um novo card no Hub
(`app/page.tsx`). Simula a tela de um operador/síndico no sistema real "Entrada
Segura" ativando um proprietário para uma unidade — baseado em duas capturas de
tela fornecidas pelo usuário (painel escuro, lista de pedidos pendentes, seleção
de motivo de acesso e unidade).

É um demonstrativo: segue o padrão visual do sistema real (tema escuro, cards
arredondados, rótulos de motivo coloridos) sem replicar pixel a pixel. Este é o
primeiro dos dois apps planejados — o segundo (autorização de familiar via
check-in) vem depois, como módulo separado.

## Rota e Hub

- Nova rota: `/ativacao-proprietario`.
- Novo card em `app/page.tsx`: título "Ativação de Proprietário na plataforma",
  path `/ativacao-proprietario`, seguindo o mesmo padrão dos cards existentes
  (ícone lucide-react, `textColor`/`bgLight`, descrição curta).

## Layout geral

Reaproveita o padrão de `PhoneShell` já usado em `/facial`: um ou dois celulares
lado a lado dependendo da etapa. Tema escuro (diferente do `/facial`, que é
claro), consistente com as capturas de tela do sistema real.

## Seletor de cenário

Dois botões no topo da página (mesmo padrão do `/facial`):
- **Ativar** (cenário padrão/inicial)
- **Rejeitar**

Cada cenário tem seu próprio fluxo independente e reinicia ao trocar.

## Fluxo "Ativar"

1. **Painel do operador** (1 celular): mostra um card de pedido pendente com
   dados fictícios (nome, telefone, condomínio/unidade em texto, avatar
   placeholder) e o bloco "Qual o motivo do acesso?" com 5 opções (Proprietário,
   Equipe, Visitante, Prestador de Serviço, Colaborador) — "Proprietário" já vem
   pré-destacado com contorno, as demais são apenas visuais (sem ação).
2. Abaixo, bloco "Qual a Unidade?" com uma lista/dropdown simples de unidades
   (2–4 opções fictícias, ex: "101", "102" — não precisa ser dropdown real com
   busca, pode ser lista de botões clicáveis como em `DestinoScreen`).
3. **Seleção direta**: clicar numa unidade já ativa automaticamente (sem botão
   extra de confirmar), mesmo padrão de toque único adotado no `/facial` para
   seleção de apartamento.
4. Ao ativar, aparece um **segundo `PhoneShell`** ao lado, mostrando uma
   conversa de WhatsApp (reaproveitando o padrão visual de
   `WhatsappProprietarioScreen`) com uma mensagem contendo um card de
   "boarding pass": nome, unidade, condomínio e status "Acesso Liberado" — só
   texto, sem QR code.
5. Alguma forma de reiniciar o cenário (botão ou toque na tela, consistente
   com o resto do protótipo).

## Fluxo "Rejeitar"

1. Mesmo painel do operador do passo 1 acima.
2. Ao clicar em "Rejeitar", o cenário reinicia **imediatamente** para o estado
   inicial do painel — sem tela de confirmação intermediária e sem segundo
   celular.

## Componentes

- Novo diretório `app/ativacao-proprietario/` seguindo a estrutura de
  `app/facial/` (`page.tsx`, `components/screens/*`, `lib/types.ts`).
- Novo componente de painel do operador (tema escuro) — não reaproveita
  `GradientScreen` (que é para telas claras do totem), mas pode reaproveitar
  `PhoneShell`.
- Reaproveita o padrão visual/estrutural de `WhatsappProprietarioScreen` para a
  segunda tela (card de boarding pass em vez de foto+decisão).

## Fora de escopo (por enquanto)

- Fidelidade visual total ao sistema real (logo, cores exatas, dropdown com
  busca funcional).
- Ações reais nas outras 4 opções de motivo (Equipe, Visitante, etc.).
- O segundo app (autorização de familiar via check-in) — módulo separado, a
  ser especificado depois.
