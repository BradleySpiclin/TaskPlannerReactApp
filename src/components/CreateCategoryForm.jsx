import React, { useState } from "react";
import { createCategory } from "../services/api";

function CreateCategoryForm() {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const category = {
      name,
    };

    try {
      const response = await createCategory(category);
      console.log("Category created:", response.data);
      // Reset form fields
      setName("");
    } catch (error) {
      console.log("Error creating task item:", error);
    }
  };

  return (
    <div>
      <h2>Create Category</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Category name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateCategoryForm;
