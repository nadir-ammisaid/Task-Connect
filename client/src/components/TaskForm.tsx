import { type ChangeEvent, type ReactNode, useEffect, useState } from "react";
import "./TaskForm.css";

type TaskData = {
  // firstname: string;
  // lastname: string;
  title: string;
  description: string;
  location: string;
  image: File | null;
  category_id: number;
  // status: string;
};

interface Category {
  id: number;
  name: string;
}

interface TaskFormProps {
  children: ReactNode;
  defaultValue: TaskData;
  onSubmit: (user: TaskData) => void;
}

function TaskForm({ children, defaultValue, onSubmit }: TaskFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/categories`)
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Erreur lors du fetch :", error));
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  return (
    <>
      <form
        id="taskform"
        encType="multipart/form-data"
        onSubmit={(event) => {
          event.preventDefault();

          const formData = new FormData(event.currentTarget);

          const title = formData.get("title") as string;
          const description = formData.get("description") as string;
          const location = formData.get("location") as string;
          const image = selectedFile;
          const category_id = Number(formData.get("category_id"));
          // const status = formData.get("status") as string;

          onSubmit({
            title,
            description,
            location,
            image,
            category_id,
            // status,
          });
        }}
      >
        <label htmlFor="title-id">Title:</label>
        <input
          id="title-id"
          type="text"
          name="title"
          defaultValue={defaultValue.title}
          placeholder="Fix a leak in my faucet"
          required
        />

        {/* */}
        <label htmlFor="category-id">Category:</label>
        <select
          id="category-id"
          name="category_id"
          defaultValue={defaultValue.category_id}
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <label htmlFor="description-id">Describe the task</label>
        <textarea
          id="description-id"
          name="description"
          defaultValue={defaultValue.description}
          placeholder="Give details about your task so that the tasker could understand your needs."
          required
        />
        <label htmlFor="location-id">Location:</label>
        <input
          id="location-id"
          type="text"
          name="location"
          defaultValue={defaultValue.location}
          placeholder="Villeurbanne 69100"
          required
        />

        <label htmlFor="image-upload">Upload an image:</label>
        <input
          type="file"
          id="image-upload"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          // defaultValue={defaultValue.image}
        />

        <button type="submit">{children}</button>
      </form>
    </>
  );
}

export default TaskForm;
