// Validação do formulário de cadastro.
// O HTML já tem as regras (required, pattern, minlength, type). Aqui eu uso a API de validação
// do navegador (checkValidity e validity) para ler essas regras e mostrar o feedback com classes CSS.
// Diferença para a EP 2: lá o feedback dependia de :user-invalid; aqui funciona em qualquer navegador
// que rode JavaScript, e a mensagem certa aparece para cada tipo de erro.

export function iniciarFormulario() {
  const form = document.querySelector('main form');
  if (!form) return; // não está na página de cadastro

  const campos = listarCampos(form);

  // Valida quando a pessoa sai do campo (focusout sobe do campo até o form, então um listener basta)
  form.addEventListener('focusout', (evento) => {
    if (campos.includes(evento.target)) validarCampo(evento.target);
  });

  // Enquanto digita, só revalida campos que já estavam marcados com erro, para o erro sumir na hora
  form.addEventListener('input', (evento) => {
    if (evento.target.classList.contains('campo-invalido')) validarCampo(evento.target);
  });

  form.addEventListener('submit', (evento) => {
    // Sem isto o navegador enviaria o formulário e recarregaria a página, e a SPA perderia o estado
    evento.preventDefault();

    const invalidos = campos.filter((campo) => !validarCampo(campo));
    if (invalidos.length > 0) {
      mostrarResumo(form, 'erro', `Faltam ${invalidos.length} campo(s): confira as mensagens em vermelho.`);
      invalidos[0].focus();
      return;
    }

    // Tudo válido: avisa quem quiser saber (o módulo de armazenamento escuta este evento) e limpa
    const dados = Object.fromEntries(new FormData(form));
    form.dispatchEvent(new CustomEvent('cadastro:enviado', { detail: dados }));
    mostrarResumo(form, 'sucesso', `Cadastro de ${dados.nome} recebido. Entramos em contato pelo e-mail ${dados.email}.`);
    form.reset();
    limparEstados(campos);
  });

  form.addEventListener('reset', () => limparEstados(campos));
}

// Todos os campos, mas só o primeiro radio de cada grupo (o grupo é validado junto)
function listarCampos(form) {
  const vistos = new Set();
  return [...form.querySelectorAll('input, select, textarea')].filter((campo) => {
    if (campo.type !== 'radio') return true;
    if (vistos.has(campo.name)) return false;
    vistos.add(campo.name);
    return true;
  });
}

// Devolve true se válido. Marca a classe e mostra ou esconde a mensagem.
function validarCampo(campo) {
  const valido = campo.checkValidity();
  const dica = garantirDica(campo);

  campo.classList.toggle('campo-invalido', !valido);
  campo.classList.toggle('campo-valido', valido && campo.value !== '');
  campo.setAttribute('aria-invalid', String(!valido));

  if (valido) {
    dica.classList.remove('dica--visivel');
  } else {
    dica.textContent = mensagemPara(campo);
    dica.classList.add('dica--visivel');
  }
  return valido;
}

// Escolhe a mensagem pelo motivo do erro, que o navegador informa em campo.validity
function mensagemPara(campo) {
  const v = campo.validity;
  if (v.valueMissing) {
    if (campo.type === 'radio') return 'Escolha uma das opções.';
    if (campo.type === 'checkbox') return 'É preciso marcar esta opção para continuar.';
    return 'Este campo é obrigatório.';
  }
  if (v.tooShort) return `Digite pelo menos ${campo.minLength} caracteres.`;
  if (v.patternMismatch) return campo.title || 'Formato inválido.';
  if (v.typeMismatch) return campo.type === 'email' ? 'Inclua o @ e o domínio, por exemplo nome@email.com.' : 'Formato inválido.';
  if (v.rangeOverflow) return `A data precisa ser até ${campo.max}.`;
  return 'Confira este campo.';
}

// Usa o <small class="dica"> que já existe no HTML ou cria um para campos que não tinham
function garantirDica(campo) {
  if (campo.type === 'radio' || campo.type === 'checkbox') {
    const grupo = campo.closest('fieldset');
    let dica = grupo.querySelector(':scope > .dica');
    if (!dica) {
      dica = document.createElement('small');
      dica.className = 'dica';
      grupo.append(dica);
    }
    return dica;
  }
  let dica = campo.nextElementSibling;
  if (!dica || !dica.classList.contains('dica')) {
    dica = document.createElement('small');
    dica.className = 'dica';
    dica.id = `${campo.id}-dica`;
    campo.after(dica);
    campo.setAttribute('aria-describedby', dica.id);
  }
  return dica;
}

function limparEstados(campos) {
  campos.forEach((campo) => {
    campo.classList.remove('campo-invalido', 'campo-valido');
    campo.removeAttribute('aria-invalid');
  });
  document.querySelectorAll('main form .dica--visivel').forEach((d) => d.classList.remove('dica--visivel'));
}

// Caixa de resumo acima do formulário, reaproveitando o .alerta da EP 2
function mostrarResumo(form, tipo, texto) {
  let caixa = document.getElementById('resumo-cadastro');
  if (!caixa) {
    caixa = document.createElement('div');
    caixa.id = 'resumo-cadastro';
    caixa.setAttribute('role', 'alert');
    form.before(caixa);
  }
  caixa.className = `alerta alerta--${tipo}`;
  caixa.replaceChildren();
  const p = document.createElement('p');
  p.textContent = texto;
  caixa.append(p);
  caixa.scrollIntoView({ block: 'center' });
}