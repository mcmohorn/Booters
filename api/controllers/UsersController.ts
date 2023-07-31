
class UsersController {

    public async get(req, res) {
        try {
            res.send(req.user);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

export default UsersController;