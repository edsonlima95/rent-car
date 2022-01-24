import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { idText } from "typescript";

export class CreateRentalCar1643045130869 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: "rentals",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "car_id",
                    type: "int",
                    isNullable: true
                },
                {
                    name: "user_id",
                    type: "int",
                    isNullable: true
                },
                {
                    name: "start_date",
                    type: "timestamp",
                    default: "now()"
                },
                {
                    name: "end_date",
                    type: "timestamp",
                    isNullable: true
                },
                {
                    name: "expected_return_date",
                    type: "timestamp",
                    default: "now()"
                },
                {
                    name: "total",
                    type: "numeric"
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default: "now()"
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                    default: "now()"
                }
            ],
            foreignKeys: [{
                referencedTableName: "cars",
                referencedColumnNames: ["id"],
                columnNames: ["car_id"],
                onDelete: "SET NULL",
                onUpdate: "SET NULL"
            }, {
                referencedTableName: "users",
                referencedColumnNames: ["id"],
                columnNames: ["user_id"],
                onDelete: "SET NULL",
                onUpdate: "SET NULL"
            }]
        }))

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("rentals")
    }

}
