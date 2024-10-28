/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("chats", (table) => {
    table.uuid("id").primary();
    table.string("sender_id").notNullable();
    table.string("sender_name");
    table.string("receiver_id").notNullable();
    table.string("receiver_name");
    table.text("message").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTableIfExists("chats");
}
