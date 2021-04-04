import { MigrationInterface, QueryRunner, Table } from 'typeorm'

const tableName = 'rentals'

export default class CreateRentals1617503155885 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: tableName,
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },
        {
          name: 'car_id',
          type: 'uuid',
        },
        {
          name: 'user_id',
          type: 'uuid',
        },
        {
          name: 'start_date',
          type: 'timestamp',
          default: 'now()',
        },
        {
          name: 'end_date',
          type: 'timestamp',
          default: 'now()',
        },
        {
          name: 'expected_return_date',
          type: 'timestamp',
          default: 'now()',
        },
        {
          name: 'total',
          type: 'numeric',
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()',
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()',
        },
      ],
      foreignKeys: [
        {
          name: 'FKCarRental',
          referencedTableName: 'cars',
          referencedColumnNames: ['id'],
          columnNames: ['car_id'],
          onDelete: 'SET NULL',
          onUpdate: 'SET NULL',
        },
        {
          name: 'FKUserRental',
          referencedTableName: 'users',
          referencedColumnNames: ['id'],
          columnNames: ['user_id'],
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
