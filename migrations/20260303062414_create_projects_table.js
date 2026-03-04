exports.up = function (knex) {
  return knex.schema.createTable("projects", (table) => {
    table
      .uuid("id")
      .primary()
      .defaultTo(knex.raw("gen_random_uuid()")); 
    table.string("name", 255).notNullable();
    table.text("description");
    table.uuid("created_by").references("user_id").inTable("user");
    table.uuid("updated_by").references("user_id").inTable("user");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at");
  });
};
exports.down = function (knex) {
  return knex.schema.dropTable("projects");
};