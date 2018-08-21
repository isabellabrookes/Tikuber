import {MigrationInterface, QueryRunner} from "typeorm";

export class Events1534848422543 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`INSERT INTO events (name, description, image, start_date, end_date, venue_id)
    VALUES
       ('Of Monsters And Men', 'Of Monsters and Men first had the world talking in 2011 with their inescapable and infectious quadruple-platinum smash “Little Talks.” An engaging mix of indie, folk, and alternative, the Icelandic quintet’s critically acclaimed full-length debut My Head Is An Animal (Republic Records) climbed to the top 10 of the Billboard Top 200 chart and has sold over 2 million albums worldwide. Since then the group have delivered revered performances at festivals such as Lollapalooza, Bonnaroo, Coachella, Newport Folk Festival, Osheaga, Glastonbury,', 'https://cps-static.rovicorp.com/3/JPG_400/MI0004/206/MI0004206098.jpg?partner=allrovi.com', '2018-08-25 19:00:00.000000','2018-08-25 23:00:00.000000', 2),
       ('Of Monsters And Men', 'Of Monsters and Men first had the world talking in 2011 with their inescapable and infectious quadruple-platinum smash “Little Talks.” An engaging mix of indie, folk, and alternative, the Icelandic quintet’s critically acclaimed full-length debut My Head Is An Animal (Republic Records) climbed to the top 10 of the Billboard Top 200 chart and has sold over 2 million albums worldwide. Since then the group have delivered revered performances at festivals such as Lollapalooza, Bonnaroo, Coachella, Newport Folk Festival, Osheaga, Glastonbury,', 'https://cps-static.rovicorp.com/3/JPG_400/MI0004/206/MI0004206098.jpg?partner=allrovi.com', '2018-08-24 19:00:00.000000','2018-08-24 23:00:00.000000', 3),
       ('First Aid Kit', 'First Aid Kit is a Swedish folk duo that consists of the sisters Klara (vocals/guitar) and Johanna Söderberg (vocals/keyboards/Autoharp/bass guitar). When performing live, the duo are accompanied by a drummer, a pedal steel guitarist and recently a keyboard player. In 2008, they became internationally known by their YouTube video cover of the Fleet Foxes''s song "Tiger Mountain Peasant Song" that gained significant Internet popularity.', 'https://cdn.pastemagazine.com/www/articles/First%20Aid%20Kit%202%20by%20Catharine%20McNelly%20Main.jpg', '2018-09-01 19:00:00.000000','2018-09-01 23:00:00.000000', 1),
       ('First Aid Kit', 'First Aid Kit is a Swedish folk duo that consists of the sisters Klara (vocals/guitar) and Johanna Söderberg (vocals/keyboards/Autoharp/bass guitar). When performing live, the duo are accompanied by a drummer, a pedal steel guitarist and recently a keyboard player. In 2008, they became internationally known by their YouTube video cover of the Fleet Foxes''s song "Tiger Mountain Peasant Song" that gained significant Internet popularity.', 'https://cdn.pastemagazine.com/www/articles/First%20Aid%20Kit%202%20by%20Catharine%20McNelly%20Main.jpg', '2018-09-02 19:00:00.000000','2018-09-02 23:00:00.000000', 2),
       ('You Me At Six', 'You Me at Six are an English rock band from Weybridge, Surrey. Formed in 2004, the group achieved success in 2008 with the release of their debut album, Take Off Your Colours, which included the singles "Save It for the Bedroom", "Finders Keepers" and "Kiss and Tell", with the latter two peaking at number 33 and number 42 respectively in the official UK Singles Chart.', 'https://ksassets.timeincuk.net/wp/uploads/sites/55/2017/01/2017_YMAS__Press110117.jpg', '2018-12-12 19:00:00.000000','2018-12-12 23:00:00.000000', 3),
       ('Jaya The Cat', 'Even though the guys of Jaya the Cat started out in Boston, USA, nowadays they operate in our own small country. The American and Dutch guys make music you don’t hear every day: a mix of reggae, ska, punk, rock and maybe even a little bit of dub and dance. The band’s nickname is Drunk Reggae and you probably can’t give it a better name. Ready to party? Come and see Jaya the Cat!', 'https://www.magazine.awayfromlife.com/wp-content/uploads/sites/7/2016/01/Jaya-The-Cat-Reggea-Ska-Punk-Band.jpg', '2018-08-02 19:00:00.000000','2018-08-02 23:00:00.000000', 4);`)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`DELETE FROM events WHERE name='Of Monsters And Men' AND start_date='2018-08-25 19:00:00.000000';`)
      await queryRunner.query(`DELETE FROM events WHERE name='Of Monsters And Men' AND start_date='2018-08-24 19:00:00.000000';`)
      await queryRunner.query(`DELETE FROM events WHERE name='First Aid Kit' AND start_date='2018-09-01 19:00:00.000000';`)
      await queryRunner.query(`DELETE FROM events WHERE name='First Aid Kit' AND start_date='2018-09-02 19:00:00.000000';`)
      await queryRunner.query(`DELETE FROM events WHERE name='You Me At Six' AND start_date='2018-12-12 19:00:00.000000';`)
      await queryRunner.query(`DELETE FROM events WHERE name='Jaya The Cat' AND start_date='2018-08-02 19:00:00.000000';`)
    }

}