/*
 * File: /Users/michaelbeeson/Documents/VSCode/scratch/test
 */

const fetch = require("node-fetch");

process.stdin.resume();
process.stdin.setEncoding("ascii");
var input = "";
process.stdin.on("data", function(chunk) {
  input += chunk;
});
process.stdin.on("end", function() {
  const seedId = "0000000001";
  crawlInstagramGraph(seedId);
});

function InstagramAccount(account) {
  this.instagram_id = account.instagram_id;
  this.username = account.username;
  this.biography = account.biography;
  this.follower_count = account.follower_count;
  this.followers = []; // List of InstagramAccount objects of all followers of this account
}

// GET /account/<instagram_id>
// {
//   'instagram_id': <string>,
//   'username': <string>,
//   'biography': <string>,
//   'follower_count': <integer>,
// }​

async function crawlInstagramGraph(seedInstagramId) {
  const url = "/account/";
  let acc;
  try {
    const res = await fetch(`url/${seedInstagramId}`);
    const account = await res.json();
    acc = new InstagramAccount(account);
    if (acc.follower_count < 5000) {
      return null;
    } else {
      acc.followers = getFollowersByInstagramId(seedInstagramId);
    }
  } catch (error) {
    // log
    console.log(error);
  }
  return acc;
}

// GET /account/<instagram_id>/followers?cursor=<optional_cursor>
// {
//   'data': [
//     <instagram_id>,
//     <instagram_id>,
//     ...
//   ],
//   'next_page_cursor': null,    // Identifier that can be provided in API request to fetch next page of results
// }

async function getFollowersByInstagramId(instagramId, optionalCursor = 1) {
  const url = `/account/${instagramId}/followers`;
  url += optionalCursor !== 1 ? `?cursor=${optionalCursor}` : "";

  let followerInstagramAccounts = [];
  try {
    const res = await fetch(url);
    const lst = await res.json();
    const followerIds = lst.data;
    const nextPageCursor = lst.next_page_cursor;

    for (let i = 0; i < followerIds.length; i++) {
      let ia = crawlInstagramGraph(followerIds[i]);
      if (ai !== null) followerInstagramAccounts.push(ai);
    }

    if (nextPageCursor !== "null") {
      let cur = parseInt(optionalCursor);
      cur += 1;
      followerInstagramAccounts.concat(
        getFollowersByInstagramId(instagramId, cur)
      );
    }
  } catch (error) {
    // log
    console.log(error);
  }
  return followerInstagramAccounts;
}
