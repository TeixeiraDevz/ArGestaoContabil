export interface RecursoPlano {
  nome: string;
  incluido: boolean;
}

export interface Plano {
  id: string;
  nome: 'Básico' | 'Intermediário' | 'Personalizado';
  publicoIdeal: string;
  regimesAtendidos: string[];
  faturamentoMedioMensal: string;
  atividadeEmpresa: string[];
  canaisAtendimento: string[];
  relatoriosGerenciais: string;
  recursos: RecursoPlano[];
  createdAt?: string;
  updatedAt?: string;
}

export interface PlanoDTO {
  nome: 'Básico' | 'Intermediário' | 'Personalizado';
  publicoIdeal: string;
  regimesAtendidos: string[];
  faturamentoMedioMensal: string;
  atividadeEmpresa: string[];
  canaisAtendimento: string[];
  relatoriosGerenciais: string;
  recursos: RecursoPlano[];
}

