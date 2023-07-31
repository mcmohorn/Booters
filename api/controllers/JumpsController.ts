import Jumps from "../services/Jumps";
class JumpsController {

    public async get(req, res) {
        try {
            // TODO attach query parameters
            const js = await Jumps.list();
            console.log('js is ', js);
            
            res.send(js);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

export default JumpsController;