import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCarImage1642861945777 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: "car_images",
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
                    name:"image_name",
                    type: "varchar",
                    isNullable: true
                },

                {
                    name: "createdAt",
                    type: "timestamp",
                    default: "now()"
                },
            
                
            ],
            foreignKeys:[{
                referencedTableName: "cars",
                referencedColumnNames: ["id"],
                columnNames: ["car_id"],
                onDelete: "SET NULL",
                onUpdate: "SET NULL"
            }]
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("car_images")
    }

}
