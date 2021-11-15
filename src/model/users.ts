import { Knex } from 'knex'
export class UsersModel {

    getList(db: Knex) {
        return db('users')
    }
}