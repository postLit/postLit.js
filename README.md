# postLit.js
postLit.js is a simple module that allows you to easily interact with the [postLit](https://postlit.dev) site. It uses the API as it should be used, and is reliable.

## How to Use

### Getting Started
Start by simply importing the module so that you can use it.

```js
const { postLitClient } = require("postlit.js")
```

### Using the Websocket
We've added a websocket to make postLit.js simpler to use.

```js
postLitClient.on("ready", function(user) {
    console.log(user) // the user that is logged in
})

postLitClient.on("messageCreate", function(message) {
    console.log(message) // a notification or message
})
```

You can then use `postLit` whenever you're interacting with the postLit API.

### Functions

#### postLitClient.login(token)
You can use this to log into the postLit website with your user token.

#### postLitClient.fetchMessages()
You can use this to fetch the messages of the user that you're logged in with. It will return an array of all the messages.

#### postLitClient.markAllRead()
Allows you to mark all messages as read.

#### postLitClient.post(content)
Allows you to create posts. It will return an error if the post is blank or over 2,000 characters.

#### postLitClient.follow(user)
Allows you to follow a specific user on postLit using their username. The user will be notified that you are now following them. No error will be returned if you are already following them.

#### postLitClient.unfollow(user)
Allows you to unfollow a specific user on postLit using their username. The user will not be notified of you unfollowing them. No error will be returned if you are not currently following them.

#### postLitClient.fetchPost(id)
You can use this to fetch the data for any post that you want using the post's ID. Every post has an ID and it is included in the URL for that post. It will return the ID, the author, content, time of posting, comments, safety information, the users that liked the post, and if it is currently pinned on the author's profile.

#### postLitClient.like(post)
Allows you to like any post that you select using the user that you're signed in as. It will not return an error if you have already liked the post. `post` should be the post ID.

#### postLitClient.unlike(post)
Allows you to remove your like from any post that you select using the user that you're signed in as. It will not return an error if you have have not already liked the post. `post` should be the post ID.

#### postLitClient.pin(post)
Allows you to pin a post to your user page. `post` should be the post ID.

#### postLitClient.comment(post, content)
Allows you to comment on any existing post. `post` should be the post ID, and `content` is the contents of the comment. The comment cannot be empty and must be less than 2,000 characters.

#### postLitClient.setTheme(theme)
Allows you to change the theme of your profile page. `theme` must be the colour name.

#### postLitClient.getTopUsers()
Returns the data for top users on the Explore page.

#### postLitClient.inviteAmount()
Returns the amonut of invites your account has used.
