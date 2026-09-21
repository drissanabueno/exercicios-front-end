# Exercícios de Front-end

Experiências práticas da disciplina **Desenvolvimento Front-end para Web** (Engenharia de Software, Universidade Positivo, 2026). Uma pasta por exercício, HTML e CSS puros, sem framework: o objetivo aqui é dominar o fundamento que os frameworks usam por baixo.

## Exercícios

| Pasta | Tema | Status |
|---|---|---|
| [`ep1-primeira-porta`](ep1-primeira-porta/) | HTML5 semântico, formulários com validação nativa e máscaras, estrutura de projeto | em andamento |

## EP 1 — Primeira Porta

Site institucional de uma ONG fictícia de empregabilidade tech inclusiva (projeto que criei na disciplina de Design Profissional). Três páginas:

- `index.html`: apresentação, com hierarquia `h1` → `h2` → `h3` e seções semânticas
- `projetos.html`: iniciativas sociais em `article`, cada um com `header` e `time`
- `cadastro.html`: formulário de candidatos, voluntários e doadores

O que o formulário pratica: `fieldset` e `legend` para agrupar campos, `label` ligado por `for`/`id`, tipos `email`, `tel`, `date`, `number`, validação com `required` e `pattern` (máscaras de CPF, telefone e CEP), `datalist`, `radio`, `checkbox` de consentimento. Nenhuma linha de JavaScript: toda validação é do navegador.

O CSS usa variáveis (`:root`) como tokens, foco visível para navegação por teclado e um link "pular para o conteúdo".

### Como ver

Abra `ep1-primeira-porta/index.html` no navegador. Não precisa de servidor.

## Autora

Drissana Bueno · [github.com/drissanabueno](https://github.com/drissanabueno) · [LinkedIn](https://www.linkedin.com/in/drissanabueno)
