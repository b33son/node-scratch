/*
 * File: /Users/michaelbeeson/Documents/VSCode/scratch/index.js
 */
const fetch = require("node-fetch");

async function getData() {
  const userUrl = "https://randomuser.me/api/?results=500&nat=us";

  try {
    const res = await fetch(userUrl);
    const userj = await res.json();
    const users = userj.results;
    console.log(users);

    let names = users.map(x => x.name);
    console.log(names.length);

    let n = names.slice().filter(name => name.first.indexOf("ma") === 0);
    console.log(names.length);

    names = names.sort((a, b) => a.first > b.first);
  } catch (error) {
    console.log(error);
  }
}
function main() {
  getData();
}

main();
