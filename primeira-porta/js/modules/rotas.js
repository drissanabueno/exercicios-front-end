// Roteamento por hash.
// A parte da URL depois do # muda sem recarregar a página; este módulo lê essa parte
// e decide qual fragmento de html/ colocar dentro do <main>.
//   #/inicio            → html/inicio.html
//   #/projetos          → html/projetos.html
//   #/projetos/apoio    → html/projetos.html, rolando até o id "apoio"
//   #/cadastro          → html/cadastro.html

const ROTAS = {
  inicio: { arquivo: 'html/inicio.html', titulo: 'Primeira Porta — Empregabilidade tech inclusiva' },
  projetos: { arquivo: 'html/projetos.html', titulo: 'Projetos — Primeira Porta' },
  cadastro: { arquivo: 'html/cadastro.html', titulo: 'Cadastro — Primeira Porta' },
};

const container = document.getElementById('conteudo');

// "#/projetos/apoio" vira { rota: "projetos", secao: "apoio" }. Sem hash, a rota é "inicio".
export function lerRota() {
  const partes = location.hash.replace('#/', '').split('/');
  return { rota: partes[0] || 'inicio', secao: partes[1] || null };
}

// Limpa o <main> e injeta o fragmento da rota atual.
export async function renderizar() {
  // Hashes que não começam com #/ não são rotas (ex.: #modal-doacao, #apoio, #conteudo).
  // Nesses casos o navegador faz o trabalho dele (abrir o modal, rolar até o id) e este código não interfere.
  if (location.hash && !location.hash.startsWith('#/')) return;

  const { rota, secao } = lerRota();
  const destino = ROTAS[rota];

  if (!destino) {
    mostrarNaoEncontrada(rota);
    return;
  }

  try {
    const resposta = await fetch(destino.arquivo);
    if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
    const html = await resposta.text();

    // innerHTML aqui é seguro: o conteúdo vem dos meus próprios arquivos em html/, não de entrada do usuário.
    container.innerHTML = html;
  } catch (erro) {
    mostrarErro(erro);
    return;
  }

  document.title = destino.titulo;
  marcarLinkAtivo(rota);
  fecharMenuCelular();

  // Rola até a seção pedida no submenu ou volta ao topo, e leva o foco para o conteúdo novo
  // (quem usa leitor de tela precisa saber que a página mudou).
  const alvo = secao ? document.getElementById(secao) : null;
  if (alvo) {
    alvo.scrollIntoView();
    alvo.tabIndex = -1;
    alvo.focus({ preventScroll: true });
  } else {
    window.scrollTo(0, 0);
    container.tabIndex = -1;
    container.focus({ preventScroll: true });
  }
}

// Marca no menu o link da rota atual (a regra de CSS já existe para aria-current="page").
function marcarLinkAtivo(rota) {
  document.querySelectorAll('[data-rota]').forEach((link) => {
    if (link.dataset.rota === rota) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

// No celular, o menu é um checkbox; desmarcar fecha o menu depois de navegar.
function fecharMenuCelular() {
  const controle = document.getElementById('menu-aberto');
  if (controle) controle.checked = false;
}

// Mensagens montadas com createElement e textContent, sem innerHTML, porque o nome da rota vem da URL.
function mostrarNaoEncontrada(rota) {
  container.replaceChildren();
  const titulo = document.createElement('h1');
  titulo.textContent = 'Página não encontrada';
  const texto = document.createElement('p');
  texto.textContent = `Não existe uma página chamada "${rota}".`;
  const volta = document.createElement('a');
  volta.href = '#/inicio';
  volta.className = 'botao';
  volta.textContent = 'Voltar ao início';
  container.append(titulo, texto, volta);
  document.title = 'Página não encontrada — Primeira Porta';
}

function mostrarErro(erro) {
  container.replaceChildren();
  const titulo = document.createElement('h1');
  titulo.textContent = 'Não foi possível carregar o conteúdo';
  const texto = document.createElement('p');
  texto.textContent = `O navegador bloqueou a leitura do arquivo (${erro.message}). Abra o site pelo Live Server, não pelo arquivo direto.`;
  container.append(titulo, texto);
}