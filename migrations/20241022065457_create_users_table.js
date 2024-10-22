/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("user_name").notNullable();
    table.string("pet_name").notNullable();
    table.string("type").notNullable();
    table.string("avatar");
    table.string("breed");
    table.string("temperament");
    table.string("status");
    table.string("bio");
    table.string("location");
    table.string("contact_phone").notNullable();
    table.string("contact_email").notNullable();
    table.string("password").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("users");
}
