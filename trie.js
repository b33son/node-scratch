let Node = function() {
  this.keys = new Map();
  this.end = false;
  this.setEnd = function() {
    this.end = true;
  };
  this.isEnd = function() {
    return this.end;
  };
  this.count = 0;
  this.incrementCount = function() {
    this.count = this.count + 1;
  };
};

let Trie = function() {
  this.root = new Node();

  this.add = function(input, node = this.root) {
    if (input.length == 0) {
      node.setEnd();
      return;
    } else if (!node.keys.has(input[0])) {
      // if there is a node with this letter
      let newNode = new Node();
      newNode.incrementCount();
      node.keys.set(input[0], newNode);
      return this.add(input.substr(1), node.keys.get(input[0]));
    } else {
      gNode = node.keys.get(input[0]);
      gNode.incrementCount();
      return this.add(input.substr(1), gNode);
    }
  };

  this.find = function(startStr) {
    let node = this.root;
    while (startStr.length > 1) {
      if (!node.keys.has(startStr[0])) {
        return node.count;
      } else {
        node = node.keys.get(startStr[0]);
        startStr = startStr.substr(1);
      }
    }
    return node.count;
  };

  this.isWord = function(word) {
    let node = this.root;
    while (word.length > 1) {
      if (!node.keys.has(word[0])) {
        return false;
      } else {
        node = node.keys.get(word[0]);
        word = word.substr(1);
      }
    }
    return node.keys.has(word) && node.keys.get(word).isEnd() ? true : false;
  };

  this.containsWord = function(word) {
    let node = this.root;
    while (word.length > 0) {
      if (!node.keys.has(word[0])) {
        return 0;
      } else {
        node = node.keys.get(word[0]);
        word = word.substr(1);
      }
    }
    return node.count;
  };

  this.print = function() {
    let words = new Array();
    let search = function(node, string) {
      if (node.keys.size != 0) {
        for (let letter of node.keys.keys()) {
          search(node.keys.get(letter), string.concat(letter));
        }
        if (node.isEnd()) {
          words.push(string);
        }
      } else {
        string.length > 0 ? words.push(string) : undefined;
        return;
      }
    };
    search(this.root, new String());
    return words.length > 0 ? words : mo;
  };
};

function main() {
  let trie = new Trie();

  //   add hack
  // add hackerrank
  // find hac
  // find hak
  // trie.add("hack");
  // trie.add("hackerrank");
  // console.log(trie.containsWord("hac"));
  // console.log(trie.containsWord("hak"));
  // trie.add("hackmon");
  // trie.add("bad");
  // trie.add("none");
  // console.log(trie.print());
  // console.log(trie.containsWord("hac"));
  // trie.add("hackodoodle");
  // trie.add("hackathon");
  // trie.add("hacky");
  // trie.add("hacksack");
  // trie.add("hac-orama");
  // console.log(trie.find("hac"));
  // console.log(trie.find("hak"));
  // console.log(trie.find("baby"));
  // console.log(trie.find("ha"));

  trie.add("ball");
  trie.add("bat");
  trie.add("doll");
  trie.add("dork");
  trie.add("dorm");
  trie.add("sense");
  trie.add("send");
  console.log(trie.containsWord("ba"));
  console.log(trie.containsWord("do"));
  console.log(trie.containsWord("dor"));
  console.log(trie.containsWord("dork"));
  console.log(trie.containsWord("hello"));

  // switch(op) {
  //     case "add":
  //         trie.add(contact);
  //         break;
  //     case "find":
  //         //let count = find(contact, arr);
  //         ws.write(count + "\n");
  //         break;
  // }
}

main();
