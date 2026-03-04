exports.up = function (knex) {
  return knex.schema.createTable("user", (table) => {
    table
      .uuid("user_id")
      .primary()
      .defaultTo(knex.raw("gen_random_uuid()")); 
    table.string("full_name", 255).notNullable();
    table.string("email", 255).unique(); 
    table.string("role", 255).notNullable();
    table.string("mobile_no", 64).notNullable();
    table.text("profile_picture");
    table.boolean("is_active").notNullable().defaultTo(true);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.uuid("created_by").references("user_id").inTable("user");

    table.timestamp("updated_at").defaultTo(null);
    table.uuid("updated_by").references("user_id").inTable("user");
  });
};
exports.down = function (knex) {
  return knex.schema.dropTable("user");
};