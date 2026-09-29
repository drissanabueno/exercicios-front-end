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
  if (typeof IMask === 'undefined') return;
  const form = document.querySelector('main form');
  if (!form) return;

  Object.entries(MASCARAS).forEach(([id, mask]) => {
    const campo = form.querySelector(`#${id}`);
    if (campo) IMask(campo, { mask });
  });
}