// Menu hambúrguer controlado por JavaScript, com estado anunciado para leitor de tela.
// O botão "Menu" tem aria-expanded (false/true) e aria-controls apontando para o nav.
// O checkbox escondido da EP 2 continua no HTML só como reserva para quando o script não carrega.

export function iniciarMenu() {
  const botao = document.querySelector('.menu-botao');
  const nav = document.getElementById('menu-principal');
  if (!botao || !nav) return;

  botao.addEventListener('click', () => {
    const aberto = botao.getAttribute('aria-expanded') === 'true';
    definirMenu(!aberto);
  });

  // Esc fecha o menu e devolve o foco ao botão
  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && botao.getAttribute('aria-expanded') === 'true') {
      definirMenu(false);
      botao.focus();
    }
  });
}

export function definirMenu(aberto) {
  const botao = document.querySelector('.menu-botao');
  const nav = document.getElementById('menu-principal');
  if (!botao || !nav) return;
  botao.setAttribute('aria-expanded', String(aberto));
  nav.classList.toggle('menu--aberto', aberto);
}
