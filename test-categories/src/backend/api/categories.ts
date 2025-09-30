// backend/routes/categories.ts
import { Router } from "express";
import pool from "../db.ts"; // assuming pg Pool instance

const router = Router();

// Example category data
const categories = [
  { id: 1, name: "Category 1", description: "Desc 1", parent_id: null },
  { id: 2, name: "Category 2", description: "Desc 2", parent_id: 1 },
];

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM categories");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
// get single category by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM categories WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching category:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// update category
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, parent_id } = req.body;
    const result = await pool.query(
      "UPDATE categories SET name=$1, parent_id=$2 WHERE id=$3 RETURNING *",
      [name, parent_id || null, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating category:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
