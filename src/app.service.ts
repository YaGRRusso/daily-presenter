import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(data?: any): any {
    return ['Hello World!', data]
  }
}
