// Modal controlado por JavaScript.
// Um único listener no <main> atende todos os links de abrir e fechar, inclusive os que estão
// em cartões gerados pelo template depois que a página carregou (delegação de evento).
// Sem JavaScript, o link continua apontando para #modal-doacao e o :target do CSS abre o modal.

let ultimoFoco = null;

export function iniciarModal() {
  const main = document.getElementById('conteudo');

  main.addEventListener('click', (evento) => {
    const abrir = evento.target.closest('[data-modal-abrir]');
    if (abrir) {
      evento.preventDefault(); // impede o hash de mudar; quem abre o modal é este código
      abrirModal(document.getElementById(abrir.dataset.modalAbrir), abrir);
      return;
    }
    const fechar = evento.target.closest('[data-modal-fechar]');
    if (fechar) {
      evento.preventDefault();
      fecharModal(fechar.closest('.modal'));
      return;
    }
    // Clique no fundo escuro, fora da caixa, também fecha
    if (evento.target.classList.contains('modal--aberto')) fecharModal(evento.target);
  });

  document.addEventListener('keydown', (evento) => {
    if (evento.key !== 'Escape') return;
    const aberto = document.querySelector('.modal--aberto');
    if (aberto) fecharModal(aberto);
  });
}

function abrirModal(modal, origem) {
  if (!modal) return;
  ultimoFoco = origem;
  modal.classList.add('modal--aberto');
  document.body.style.overflow = 'hidden'; // trava a rolagem da página atrás
  const titulo = modal.querySelector('h2');
  titulo.tabIndex = -1;
  titulo.focus();
}

function fecharModal(modal) {
  if (!modal) return;
  modal.classList.remove('modal--aberto');
  document.body.style.overflow = '';
  if (ultimoFoco) ultimoFoco.focus(); // devolve o foco para o link que abriu
}