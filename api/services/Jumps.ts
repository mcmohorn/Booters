import Jump from "../db/models/jump";

export type JumpResource = {
    id: string;
    name: string;
    description?: string;
    location: any;
    jumpTypeId: string;
  };

export default class Jumps {
    public static async list(): Promise<JumpResource[]> {

        const userResult = await Jump.transaction(async trx => {

            let jumpGraphs = await Jump.query(trx);

            let results = jumpGraphs.map((j): JumpResource => Jumps.toResouce(j))

            return results;
            
          });
          return userResult;     
    } 

    public static toResouce(graph: any) {
        return {
            id: graph.id,
            name: graph.name,
            description: graph.description,
            location: graph.location,
            jumpTypeId: graph.jumpTypeId,
        }
    }
    
}