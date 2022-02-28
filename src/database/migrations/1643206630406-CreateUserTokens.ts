import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTokens1643206630406 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "user_tokens",
            columns: [

                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "refresh_token",
                    type: 'varchar'
                },
                {
                    name: "user_id",
                    type: "int",
                    isNullable: true
                }, {
                    name: "expires_date",
                    type: "timestamp",
                    default: "now()"
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default: "now()"
                }

            ],
            foreignKeys: [{
                referencedTableName: "users",
                referencedColumnNames: ["id"],
                columnNames: ["user_id"],
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            }]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user_tokens")
    }

}
