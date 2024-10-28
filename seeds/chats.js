export async function seed(knex) {
  //delete existing entries
  await knex("chats").del();
  await knex("chats").insert([
    {
      id: "1",
      sender_id: "2c4bebd3-a8d1-449b-b648-fdd2a3851fd6",
      sender_name: "Natasha",
      receiver_id: "27da2058-dbc7-432f-b66a-f97e67f080e4",
      receiver_name: "Diya",
      message: "Hey! How are you?",
    },
    {
      id: "2",
      sender_id: "27da2058-dbc7-432f-b66a-f97e67f080e4",
      sender_name: "Diya",
      receiver_id: "2c4bebd3-a8d1-449b-b648-fdd2a3851fd6",
      receiver_name: "Natasha",
      message: "Good, and you?",
    },
    {
      id: "3",
      sender_id: "27da2058-dbc7-432f-b66a-f97e67f080e4",
      sender_name: "Diya",
      receiver_id: "8343f2fc-b5c0-4305-ac08-f8f339aa0610",
      receiver_name: "Anoshka",
      message: "How is puppy?",
    },
    {
      id: "4",
      sender_id: "8343f2fc-b5c0-4305-ac08-f8f339aa0610",
      sender_name: "Anoshka",
      receiver_id: "27da2058-dbc7-432f-b66a-f97e67f080e4",
      receiver_name: "Diya",
      message: "How is yours?",
    },

    {
      id: "5",
      sender_id: "2c4bebd3-a8d1-449b-b648-fdd2a3851fd6",
      sender_name: "Natasha",
      receiver_id: "8343f2fc-b5c0-4305-ac08-f8f339aa0610",
      receiver_name: "Anoshka",
      message: "good weather?",
    },
    {
      id: "6",
      sender_id: "8343f2fc-b5c0-4305-ac08-f8f339aa0610",
      sender_name: "Natasha",
      receiver_id: "2c4bebd3-a8d1-449b-b648-fdd2a3851fd6",
      receiver_name: "Diya",
      message: "rainy as usual",
    },
  ]);
}
