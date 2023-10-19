import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ExcludePasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => this.excludePassword(data)));
  }

  private excludePassword(data: any): any {
    if (Array.isArray(data)) {
      return data.map((item) => {
        const { password, ...rest } = item;
        return rest;
      });
    } else if (typeof data === 'object' && data !== null) {
      const { password, ...rest } = data;
      return rest;
    }
    return data;
  }
}
