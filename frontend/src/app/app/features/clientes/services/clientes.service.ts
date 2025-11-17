import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClienteRepository } from '../../../../infra/repository/cliente.repository';
import { Cliente, ClienteDTO } from '../../../../core/models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  constructor(private clienteRepository: ClienteRepository) {}

  listarClientes(): Observable<Cliente[]> {
    return this.clienteRepository.getAll();
  }

  obterClientePorId(id: string): Observable<Cliente> {
    return this.clienteRepository.getById(id);
  }

  criarCliente(cliente: ClienteDTO): Observable<Cliente> {
    return this.clienteRepository.create(cliente);
  }

  atualizarCliente(id: string, cliente: ClienteDTO): Observable<Cliente> {
    return this.clienteRepository.update(id, cliente);
  }

  removerCliente(id: string): Observable<void> {
    return this.clienteRepository.remove(id);
  }

  buscarClientes(query: string): Observable<Cliente[]> {
    return this.clienteRepository.search(query);
  }
}

