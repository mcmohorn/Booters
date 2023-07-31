import { Model } from 'objection';
import Provider from './provider';

export default class User extends Model {
  public id: string;
  public providerId: string;
  public providerRef: string;
  static get tableName() {
    return 'usr'; 
  }

  static get relationMappings() {

    return {
      provider: {
        relation: Model.HasOneRelation,
        modelClass: Provider,
        join: {
          from: 'usr.provider_id',
          to: 'provider.id'
        }
      }
    };
  }
}