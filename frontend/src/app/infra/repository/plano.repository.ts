import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseRepository } from './base.repository';
import { Plano, PlanoDTO } from '../../core/models/plano.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanosRepository extends BaseRepository {
  constructor(http: HttpClient) {
    super(http);
  }

  getAll(): Observable<Plano[]> {
    return this.get<Plano[]>('/planos');
  }

  getById(id: string): Observable<Plano> {
    return this.get<Plano>(`/planos/${id}`);
  }

  create(plano: PlanoDTO): Observable<Plano> {
    return this.post<Plano>('/planos', plano);
  }

  update(id: string, plano: PlanoDTO): Observable<Plano> {
    return this.put<Plano>(`/planos/${id}`, plano);
  }

  remove(id: string): Observable<void> {
    return super.delete<void>(`/planos/${id}`);
  }

  search(query: string): Observable<Plano[]> {
    return this.get<Plano[]>(`/planos/search?q=${encodeURIComponent(query)}`);
  }
}

