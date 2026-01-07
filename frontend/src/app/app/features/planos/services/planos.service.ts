import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlanosRepository } from '../../../../infra/repository/plano.repository';
import { Plano, PlanoDTO } from '../../../../core/models/plano.model';

@Injectable({
  providedIn: 'root'
})
export class PlanosService {
  constructor(private planosRepository: PlanosRepository) {}

  listarPlanos(): Observable<Plano[]> {
    return this.planosRepository.getAll();
  }

  obterPlanoPorId(id: string): Observable<Plano> {
    return this.planosRepository.getById(id);
  }

  criarPlano(plano: PlanoDTO): Observable<Plano> {
    return this.planosRepository.create(plano);
  }

  atualizarPlano(id: string, plano: PlanoDTO): Observable<Plano> {
    return this.planosRepository.update(id, plano);
  }

  removerPlano(id: string): Observable<void> {
    return this.planosRepository.remove(id);
  }

  buscarPlanos(query: string): Observable<Plano[]> {
    return this.planosRepository.search(query);
  }
}

