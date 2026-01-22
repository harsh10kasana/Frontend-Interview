import { useState } from "react";
import BlogList from "./components/BlogList";
import BlogDetails from "./components/BlogDetails";
import CreateBlog from "./components/CreateBlog";

function App() {
  const [open, setOpen] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);

  return (
    <>
      {open && <CreateBlog onClose={() => setOpen(false)} />}
      {!open && (
        <div className="min-h-screen bg-gray-200 p-6 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 ">
          <div className={selectedBlogId ? "hidden md:block" : "block"}>
            <BlogList
              onSelect={setSelectedBlogId}
              selectedBlogId={selectedBlogId}
              onOpen={setOpen}
            />
          </div>

          <div className={selectedBlogId ? "block" : "hidden md:block"}>
            <BlogDetails blogId={selectedBlogId} onSelect={setSelectedBlogId} />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
