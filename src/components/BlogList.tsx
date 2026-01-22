import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "../api/blogs";

interface BlogListProps {
  onSelect: (id: number) => void;
  selectedBlogId: number | null;
  onOpen: (id: boolean) => void;
}

const BlogList = ({ onSelect, selectedBlogId, onOpen }: BlogListProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  if (isLoading) {
    return (
      <div className="m-2 h-178 overflow-y-auto no-scroll">
        <button className="border-2 border-gray-400 p-2 mb-2 w-full font-stretch-110% rounded-xl  bg-gray-400 text-gray-500">
          Add Blog
        </button>
        <div
          className={`h-42 bg-white p-6 rounded-xl mb-5
             "border-l-4 border-l-white text-gray-400 text-3xl"
          }`}
        >
          Loading blogs...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="m-2 h-178 overflow-y-auto no-scroll">
        <button className="border-2 border-gray-400 p-2 mb-2 w-full font-stretch-110% rounded-xl  bg-gray-400 text-shadow-red-500">
          Error, Refresh the page!
        </button>
        <div
          className={`h-42 bg-white p-6 rounded-xl mb-5
             "border-l-4 border-l-white text-gray-400 text-3xl"
          }`}
        >
          Loading blogs...
        </div>
      </div>
    );
  }

  return (
    <div className="m-2">
      <button
        className="hover-animation border-2 border-black p-2 mb-2 w-full font-stretch-110% hover:bg-white hover:text-black rounded-xl cursor-pointer bg-black text-white"
        onClick={() => onOpen(true)}
      >
        Add Blog
      </button>

      <div className="h-[calc(100vh-116px)] overflow-y-auto no-scroll">
        {data.map((blog: any) => (
          <div
            key={blog.id}
            className={`bg-white p-6 rounded-xl cursor-pointer mb-5 hover-animation ${
              selectedBlogId === blog.id
                ? "border-l-4 border-l-black "
                : "border-l-4 border-l-white"
            }`}
            onClick={() => onSelect(blog.id)}
          >
            <div className="flex justify-between mb-2 items-center">
              <div className="flex gap-1">
                {blog.category.map((cat: string) => (
                  <p key={cat} className="text-xs bg-gray-200 rounded p-1 px-2">
                    {cat}
                  </p>
                ))}
              </div>
              <p className="text-gray-400 text-sm">
                {Math.floor(
                  (Date.now() - new Date(blog.date).getTime()) /
                    (1000 * 60 * 60 * 24),
                )}{" "}
                days ago
              </p>
            </div>
            <h2 className="font-semibold text-2xl mb-4 font-stretch-110%">
              {blog.title}
            </h2>
            <p className="text-sm text-gray-500">{blog.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
