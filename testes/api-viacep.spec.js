// Testes de API do ViaCEP, um para cada cenário de api-viacep.feature.
// Aqui não abre navegador: o fixture request faz a requisição HTTP direto, como o Postman faria.
import { test, expect } from '@playwright/test';

const VIACEP = 'https://viacep.com.br';

test.describe('Fluxo principal', () => {
  test('Consultar um CEP que existe', async ({ request }) => {
    const resposta = await request.get(`${VIACEP}/ws/80010000/json/`);

    expect(resposta.status()).toBe(200);
    expect(resposta.headers()['content-type']).toContain('application/json');
    const corpo = await resposta.json();
    expect(corpo.localidade).toBe('Curitiba');
    expect(corpo.uf).toBe('PR');
    expect(corpo.cep).toBe('80010-000');
  });
});

test.describe('Fluxo alternativo', () => {
  test('Consultar um CEP escrito com hífen', async ({ request }) => {
    const resposta = await request.get(`${VIACEP}/ws/80010-000/json/`);

    expect(resposta.status()).toBe(200);
    expect((await resposta.json()).localidade).toBe('Curitiba');
  });
});

test.describe('Exceções', () => {
  test('Consultar um CEP no formato certo que não existe', async ({ request }) => {
    const resposta = await request.get(`${VIACEP}/ws/99999999/json/`);

    // A API não devolve 404: responde 200 com um objeto que só tem o campo erro
    expect(resposta.status()).toBe(200);
    const corpo = await resposta.json();
    expect(Object.keys(corpo)).toEqual(['erro']);
  });

  for (const cep of ['800', '8001000a', '800100000']) {
    test(`Consultar um CEP no formato errado: ${cep}`, async ({ request }) => {
      const resposta = await request.get(`${VIACEP}/ws/${cep}/json/`);

      expect(resposta.status()).toBe(400);
    });
  }

  test('Usar um método que a API não aceita', async ({ request }) => {
    const resposta = await request.post(`${VIACEP}/ws/80010000/json/`);

    expect(resposta.status()).toBe(405);
  });
});
