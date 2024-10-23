export async function seed(knex) {
  //delete existing entries
  await knex("posts").del();
  await knex("posts").insert([
    {
      id: 1,
      user_id: 1,
      image: "./dog_2.jpeg",
      likes: 4,
      description: "feeling cute, might delete later",
    },
    {
      id: 2,
      user_id: 1,
      image: "./dog_1.jpg",
      likes: 6,
      description: "nosy dogr",
    },
    {
      id: 3,
      user_id: 1,
      image: "./dog_1.jpg",
      likes: 5,
      description: "walky time",
    },
  ]);
}
