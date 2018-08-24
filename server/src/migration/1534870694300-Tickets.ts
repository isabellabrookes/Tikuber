import {MigrationInterface, QueryRunner} from "typeorm";

export class Tickets1534870694300 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`INSERT INTO tickets (price, description, image, event_id, seller_user_id, buyer_user_id, created_at)
        VALUES
        (10, 'can''t make it', 'https://www.ticketdesigner.com/images/musical_notes_specs.jpg', 1, 2, 2, '2018-08-01 19:00:00.000000'),
        (15, 'spare', 'https://www.ticketdesigner.com/images/musical_notes_specs.jpg', 1, 3, null, '2018-08-01 09:01:00.000000'),
        (13, 'extra x2', 'https://www.ticketdesigner.com/images/musical_notes_specs.jpg', 2, 3, null, '2018-08-02 09:30:00.000000'),
        (13, 'extra x2', 'https://www.ticketdesigner.com/images/musical_notes_specs.jpg', 2, 3, 2, '2018-08-02 09:50:00.000000'),
        (20, 'friend bailed', 'https://www.ticketdesigner.com/images/musical_notes_specs.jpg', 1, 1, null, '2018-08-04 11:00:00.000000'),
        (24, 'don''t want to go anymore', 'https://www.ticketdesigner.com/images/musical_notes_specs.jpg', 3, 1, null, '2018-08-11 13:00:00.000000'),
        (21, 'girlfriend dumped me', 'https://www.ticketdesigner.com/images/musical_notes_specs.jpg', 3, 1, null, '2018-08-20 09:00:00.000000'),
        (20, 'Jeremy is sick', 'https://www.ticketdesigner.com/images/musical_notes_specs.jpg', 4, 2, null, '2018-08-21 06:00:00.000000'),
        (22, 'Car won''t start', 'https://www.ticketdesigner.com/images/musical_notes_specs.jpg', 4, 2, null, '2018-08-21 14:00:00.000000'),
        (25, 'working late', 'https://www.ticketdesigner.com/images/musical_notes_specs.jpg', 4, 2, null, '2018-08-22 17:00:00.000000'),
        (100, 'dog ate my spare so my girlfriend won''t let me go alone', 'https://www.ticketdesigner.com/images/musical_notes_specs.jpg', 5, 2, null, '2018-08-22 17:01:00.000000'),
        (50, 'spare ticket', 'https://www.ticketdesigner.com/images/musical_notes_specs.jpg', 5, 2, null, '2018-08-23 08:59:00.000000'),
        (100, 'bought extra', 'https://www.ticketdesigner.com/images/musical_notes_specs.jpg', 5, 2, null, '2018-08-23 12:00:00.000000'),
        (100, 'too sick to make it', 'https://www.ticketdesigner.com/images/musical_notes_specs.jpg', 6, 2, null, '2018-08-23 18:00:00.000000'),
        (10, 'too high to get the tram', 'https://www.ticketdesigner.com/images/musical_notes_specs.jpg', 3, 4, 3, '2018-08-23 19:00:00.000000')
`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DELETE FROM tickets WHERE id IN (1,2,3,4,5,6,7,8,9,10,11,12,13,14,15);`);
    }

}
