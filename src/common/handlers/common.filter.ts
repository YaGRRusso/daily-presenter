import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { ValidationError } from 'class-validator'

@Catch()
export class CommonFilter extends BaseExceptionFilter implements ExceptionFilter {
  catch(exception: Record<string, unknown>, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const res = ctx.getResponse()

    let status = 500
    let name = 'Internal server error'
    let message = 'Unknown error occurred'
    console.error(exception)

    if (exception instanceof ValidationError) {
      status = 400
      name = 'Bad request'
      message = Object.values(exception.constraints)[0]
    }

    return res.status(+exception?.status || +exception?.statusCode || status).json({
      ...exception,
      name,
      message,
    })
  }
}
