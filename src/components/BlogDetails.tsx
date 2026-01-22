import { useQuery } from "@tanstack/react-query";
import { getBlogById } from "../api/blogs";

function BlogDetails({
  blogId,
  onSelect,
}: {
  blogId: number | null;
  onSelect: (id: number | null) => void;
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: () => getBlogById(blogId as number),
    enabled: !!blogId,
  });

  if (!blogId) {
    return (
      <p className=" m-2 bg-white rounded-xl flex p-20 font-medium text-2xl justify-center font-stretch-110% text-gray-500">
        Select a blog to see details
      </p>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white m-2 rounded-xl">
        <button
          className=" absolute rounded-full bg-black md:hidden mb-4 text-sm text-white px-2 py-1 top-10 left-10"
          onClick={() => {
            onSelect(null);
          }}
        >
          ←
        </button>
        <div className="w-full h-80 object-cover rounded-t-xl bg-gray-100"></div>
        <div className="p-10 ">
          <h2 className="font-bold text-6xl mb-3 font-stretch-110% text-gray-400">
            Loading..
          </h2>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="bg-white m-2 rounded-xl">
        <button
          className=" absolute rounded-full bg-black md:hidden mb-4 text-sm text-white px-2 py-1 top-10 left-10"
          onClick={() => {
            onSelect(null);
          }}
        >
          ←
        </button>
        <div className="w-full h-80 object-cover rounded-t-xl bg-gray-100"></div>
        <div className="p-10 ">
          <h2 className="font-bold text-6xl mb-3 font-stretch-110% text-red-500">
            Error occured while fetching blog.
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white m-2 rounded-xl">
      <button
        className=" absolute rounded-full bg-black md:hidden mb-4 text-sm text-white px-2 py-1 top-10 left-10"
        onClick={() => {
          onSelect(null);
        }}
      >
        ←
      </button>
      <img
        src={data.coverImage}
        alt=""
        className="w-full h-50 md:h-80 object-cover rounded-t-xl "
      />
      <div className="p-10 ">
        <h2 className="font-bold text-2xl md:text-6xl mb-3 font-stretch-110%">
          {data.title}
        </h2>
        <div className="flex gap-2 mb-6 items-center">
          <div className="flex gap-2">
            {data.category.map((cat: string) => (
              <p key={cat} className="text-xs bg-gray-200 rounded p-1 px-2">
                {cat}
              </p>
            ))}
          </div>

          <p className="text-gray-400 text-sm ml-2">
            •{" "}
            {Math.floor(
              (Date.now() - new Date(data.date).getTime()) /
                (1000 * 60 * 60 * 24),
            )}{" "}
            days ago
          </p>
        </div>
        {/* <p>{data.description}</p> */}
        <p>{data.content}</p>
      </div>
    </div>
  );
}

export default BlogDetails;
