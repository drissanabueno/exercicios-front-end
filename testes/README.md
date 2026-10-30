# Testes do formulário de cadastro

Cenários de teste do formulário da [Primeira Porta](https://drissanabueno.github.io/exercicios-front-end/primeira-porta/#/cadastro), escritos em Gherkin no arquivo [`cadastro.feature`](cadastro.feature). Rodei todos à mão no site publicado em 30/10/2026, e as mensagens nos cenários são as que aparecem na tela.

Estão separados em fluxo principal (cadastro que dá certo), fluxos alternativos (campos opcionais, máscara, rascunho salvo, botão Limpar) e exceções (formulário vazio, formato errado, data fora do limite).

## O que encontrei

**1. Estado em letra minúscula é recusado.** Se a pessoa digita "pr", o campo fica com erro e pede "Sigla com duas letras maiúsculas". Funciona, mas obriga a pessoa a corrigir uma coisa que o site podia resolver sozinho, convertendo para maiúscula enquanto ela digita, do mesmo jeito que a máscara já faz com o CPF.

**2. A mensagem da data aparece no formato errado.** Com uma data depois de 2010, a mensagem é "A data precisa ser até 2010-12-31.", com a data em ano-mês-dia. O campo mostra a data como 31/12/2010, então a mensagem deveria usar o mesmo formato.

Os dois ainda estão abertos no código.
