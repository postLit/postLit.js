const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const { WebSocket } = require("ws");

let socket = new WebSocket("ws://localhost:3000/");

socket.onopen = function (e) {};

var connected = false;
socket.onmessage = function (event) {
  var data = JSON.parse(event.data);
  if (data.connected) {
    connected = true;
  }
  if (data.message === "messageCreate") {
    if (postLitClient.callbacks["messageCreate"]) {
      postLitClient.callbacks["messageCreate"](data.data);
    }
  }
  if (data.message === "ready") {
    if (postLitClient.callbacks["ready"]) {
      postLitClient.callbacks["ready"](data.user);
    }
  }
};

socket.onerror = function (error) {
  console.log(`[Error with postLit.js websocket.]`);
};

var postLitClient = {
  callbacks: {},
  on: function (event, callback) {
    postLitClient.callbacks[event] = callback;
    return true;
  },
  login: function (token) {
    socket.send(JSON.stringify({ message: "login", token: token }));
    postLitClient.token = token;
  },
  token: null,
};

postLitClient.fetchMessages = async function () {
  var response = await fetch("https://postlit.dev/my/messages/", {
    headers: {
      cookie: "token=" + postLitClient.token,
    },
  });
  var data = await response.json();
  return data;
};

postLitClient.markAllRead = async function () {
  var response = await fetch("https://postlit.dev/markasread/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      cookie: "token=" + postLitClient.token,
    },
    body: JSON.stringify({ all: true }),
  });
  var data = await response.json();
  return data;
};

postLitClient.post = async function (content) {
  var response = await fetch("https://postlit.dev/post/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      cookie: "token=" + postLitClient.token,
    },
    body: JSON.stringify({
      content: content,
    }),
  });
  var data = await response.json();
  if (data.error) {
    console.error(data.error);
  } else if (data.success) {
    return "https://postlit.dev" + data.success;
  }
};

postLitClient.follow = async function (user) {
  var response = await fetch("https://postlit.dev/follow/user/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      cookie: "token=" + postLitClient.token,
    },
    body: JSON.stringify({
      username: user,
    }),
  });
  var data = await response.json();
  if (data.count) {
    console.log({
      success: true,
      followerCount: data.count,
    });
  } else {
    console.error(data);
  }
};

postLitClient.unfollow = async function (user) {
  var response = await fetch("https://postlit.dev/unfollow/user/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      cookie: "token=" + postLitClient.token,
    },
    body: JSON.stringify({
      username: user,
    }),
  });
  var data = await response.json();
  if (data.count) {
    console.log({
      success: true,
      followerCount: data.count,
    });
  } else {
    console.error(data);
  }
};

postLitClient.fetchPost = async function (post) {
  if (token) {
    var response = await fetch("https://postlit.dev/posts/" + post + "/data/", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        cookie: "token=" + postLitClient.token,
      },
    });
    return await response.json();
  } else {
    return null;
  }
};

postLitClient.like = async function (post) {
  var response = await fetch("https://postlit.dev/like/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      cookie: "token=" + postLitClient.token,
    },
    body: JSON.stringify({
      post: post,
    }),
  });
  var data = await response.json();
  if (data.count) {
    console.log({
      success: true,
      likeCount: data.count,
    });
  } else {
    console.error(data);
  }
};

postLitClient.unlike = async function (post) {
  var response = await fetch("https://postlit.dev/unlike/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      cookie: "token=" + postLitClient.token,
    },
    body: JSON.stringify({
      post: post,
    }),
  });
  var data = await response.json();
  if (data.count) {
    console.log({
      success: true,
      likeCount: data.count,
    });
  } else {
    console.error(data);
  }
};

postLitClient.pin = async function (post) {
  var response = await fetch("https://postlit.dev/pin/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      cookie: "token=" + postLitClient.token,
    },
    body: JSON.stringify({
      post: post,
    }),
  });
  var data = await response.json();
  return data;
};

postLitClient.comment = async function (post, content) {
  var response = await fetch("https://postlit.dev/comment/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      cookie: "token=" + postLitClient.token,
    },
    body: JSON.stringify({
      content: content,
      original: post,
    }),
  });
  var data = await response.json();
  if (data.error) {
    console.error(data.error);
  } else if (data.success) {
    console.log({
      success: true,
    });
  }
};

postLitClient.setTheme = async function (theme) {
  var response = await fetch("https://postlit.dev/theme/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      cookie: "token=" + postLitClient.token,
    },
    body: JSON.stringify({ theme: theme }),
  });
  var data = await response.json();
  return data;
};

postLitClient.getTopUsers = async function () {
  var response = await fetch("https://postlit.dev/top-users/");
  var data = await response.json();
  return data;
};

postLitClient.inviteAmount = async function () {
  var response = await fetch("https://postlit.dev/my-invites/", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      cookie: "token=" + postLitClient.token,
    },
    body: JSON.stringify({}),
  });
  var data = await response.json();
  return data.uses;
};

exports.postLitClient = postLitClient;
