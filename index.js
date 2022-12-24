const fetch = (...args) => import('node-fetch').then(({
    default: fetch
}) => fetch(...args));
let token = null

exports.login = async function(username, password) {
    var response = await fetch("https://postlit.dev/signin/", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    var data = await response.json()
    if (data.success) {
        token = data.token
        return data.token
    } else if (data.error) {
        console.error(data.error)
    }
}

exports.fetchMessages = async function() {
    var response = await fetch("https://postlit.dev/my/messages/", {
        headers: {
            cookie: 'token=' + token
        }
    })
    var data = await response.json()
    return data
}

exports.markAllRead = async function() {
    var response = await fetch("https://postlit.dev/markasread/", {
        method: 'POST',
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json",
        },
        body: JSON.stringify({ all: true }),
    });
    var data = await response.json();
    if (data.error) {
        console.error(data.error)
    }
}

exports.post = async function(content) {
    var response = await fetch("https://postlit.dev/post/", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            cookie: 'token=' + token
        },
        body: JSON.stringify({
            content: content
        })
    })
    var data = await response.json()
    if (data.error) {
        console.error(data.error)
    } else if (data.success) {
        return "https://postlit.dev" + data.success
    }
}

exports.follow = async function(user) {
    var response = await fetch("https://postlit.dev/follow/user/", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            cookie: 'token=' + token
        },
        body: JSON.stringify({
            username: user
        })
    })
    var data = await response.json()
    if (data.count) {
        console.log({
            "success": true,
            "followerCount": data.count
        })
    } else {
        console.error(data)
    }
}

exports.unfollow = async function(user) {
    var response = await fetch("https://postlit.dev/unfollow/user/", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            cookie: 'token=' + token
        },
        body: JSON.stringify({
            username: user
        })
    })
    var data = await response.json()
    if (data.count) {
        console.log({
            "success": true,
            "followerCount": data.count
        })
    } else {
        console.error(data)
    }
}

exports.fetchPost = async function(post) {
    if (token) {
        var response = await fetch("https://postlit.dev/posts/" + post + "/data/", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                cookie: 'token=' + token
            }
        })
        return (await response.json())
    } else {
        return null
    }
}

exports.like = async function(post) {
    var response = await fetch("https://postlit.dev/like/", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            cookie: 'token=' + token
        },
        body: JSON.stringify({
            post: post
        })
    })
    var data = await response.json()
    if (data.count) {
        console.log({
            "success": true,
            "likeCount": data.count
        })
    } else {
        console.error(data)
    }
}

exports.unlike = async function(post) {
    var response = await fetch("https://postlit.dev/unlike/", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            cookie: 'token=' + token
        },
        body: JSON.stringify({
            post: post
        })
    })
    var data = await response.json()
    if (data.count) {
        console.log({
            "success": true,
            "likeCount": data.count
        })
    } else {
        console.error(data)
    }
}

exports.comment = async function(post, content) {
    var response = await fetch("https://postlit.dev/comment/", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            cookie: 'token=' + token
        },
        body: JSON.stringify({
            content: content,
            original: post
        })
    })
    var data = await response.json()
    if (data.error) {
        console.error(data.error)
    } else if (data.success) {
        console.log({
            "success": true
        })
    }
}

exports.setTheme = async function(theme) {
    var response = await fetch("/theme/", {
        method: 'POST',
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json",
        },
        body: JSON.stringify({ theme: theme }),
    });
    var data = await response.json();
    if (data.error) {
        console.error(data.error)
    }
}

exports.getTopUsers = async function() {
    var response = await fetch("/top-users/");
    var data = await response.json();
    return data
}
