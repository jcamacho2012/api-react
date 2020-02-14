'use strict';

const bluebird = require('bluebird')


// Loading all the database repositories separately,
// because event 'extend' is called multiple times:
const repos = {
    users: require('./repos/users')
};
// pg-promise initialization options:
const options = {

    promiseLib: bluebird,

    extend: (obj, dc) => {
        for (let r in repos) {
            obj[r] = new repos[r](obj, pgp);
        }
    }
};

let configDb = null;

configDb = {
    host: 'fms-db.clq4s4nqwso1.us-east-1.rds.amazonaws.com',
    port: 5432,
    database: 'fms_db_desarrollo',
    user: 'fms_admin',
    password: 'fms_admin2019++',
    idleTimeoutMillis: 15000,
 };

// Load and initialize pg-promise:
const pgp = require('pg-promise')(options);

pgp.pg.defaults.poolSize = 20;
// Create the database instance:
const db = pgp(process.env.DATABASE_URL || configDb);
module.exports = db;
