import Tree from "./binary-tree.js";
import { prettyPrint } from "./binary-tree.js";

function randomArr() {
  let arr = [];
  for (let i = 0; i < 10; i += 1) {
    arr.push(Math.floor(Math.random() * (99) + 1));
  }
  return arr;
}

let arr = randomArr();
console.log(arr);
let binaryTree = new Tree(arr);
console.log(prettyPrint(binaryTree.root));
console.log(binaryTree.isBalanced());
console.log(binaryTree.levelOrder());
console.log(binaryTree.inorder());
console.log(binaryTree.preorder());
console.log(binaryTree.postorder());
binaryTree.insert(100);
binaryTree.insert(120);
binaryTree.insert(140);
binaryTree.insert(200);
console.log(prettyPrint(binaryTree.root));
console.log(binaryTree.isBalanced());
console.log(prettyPrint(binaryTree.rebalance().root));
console.log(binaryTree.isBalanced());
console.log(binaryTree.levelOrder());
console.log(binaryTree.inorder());
console.log(binaryTree.preorder());
console.log(binaryTree.postorder());
