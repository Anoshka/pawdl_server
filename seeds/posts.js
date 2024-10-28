export async function seed(knex) {
  //delete existing entries
  await knex("posts").del();
  await knex("posts").insert([
    {
      id: "1",
      user_id: "2c4bebd3-a8d1-449b-b648-fdd2a3851fd6",
      image: "./dog_2.jpeg",
      likes: 4,
      description: "feeling cute, might delete later",
    },
    {
      id: "2",
      user_id: "27da2058-dbc7-432f-b66a-f97e67f080e4",
      image: "./dog_1.jpg",
      likes: 6,
      description: "nosy dogr",
    },
    {
      id: "3",
      user_id: "27da2058-dbc7-432f-b66a-f97e67f080e4",
      image: "./dog_2.jpeg",
      likes: 6,
      description: "ready for walkies",
    },
    {
      id: "4",
      user_id: "8343f2fc-b5c0-4305-ac08-f8f339aa0610",
      image: "./dog_1.jpg",
      likes: 6,
      description: "ready for walkies",
    },
    {
      id: "5",
      user_id: "8343f2fc-b5c0-4305-ac08-f8f339aa0610",
      image: "./dog_2.jpeg",
      likes: 7,
      description: "I had a long day of naps",
    },
    {
      id: "6",
      user_id: "8343f2fc-b5c0-4305-ac08-f8f339aa0610",
      image: "./dog_1.jpg",
      likes: 8,
      description: "I work hard, I need my down time",
    },
    {
      id: "7",
      user_id: "8343f2fc-b5c0-4305-ac08-f8f339aa0610",
      image: "./dog_2.jpeg",
      likes: 9,
      description: "have to sniff all the grass",
    },
  ]);
}
