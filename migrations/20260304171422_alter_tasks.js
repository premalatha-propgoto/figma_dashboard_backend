export const up = function (knex) {
  return knex.schema.table('tasks', function (table) {
    table.text('url');
    table.jsonb('comments').defaultTo('{}'); 
  });
};

export const down = function (knex) {
  return knex.schema.table('tasks', function (table) {
    table.dropColumn('url');
    table.dropColumn('comments');
  });
};