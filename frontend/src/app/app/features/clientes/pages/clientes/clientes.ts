import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesService } from '../../services/clientes.service';
import { LogoService } from '../../services/logo.service';
import { Cliente } from '../../../../../core/models/cliente.model';
import { CarouselComponent, CarouselItem } from '../../../../../shared/components/carousel/carousel';
import { LoadingComponent } from '../../../../../shared/components/loading/loading';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, CarouselComponent, LoadingComponent],
  templateUrl: './clientes.html',
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background: var(--color-gray-light, #f8f9fa);
    }

    .clientes-hero {
      padding: 7rem 0 4rem;
      background: linear-gradient(140deg, rgba(102, 126, 234, 0.18) 0%, rgba(118, 75, 162, 0.18) 100%);
      text-align: center;
    }

    .hero-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--color-black, #212529);
      margin-bottom: 1rem;
    }

    .hero-subtitle {
      font-size: 1.1rem;
      color: var(--color-gray, #6c757d);
      max-width: 600px;
      margin: 0 auto;
    }

    .carousel-section {
      padding: 4rem 0;
      background: var(--color-white, #ffffff);
    }

    .section-title {
      font-size: 2rem;
      font-weight: 700;
      color: var(--color-black, #212529);
      text-align: center;
      margin-bottom: 3rem;
    }

    @media (max-width: 768px) {
      .hero-title {
        font-size: 2rem;
      }

      .hero-subtitle {
        font-size: 1rem;
      }
    }
  `]
})
export class Clientes implements OnInit {
  clientes: Cliente[] = [];
  carouselItems: CarouselItem[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private clientesService: ClientesService,
    private logoService: LogoService
  ) {}

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes(): void {
    this.loading = true;
    this.error = null;

    this.clientesService.listarClientes().subscribe({
      next: (clientes: Cliente[]) => {
        // Se não houver clientes do backend, usar dados mockados
        if (clientes.length === 0) {
          this.clientes = this.getClientesMockados();
        } else {
          this.clientes = clientes;
        }
        this.prepararCarouselItemsComLogos(this.clientes);
      },
      error: (err: any) => {
        // Em caso de erro, usar dados mockados
        console.warn('Erro ao carregar clientes do backend, usando dados mockados:', err);
        this.clientes = this.getClientesMockados();
        this.prepararCarouselItemsComLogos(this.clientes);
      }
    });
  }

  private prepararCarouselItemsComLogos(clientes: Cliente[]): void {
    // Criar items iniciais com placeholders
    this.carouselItems = clientes
      .filter(cliente => cliente.logo || cliente.cnpj || cliente.documento)
      .map(cliente => ({
        id: cliente.id,
        imageUrl: cliente.logo || this.getLogoPlaceholder(cliente.cnpj || cliente.documento),
        alt: cliente.nome,
        title: cliente.nome
      }));

    this.loading = false;

    // Buscar logos em paralelo para todos os clientes
    const buscaLogos = clientes
      .filter(cliente => !cliente.logo && (cliente.cnpj || cliente.documento))
      .map(cliente => {
        const cnpj = cliente.cnpj || cliente.documento;
        return this.logoService.buscarLogo(cliente.nome, cnpj).pipe(
          map(logoUrl => ({ cliente, logoUrl })),
          catchError(() => of({ cliente, logoUrl: null }))
        );
      });

    if (buscaLogos.length > 0) {
      forkJoin(buscaLogos).subscribe({
        next: (resultados) => {
          resultados.forEach(({ cliente, logoUrl }) => {
            if (logoUrl) {
              const item = this.carouselItems.find(c => c.id === cliente.id);
              if (item) {
                item.imageUrl = logoUrl;
              }
            }
          });
        }
      });
    }
  }

  private getClientesMockados(): Cliente[] {
    return [
      {
        id: '1',
        nome: 'A DE CASTRO TEIXEIRA',
        email: 'contato@castroteixeira.com.br',
        telefone: '(00) 0000-0000',
        tipoPessoa: 'PJ',
        documento: '33.236.630/0001-19',
        cnpj: '33.236.630/0001-19',
        ativo: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        nome: 'AM02 IMPACTO INFOVIAS SPE LTDA',
        email: 'contato@impactoinfovias.com.br',
        telefone: '(00) 0000-0000',
        tipoPessoa: 'PJ',
        documento: '42.635.090/0001-37',
        cnpj: '42.635.090/0001-37',
        ativo: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '3',
        nome: 'AMBIENT CLEAR',
        email: 'contato@ambientclear.com.br',
        telefone: '(00) 0000-0000',
        tipoPessoa: 'PJ',
        documento: '37.465.173/0001-95',
        cnpj: '37.465.173/0001-95',
        ativo: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '4',
        nome: 'AMBIENT OFFICE',
        email: 'contato@ambientoffice.com.br',
        telefone: '(00) 0000-0000',
        tipoPessoa: 'PJ',
        documento: '35.637.190/0001-37',
        cnpj: '35.637.190/0001-37',
        ativo: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '5',
        nome: 'AR CONTABILIDADE',
        email: 'contato@arcontabilidade.com.br',
        telefone: '(00) 0000-0000',
        tipoPessoa: 'PJ',
        documento: '09.410.506/0001-43',
        cnpj: '09.410.506/0001-43',
        ativo: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '6',
        nome: 'ARTEPRINTBOX INDUSTRIA E COMERCIO DE EMBALAGENS LTDA',
        email: 'contato@arteprintbox.com.br',
        telefone: '(00) 0000-0000',
        tipoPessoa: 'PJ',
        documento: '03.516.849/0001-00',
        cnpj: '03.516.849/0001-00',
        ativo: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '7',
        nome: 'BELISSIMAS LENTES',
        email: 'contato@belissimaslentes.com.br',
        telefone: '(00) 0000-0000',
        tipoPessoa: 'PJ',
        documento: '36.110.703/0001-10',
        cnpj: '36.110.703/0001-10',
        ativo: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '8',
        nome: 'COELHO, CHAMY DIB & RIBEIRO. ADVOGADOS ASSOCIADOS',
        email: 'contato@coelhochamy.com.br',
        telefone: '(00) 0000-0000',
        tipoPessoa: 'PJ',
        documento: '11.923.704/0001-52',
        cnpj: '11.923.704/0001-52',
        ativo: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '9',
        nome: 'COHEN COMUNICAÇÃO',
        email: 'contato@cohencomunicacao.com.br',
        telefone: '(00) 0000-0000',
        tipoPessoa: 'PJ',
        documento: '43.286.487/0001-23',
        cnpj: '43.286.487/0001-23',
        ativo: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '10',
        nome: 'CONSTRUTORA SAVASSI LTDA',
        email: 'contato@construtorasavassi.com.br',
        telefone: '(00) 0000-0000',
        tipoPessoa: 'PJ',
        documento: '03.952.190/0001-35',
        cnpj: '03.952.190/0001-35',
        ativo: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '11',
        nome: 'EDSON DAMASCENO',
        email: 'contato@edsondamasceno.com.br',
        telefone: '(00) 0000-0000',
        tipoPessoa: 'PJ',
        documento: '19.336.431/0001-51',
        cnpj: '19.336.431/0001-51',
        ativo: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '12',
        nome: 'FMS COMERCIO DE MATERIAL DE CONSTRUCAO (BARBOSA MAT DE COSNT)',
        email: 'contato@fmsconstrucao.com.br',
        telefone: '(00) 0000-0000',
        tipoPessoa: 'PJ',
        documento: '26.279.054/0001-21',
        cnpj: '26.279.054/0001-21',
        ativo: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '13',
        nome: 'G.L.M CORREIA FERNANDES',
        email: 'contato@glmcorreia.com.br',
        telefone: '(00) 0000-0000',
        tipoPessoa: 'PJ',
        documento: '27.612.631/0001-18',
        cnpj: '27.612.631/0001-18',
        ativo: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '14',
        nome: 'IEX COMISSARIA DE DESPACHOS E ASSESSORIA ADUANEIRA LTDA',
        email: 'contato@iexcomissaria.com.br',
        telefone: '(00) 0000-0000',
        tipoPessoa: 'PJ',
        documento: '09.639.773/0001-97',
        cnpj: '09.639.773/0001-97',
        ativo: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '15',
        nome: 'ILS INTEGRAD LOGISTIC SOLUTIONS LTDA',
        email: 'contato@ilslogistics.com.br',
        telefone: '(00) 0000-0000',
        tipoPessoa: 'PJ',
        documento: '04.866.319/0001-55',
        cnpj: '04.866.319/0001-55',
        ativo: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '16',
        nome: 'IMPACTO INFOVIAS LTDA',
        email: 'contato@impactoinfovias.com.br',
        telefone: '(00) 0000-0000',
        tipoPessoa: 'PJ',
        documento: '37.606.962/0001-07',
        cnpj: '37.606.962/0001-07',
        ativo: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '17',
        nome: 'J. G. CONSTRUCOES E TRANSPORTES LTDA-MATRIZ',
        email: 'contato@jgconstrucoes.com.br',
        telefone: '(00) 0000-0000',
        tipoPessoa: 'PJ',
        documento: '02.680.845/0001-09',
        cnpj: '02.680.845/0001-09',
        ativo: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '18',
        nome: 'JULITA N. CAMARA DE CASTRO NEUROPSICOLOG',
        email: 'contato@julitaneuropsicolog.com.br',
        telefone: '(00) 0000-0000',
        tipoPessoa: 'PJ',
        documento: '03.358.477/0001-31',
        cnpj: '03.358.477/0001-31',
        ativo: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '19',
        nome: 'LLS TRANSPORTE E AGENCIAMENTO DE CARGAS LTDA-ME',
        email: 'contato@llstransporte.com.br',
        telefone: '(00) 0000-0000',
        tipoPessoa: 'PJ',
        documento: '15.564.129/0001-08',
        cnpj: '15.564.129/0001-08',
        ativo: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '20',
        nome: 'MULTIMIXX SERVICOS DE ENTREGA RAPIDA EIRELI',
        email: 'contato@multimixx.com.br',
        telefone: '(00) 0000-0000',
        tipoPessoa: 'PJ',
        documento: '22.007.036/0001-30',
        cnpj: '22.007.036/0001-30',
        ativo: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '21',
        nome: 'NORTESUL LOGISTICA',
        email: 'contato@nortesullogistica.com.br',
        telefone: '(00) 0000-0000',
        tipoPessoa: 'PJ',
        documento: '11.821.060/0001-91',
        cnpj: '11.821.060/0001-91',
        ativo: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '22',
        nome: 'PAPERBOX INDUSTRIA DE EMBALAGENS LTDA',
        email: 'contato@paperbox.com.br',
        telefone: '(00) 0000-0000',
        tipoPessoa: 'PJ',
        documento: '17.230.003/0001-14',
        cnpj: '17.230.003/0001-14',
        ativo: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '23',
        nome: 'PENCOM DO BRASIL DISTRIBUIDORA DE COMPONENTES MECANICOS LTDA',
        email: 'contato@pencom.com.br',
        telefone: '(00) 0000-0000',
        tipoPessoa: 'PJ',
        documento: '08.587.428/0002-75',
        cnpj: '08.587.428/0002-75',
        ativo: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '24',
        nome: 'TRANS PANTANAL LTDA',
        email: 'contato@transpantanal.com.br',
        telefone: '(00) 0000-0000',
        tipoPessoa: 'PJ',
        documento: '64.126.758/0004-04',
        cnpj: '64.126.758/0004-04',
        ativo: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '25',
        nome: 'TRANSBRITO TRANSPORTES DE CARGAS LTDA',
        email: 'contato@transbrito.com.br',
        telefone: '(00) 0000-0000',
        tipoPessoa: 'PJ',
        documento: '13.053.658/0001-03',
        cnpj: '13.053.658/0001-03',
        ativo: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  }


  private getLogoPlaceholder(cnpj: string): string {
    // Placeholder temporário - será substituído por busca de logo
    const cnpjLimpo = cnpj.replace(/\D/g, '');
    return `/images/clientes/${cnpjLimpo}.png`;
  }
}
