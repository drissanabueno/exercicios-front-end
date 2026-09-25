// Dados dos projetos. Só conteúdo, nenhum HTML.
// Para incluir um projeto novo, basta acrescentar um objeto nesta lista.
export const projetos = [
  {
    id: 'trilha-portfolio',
    etiqueta: { texto: 'Em andamento', classe: '' },
    titulo: 'Trilha de portfólio guiado',
    periodo: { data: '2026-03', texto: 'Desde março de 2026' },
    local: 'Curitiba e online',
    descricao: 'Mini-desafios práticos de front-end, dados e suporte, com revisão de mentores. A pessoa sai com projetos publicados e sabendo explicar cada um.',
    chamada: { rotulo: 'Para quem:', texto: 'pessoas em transição de carreira, egressos de cursos gratuitos e bootcamps.' },
  },
  {
    id: 'selo-acessivel',
    etiqueta: { texto: 'Para empresas', classe: 'etiqueta--empresa' },
    titulo: 'Selo de processo seletivo acessível',
    periodo: { data: '2026-06', texto: 'Desde junho de 2026' },
    local: 'empresas parceiras',
    descricao: 'Empresas que assumem três compromissos: teste sem limite rígido de tempo, entrevista acessível e feedback obrigatório para quem não passa. Em troca, recebem o selo e acesso ao banco de talentos.',
    chamada: { rotulo: 'Para quem:', texto: 'empresas de tecnologia que querem cumprir a cota de PCDs com contratação de qualidade.' },
  },
  {
    id: 'mentoria',
    etiqueta: { texto: 'Voluntariado', classe: 'etiqueta--voluntario' },
    titulo: 'Mentoria de primeira entrevista',
    periodo: { data: '2026-09', texto: 'Desde setembro de 2026' },
    local: 'voluntários',
    descricao: 'Simulações de entrevista conduzidas por profissionais voluntários, com apoio de inteligência artificial para preparação e revisão humana em toda decisão.',
    chamada: { rotulo: 'Como ajudar:', link: { href: '#/cadastro', texto: 'cadastre-se como voluntário' }, texto: '.' },
  },
  {
    id: 'apoio',
    etiqueta: { texto: 'Doação', classe: 'etiqueta--doacao' },
    titulo: 'Como apoiar financeiramente',
    periodo: null,
    local: 'Doações de pessoas e empresas · sem valor mínimo',
    descricao: 'Cada real vai para três coisas: bolsa de conectividade para quem não tem internet estável, remuneração dos testes de acessibilidade com pessoas com deficiência e infraestrutura da plataforma.',
    chamada: { rotulo: 'Como doar:', link: { href: '#/cadastro', texto: 'cadastre-se como doador' }, texto: ' e entramos em contato com as formas de contribuição.' },
    extra: { href: '#modal-doacao', texto: 'Ver em detalhe para onde vai cada real' },
  },
];