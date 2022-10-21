class Node {
  constructor(value) {
    this.data = value;
    this.left = null;
    this.right = null;
  }
}

export default class Tree {
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

  levelOrder(func) {
    if (this.root === null) return this;
    let queue = [];
    let arr = [];
    queue.push(this.root);
    if (func === undefined) {
      while (queue.length > 0) {
        let currentNode = queue.shift();
        arr.push(currentNode.data);
        if (currentNode.left !== null) {
          queue.push(currentNode.left);
        }
        if (currentNode.right !== null) {
          queue.push(currentNode.right);
        }
      }
      return arr;
    } else {
      while (queue.length > 0) {
        let currentNode = queue.shift();
        currentNode.data = func(currentNode.data);
        if (currentNode.left !== null) {
          queue.push(currentNode.left);
        }
        if (currentNode.right !== null) {
          queue.push(currentNode.right);
        }
      }
      return this;
    }
  }

  preorder(func) {
    let arr = [];
    return preorderRec(this.root, arr, func);
  }

  inorder(func) {
    let arr = [];
    return inorderRec(this.root, arr, func);
  }

  postorder(func) {
    let arr = [];
    return postorderRec(this.root, arr, func);
  }

  height(value) {
    let desiredNode = findValue(this.root, value);
    return heightRec(desiredNode) - 1;
  }

  depth(value) {
    return depthRec(this.root, value);
  }

  isBalanced() {
    let leftHeight = treeHeight(this.root.left);
    let rightHeight = treeHeight(this.root.right);

    if (Math.abs(leftHeight - rightHeight) < 2) {
      return true;
    } else {
      return false;
    }
  }

  rebalance() {
      return new Tree(this.levelOrder());
  }
}

function heightRec(obj) {
  if (obj === null) {
    return 0;
  } else {
    let leftHeight = heightRec(obj.left);
    let rightHeight = heightRec(obj.right);
    if (leftHeight > rightHeight) {
      return leftHeight + 1;
    } else {
      return rightHeight + 1;
    }
  }
}

function depthRec(obj, value, depth = 0) {
  if (obj === null) return 0;
  if (obj.data === value) {
    return depth;
  }
  if (obj.data < value) {
    depth += 1;
    return depthRec(obj.right, value, depth);
  } else {
    depth += 1;
    return depthRec(obj.left, value, depth);
  }
}

function treeHeight(obj) {
  if (obj === null) return 0;
  return Math.max(treeHeight(obj.left), treeHeight(obj.right)) + 1;
}

function postorderRec(obj, arr, func) {
  if (obj === null) {
    return obj;
  } else {
    postorderRec(obj.left, arr, func);
    postorderRec(obj.right, arr, func);
    arr.push(obj.data);
    if (func !== undefined) {
      obj.data = func(obj.data);
    }
  }
  if (func === undefined) {
    return arr;
  } else {
    return obj;
  }
}

function inorderRec(obj, arr, func) {
  if (obj === null) {
    return obj;
  } else {
    inorderRec(obj.left, arr, func);
    arr.push(obj.data);
    if (func !== undefined) {
      obj.data = func(obj.data);
    }
    inorderRec(obj.right, arr, func);
  }
  if (func === undefined) {
    return arr;
  } else {
    return obj;
  }
}

function preorderRec(obj, arr, func) {
  if (obj === null) {
    return obj;
  } else {
    arr.push(obj.data);
    if (func !== undefined) {
      obj.data = func(obj.data);
    }
    preorderRec(obj.left, arr, func);
    preorderRec(obj.right, arr, func);
  }
  if (func === undefined) {
    return arr;
  } else {
    return obj;
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
    let temp = minValueNode(obj.right);
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

export const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}
