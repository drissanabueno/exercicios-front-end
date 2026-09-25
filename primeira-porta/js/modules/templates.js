// Gera os cartões de projeto a partir da lista de dados, clonando o <template> do HTML.
// Tudo é preenchido com textContent: os dados nunca passam por innerHTML.
import { projetos } from '../dados/projetos.js';

export function renderizarProjetos() {
  const template = document.getElementById('tpl-projeto');
  if (!template) return; // não está na página de projetos

  projetos.forEach((projeto) => {
    // template.content é o molde; cloneNode(true) copia ele inteiro, com os filhos
    const clone = template.content.cloneNode(true);

    clone.querySelector('article').id = projeto.id;

    const etiqueta = clone.querySelector('.etiqueta');
    etiqueta.textContent = projeto.etiqueta.texto;
    if (projeto.etiqueta.classe) etiqueta.classList.add(projeto.etiqueta.classe);

    clone.querySelector('h2').textContent = projeto.titulo;

    // Data e local: o cartão de doação não tem data, então o <time> sai
    const time = clone.querySelector('time');
    const local = clone.querySelector('.projeto__local');
    if (projeto.periodo) {
      time.dateTime = projeto.periodo.data;
      time.textContent = projeto.periodo.texto;
      local.textContent = ` · ${projeto.local}`;
    } else {
      time.remove();
      local.textContent = projeto.local;
    }

    clone.querySelector('.projeto__descricao').textContent = projeto.descricao;

    // Chamada: "Para quem: texto" ou "Como ajudar: [link]texto"
    const chamada = clone.querySelector('.projeto__chamada');
    chamada.querySelector('strong').textContent = projeto.chamada.rotulo;
    const link = chamada.querySelector('a');
    if (projeto.chamada.link) {
      link.href = projeto.chamada.link.href;
      link.textContent = projeto.chamada.link.texto;
    } else {
      link.remove();
    }
    chamada.querySelector('span').textContent = projeto.chamada.texto;

    // Link extra (só o cartão de doação tem)
    const extra = clone.querySelector('.projeto__extra');
    if (projeto.extra) {
      const a = extra.querySelector('a');
      a.href = projeto.extra.href;
      a.textContent = projeto.extra.texto;
    } else {
      extra.remove();
    }

    // Insere o cartão antes do próprio <template>, ou seja, direto dentro do <main>,
    // para o grid da EP 2 (main > article) continuar valendo
    template.before(clone);
  });
}