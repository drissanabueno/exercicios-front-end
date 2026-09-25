// Ponto de entrada da aplicação. Só liga os eventos; a lógica fica nos módulos.
import { renderizar } from './modules/rotas.js';

// Toda vez que o hash muda (clique no menu, botão voltar do navegador), renderiza a rota nova.
window.addEventListener('hashchange', renderizar);

// Ao abrir a página: se não há rota na URL, vai para o início (o que dispara o hashchange acima);
// se já há, renderiza direto. Assim dá para atualizar a página e continuar onde estava.
document.addEventListener('DOMContentLoaded', () => {
  if (!location.hash.startsWith('#/')) {
    location.hash = '#/inicio';
  } else {
    renderizar();
  }
});