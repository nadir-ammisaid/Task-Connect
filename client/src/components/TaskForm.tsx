import type { ReactNode } from "react";

type TaskData = {
  // firstname: string;
  // lastname: string;
  title: string;
  description: string;
  location: string;
  image: string;
  // status: string;
};

interface TaskFormProps {
  children: ReactNode;
  defaultValue: TaskData;
  onSubmit: (user: TaskData) => void;
}

function TaskForm({ children, defaultValue, onSubmit }: TaskFormProps) {
  return (
    <>
      <form
        id="taskform"
        onSubmit={(event) => {
          event.preventDefault();

          const formData = new FormData(event.currentTarget);

          // const firstname = formData.get("firstname") as string;
          // const lastname = formData.get("lastname") as string;
          const title = formData.get("title") as string;
          const description = formData.get("description") as string;
          const location = formData.get("location") as string;
          const image = formData.get("image") as string;
          // const status = formData.get("status") as string;

          onSubmit({
            // firstname,
            // lastname,
            title,
            description,
            location,
            image,
            // status,
          });
        }}
      >
        {/* <input
          id="firstname-id"
          type="text"
          name="firstname"
          defaultValue={defaultValue.firstname}
        />

  

        <input
          id="lastname-id"
          type="text"
          name="lastname"
          defaultValue={defaultValue.lastname}
        /> */}
        <label htmlFor="title-id">Title:</label>
        <input
          id="title-id"
          type="text"
          name="title"
          defaultValue={defaultValue.title}
        />

        {/* */}
        <label htmlFor="description-id">Description:</label>
        <input
          id="description-id"
          type="text"
          name="description"
          defaultValue={defaultValue.description}
        />
        <label htmlFor="location-id">Location:</label>
        <input
          id="location-id"
          type="text"
          name="location"
          defaultValue={defaultValue.location}
        />

        {/* <input
          id="status-id"
          type="text"
          name="status"
          defaultValue={defaultValue.status}
        /> */}

        <label htmlFor="image-upload">Upload an image:</label>
        <input
          type="texte"
          id="image-upload"
          name="image"
          accept="image/*"
          defaultValue={defaultValue.image}
        />

        <button type="submit">{children}</button>
      </form>
    </>
  );
}

export default TaskForm;
