class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    let sortedArr = arr.filter((value, index) => arr.indexOf(value) === index)
      .sort((a, b) => a > b ? 1 : -1);
    this.root = this.buildTree(sortedArr);
  }

  buildTree(arr) {
    if (arr.length < 1) return null;

    let mid = Math.floor((arr.length - 1) / 2);
    let root = new Node(arr[mid]);
    let arrLeft = [];
    let arrRight = [];
    for (let i = 0; i < mid; i += 1) {
      arrLeft.push(arr[i]);
    }
    for (let i = arr.length - 1; i > mid; i -= 1) {
      arrRight.push(arr[i]);
    }
    root.left = this.buildTree(arrLeft);
    root.right = this.buildTree(arrRight.reverse());

    return root;
  }  
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}

let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 324, 1]

console.log(arr.filter((value, index) => arr.indexOf(value) === index).sort((a, b) => a > b ? 1 : -1));
let binaryTree = new Tree(arr);
console.log(binaryTree.root);