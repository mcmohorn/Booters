import { Model } from 'objection';

class JumpType extends Model {

  static get tableName() {
    return 'jump_type';
  }
  
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['id', 'name', 'description'],

      properties: {
        id: { type: 'string' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        description: { type: 'string', minLength: 1, maxLength: 300 },
      }
    };
  }

  static get relationMappings() {
    

    return {
        
      
    };
  }
}