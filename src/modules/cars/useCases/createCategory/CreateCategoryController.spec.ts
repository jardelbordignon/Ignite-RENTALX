import { hash } from 'bcryptjs'
import request from 'supertest'
import { Connection, createConnection } from 'typeorm'
import { v4 as uuid } from 'uuid'

import { app } from '@/shared/infra/http/app'

let connection: Connection
let authToken: string

describe('CreateCategoryController', () => {
  beforeAll(async () => {
    connection = await createConnection()
    // await connection.dropDatabase()
    await connection.runMigrations()

    const password = await hash('admin', 8)

    await connection.query(
      `INSERT INTO users(id, name, email, password, driver_license, is_admin, created_at, updated_at)
      VALUES('${uuid()}', 'admin', 'admin@email.com', '${password}', '12345678910', true, 'now()', 'now()')
      `
    )

    const responseToken = await request(app).post('/authenticate').send({
      email: 'admin@email.com',
      password: 'admin',
    })

    authToken = responseToken.body.refresh_token
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it('should be able to create a new category', async () => {
    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Category supertest',
        description: 'Category supertest',
      })
      .set({
        Authorization: `Bearer ${authToken}`,
      })

    expect(response.status).toBe(201)
  })

  it('should not be able to create a new category with an existing name', async () => {
    await request(app)
      .post('/categories')
      .send({
        name: 'Category supertest',
        description: 'Category supertest',
      })
      .set({
        Authorization: `Bearer ${authToken}`,
      })

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Category supertest',
        description: 'Category supertest',
      })
      .set({
        Authorization: `Bearer ${authToken}`,
      })

    expect(response.status).toBe(400)
  })
})
