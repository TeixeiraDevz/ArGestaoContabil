export interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  tipoPessoa: 'PF' | 'PJ';
  documento: string; // CPF ou CNPJ
  cnpj?: string; // CNPJ formatado (para empresas)
  logo?: string; // URL da logo da empresa
  endereco?: Endereco;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ClienteDTO {
  nome: string;
  email: string;
  telefone: string;
  tipoPessoa: 'PF' | 'PJ';
  documento: string;
  endereco?: Endereco;
}

export interface Endereco {
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}
