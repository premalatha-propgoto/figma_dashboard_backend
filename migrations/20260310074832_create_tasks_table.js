export const up = function (knex) {
  return knex.schema.createTable("tasks", (table) => {
    table
      .uuid("task_id")
      .primary()
      .defaultTo(knex.raw("gen_random_uuid()"));
    table.string("title", 255).notNullable();
    table.text("description");
    table.text("status").notNullable().defaultTo("Active");
    table.timestamp("start_time");
    table.timestamp("end_time");
    table.uuid("project_id").references("id").inTable("projects");
    table.uuid("created_by").references("user_id").inTable("users");
    table.uuid("updated_by").references("user_id").inTable("users");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at");
    table.boolean("is_active").notNullable().defaultTo(true);
    table.boolean("is_reminder").notNullable().defaultTo(false);
  });
};

export const down = function (knex) {
  return knex.schema.dropTableIfExists("tasks");
};