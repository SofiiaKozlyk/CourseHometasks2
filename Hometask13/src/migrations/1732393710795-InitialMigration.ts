import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1732393710795 implements MigrationInterface {
    name = 'InitialMigration1732393710795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "user" text NOT NULL DEFAULT '', "email" text NOT NULL DEFAULT '', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
