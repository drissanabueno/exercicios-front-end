// Configuração do Playwright. Por padrão os testes rodam no site publicado no GitHub Pages;
// para testar uma versão local, rode com BASE_URL=http://127.0.0.1:5500/primeira-porta/
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './testes',
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: process.env.BASE_URL || 'https://drissanabueno.github.io/exercicios-front-end/primeira-porta/',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'celular', use: { ...devices['Pixel 7'] } },
  ],
});
