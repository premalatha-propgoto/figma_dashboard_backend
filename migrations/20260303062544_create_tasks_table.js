exports.up = function (knex) {
  return knex.schema.createTable("tasks", (table) => {
    // Primary Key
    table
      .uuid("task_id")
      .primary()
      .defaultTo(knex.raw("gen_random_uuid()")); // Auto generated UUID

    // Required Fields
    table.string("title", 255).notNullable();

    // Optional Fields
    table.text("description");

    // Status
    table.text("status").notNullable().defaultTo("Active");

    // Time fields
    table.timestamp("start_time");
    table.timestamp("end_time");

    // Foreign Keys
    table.uuid("project_id").references("id").inTable("projects");
    table.uuid("created_by").references("user_id").inTable("user");
    table.uuid("updated_by").references("user_id").inTable("user");

    // Timestamps
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at");

    // Boolean flags
    table.boolean("is_active").notNullable().defaultTo(true);
    table.boolean("is_reminder").notNullable().defaultTo(false);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tasks");
};