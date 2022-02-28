import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

export class CreateEspecificationsCars1642775081278 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: "especification_cars",
            columns: [
                {
                    name: "especification_id",
                    type: "int",
                    isNullable: true
                },
                {
                    name: "car_id",
                    type: "int",
                    isNullable: true
                }
            ]
        }))

        await queryRunner.createForeignKey("especification_cars", new TableForeignKey({
            name: "FKCarEspecificarion",
            referencedTableName: "cars",
            referencedColumnNames: ["id"],
            columnNames: ["car_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL"
        }))

        await queryRunner.createForeignKey("especification_cars", new TableForeignKey({
            name: "FKEspecificarionCar",
            referencedTableName: "especifications",
            referencedColumnNames: ["id"],
            columnNames: ["especification_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL"
        }))

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropForeignKey("especification_cars", "FKCarEspecificarion")
        await queryRunner.dropForeignKey("especification_cars", "FKEspecificarionCar")
        await queryRunner.dropTable("especification_cars")
    }

}
