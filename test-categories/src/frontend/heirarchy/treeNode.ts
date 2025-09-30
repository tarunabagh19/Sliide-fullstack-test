import type { Category } from "../../backend/api/category";

export interface TreeNode extends Category {
  children: TreeNode[];
}

export function buildTree(categories: Category[]): TreeNode[] {
  const map = new Map<number, TreeNode>();
  categories.forEach(c => map.set(c.id, { ...c, children: [] }));

  const roots: TreeNode[] = [];
  map.forEach(node => {
    if (node.parent_id === null) {
      roots.push(node);
    } else {
      const parent = map.get(node.parent_id);
      parent ? parent.children.push(node) : roots.push(node);
    }
  });
  return roots;
}
