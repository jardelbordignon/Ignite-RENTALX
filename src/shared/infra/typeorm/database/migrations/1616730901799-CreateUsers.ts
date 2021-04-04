import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export default class CreateUsers1616730901799 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            // generationStrategy: 'uuid',
            // default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar(50)',
          },
          {
            name: 'username',
            type: 'varchar(50)',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar(100)',
          },
          {
            name: 'driver_license',
            type: 'varchar(40)',
          },
          {
            name: 'is_admin',
            type: 'boolean',
            default: false,
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
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }
}
