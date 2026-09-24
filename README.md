# Exercícios de Front-end

Experiências práticas da disciplina **Desenvolvimento Front-end para Web** (Engenharia de Software, Universidade Positivo, 2026). Uma pasta por exercício, HTML e CSS puros, sem framework: o objetivo aqui é dominar o fundamento que os frameworks usam por baixo.

## Exercícios

| Pasta | Tema | Status |
|---|---|---|
| [`primeira-porta`](primeira-porta/) | EP 1: HTML5 semântico e formulários com validação nativa · EP 2: design system em variáveis CSS, Grid de 12 colunas, Flexbox, menu responsivo e componentes de feedback | EP 1 entregue (1,0) · EP 2 entregue |

## Primeira Porta (EP 1 e EP 2)

Site institucional de uma ONG fictícia de empregabilidade tech inclusiva (projeto que criei na disciplina de Design Profissional). Três páginas:

- `index.html`: apresentação, com hierarquia `h1` → `h2` → `h3` e seções semânticas
- `projetos.html`: iniciativas sociais em `article`, cada um com `header`, `time` e uma etiqueta de categoria
- `cadastro.html`: formulário de candidatos, voluntários e doadores

### EP 1 — estrutura (HTML)

O que o formulário pratica: `fieldset` e `legend` para agrupar campos, `label` ligado por `for`/`id`, tipos `email`, `tel`, `date`, validação com `required` e `pattern` (máscaras de CPF, telefone e CEP), `datalist`, `radio`, `checkbox` de consentimento. Nenhuma linha de JavaScript: toda validação é do navegador.

### EP 2 — apresentação (CSS)

Todo o estilo está em [`css/styles.css`](primeira-porta/css/styles.css), organizado em seis blocos, na ordem em que foram escritos:

1. **Design system em variáveis** (`:root`): 13 cores em três grupos (primárias, de estado e neutras), 6 tamanhos de texto em `rem` que crescem a partir de 1024 px, espaçamento em escala estrita de base 8 (`--e-1` a `--e-6`), raios e sombras. Fontes Crimson Pro (títulos) e Source Sans 3 (texto).
2. **Grid de 12 colunas** em `main` e nas seções da abertura, com cinco breakpoints mobile first (480, 768, 1024, 1280 e 1440 px). O grid é sempre de 12 colunas; o que muda por breakpoint é margem, gutter e quantas colunas cada bloco ocupa.
3. **Flexbox nos componentes**: cabeçalho, marca, menu, botões, grupo de botões, formulário, opções de radio/checkbox e rodapé.
4. **Menu responsivo sem JavaScript**: submenu dropdown com `:hover` e `:focus-within` no desktop; no celular, hambúrguer feito com um checkbox escondido e a pseudo-classe `:checked`.
5. **Estados de botão e feedback do formulário**: `:hover`, `:focus-visible`, `:active` e `:disabled`; mensagens de erro que aparecem com `:user-invalid + .dica` e check verde em `:user-valid`.
6. **Etiquetas, alertas e modal**: badges por categoria nos cartões, caixas de alerta em quatro variações e um modal aberto por link com `:target`.

Acessibilidade que atravessa tudo: foco de teclado sempre visível, contraste AA verificado, `prefers-reduced-motion` desligando as transições, mensagens de erro ligadas ao campo por `aria-describedby`.

### Validação

HTML e CSS validados no W3C ao fim de cada etapa, com os resultados em `primeira-porta/docs/`:

- `etapa-1/`: as três páginas no Nu HTML Checker, sem erros nem avisos
- `etapa-2/`: o CSS no validador Jigsaw, sem erros (os avisos são só sobre `var()`, que o validador não confere)
- `etapa-3/`: revalidação de HTML e CSS após os componentes, e prints do menu no celular e no desktop, das etiquetas, dos alertas, do modal e dos estados do formulário

### Como ver

Abra `primeira-porta/index.html` no navegador. Não precisa de servidor. Para o menu hambúrguer, estreite a janela abaixo de 768 px ou use o modo celular das ferramentas do desenvolvedor.

## Autora

Drissana Bueno · [github.com/drissanabueno](https://github.com/drissanabueno) · [LinkedIn](https://www.linkedin.com/in/drissanabueno)
