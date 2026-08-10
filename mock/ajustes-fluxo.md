# Ajustes no Fluxo — Entrada Segura (Totem Facial)

> Contexto: o protótipo simula, tela a tela, a experiência de uma pessoa usando um
> dispositivo/totem de reconhecimento facial para conseguir acesso. Não é um app
> cliente completo — é a interface do próprio dispositivo facial.

## Status
Documento em construção. Ainda coletando os pontos de ajuste com o usuário antes de
implementar qualquer mudança de código.

---

## 1. Etapa "Qual o seu destino?" — simplificar para Apartamento

**Fluxo atual (a remover):**
- Pergunta 1: "Qual o seu destino?" com opções BLOCO A, BLOCO B, BLOCO C, BLOCO D, BLOCO E
- Pergunta 2 (em seguida): "Qual o seu destino?" com números de apartamento (100–107, com scroll)

**Mudança pedida:**
- Retirar completamente a etapa de seleção de **Bloco**.
- Manter somente a etapa de **Apartamento**.
- Reduzir a quantidade de opções de apartamento exibidas, para que **não seja
  necessário rolar (scroll)** a tela — a lista precisa caber inteira na viewport.
- **Seleção direta:** os botões de apartamento passam a avançar a etapa
  **imediatamente ao serem clicados**. Remove-se o padrão atual de "marcar opção
  e depois clicar em Avançar lá embaixo" — um único toque no apartamento já
  seleciona e avança para a próxima tela.

**Pendente de definição:**
- Quantidade final de apartamentos a exibir (ex: 4? 5? 6?).
- Se o valor terá alguma relação com o bloco (já que o bloco está sendo removido) ou
  será uma lista simples e direta.

---

## 2. Etapa "Ligar para o Proprietário" — trazer de volta e redesenhar

**Situação atual:** essa etapa foi retirada em algum momento e precisa **voltar**.

**Como funciona agora (implementado):**
- Quando o fluxo chega na etapa de acionar o proprietário, a tela passa a mostrar
  **dois celulares/frames separados lado a lado** (dois `PhoneShell` distintos,
  não um painel colado dentro do mesmo aparelho):
  - **Celular da esquerda (o totem):** mostra "Um instante, acionando
    proprietário...".
  - **Celular da direita (o proprietário):** simula uma conversa de **WhatsApp**
    — recebe a foto capturada na verificação facial, uma mensagem perguntando se
    autoriza a entrada, e dois botões **Autorizar / Não Autorizar**.
  - Timeout de **4 segundos**: se ninguém clicar, autoriza automaticamente
    (simula resposta do proprietário).
  - Ao decidir (clique ou timeout), os dois celulares avançam juntos para a
    próxima etapa (checklist de liberação) — **voltando a exibir só 1 celular**.
- Na etapa final de aviso ao proprietário (pós-liberação), o mesmo padrão de
  2 celulares aparece novamente: o totem mostra "Acesso concluído / Toque para
  reiniciar" e o celular do proprietário mostra a notificação "A pessoa acabou
  de entrar" — depois volta a 1 celular ao reiniciar o cenário.

**Resolvido:**
- Tempo de exibição: 4s, com botões já clicáveis desde o início.
- "Não Autorizar" leva à tela de Acesso Negado.
- O frame de 2 celulares aparece nos 3 fluxos sempre que há contato com o
  proprietário (pedido de autorização) ou aviso final de entrada.

---

## 3. UI geral — botões e navegação por toque

**Botões centralizados:**
- Todos os botões (ex: "Avançar", "Iniciar Verificação", etc.) passam a ficar
  **centralizados** na tela (hoje alguns estão alinhados de forma diferente).

**Remover logo "Entrada Segura":**
- Tirar a logo/marca "Entrada Segura" das telas onde ela aparece hoje (splash,
  tela de chamada, etc.) — a definir exatamente de quais telas sai.

**Navegação por toque na tela:**
- A pessoa parada na porta deve poder **clicar/tocar no meio da tela** para avançar
  de etapa (não só nos botões). Ideia: simular a interação real de alguém tocando
  num totem/tablet fixado na porta, sem precisar mirar num botão pequeno.

**Pendente de definição:**
- Se o toque no meio da tela substitui o botão "Avançar" ou convive com ele.
- De quais telas exatamente a logo "Entrada Segura" deve ser removida (todas? só
  as intermediárias, mantendo no splash inicial?).

---

## 4. Os três fluxos completos (substituem o fluxo atual do PDF)

> Cada fluxo abaixo é a sequência completa de telas simuladas no totem, conforme a
> situação da pessoa que chega na porta.

**Tela "Crie Sua Conta Para Continuar" removida:**
- A etapa intermediária que pedia para "criar conta" (hoje entre a verificação
  facial e o CPF, no fluxo de registro) é **retirada** do fluxo. Vai direto da
  selfie para o CPF.

### 4.1 Pessoa SEM cadastro e SEM autorização

1. **Registra Selfie** (verificação facial: posicionar rosto → sorrir → analisando → concluída)
2. **Digita CPF**
3. **Confirma pergunta secreta** — Data de nascimento, no formato **Mês / Dia / Ano**
4. **Seleciona apartamento** (lista simplificada, sem bloco, sem scroll — ver item 1)
5. **Bot liga via WhatsApp e envia mensagem pro autorizador**
   — os **2 frames de telefone** (o do totem simulando a chamada/envio + o frame
   lateral do celular do proprietário recebendo a mensagem de WhatsApp — ver item 2)
6. **Registra, autoriza e libera** — checklist final (Cadastro criado / Autorização
   ativa / Liberação autorizada)
7. **Mensagem de abrir a porta** (tela "Porta Aberta" com a portinha)
8. **Autorizador recebe aviso de entrada** no celular (notificação separada, depois
   da liberação, confirmando que a pessoa entrou)

### 4.2 Pessoa JÁ tem cadastro mas NÃO tem autorização de acesso

1. **Registra Selfie**
2. **Seleciona apartamento** (a pessoa ainda precisa dizer para onde vai — só a
   identificação inicial de CPF + pergunta secreta é pulada, pois já é cadastrada)
3. **Bot liga via WhatsApp e autorizador recebe mensagem** (mesmo mecanismo dos 2
   frames do item 2)
4. **Registra autorização e liberação** e **abre a porta**
5. **Aviso no telefone do autorizador** avisando que a pessoa entrou

### 4.3 Pessoa JÁ tem cadastro E JÁ tem autorização

1. **Registra Selfie**
2. **Registra Liberação** e **Abre a Porta** (sem etapa de contatar o proprietário —
   acesso já autorizado previamente)
3. **Autorizador recebe mensagem no WhatsApp** avisando que a pessoa entrou (aqui
   não é um pedido de autorização, é só um aviso informativo pós-entrada)

**Observação importante:** nos três fluxos, sempre que a pessoa **entra**, o
autorizador recebe uma notificação/mensagem de WhatsApp avisando da entrada — a
diferença entre os fluxos é **se antes disso** é necessário pedir autorização (fluxo
4.1 e 4.2) ou não (fluxo 4.3), e se é necessário capturar cadastro (CPF, pergunta
secreta, apartamento — só no fluxo 4.1).

**Pendente de definição:**
- Como o protótipo vai "saber" em qual dos 3 fluxos está (é uma escolha manual de
  qual fluxo simular, tipo um seletor de cenário no protótipo?).
- Nome/rótulo exato de cada notificação final para o autorizador (mensagem de
  "entrou" — texto exato).

---

## Perguntas em aberto para validação
1. Quantos apartamentos mostrar na nova lista sem scroll?
2. Qual o tempo de exibição do frame do WhatsApp/proprietário?
3. Textos exatos da conversa simulada de WhatsApp (pedido de autorização e aviso de entrada).
4. O que acontece no botão "Não Autorizar"?
5. O toque no meio da tela substitui o botão "Avançar" ou convive com ele?
6. De quais telas exatamente remover a logo "Entrada Segura"?
7. Como selecionar/alternar entre os 3 fluxos no protótipo (cadastro+autorização / só cadastro / nenhum)?
