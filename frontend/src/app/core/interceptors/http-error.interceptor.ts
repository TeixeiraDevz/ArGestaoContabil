import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ocorreu um erro desconhecido';

      if (error.error instanceof ErrorEvent) {
        // Erro do lado do cliente
        errorMessage = `Erro: ${error.error.message}`;
      } else {
        // Erro do lado do servidor
        switch (error.status) {
          case 400:
            errorMessage = 'Requisição inválida. Verifique os dados enviados.';
            break;
          case 401:
            errorMessage = 'Não autorizado. Faça login novamente.';
            localStorage.removeItem('token');
            break;
          case 403:
            errorMessage = 'Acesso negado. Você não tem permissão para esta ação.';
            break;
          case 404:
            errorMessage = 'Recurso não encontrado.';
            break;
          case 500:
            errorMessage = 'Erro interno do servidor. Tente novamente mais tarde.';
            break;
          default:
            errorMessage = `Erro ${error.status}: ${error.message}`;
        }
      }

      // Aqui você pode adicionar um serviço de notificação/toast para exibir o erro
      console.error('HTTP Error:', errorMessage, error);

      return throwError(() => new Error(errorMessage));
    })
  );
};

