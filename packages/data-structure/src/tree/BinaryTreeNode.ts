export class BinaryTreeNode<T> {
  value: T | null = null;
  left: Nullable<BinaryTreeNode<T>> = null;
  right: Nullable<BinaryTreeNode<T>> = null;
  parent: Nullable<BinaryTreeNode<T>> = null;
  constructor(value?: T) {
    this.value = value ?? null;
  }

  get height(): number {
    return Math.max(this.leftHeight, this.rightHeight);
  }

  get leftHeight() {
    if (this.left) return this.left.height + 1;
    return 0;
  }

  get rightHeight() {
    if (this.right) return this.right.height + 1;
    return 0;
  }

  get balanceFactor() {
    return this.leftHeight - this.rightHeight;
  }

  get uncle(): Nullable<BinaryTreeNode<T>> {
    if (!this.parent) return null;
    if (!this.parent.parent) return null;
    if (this.parent === this.parent.parent.left) {
      return this.parent.parent.right;
    } else {
      return this.parent.parent.left;
    }
  }

  hasParent() {
    return this.parent === null;
  }

  hasLeft() {
    return this.left === null;
  }

  hasRight() {
    return this.right === null;
  }

  setLeft(leftNode: Nullable<BinaryTreeNode<T>>) {
    this.left = leftNode;
    leftNode && (leftNode.parent = this);
    return this;
  }

  setRight(rightNode: Nullable<BinaryTreeNode<T>>) {
    this.right = rightNode;
    rightNode && (rightNode.parent = this);
    return this;
  }

  setValue(val: T) {
    this.value = val;
  }

  removeChild(nodeToRemove: Nullable<BinaryTreeNode<T>>) {
    if (nodeToRemove === null) return false;
    if (this.left && this.left === nodeToRemove) {
      this.left = null;
      return true;
    }
    if (this.right && this.right === nodeToRemove) {
      this.right = null;
      return true;
    }
    return false;
  }

  replaceChild(nodeToRemove: Nullable<BinaryTreeNode<T>>, nodeToReplace: Nullable<BinaryTreeNode<T>>) {
    if (nodeToReplace === null) return false;
    if (this.left && this.left === nodeToRemove) {
      this.left = nodeToReplace;
      return true;
    }
    if (this.right && this.right === nodeToRemove) {
      this.right = nodeToReplace;
      return true;
    }
    return false;
  }

  static copyNode<T>(sourceNode: BinaryTreeNode<T>, targetNode: BinaryTreeNode<T>) {
    targetNode.setValue(sourceNode.value!);
    targetNode.setLeft(sourceNode.left);
    targetNode.setRight(sourceNode.right);
  }

  traverseInOrder() {
    const travels: T[] = [];
    const travel = (node: Nullable<BinaryTreeNode<T>>) => {
      if (node === null) return;
      travel(node.left);
      travels.push(node.value!);
      travel(node.right);
    };
    travel(this);
    return travels;
  }

  toString() {
    return this.traverseInOrder().toString();
  }
}
