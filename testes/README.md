# Testes do formulário de cadastro

Cenários de teste do formulário da [Primeira Porta](https://drissanabueno.github.io/exercicios-front-end/primeira-porta/#/cadastro), escritos em Gherkin no arquivo [`cadastro.feature`](cadastro.feature). Rodei a primeira versão à mão no site publicado em 30/10/2026, e as mensagens nos cenários são as que aparecem na tela.

Estão separados em fluxo principal (cadastro que dá certo), fluxos alternativos (campos opcionais, máscara, rascunho salvo, botão Limpar) e exceções (formulário vazio, formato errado, data fora do limite).

Depois de escrever os cenários, transformei cada um em teste automático com Playwright, em [`cadastro.spec.js`](cadastro.spec.js). Os testes têm o mesmo nome dos cenários e rodam duas vezes, numa tela de computador e numa de celular (32 testes de tela).

## Testes de API

O formulário pede CEP, cidade e estado. A API pública do [ViaCEP](https://viacep.com.br) devolve a cidade e o estado a partir do CEP, então antes de pensar em usar ela no site eu testei como ela responde. Os cenários estão em [`api-viacep.feature`](api-viacep.feature) e os testes em [`api-viacep.spec.js`](api-viacep.spec.js). Eles fazem as requisições HTTP direto, sem abrir navegador, e conferem status, formato da resposta e campos (7 testes).

Duas coisas que valem saber antes de usar essa API:

- Um CEP no formato certo mas que não existe não volta 404. Volta 200 com `{ "erro": "true" }`, então o site precisa olhar o corpo da resposta, não só o status.
- O `erro` vem como texto (`"true"`, entre aspas) e não como booleano. Um `if (dados.erro === true)` nunca seria verdadeiro.

Formato errado (poucos dígitos, letra, dígito a mais) volta 400, e um POST volta 405.

## Como rodar

```bash
npm install
npx playwright install chromium
npm test
```

Por padrão os testes abrem o site publicado. Para testar uma cópia local, rode com `BASE_URL=http://127.0.0.1:5500/primeira-porta/ npm test`. O relatório fica em `playwright-report/` (`npx playwright show-report`).

## O que encontrei

**1. Estado em letra minúscula era recusado.** Quem digitava "pr" via o campo com erro e o pedido de "Sigla com duas letras maiúsculas", e o site podia resolver isso sozinho. Agora ele converte para maiúscula enquanto a pessoa digita.

**2. A mensagem da data aparecia no formato errado.** Com uma data depois de 2010, a mensagem dizia "A data precisa ser até 2010-12-31.", em ano-mês-dia, enquanto o campo mostra 31/12/2010. Agora a mensagem usa o mesmo formato do campo.

**3. A página rolava para o lado em algumas larguras.** Em 768 px sobravam 35 px e em 1024 px sobravam 19 px. O submenu de Projetos, mesmo invisível, passava da borda direita da tela. Agora ele abre para a esquerda.

Os três estão corrigidos. Primeiro mudei os testes para o comportamento certo e vi que falhavam, depois corrigi o site e rodei de novo, então os testes avisam se algum deles voltar.
