import { hash } from 'bcryptjs'
import { v4 as uuid } from 'uuid'

import createConnection from '../index'

async function create() {
  const connection = await createConnection('localhost')

  const pwd_admin = await hash('admin', 8)
  const pwd_user = await hash('1234', 8)

  await connection.query(
    `INSERT INTO users(id, name, email, password, driver_license, is_admin, created_at, updated_at)
    VALUES('${uuid()}', 'admin', 'admin@email.com', '${pwd_admin}', '12345678910', true, 'now()', 'now()')
    `
  )
  await connection.query(
    `INSERT INTO users(id, name, email, password, driver_license, is_admin, created_at, updated_at)
    VALUES('${uuid()}', 'User', 'user@email.com', '${pwd_user}', '12345678911', false, 'now()', 'now()')
    `
  )
}

create().then(() => console.log('User admin created!'))
