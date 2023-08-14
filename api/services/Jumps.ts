import Jump from "../db/models/jump";

export type JumpResource = {
    id?: string;
    name: string;
    description?: string;
    longitude: number;
    latitude: number;
    jumpTypeId: string;
    difficultyId: string;
  };

export default class Jumps {
    public static async list(): Promise<JumpResource[]> {

        const jResult = await Jump.transaction(async trx => {

            let jumpGraphs = await Jump.query(trx);

            let results = jumpGraphs.map((j): JumpResource => Jumps.toResouce(j))

            return results;
            
          });
          return jResult;     
    } 

    public static async create(j: JumpResource): Promise<JumpResource> {

        const jResult = await Jump.transaction(async trx => {

            j.id = crypto.randomUUID();

            // const rawInsertQuery = `insert into jump (id, name, description, location, jump_type_id, area_id, difficulty_id,created, updated) values (${j.id}, ${j.name}, ${j.description}, point('${j.location[0]}','${j.location[1]}'), '${j.jumpTypeId}', null, '${j.difficultyId}', NOW(), NOW())`;
            // let jumpGraph = await Jump.query(trx).r(raw(rawInsertQuery)); 

            let g = await Jump.query(trx).insert(j);

            let result = Jumps.toResouce(g);

            return result;
            
          });

          return jResult;     
    }

    public static toResouce(graph: any) {
        return {
            id: graph.id,
            name: graph.name,
            description: graph.description,
            latitude: graph.latitude,
            longitude: graph.longitude,
            jumpTypeId: graph.jumpTypeId,
            difficultyId: graph.difficultyId
        }
    }
    
}