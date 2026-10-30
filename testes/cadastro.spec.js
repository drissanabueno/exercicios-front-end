// Testes automáticos do formulário de cadastro, um para cada cenário de cadastro.feature.
// Os nomes dos testes são os mesmos dos cenários, para dar para achar um a partir do outro.
import { test, expect } from '@playwright/test';

const OBRIGATORIOS = {
  'Nome completo': 'Ana Teste',
  'E-mail': 'ana@teste.com',
  'CPF': '11122233344',
  'Telefone celular': '41999990000',
  'CEP': '80000000',
  'Cidade': 'Curitiba',
  'Estado': 'PR',
};

// Cada teste começa com o navegador limpo, então não há rascunho de um teste vazando para o outro
test.beforeEach(async ({ page }) => {
  await page.goto('#/cadastro');
  await expect(page.getByRole('heading', { name: 'Cadastro' })).toBeVisible();
});

// pressSequentially digita tecla por tecla, como uma pessoa; é o que faz a máscara agir
async function digitar(page, campo, valor) {
  await page.getByLabel(campo).pressSequentially(valor);
}

async function preencherObrigatorios(page) {
  for (const [campo, valor] of Object.entries(OBRIGATORIOS)) {
    await digitar(page, campo, valor);
  }
  await page.getByLabel('Candidato').check();
  await page.getByLabel('Autorizo').check();
}

function dicaDe(page, campo) {
  return page.locator(`#${campo}-dica`);
}

test.describe('Fluxo principal', () => {
  test('Cadastro só com os campos obrigatórios', async ({ page }) => {
    await preencherObrigatorios(page);
    await page.getByRole('button', { name: 'Enviar cadastro' }).click();

    await expect(page.locator('#resumo-cadastro')).toHaveText(
      'Cadastro de Ana Teste recebido. Entramos em contato pelo e-mail ana@teste.com.'
    );
    await expect(page.getByLabel('Nome completo')).toHaveValue('');
  });
});

test.describe('Fluxos alternativos', () => {
  test('Cadastro com os campos opcionais também preenchidos', async ({ page }) => {
    await preencherObrigatorios(page);
    await page.getByLabel('Data de nascimento').fill('2000-03-15');
    await page.getByLabel('Área de interesse').selectOption({ label: 'Front-end' });
    await page.getByLabel('Conte um pouco da sua história').fill('Estou aprendendo HTML e CSS');
    await page.getByRole('button', { name: 'Enviar cadastro' }).click();

    await expect(page.locator('#resumo-cadastro')).toContainText('Cadastro de Ana Teste recebido');
  });

  test('CPF, telefone e CEP são formatados enquanto digito', async ({ page }) => {
    await digitar(page, 'CPF', '11122233344');
    await digitar(page, 'Telefone celular', '41999990000');
    await digitar(page, 'CEP', '80000000');

    await expect(page.getByLabel('CPF')).toHaveValue('111.222.333-44');
    await expect(page.getByLabel('Telefone celular')).toHaveValue('(41) 99999-0000');
    await expect(page.getByLabel('CEP')).toHaveValue('80000-000');
  });

  test('O que eu digitei volta depois de recarregar a página', async ({ page }) => {
    await digitar(page, 'Nome completo', 'Ana');
    await page.reload();

    await expect(page.getByLabel('Nome completo')).toHaveValue('Ana');
    await expect(page.getByText('Recuperamos o que você tinha começado a preencher. Pode continuar de onde parou.')).toBeVisible();
  });

  test('Botão Limpar apaga o formulário e o rascunho', async ({ page }) => {
    await digitar(page, 'Nome completo', 'Ana');
    await page.getByRole('button', { name: 'Limpar' }).click();
    await page.reload();

    await expect(page.getByLabel('Nome completo')).toHaveValue('');
  });
});

test.describe('Exceções', () => {
  test('Enviar o formulário sem preencher nada', async ({ page }) => {
    await page.getByRole('button', { name: 'Enviar cadastro' }).click();

    await expect(page.locator('#resumo-cadastro')).toHaveText('Faltam 9 campo(s): confira as mensagens em vermelho.');
    for (const campo of ['nome', 'email', 'cpf', 'telefone', 'cep', 'cidade', 'estado']) {
      await expect(dicaDe(page, campo)).toHaveText('Este campo é obrigatório.');
    }
    await expect(page.getByText('Escolha uma das opções.')).toBeVisible();
    await expect(page.getByText('É preciso marcar esta opção para continuar.')).toBeVisible();
    await expect(page.getByLabel('Nome completo')).toBeFocused();
  });

  // Mesma tabela de Exemplos do Esquema do Cenário
  const formatoErrado = [
    { campo: 'Nome completo', id: 'nome', valor: 'An', mensagem: 'Digite pelo menos 3 caracteres.' },
    { campo: 'E-mail', id: 'email', valor: 'ana.teste.com', mensagem: 'Inclua o @ e o domínio, por exemplo nome@email.com.' },
    { campo: 'CPF', id: 'cpf', valor: '12345', mensagem: 'Formato: 000.000.000-00' },
    { campo: 'Telefone celular', id: 'telefone', valor: '4199', mensagem: 'Formato: (00) 00000-0000' },
    { campo: 'CEP', id: 'cep', valor: '800', mensagem: 'Formato: 00000-000' },
    { campo: 'Estado', id: 'estado', valor: 'pr', mensagem: 'Sigla com duas letras maiúsculas' },
  ];

  for (const { campo, id, valor, mensagem } of formatoErrado) {
    test(`Campo preenchido no formato errado: ${campo}`, async ({ page }) => {
      await digitar(page, campo, valor);
      await page.getByLabel(campo).blur();

      await expect(page.getByLabel(campo)).toHaveClass(/campo-invalido/);
      await expect(dicaDe(page, id)).toHaveText(mensagem);
    });
  }

  test('Data de nascimento depois do limite', async ({ page }) => {
    await page.getByLabel('Data de nascimento').fill('2015-01-01');
    await page.getByLabel('Data de nascimento').blur();

    await expect(dicaDe(page, 'nascimento')).toHaveText('A data precisa ser até 2010-12-31.');
  });

  test('A mensagem de erro some quando corrijo o campo', async ({ page }) => {
    await digitar(page, 'E-mail', 'ana.teste.com');
    await page.getByLabel('E-mail').blur();
    await expect(dicaDe(page, 'email')).toBeVisible();

    await page.getByLabel('E-mail').fill('');
    await digitar(page, 'E-mail', 'ana@teste.com');

    await expect(dicaDe(page, 'email')).toBeHidden();
    await expect(page.getByLabel('E-mail')).not.toHaveClass(/campo-invalido/);
  });
});
