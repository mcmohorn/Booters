import Area from "../db/models/area";

export type AreaResource = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
};

export default class Areas {
  public static async list(): Promise<AreaResource[]> {
    const areaResult = await Area.transaction(async (trx) => {
      let areaGraphs = await Area.query(trx);

      let results = areaGraphs.map((j): AreaResource => Areas.toResouce(j));

      return results;
    });
    return areaResult;
  }

  public static toResouce(graph: any) {
    return {
      id: graph.id,
      name: graph.name,
      latitude: graph.latitude,
      longitude: graph.longitude,
    };
  }
}
