import pool from '../db/config';

class UsersController {

    public async get(req, res) {
        try {
            console.log('we got here');
            const client = await pool.connect();

            const sql = "select * from pg_catalog.pg_user";
            const { rows } = await client.query(sql);
            const todos = rows;

            client.release();

            res.send(todos);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

export default UsersController;