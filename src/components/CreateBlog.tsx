import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlog } from "../api/blogs";
import { useState } from "react";

function CreateBlogForm({ onSubmit, onClose }: any) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      onClose();
    },
  });
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!title || !category || !description || !content || !coverImage) {
      alert("Please fill all fields");
      return;
    }

    mutation.mutate({
      title,
      category: category.split(",").map((c) => c.trim().toUpperCase()),
      description,
      coverImage,
      content,
      date: new Date().toISOString(),
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-200 flex items-center justify-center">
      <div className="bg-white w-150 p-6 rounded-xl space-y-4 m-4">
        <h2 className="text-3xl font-semibold font-stretch-110% mb-6">
          Create Blog
        </h2>

        <input
          className="w-full border p-2 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Categories (comma separated)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Cover image URL"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
        />

        <textarea
          className="w-full border p-2 rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <textarea
          className="w-full border p-2 rounded h-32"
          placeholder="Blog content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button
            className="font-stretch-110% hover:bg-gray-300 px-4 py-2 rounded hover-animation"
            onClick={() => onClose()}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="border-2 border-black bg-black text-white px-4 py-2 rounded font-stretch-110% hover:bg-white hover:text-black hover-animation"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateBlogForm;
