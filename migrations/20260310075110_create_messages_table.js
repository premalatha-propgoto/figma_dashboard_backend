export const up = function (knex) {
  return knex.schema.createTable("messages", (table) => {
    table
      .uuid("id")
      .primary()
      .defaultTo(knex.raw("gen_random_uuid()"));
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.text("message").notNullable();
    table.uuid("sender_id").references("user_id").inTable("users");
    table.uuid("receiver_id").references("user_id").inTable("users");
  });
};

export const down = function (knex) {
  return knex.schema.dropTableIfExists("messages");
};