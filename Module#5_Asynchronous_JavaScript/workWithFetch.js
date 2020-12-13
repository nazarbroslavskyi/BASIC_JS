// Use fetch to work with fake json api server (optional)
// About fetch - https://developer.mozilla.org/ru/docs/Web/API/Fetch_API/Using_Fetch
// Server url: https://jsonplaceholder.typicode.com/
// Methods:

// GET - /comments
// GET - /posts/:id
// PUT /users/:id
// DELETE - /posts/:id

async function fetchListOfComments(url, params = {}) {
  let response = await fetch(
    `https://jsonplaceholder.typicode.com/${url}`,
    params
  );
  return await response.json();
}

// 1. Write a function which will fetch the list of comments;

fetchListOfComments("comments").then(res => console.log(res));

// 2. Then use Math.random to get random comment from the list;

fetchListOfComments("comments").then(res =>
  console.log(Math.floor(Math.random() * (res.length + 1)))
); // get random comment from whole list of comments

// 3. Fetch post using postId from the comment object;

fetchListOfComments("comments").then(res =>
  fetchListOfComments(`posts/${res[1].postId}`).then(res =>
    console.log("Fetch post using postId", res)
  )
);

// 4. Then fetch user by userId from the post;

fetchListOfComments("comments").then(res =>
  fetchListOfComments(`posts/${res[1].postId}`)
    .then(res => fetchListOfComments(`users/${res.userId}`))
    .then(res => console.log("user by userId from the post", res))
);

// 5. DELETE fetched post;

fetchListOfComments("comments").then(res =>
  fetchListOfComments(`posts/${res[1].postId}`, { method: "DELETE" }).then(
    res => console.log("DELETE POST", res)
  )
);

// 6. Using PUT change username to one you prefer more and log the result in console;

fetchListOfComments(`users/${1}`, {
  method: "PUT",
  body: JSON.stringify({
    username: "Nazar Broslavskyi"
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
}).then(res => console.log("change name", res));
