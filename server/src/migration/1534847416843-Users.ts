import {MigrationInterface, QueryRunner} from "typeorm";

export class Users1534847416843 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`INSERT INTO users (first_name, last_name, email, password, role_id) 
      VALUES
      ('Admin',	'Admin',	'admin@example.com',	'$2a$10$kej/5tHFEQxplHvLpNAJpe1/ruusLR73DBLVq/GT0wafrvfKT3LdS',	1),
      ('Yoda',	'Jedi Master',	'yoda@example.com',	'$2a$10$kej/5tHFEQxplHvLpNAJpe1/ruusLR73DBLVq/GT0wafrvfKT3LdS',	2),
      ('Luke',	'Skywalker',	'luke@example.com',	'$2a$10$kej/5tHFEQxplHvLpNAJpe1/ruusLR73DBLVq/GT0wafrvfKT3LdS',	2),
      ('Chewbacca',	'Wookie',	'chewie@example.com',	'$2a$10$kej/5tHFEQxplHvLpNAJpe1/ruusLR73DBLVq/GT0wafrvfKT3LdS',	2)
;`)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`DELETE FROM users WHERE first_name='Admin' OR first_name='Yoda' OR first_name='Luke' OR first_name='Chewbacca'  ;`)
    }

}
