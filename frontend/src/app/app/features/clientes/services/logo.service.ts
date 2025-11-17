import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LogoService {
  private readonly clearbitApi = 'https://logo.clearbit.com';
  private readonly faviconApi = 'https://www.google.com/s2/favicons?domain=';
  private readonly brasilApi = 'https://brasilapi.com.br/api/cnpj/v1';

  constructor(private http: HttpClient) {}

  /**
   * Busca logo da empresa por nome ou CNPJ
   * Tenta múltiplas fontes em ordem de prioridade
   */
  buscarLogo(nomeEmpresa: string, cnpj?: string): Observable<string | null> {
    // 1. Tentar buscar por domínio extraído do nome usando Clearbit
    const dominio = this.extrairDominio(nomeEmpresa);
    if (dominio) {
      const clearbitUrl = `${this.clearbitApi}/${dominio}`;
      // Verificar se a imagem existe
      return this.http.head(clearbitUrl, { observe: 'response' }).pipe(
        map(() => clearbitUrl),
        catchError(() => {
          // Se Clearbit falhar, tentar favicon como fallback
          return of(`${this.faviconApi}${dominio}&sz=128`);
        })
      );
    }

    // 2. Tentar buscar por CNPJ usando BrasilAPI para obter mais informações
    if (cnpj) {
      return this.buscarPorCNPJ(cnpj).pipe(
        catchError(() => {
          // Se falhar, tentar construir domínio do nome
          const dominioCNPJ = this.construirDominioPorCNPJ(nomeEmpresa);
          if (dominioCNPJ) {
            return of(`${this.faviconApi}${dominioCNPJ}&sz=128`);
          }
          return of(null);
        })
      );
    }

    return of(null);
  }

  /**
   * Tenta construir domínio baseado no nome da empresa
   */
  private construirDominioPorCNPJ(nomeEmpresa: string): string | null {
    return this.extrairDominio(nomeEmpresa);
  }

  /**
   * Extrai possível domínio do nome da empresa
   */
  private extrairDominio(nomeEmpresa: string): string | null {
    if (!nomeEmpresa) return null;

    // Remove caracteres especiais e normaliza
    const nomeLimpo = nomeEmpresa
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .trim();

    // Tenta extrair palavras-chave que podem ser domínio
    const palavras = nomeLimpo.split(/\s+/);
    
    // Remove palavras comuns de empresa
    const palavrasFiltradas = palavras.filter(p => 
      !['ltda', 'eireli', 'me', 'ep', 'epp', 'sa', 'spe', 'filial', 'matriz'].includes(p) &&
      p.length > 2
    );

    if (palavrasFiltradas.length === 0) return null;

    // Estratégias para construir domínio:
    // 1. Primeira palavra significativa
    // 2. Combinação de palavras principais
    // 3. Palavra mais curta (geralmente marca)
    
    // Tentar primeira palavra
    let dominio = palavrasFiltradas[0] + '.com.br';
    
    // Se primeira palavra for muito curta, tentar combinação
    if (palavrasFiltradas[0].length < 4 && palavrasFiltradas.length > 1) {
      dominio = palavrasFiltradas[0] + palavrasFiltradas[1].substring(0, 3) + '.com.br';
    }

    return dominio;
  }

  /**
   * Busca informações da empresa por CNPJ e tenta obter logo
   */
  private buscarPorCNPJ(cnpj: string): Observable<string | null> {
    const cnpjLimpo = cnpj.replace(/\D/g, '');
    const url = `${this.brasilApi}/${cnpjLimpo}`;
    
    return this.http.get<any>(url).pipe(
      map((data: any) => {
        // BrasilAPI retorna informações da empresa
        // Tentar extrair domínio do email ou site se disponível
        if (data.email) {
          const dominio = data.email.split('@')[1];
          if (dominio) {
            const clearbitUrl = `${this.clearbitApi}/${dominio}`;
            return clearbitUrl;
          }
        }
        
        // Tentar buscar por nome da empresa
        const nomeEmpresa = data.nome || data.razao_social;
        if (nomeEmpresa) {
          const dominio = this.extrairDominio(nomeEmpresa);
          if (dominio) {
            return `${this.clearbitApi}/${dominio}`;
          }
        }
        
        return null;
      }),
      catchError(() => of(null))
    );
  }

  /**
   * Gera URL de logo baseada no CNPJ (para logos já salvas localmente)
   */
  getLogoLocal(cnpj: string): string {
    const cnpjLimpo = cnpj.replace(/\D/g, '');
    return `/images/clientes/${cnpjLimpo}.png`;
  }

  /**
   * Verifica se uma URL de imagem é válida
   */
  verificarImagemValida(url: string): Observable<boolean> {
    return this.http.head(url, { observe: 'response' }).pipe(
      map(response => response.status === 200),
      catchError(() => of(false))
    );
  }
}

