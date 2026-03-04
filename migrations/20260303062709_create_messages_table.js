exports.up = function (knex) {
  return knex.schema.createTable("messages", (table) => {
    // Primary Key
    table
      .uuid("id")
      .primary()
      .defaultTo(knex.raw("gen_random_uuid()")); // Auto-generated UUID

    // Timestamp
    table.timestamp("created_at").defaultTo(knex.fn.now());

    // Message text
    table.text("messages").notNullable();

    // Foreign Keys
    table.uuid("sender_id").references("user_id").inTable("user");
    table.uuid("receiver_id").references("user_id").inTable("user");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("messages");
};