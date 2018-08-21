import {MigrationInterface, QueryRunner} from "typeorm";

export class Tickets1534870694300 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`INSERT INTO tickets (price, description, image, event_id, seller_user_id, buyer_user_id)
        VALUES
        (10, 'can''t make it', 'https://www.ticketdesigner.com/images/musical_notes_specs.jpg', 1, 2, 2),
        (15, 'spare', 'https://www.ticketdesigner.com/images/musical_notes_specs.jpg', 1, 3, null),
        (13, 'extra x2', 'https://www.ticketdesigner.com/images/musical_notes_specs.jpg', 2, 3, null),
        (13, 'extra x2', 'https://www.ticketdesigner.com/images/musical_notes_specs.jpg', 2, 3, 2),
        (20, 'friend bailed', 'https://www.ticketdesigner.com/images/musical_notes_specs.jpg', 1, 1, null),
        (24, 'don''t want to go anymore', 'https://www.ticketdesigner.com/images/musical_notes_specs.jpg', 3, 1, null),
        (21, 'girlfriend dumped me', 'https://www.ticketdesigner.com/images/musical_notes_specs.jpg', 3, 1, null),
        (20, 'Jeremy is sick', 'https://www.ticketdesigner.com/images/musical_notes_specs.jpg', 4, 2, null),
        (22, 'Car won''t start', 'https://www.ticketdesigner.com/images/musical_notes_specs.jpg', 4, 2, null),
        (25, 'working late', 'https://www.ticketdesigner.com/images/musical_notes_specs.jpg', 4, 2, null),
        (100, 'dog ate my spare so my girlfriend won''t let me go alone', 'https://www.ticketdesigner.com/images/musical_notes_specs.jpg', 5, 2, null),
        (50, 'spare ticket', 'https://www.ticketdesigner.com/images/musical_notes_specs.jpg', 5, 2, null),
        (100, 'bought extra', 'https://www.ticketdesigner.com/images/musical_notes_specs.jpg', 5, 2, null),
        (100, 'too sick to make it', 'https://www.ticketdesigner.com/images/musical_notes_specs.jpg', 6, 2, null),
        (10, 'too high to get the tram', 'https://www.ticketdesigner.com/images/musical_notes_specs.jpg', 3, 4, 3)
`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DELETE FROM tickets WHERE id IN (1,2,3,4,5,6,7,8,9,10,11,12,13,14,15);`);
    }

}
