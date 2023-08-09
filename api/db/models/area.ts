import { Model } from "objection";

export default class Area extends Model {
  public id: string;
  public name: string;
  public location: string;
  static get tableName() {
    return "area";
  }

  static get relationMappings() {
    return {};
  }
}
