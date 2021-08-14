import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class Session1628882386591 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        columns: [
          {
            isPrimary: true,
            length: '36',
            name: 'id',
            type: 'varchar',
          },
          {
            length: '36',
            name: 'userId',
            type: 'varchar',
          },
          {
            default: 'now()',
            name: 'createdAt',
            type: 'timestamp',
          },
          {
            name: 'expiresAt',
            type: 'datetime',
          },
        ],
        name: 'sessions',
      }),
    );

    await queryRunner.createForeignKey(
      'sessions',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sessions');
  }
}
