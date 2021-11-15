import { Knex } from 'knex';
export class TestModel {

    test(db: Knex) {
        return db('test')
    }
}

