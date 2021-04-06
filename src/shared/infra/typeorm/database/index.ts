import { Connection, createConnection, getConnectionOptions } from 'typeorm'

// interface IOptions {
//   host: string
// }

// getConnectionOptions().then((options) => {
//   const newOptions = options as IOptions
//   newOptions.host = 'database' // Essa opção deverá ser EXATAMENTE o nome dado ao service do banco de dados
//   createConnection({
//     ...options,
//   })
// })

export default async (host = 'database'): Promise<Connection> => {
  const options = await getConnectionOptions()
  const isTest = process.env.NODE_ENV === 'test'

  return createConnection(
    Object.assign(options, {
      host: isTest ? 'localhost' : host,
      database: isTest ? 'rentx_test' : options.database,
    })
  )
}
