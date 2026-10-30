# Testes do formulário de cadastro

Cenários de teste do formulário da [Primeira Porta](https://drissanabueno.github.io/exercicios-front-end/primeira-porta/#/cadastro), escritos em Gherkin no arquivo [`cadastro.feature`](cadastro.feature). Rodei todos à mão no site publicado em 30/10/2026, e as mensagens nos cenários são as que aparecem na tela.

Estão separados em fluxo principal (cadastro que dá certo), fluxos alternativos (campos opcionais, máscara, rascunho salvo, botão Limpar) e exceções (formulário vazio, formato errado, data fora do limite).

Depois de escrever os cenários, transformei cada um em teste automático com Playwright, em [`cadastro.spec.js`](cadastro.spec.js). Os testes têm o mesmo nome dos cenários e rodam duas vezes, numa tela de computador e numa de celular (28 testes de tela).

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

**1. Estado em letra minúscula é recusado.** Se a pessoa digita "pr", o campo fica com erro e pede "Sigla com duas letras maiúsculas". Funciona, mas obriga a pessoa a corrigir uma coisa que o site podia resolver sozinho, convertendo para maiúscula enquanto ela digita, do mesmo jeito que a máscara já faz com o CPF.

**2. A mensagem da data aparece no formato errado.** Com uma data depois de 2010, a mensagem é "A data precisa ser até 2010-12-31.", com a data em ano-mês-dia. O campo mostra a data como 31/12/2010, então a mensagem deveria usar o mesmo formato.

Os dois ainda estão abertos no código.
