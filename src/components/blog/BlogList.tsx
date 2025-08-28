import { useSelector } from "react-redux";
import { getAllBlogs, getBlogsByUserId } from "../../helpers/BlogHelper";
import type { BlogModel } from "../../models/BlogModel";
import Blog from "./Blog";
import { motion } from "framer-motion";
import type { StoreType } from "../../store";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const BlogList = ({ type }: { type: "PERSONAL" | "PUBLIC" }) => {
  const [blogs, setBlogs] = useState<BlogModel[]>([]);
  const currentUser = useSelector((store: StoreType) => store.auth.user);
  window.scrollTo({ top: 0 });

  function updateBlogsData() {
    let blogs: BlogModel[] = [];
    if (type == "PERSONAL") {
      blogs = getBlogsByUserId(currentUser.userId ?? "");
    } else if (type == "PUBLIC") {
      blogs = getAllBlogs();
    }
    setBlogs(blogs);
  }
  useEffect(() => {
    updateBlogsData();
  }, []);
  return (
    <>
      <motion.div
        className='min-h-screen bg-black text-white px-6'
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.4 }}
      >
        {blogs.length === 0 && (
          <div className='h-[50vh] w-[100%] flex items-center justify-center flex-col'>
            <div className='text-5xl'>Sorry, No Blog Found! 😔</div>
            <Link to='/profile/blogs/new' className='mt-2 underline text-amber-50'>
              publish new one.
            </Link>
          </div>
        )}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto'>
          {/* Blog Card */}
          {blogs.map((b) => (
            <Blog blog={b} key={b.blogId} actionButtons={type == "PERSONAL"} userId={currentUser.userId!} changeState={updateBlogsData} />
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default BlogList;
