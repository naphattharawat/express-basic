import { Knex } from 'knex'
export class LoginModel {

   
    findUsername(db: Knex, username: string) {
        return db('users')
            .where('username', username)
    }

  
}