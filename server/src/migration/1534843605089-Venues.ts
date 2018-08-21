import {MigrationInterface, QueryRunner} from "typeorm";

export class Venues1534843605089 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`INSERT INTO venues (name, address, phone, website)  VALUES
       ('Melkweg', 'Lijnbaansgracht 234A, 1017 PH Amsterdam', '0205318181', 'https://www.melkweg.nl/nl/'),
       ('Paradiso', 'Weteringschans 6-8, 1017 SG Amsterdam', '0206264521' , 'https://www.paradiso.nl/nl/'),
       ('Ziggo Dome', 'De Passage 100, 1101 AX Amsterdam', '09002353663', 'https://www.ziggodome.nl/'),
       ('The Cave Rock Club', 'Prinsengracht 472, 1017 KG Amsterdam', '0206268939', 'https://www.facebook.com/pages/The-Cave/176270342404953')`)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`DELETE FROM venues WHERE name='Melkweg' OR name='Paradiso' OR name='Ziggo Dome' OR name='The Cave Rock Club'`)
    }

}
