import express from 'express'
import swaggerUi from 'swagger-ui-express'

import { routes } from './routes'
import swaggerJson from './swagger.json'

import './database'

const app = express()

app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJson))

app.use(routes)

const port = 3333
app.listen(port, () => console.log(`Server running - port ${port}`))
