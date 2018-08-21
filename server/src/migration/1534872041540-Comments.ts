import {MigrationInterface, QueryRunner} from "typeorm";

export class Comments1534872041540 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`INSERT INTO comments (comment, user_id, ticket_id)
      VALUES
       ('comment1', 4, 10),
       ('comment4', 2, 9),
       ('comment5', 3, 11),
       ('comment7', 2, 1),
       ('comment9', 4, 12),
       ('comment3', 4, 10),
       ('comment6', 3, 13),
       ('comment8', 1, 13),
       ('comment2', 3, 13),
       ('comment10', 2, 13)
;`)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`DELETE FROM comments WHERE id IN (1,2,3,4,5,6,7,8,9,10);`)
    }

}
