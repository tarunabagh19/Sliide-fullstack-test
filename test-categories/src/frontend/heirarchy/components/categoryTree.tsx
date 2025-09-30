import React, { useEffect, useState } from "react";
import axios from "axios";
import { buildTree } from "../treeNode";
import type { TreeNode} from "../treeNode";

const CategoryTree: React.FC = () => {
  const [tree, setTree] = useState<TreeNode[]>([]);
  const [allCategories, setAllCategories] = useState<TreeNode[]>([]);


  useEffect(() => {
    // call backend API
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/categories"); 
        setAllCategories(res.data);
        setTree(buildTree(res.data));
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    fetchCategories();
  }, []);
 const handleParentChange = async (
  id: number,
  newParent: number | null,
  newName: string,
) => {
  try {
    await axios.put(`http://localhost:5000/api/categories/${id}`, {
      parent_id: newParent,
      name: newName,
    });

    // refresh after update
    const res = await axios.get("http://localhost:5000/api/categories");
    setAllCategories(res.data);
    setTree(buildTree(res.data));
  } catch (err) {
    console.error("Update failed", err);
  }
};



  return (
     <div>
      <h2>Categories</h2>
      {tree.map(node => (
        <CategoryNode
          key={node.id}
          node={node}
          allCategories={allCategories}
          onChangeParent={handleParentChange}
        />
      ))}
    </div>
  );
};

const CategoryNode: React.FC<{
  node: TreeNode;
  allCategories: TreeNode[];
  onChangeParent: (id: number, newParent: number | null, newName: string ) => void;
}> = ({ node, allCategories, onChangeParent }) => {
  return (
    <div style={{ marginLeft: "20px" }}>
      <strong>{node.name}</strong> — {node.description}
      <br />
      <label>Parent:</label>
      <select
        value={node.parent_id ?? ""}
        onChange={e =>
          onChangeParent(node.id, e.target.value ? Number(e.target.value) : null, node.name)
        }
      >
        <option value="">No parent</option>
        {allCategories
          .filter(c => c.id !== node.id) // prevent self-parent
          .map(c => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
      </select>

      {node.children.map(child => (
        <CategoryNode
          key={child.id}
          node={child}
          allCategories={allCategories}
          onChangeParent={onChangeParent}
        />
      ))}
    </div>
  );
};

export default CategoryTree;