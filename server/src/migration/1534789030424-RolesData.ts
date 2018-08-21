import {MigrationInterface, QueryRunner} from "typeorm";

export class RolesData1534789030424 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`INSERT INTO roles (type) VALUES ('Admin'),('User');`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`DELETE FROM roles WHERE type='Admin' OR type='User'`);
    }
}
