export async function seed(knex) {
  //delete existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      id: 1,
      user_name: "Anoshka",
      pet_name: "Bruno",
      type: "Dog",
      breed: "Cocker Spaniel",
      avatar: "dog_1.jpg",
      temperament: "Friendly to humans, aggresssive towards other dogs",
      status: "Vaccinated",
      bio: "A cute, small baby who is friendly towards some dogs, but not good with more aggressive dogs. He's a bit scared of children but loves making enw friends.",
      contact_phone: "+1 (123) 456-7890",
      contact_email: "anoshkaujhaveri@gmail.com",
      password: "",
      location: "",
    },
    {
      id: 2,
      user_name: "April",
      pet_name: "Champion",
      type: "Dog",
      breed: "Pit mix",
      avatar: "images/dog_2",
      temperament: "Loves everyone",
      status: "Vaccinated & Neutered",
      bio: ", 3 legged dog, requires extra care",
      contact_phone: "+1 (123) 456-7890",
      contact_email: "april@gmail.com",
      password: "",
      location: "Pawnee, Indiana",
    },
  ]);
}
