import { MigrationInterface, QueryRunner, Table } from 'typeorm'

const tableName = 'cars_images'

export default class CreateCarImages1617459735222
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: tableName,
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          // generationStrategy: 'uuid',
          // default: 'uuid_generate_v4()',
        },
        {
          name: 'car_id',
          type: 'uuid',
        },
        {
          name: 'image_name',
          type: 'varchar',
        },
        {
          name: 'sequence_position',
          type: 'integer',
          isNullable: true,
        },
      ],
      foreignKeys: [
        {
          name: 'FKCarImage',
          referencedTableName: 'cars',
          referencedColumnNames: ['id'],
          columnNames: ['car_id'],
          onDelete: 'SET NULL',
          onUpdate: 'SET NULL',
        },
      ],
    })

    await queryRunner.createTable(table)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName)
  }
}
