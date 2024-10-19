/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) return 0

    const minDepthRecurse = (node) => {
      if ((node.left && node.right) === null) return 1
      if (node.left === null) return minDepthRecurse(node.left) + 1
      if (node.right === null) return minDepthRecurse(node.right) + 1
      return Math.min(minDepthRecurse(node.left), minDepthRecurse(node.right)) + 1
    }

    return minDepthRecurse(this.root)
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) return 0

    const maxDepthRecurse = (node) => {
      if ((node.left && node.right) === null) return 1
      if (node.left === null) return maxDepthRecurse(node.left) + 1
      if (node.right === null) return maxDepthRecurse(node.right) + 1
      return Math.max(maxDepthRecurse(node.left), maxDepthRecurse(node.right)) + 1
    }

    return maxDepthRecurse(this.root)
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let sum = 0

    const maxSumRecurse = (node) => {
      if (node === null) return 0
      const sumLeft = maxSumRecurse(node.left)
      const sumRight = maxSumRecurse(node.right)
      sum = Math.max(sum, node.val + sumLeft + sumRight)
      return Math.max(0, sumLeft + node.val, sumRight + node.val)
    }

    maxSumRecurse(this.root)
    return sum
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) return null;
     
    let queue = [this.root]
    let closest = null

    while (queue.length !== 0) {
      let currNode = queue.shift()
      let currVal = currNode.val
      let isGreaterThanLB = currVal > lowerBound
      let shouldReassign = currVal < closest || closest === null

      if (isGreaterThanLB && shouldReassign) closest = currVal
      if (currNode.left) queue.push(currNode.left)
      if (currNode.right) queue.push(currNode.right)
    }

    return closest
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
