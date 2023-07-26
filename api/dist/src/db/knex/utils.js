"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultHistoryFields = exports.deleteOnUpdateTrigger = exports.createOnUpdateTrigger = void 0;
const createOnUpdateTrigger = (tableName) => `
  CREATE TRIGGER "${tableName}_updated_at"
  BEFORE UPDATE ON "${tableName}"
  FOR EACH ROW
  EXECUTE PROCEDURE on_update_timestamp();`;
exports.createOnUpdateTrigger = createOnUpdateTrigger;
const deleteOnUpdateTrigger = (tableName) => `
  DROP TRIGGER "${tableName}_updated_at" ON "${tableName}";
`;
exports.deleteOnUpdateTrigger = deleteOnUpdateTrigger;
const defaultHistoryFields = (knex, table) => {
    table.boolean('active').notNullable().defaultTo(true);
};
exports.defaultHistoryFields = defaultHistoryFields;
//# sourceMappingURL=utils.js.map