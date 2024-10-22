export async function seed(knex) {
  //delete existing entries
  await knex("posts").del();
  await knex("posts").insert([
    {
      user_id: 1,
      image: "./dog_2.jpeg",
      likes: 4,
    },
    {
      user_id: 1,
      image: "./dog_1.jpg",
      likes: 6,
    },
  ]);
}
