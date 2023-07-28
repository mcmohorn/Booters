import { Model } from 'objection';

class Jump extends Model {

  static get tableName() {
    return 'jump';
  }
  
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'location', 'jumpTypeId'],

      properties: {
        id: { type: 'string' },
        jumpTypeId: { type: 'string', minLength: 36, maxLength: 36 },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        location: { type: 'array', minLength: 2, maxLength: 2 },
      }
    };
  }

  static get relationMappings() {
    // Importing models here is one way to avoid require loops.
    const User = require('./user');
    const JumpType = require('./user');

    return {
        creator: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
              from: 'jump.creatorId',
              to: 'user.id'
            }
          },
          type: {
            relation: Model.HasOneRelation,
            modelClass: JumpType,
            join: {
              from: 'jump.jumpTypeId',
              to: 'jumpType.id'
            }
          },
      
    };
  }
}