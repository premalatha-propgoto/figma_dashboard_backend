export const up = function (knex) {
  return knex.schema.alterTable("users", (table) => {
    table.string("password", 255).notNullable().defaultTo("temp_password");
  });
};

export const down = function (knex) {
  return knex.schema.alterTable("users", (table) => {
    table.dropColumn("password");
  });
};