class Node {
  constructor(value) {
    this.data = value;
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

  insert(value) {
    return insertValue(this.root, value);
  }

  delete(value) {
    return deleteValue(this.root, value);
  }

  find(value) {
    return findValue(this.root, value);
  }

}

function findValue(obj, value) {
  if (obj === null || obj.data === value) {
    return obj;
  }
  if (obj.data < value) {
    return findValue(obj.right, value);
  } else {
    return findValue(obj.left, value);
  }
}

function insertValue(obj, value) {
  if (obj === null) {
    return new Node(value);
  }
  if (obj.data === value) return obj;
  if (obj.data < value) {
    obj.right = insertValue(obj.right, value);
  } else if (obj.data > value) {
    obj.left = insertValue(obj.left, value);
  }
  return obj;
}

function deleteValue(obj, value) {
  if (obj === null) {
    return obj;
  } 
  if (obj.data < value) {
    obj.right = deleteValue(obj.right, value);
  } else if (obj.data > value) {
    obj.left = deleteValue(obj.left, value);
  } else {
    if (obj.left === null) {
      let temp = obj.right;
      obj = null;
      return temp;
    } else if (obj.right === null) {
      let temp = obj.left;
      obj = null;
      return temp;
    }
    temp = minValueNode(obj.right);
    obj.data = temp.data;
    obj.right = deleteValue(obj.right, temp.data);
  }

  return obj;
}

function minValueNode(obj) {
  let node = obj;
  while (node.left !== null) {
    node = node.left;
  }
  return node;
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

let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

console.log(arr.filter((value, index) => arr.indexOf(value) === index).sort((a, b) => a > b ? 1 : -1));
let binaryTree = new Tree(arr);
console.log(prettyPrint(binaryTree.root));
binaryTree.insert(10);
console.log(prettyPrint(binaryTree.root));
binaryTree.delete(8);
console.log(prettyPrint(binaryTree.root));
console.log(prettyPrint(binaryTree.find(23)));