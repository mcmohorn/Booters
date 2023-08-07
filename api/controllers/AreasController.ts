import Areas from "../services/Areas";
class AreasController {

    public async get(req, res) {
        try {
            const areas = await Areas.list();
            
            res.send(areas);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

export default AreasController;