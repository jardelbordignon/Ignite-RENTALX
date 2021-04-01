import { hash } from 'bcryptjs'
import { v4 as uuid } from 'uuid'

import createConnection from '../index'

async function create() {
  const connection = await createConnection('localhost')

  const id = uuid()
  const password = await hash('admin', 8)

  await connection.query(
    `INSERT INTO users(id, name, email, password, driver_license, is_admin, created_at, updated_at)
    VALUES('${id}', 'admin', 'admin@email.com', '${password}', '12345678910', true, 'now()', 'now()')
    `
  )
}

create().then(() => console.log('User admin created!'))
