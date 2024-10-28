paths:

/api/users - GET all users
/api/users/register - POST a new user
/api/users/login - POST a current usr to authenticate and login
/api/users/:id - GET single user, PUT/edit user, DELETE user
/api/users/:id/posts - GET posts by a given user

/api/posts - GET all posts
/api/posts/create - POST new posts
/api/posts/:id - GET single post, PUT/edit post, DELETE post

/api/chats/:id - GET all chats for single user
/api/chats/:id/:friendId - GET chat between current user and a given user, POST message between current user and given user
