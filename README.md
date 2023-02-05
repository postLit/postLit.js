# postLit.js
postLit.js is a simple module that allows you to easily interact with [postLit](https://postlit.dev), the social media website. It uses the API as it should be used, and is reliable.

### How to Use
Here's the different functions that you can use to fetch data and interact with the site.
#### Getting started
Start by simply importing the module so that you can use it.
```
const { postLitClient } = require("postlit.js")
```
#### Using the Websocket
We've added a websocket to make postLit.js simpler to use.
```
postLitClient.on("ready", function(user) {
    console.log(user) // the user that is logged in
})

postLitClient.on("messageCreate", function(message) {
    console.log(message) // a notification or message
})
```
You can then use `postLit` whenever you're interacting with the postLit API.
#### postLitClient.login(username, password)
You can use this to log into the postLit website with your username and password. It will save a token for you to use, but it will also return a token.
#### postLitClient.fetchMessages()
You can use this to fetch the messages of the user that you're logged in with. It will return an array of all of the messages.
#### postLitClient.post(content)
You can use this to make posts on postLit using the account that you're currently signed in as. It will return an error if the post is blank or too long (2,000 characters or more).
#### postLitClient.follow(user)
Allows you to follow a specific user on postLit with the account that you're signed in as. The user will receive a notification of you following them. No error will be returned if you're already following them.
#### postLitClient.unfollow(user)
Allows you to unfollow a specific user on postLit with the account that you're signed in as. The user will not receive a notification of you unfollowing them. No error will be returned if you already aren't following them.
#### postLitClient.fetchPost(id)
You can use this to fetch the data for any post that you want, using the post's id. Every post has an id and it is included in the url for that post.
#### postLitClient.like(post)
Allows you to like any post that you select using the user that you're signed in as. It will not return an error if you have already liked the post. The post should be the id.
#### postLitClient.unlike(post)
Allows you to remove your like from any post that you select using the user that you're signed in as. It will not return an error if you have already haven't liked the post. The post should be the id.
#### postLitClient.comment(post, content)
You can comment on any existing post with this, using the user that you're signed in as. The post should be the id of the post, and the content is what you want to post. The comment can't be empty and must be less than 2,000 characters.