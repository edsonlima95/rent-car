import { IsNull, MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCars1642636380265 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: "cars",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated:true,
                    generationStrategy:'increment'
                },
                {
                    name: "name",
                    type: "varchar"
                },
                {
                    name: "description",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: "daily_rate",
                    type: "numeric"
                },
                {
                    name: "available",
                    type: "boolean",
                    default: true
                },
                {
                    name: "license_plate",
                    type: "varchar"
                },
                {
                    name: "fine_amount",
                    type: "numeric"
                },
                {
                    name: "brand",
                    type: "varchar",
                    isNullable: true

                },
                {
                    name: "category_id",
                    type: "int",
                    isNullable: true
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default: "now()"
                }
            ],
            foreignKeys: [{
                referencedTableName: "categories",
                referencedColumnNames: ["id"],
                columnNames: ["category_id"],
                onDelete: "SET NULL",
                onUpdate: "SET NULL"
            }]
        }))

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users")
    }

}
