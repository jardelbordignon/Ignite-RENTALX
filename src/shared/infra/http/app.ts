import 'reflect-metadata'
import 'dotenv/config'
import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import swaggerUi from 'swagger-ui-express'

import { AppError } from '@/shared/errors/AppError'
import { routes } from '@/shared/infra/http/routes'
import createConnection from '@/shared/infra/typeorm/database'
import swaggerJson from '@/swagger.json'
import '@/shared/container'

createConnection()
const app = express()

app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJson))

app.use(routes)

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({ message: error.message })
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error occurred: ${error.message}`,
    })
  }
)

export { app }
