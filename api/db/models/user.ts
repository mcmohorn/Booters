import { Model } from 'objection';

class User extends Model {

  static get tableName() {
    return 'user';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['id', 'name', 'email'],

      properties: {
        id: { type: 'string', minLength: 36, maxLength: 36  },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string', minLength: 1, maxLength: 255 },
      }
    };
  }

  static get relationMappings() {
    const Jump =  require("./jump");

    return {
        createdJumps: {
            relation: Model.HasManyRelation,
            modelClass: Jump,
            join: {
              from: 'user.id',
              to: 'jump.created_by_id'
            }
          },

      
    };
  }
}