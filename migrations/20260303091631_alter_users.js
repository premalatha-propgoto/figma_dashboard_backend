export const up = function (knex) {
  return knex.schema.alterTable("user", (table) => {
    table.string("password", 255).notNullable().defaultTo("temp_password");
  });
};

export const down = function (knex) {
  return knex.schema.alterTable("user", (table) => {
    table.dropColumn("password");
  });
};