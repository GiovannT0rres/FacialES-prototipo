# Autorização via Check-in — Design

## Contexto

Terceiro módulo do protótipo "Portaria Autônoma", acessível por um novo card no
Hub. É uma variação do módulo "Ativação de Proprietário na plataforma"
(`/ativacao-proprietario`): mesma estrutura de painel do operador, mesmo
cabeçalho de menu, mesmo card de pedido e dropdown de unidade — mudando o
motivo pré-destacado para "Familiar" e adicionando dois campos extras
específicos desse cenário: período de acesso (início/término) e permissão de
sub-autorização.

## Rota e Hub

- Nova rota: `/autorizacao-familiar`.
- Novo card em `app/page.tsx`: título "Autorização via Check-in", path
  `/autorizacao-familiar`, seguindo o mesmo padrão dos cards existentes.

## Diferenças em relação a `/ativacao-proprietario`

1. **Mock do pedido:** nome diferente (ex: "Mariana Andrade") para deixar
   claro que é outra pessoa sendo autorizada, mantendo telefone e condomínio
   fictícios no mesmo padrão.
2. **Motivo pré-destacado:** "Familiar" em vez de "Proprietário" — mesmas 5
   opções de motivo, mudando qual recebe o contorno verde.
3. **Campos extras dentro do card "Qual o motivo do acesso?"**, logo abaixo
   das 5 opções de motivo:
   - "Período de acesso": dois inputs `type="date"` lado a lado (Início /
     Término), sem validação — só captura visual/mock.
   - "Pode autorizar outras pessoas?": dois botões Sim/Não; um fica destacado
     conforme a escolha do usuário (estado local, sem lógica de negócio real).
4. **Fluxo de ativação:** idêntico ao `/ativacao-proprietario` — abrir o
   dropdown "Qual a Unidade?", escolher uma unidade ativa automaticamente e
   revela o segundo `PhoneShell` com a mensagem de WhatsApp.
5. **Mensagem final de WhatsApp:** mesmo texto do módulo anterior
   ("Autorização concedida 🤩" com Suporte/Login/Senha/Sistema), sem
   alterações.
6. **Sem fluxo de rejeição** — mesmo padrão simplificado adotado no módulo
   anterior (só o caminho positivo).

## Componentes

- Novo diretório `app/autorizacao-familiar/` espelhando a estrutura de
  `app/ativacao-proprietario/` (`page.tsx`, `lib/types.ts`,
  `components/screens/*`).
- `BoardingPassScreen` é reaproveitado diretamente de
  `app/ativacao-proprietario/components/screens/BoardingPassScreen.tsx`
  (texto idêntico, sem props) — importado sem duplicar o arquivo.
- `PainelOperadorScreen` é um novo componente próprio deste módulo (não
  reaproveitado por import direto), pois tem os dois blocos extras de campo
  que o painel de proprietário não tem. Copia a estrutura visual do painel
  existente como ponto de partida.

## Fora de escopo

- Lógica real de validação de datas ou de permissões de sub-autorização —
  são apenas elementos visuais/mock, sem consequência funcional no
  demonstrativo.
- Fluxo de rejeição.
