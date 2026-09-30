// Build de produção da Primeira Porta.
// Não há bundler (Webpack/Vite) porque não há módulos para compilar: o navegador lê os módulos ES direto.
// O que este script faz é copiar primeira-porta/ para dist/ minificando CSS, JS e HTML,
// mantendo os mesmos nomes de arquivo para os imports relativos continuarem válidos.
import { cpSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { join, extname, basename } from 'node:path';
import { execSync } from 'node:child_process';
import { minify as minifyJs } from 'terser';
import { minify as minifyHtml } from 'html-minifier-terser';

const ORIGEM = 'primeira-porta';
const DESTINO = 'dist';
const antes = {}, depois = {};

rmSync(DESTINO, { recursive: true, force: true });
cpSync(ORIGEM, DESTINO, { recursive: true, filter: (p) => basename(p) !== 'docs' });

async function processar(dir) {
  for (const nome of readdirSync(dir)) {
    const caminho = join(dir, nome);
    if (statSync(caminho).isDirectory()) { await processar(caminho); continue; }
    const ext = extname(nome);
    const texto = readFileSync(caminho, 'utf8');
    let saida = null;
    if (ext === '.js') saida = (await minifyJs(texto, { module: true, compress: true, mangle: true })).code;
    if (ext === '.html') saida = await minifyHtml(texto, { collapseWhitespace: true, removeComments: true, minifyCSS: true, minifyJS: true });
    if (ext === '.css') { execSync(`npx lightningcss --minify "${caminho}" -o "${caminho}"`); saida = readFileSync(caminho, 'utf8'); }
    if (saida === null) continue;
    antes[ext] = (antes[ext] || 0) + Buffer.byteLength(texto);
    depois[ext] = (depois[ext] || 0) + Buffer.byteLength(saida);
    writeFileSync(caminho, saida);
  }
}
await processar(DESTINO);

console.log('Minificação (bytes):');
for (const ext of Object.keys(antes)) {
  const pct = Math.round(100 * (antes[ext] - depois[ext]) / antes[ext]);
  console.log(`  ${ext.padEnd(6)} ${String(antes[ext]).padStart(6)} -> ${String(depois[ext]).padStart(6)}  (${pct}% menor)`);
}
const ta = Object.values(antes).reduce((a, b) => a + b, 0), td = Object.values(depois).reduce((a, b) => a + b, 0);
console.log(`  total  ${ta} -> ${td}  (${Math.round(100 * (ta - td) / ta)}% menor)`);
