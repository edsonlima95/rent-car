import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEspecificarions1642264949328 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: "especifications",
            columns: [{
                name: "id",
                type: "int",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment"

            },
            {
                name: "name",
                type: "varchar",
            },
            {
                name: "description",
                type: "varchar",
            },
            {
                name: "createdAt",
                type: "timestamp",
                default: "now()"
            },


            ]
        }))

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
