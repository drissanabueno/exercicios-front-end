# Exercícios de Front-end

Experiências práticas da disciplina **Desenvolvimento Front-end para Web** (Engenharia de Software, Universidade Positivo, 2026). Uma pasta por exercício, HTML, CSS e JavaScript puros, sem framework: o objetivo aqui é dominar o fundamento que os frameworks usam por baixo.

## Exercícios

| Pasta | Tema | Status |
|---|---|---|
| [`primeira-porta`](primeira-porta/) | EP 1: HTML5 semântico e formulários com validação nativa · EP 2: design system em variáveis CSS, Grid de 12 colunas, Flexbox, menu responsivo e componentes de feedback · EP 3: SPA com roteamento por hash, templates, validação em JavaScript, localStorage e módulos ES · EP 4: GitFlow, pull requests, revisão WCAG 2.1 AA e deploy no GitHub Pages | EP 1 entregue (1,0) · EP 2 entregue (1,0) · EP 3 entregue · EP 4 entregue |

## Primeira Porta (EP 1 a EP 4)

Site institucional de uma ONG fictícia de empregabilidade tech inclusiva (projeto que criei na disciplina de Design Profissional). Três páginas:

- Início: apresentação, com hierarquia `h1` → `h2` → `h3` e seções semânticas
- Projetos: iniciativas sociais em `article`, cada um com `header`, `time` e uma etiqueta de categoria
- Cadastro: formulário de candidatos, voluntários e doadores

Desde a EP 3 o site é uma SPA: existe um único `index.html`, e o conteúdo de cada tela fica em `html/` e é carregado pelo JavaScript. Desde a EP 4 ele está publicado: **https://drissanabueno.github.io/exercicios-front-end/primeira-porta/**

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

### EP 3 — comportamento (JavaScript)

Estrutura de pastas exigida pelo roteiro: `html/` (fragmentos das três telas), `css/`, `imagens/` e `js/`. O JavaScript fica em oito arquivos, cada um com uma responsabilidade:

| Arquivo | O que faz |
|---|---|
| `js/main.js` | Ponto de entrada; liga `hashchange` e `DOMContentLoaded` |
| `js/modules/rotas.js` | Roteamento por hash (`#/inicio`, `#/projetos`, `#/cadastro`): busca o fragmento com `fetch`, injeta no `main`, marca o link ativo, cuida do foco |
| `js/modules/templates.js` | Gera os cartões de projeto clonando um `<template>` do HTML |
| `js/dados/projetos.js` | Lista com os dados dos projetos, sem HTML |
| `js/modules/formulario.js` | Validação com `checkValidity()` e `validity`, mensagens por tipo de erro, resumo acima do formulário |
| `js/modules/armazenamento.js` | Rascunho salvo a cada tecla e histórico de cadastros no `localStorage` |
| `js/modules/modal.js` | Modal com delegação de evento no `main`, fecha com Esc e devolve o foco |
| `js/modules/mascaras.js` | Máscaras de CPF, telefone e CEP com a biblioteca IMask (CDN) |

Os módulos não importam uns aos outros: o formulário dispara um evento próprio (`cadastro:enviado`) que o armazenamento escuta, e o modal reage a atributos `data-modal-abrir` em qualquer elemento. Só o roteador conhece as funções de cada tela.

### EP 4 — versionamento, acessibilidade e deploy

- **GitFlow**: `main` publicada, `develop` de integração, `feature/acessibilidade` e `feature/deploy` devolvidas por pull request (#4, #5) e release `v1.0.0` pelo PR #6. Três issues com milestone "EP 4".
- **Acessibilidade**: o botão do menu hambúrguer ganhou `aria-expanded` e `aria-controls` (novo `js/modules/menu.js`), fecha com Esc e devolve o foco; o checkbox reserva saiu da ordem do teclado. Lighthouse de acessibilidade: 94 → 100.
- **Otimização**: `main` reserva altura antes de o fragmento chegar e o logo tem tamanho fixo, o que levou o Cumulative Layout Shift de 0,845 para 0,001 e a performance de 75 para 99. Minificação foi avaliada e descartada, com os números na seção Deploy.
- **Deploy**: GitHub Pages a partir da `main`, com `.nojekyll`. Lighthouse no site publicado: 98 / 100 / 100 / 100 (`docs/etapa-4/`).

### Validação

HTML e CSS validados no W3C ao fim de cada etapa, com os resultados em `primeira-porta/docs/`:

- `etapa-1/`: as três páginas no Nu HTML Checker, sem erros nem avisos
- `etapa-2/`: o CSS no validador Jigsaw, sem erros (os avisos são só sobre `var()`, que o validador não confere)
- `etapa-3/`: revalidação de HTML e CSS após os componentes, e prints do menu no celular e no desktop, das etiquetas, dos alertas, do modal e dos estados do formulário

### Deploy

O site está publicado no GitHub Pages, a partir da branch `main`:

**https://drissanabueno.github.io/exercicios-front-end/primeira-porta/**

Não há etapa de build: o Pages serve os arquivos como estão. O roteamento por hash e o `fetch` dos fragmentos funcionam porque todos os caminhos são relativos à pasta `primeira-porta/`. O arquivo `.nojekyll` na raiz do repositório desliga o processamento Jekyll do Pages, que poderia ignorar arquivos.

Sobre otimização (issue #3): o site inteiro, sem as fontes, tem cerca de 60 KB, e o maior arquivo é o `styles.css` com 22 KB. Minificar economizaria poucos kilobytes e tiraria a legibilidade do código, que faz parte da entrega; por isso os arquivos ficam como estão. As fontes do Google já usam `display=swap`, o `preconnect` está no `head`, e os PNG do logo não são carregados pelo site (ficam só para uso externo). A medição com o Lighthouse está em `primeira-porta/docs/etapa-4/`.

### Versionamento

O repositório segue GitFlow simplificado desde a EP 4:

- `main`: versões publicadas; é a branch que o GitHub Pages serve. Cada release recebe uma tag (`v1.0.0`).
- `develop`: integração do que está pronto mas ainda não foi publicado.
- `feature/*`: uma branch por funcionalidade (`feature/acessibilidade`, `feature/deploy`), aberta a partir de `develop` e devolvida por pull request.

As mensagens de commit seguem o Conventional Commits em português: `feat:`, `fix:`, `docs:`, `chore:`, com escopo quando ajuda (`feat(a11y):`). As tags `ep1-entregue` e `ep2-entregue` marcam o estado do site ao fim de cada EP anterior à v1.0.0. Issues e milestones estão no próprio GitHub.

### Como ver

Desde a EP 3 o site precisa de um servidor local, porque `fetch` e módulos ES não funcionam em arquivos abertos direto do disco. No VS Code, instale a extensão Live Server, abra `primeira-porta/index.html` e clique em **Go Live**; o site abre em `http://127.0.0.1:5500/primeira-porta/`. Qualquer servidor estático serve (`python -m http.server`, por exemplo).

Para ver o site como estava ao fim de cada EP, use as tags `ep1-entregue` e `ep2-entregue` (nessas versões o `index.html` abre direto do disco).

Para o menu hambúrguer, estreite a janela abaixo de 768 px ou use o modo celular das ferramentas do desenvolvedor.

## Autora

Drissana Bueno · [github.com/drissanabueno](https://github.com/drissanabueno) · [LinkedIn](https://www.linkedin.com/in/drissanabueno)
