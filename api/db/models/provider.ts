import { Model } from 'objection';

// provider is an auth provider like Google or Facebook
export default class Provider extends Model {
    public id: string;
    public name: string;
  static get tableName() {
    return 'provider';
  }
  

  static get relationMappings() {
    return {
        
      
    };
  }
}