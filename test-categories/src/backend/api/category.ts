// src/api/categories.ts
export interface Category {
  id: number;
  name: string;
  description: string;
  parent_id: number | null; // optional if categories can have no parent
}
