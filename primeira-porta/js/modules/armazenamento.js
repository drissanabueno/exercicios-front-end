// Armazenamento no navegador com localStorage.
// Duas coisas são guardadas: o rascunho do formulário, salvo a cada tecla, para a pessoa não perder
// o que digitou se fechar a aba; e a lista de cadastros enviados, que fica como histórico local.
// O localStorage só guarda texto, por isso tudo passa por JSON.stringify na ida e JSON.parse na volta.

const CHAVE_RASCUNHO = 'primeiraporta:rascunho';
const CHAVE_CADASTROS = 'primeiraporta:cadastros';

export function iniciarArmazenamento() {
  const form = document.querySelector('main form');
  if (!form) return;

  restaurarRascunho(form);
  mostrarHistorico(form);

  // A cada mudança em qualquer campo (o evento input sobe até o form), salva o rascunho
  form.addEventListener('input', () => salvarRascunho(form));

  // O módulo de formulário dispara este evento quando tudo é válido
  form.addEventListener('cadastro:enviado', (evento) => {
    guardarCadastro(evento.detail);
    localStorage.removeItem(CHAVE_RASCUNHO);
    document.querySelector('[data-aviso-rascunho]')?.remove();
    mostrarHistorico(form);
  });

  form.addEventListener('reset', () => localStorage.removeItem(CHAVE_RASCUNHO));
}

function salvarRascunho(form) {
  const dados = Object.fromEntries(new FormData(form));
  localStorage.setItem(CHAVE_RASCUNHO, JSON.stringify(dados));
}

function restaurarRascunho(form) {
  const salvo = localStorage.getItem(CHAVE_RASCUNHO);
  if (!salvo) return;

  let dados;
  try {
    dados = JSON.parse(salvo);
  } catch {
    localStorage.removeItem(CHAVE_RASCUNHO); // conteúdo corrompido: descarta
    return;
  }

  // form.elements[nome] devolve o campo pelo atributo name; para radios devolve o grupo inteiro
  Object.entries(dados).forEach(([nome, valor]) => {
    const campo = form.elements[nome];
    if (!campo) return;
    if (campo.type === 'checkbox') {
      campo.checked = valor === 'on';
    } else {
      campo.value = valor; // em um grupo de radios, isto marca o que tem esse value
    }
  });

  avisar(form, 'Recuperamos o que você tinha começado a preencher. Pode continuar de onde parou.');
}

function guardarCadastro(dados) {
  const lista = lerCadastros();
  lista.push({ ...dados, enviadoEm: new Date().toISOString() });
  localStorage.setItem(CHAVE_CADASTROS, JSON.stringify(lista));
}

export function lerCadastros() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE_CADASTROS)) || [];
  } catch {
    return [];
  }
}

// Mostra quantos cadastros já foram feitos neste navegador, com um botão para apagar o histórico
function mostrarHistorico(form) {
  const lista = lerCadastros();
  let nota = document.getElementById('historico-cadastros');
  if (lista.length === 0) {
    if (nota) nota.remove();
    return;
  }
  if (!nota) {
    nota = document.createElement('p');
    nota.id = 'historico-cadastros';
    form.after(nota);
  }
  nota.replaceChildren();
  const texto = document.createElement('small');
  const ultimo = lista[lista.length - 1];
  const quando = new Date(ultimo.enviadoEm).toLocaleString('pt-BR');
  texto.textContent = `${lista.length} cadastro(s) salvo(s) neste navegador. Último: ${ultimo.nome}, em ${quando}. `;
  const botao = document.createElement('button');
  botao.type = 'button';
  botao.textContent = 'Apagar histórico';
  botao.addEventListener('click', () => {
    localStorage.removeItem(CHAVE_CADASTROS);
    mostrarHistorico(form);
  });
  nota.append(texto, botao);
}

function avisar(form, mensagem) {
  const caixa = document.createElement('div');
  caixa.className = 'alerta alerta--info';
  caixa.dataset.avisoRascunho = '';
  caixa.setAttribute('role', 'status');
  const p = document.createElement('p');
  p.textContent = mensagem;
  caixa.append(p);
  form.before(caixa);
}