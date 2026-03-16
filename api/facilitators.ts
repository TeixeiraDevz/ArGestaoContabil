const FACILITATORS = [
  {
    title: 'Facilitador Contábil Estadual',
    icon: 'estadual',
    links: [
      { label: 'SEFAZ - Amazonas', url: 'https://www.sefaz.am.gov.br/' },
      { label: 'SEFAZ - Pará', url: 'https://www.sefa.pa.gov.br/' },
      { label: 'SEFAZ - Bahia', url: 'https://www.sefaz.ba.gov.br/' },
      { label: 'SEFAZ - Ceará', url: 'https://www.sefaz.ce.gov.br/' }
    ]
  },
  {
    title: 'Facilitador Contábil Federal',
    icon: 'federal',
    links: [
      { label: 'CNPJ - Situação Cadastral', url: 'https://servicos.receita.fazenda.gov.br/servicos/cnpjreva/cnpjreva_solicitacao.asp' },
      { label: 'CNPJ - Simples Nacional', url: 'https://www8.receita.fazenda.gov.br/SimplesNacional/' },
      { label: 'CPF - Situação Cadastral', url: 'https://servicos.receita.fazenda.gov.br/servicos/cpf/consultasituacao/consultapublica.asp' }
    ]
  },
  {
    title: 'Facilitador Contábil Trabalhista',
    icon: 'trabalhista',
    links: [
      { label: 'FGTS', url: 'https://www.caixa.gov.br/beneficios-trabalhador/fgts/Paginas/default.aspx' },
      { label: 'Seguro-Desemprego', url: 'https://www.gov.br/trabalho-e-emprego/pt-br/servicos/seguro-desemprego' },
      { label: 'RAIS', url: 'https://www.rais.gov.br/' }
    ]
  }
];

export function GET() {
  return Response.json(FACILITATORS);
}
