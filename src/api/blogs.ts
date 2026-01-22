const API_URL = "http://localhost:3001/blogs";

export const getBlogs = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }
  return res.json();
};
export const getBlogById = async (id: number) => {
  const res = await fetch(`${API_URL}/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch blog");
  }

  return res.json();
};
export const createBlog = async (blogData: any) => {
  const res = await fetch("http://localhost:3001/blogs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blogData),
  });

  if (!res.ok) {
    throw new Error("Failed to create blog");
  }

  return res.json();
};

