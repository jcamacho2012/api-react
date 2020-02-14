'use strict';


class UsersRepository {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;
    }
}

module.exports = UsersRepository