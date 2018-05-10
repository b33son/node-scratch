/*
 * File: /Users/michaelbeeson/Documents/VSCode/scratch/fetchJsonDb.js
 */
const fetch = require("node-fetch");

async function getData() {
  const userUrl =
    "https://my-json-server.typicode.com/b33son/json-playground/posts";

  try {
    const res = await fetch(userUrl);
    const postsj = await res.json();
  } catch (error) {
    console.log(error);
  }
}

async function putData() {
  const res = await fetch(
    "https://my-json-server.typicode.com/b33son/json-playground/posts/1",
    {
      method: "PUT",
      body: JSON.stringify({
        id: 1,
        title: "Changed title from put call."
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }
  );
  const rec = await res.json();
  console.log(rec);
}

async function main() {
  await putData();
  await getData();
}

main();
