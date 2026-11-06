// Máscaras de digitação com a biblioteca IMask, carregada por CDN no index.html.
// Ela formata enquanto a pessoa digita (pontos do CPF, parênteses do telefone, hífen do CEP),
// então o valor já chega no formato que o pattern do HTML exige.
// Se o CDN falhar, IMask não existe e a função sai sem fazer nada: a validação por pattern continua.

const MASCARAS = {
  cpf: '000.000.000-00',
  telefone: '(00) 00000-0000',
  cep: '00000-000',
};

export function iniciarMascaras() {
  const form = document.querySelector('main form');
  if (!form) return;

  // Fica antes do teste do IMask porque não depende dele: funciona mesmo se o CDN falhar
  iniciarEstadoMaiusculo(form);

  if (typeof IMask === 'undefined') return;
  Object.entries(MASCARAS).forEach(([id, mask]) => {
    const campo = form.querySelector(`#${id}`);
    if (campo) IMask(campo, { mask });
  });
}

// O pattern do Estado só aceita maiúsculas, então o site converte em vez de cobrar isso da pessoa.
// O if evita mexer no valor (e no cursor) quando já está em maiúscula.
function iniciarEstadoMaiusculo(form) {
  const campo = form.querySelector('#estado');
  if (!campo) return;

  campo.addEventListener('input', () => {
    const maiusculo = campo.value.toUpperCase();
    if (campo.value !== maiusculo) campo.value = maiusculo;
  });
}