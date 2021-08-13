import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class Users1628554161732 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        columns: [
          {
            isPrimary: true,
            length: '36',
            name: 'id',
            type: 'char',
          },
          {
            length: '25',
            name: 'username',
            type: 'varchar',
          },
          {
            length: '25',
            name: 'firstname',
            type: 'varchar',
          },
          {
            length: '25',
            name: 'lastname',
            type: 'varchar',
          },
          {
            length: '60',
            name: 'passwordHash',
            type: 'char',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
          },
        ],
        name: 'users',
      }),
    );

    await queryRunner.createIndex(
      'users',
      new TableIndex({
        columnNames: ['username'],
        isUnique: true,
        name: 'unique_username',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
