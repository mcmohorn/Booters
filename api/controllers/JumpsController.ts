import pool from '../db/config';

class JumpsController {

    public async get(req, res) {
        try {
            console.log('we got here (jumps controller)');
            const client = await pool.connect();

            const sql = "select * from jump";
            const { rows } = await client.query(sql);
            const todos = rows;

            client.release();

            res.send(todos);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

export default JumpsController;