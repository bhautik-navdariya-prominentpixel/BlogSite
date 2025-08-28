import { Link, useParams } from "react-router-dom";
import { getBlogById, getPreviusAndNextBlogId } from "../helpers/BlogHelper";
import { motion } from "framer-motion";
import { setSiteTitle } from "../utils/utils";

const BlogDetailPage = () => {
  const { blogId } = useParams();
  window.scrollTo({ top: 0, behavior: "smooth" });
  
  const blogData = getBlogById(blogId ?? "");
  const [previusBlogId, nextBlogId] = getPreviusAndNextBlogId(blogId ?? "");
  
  setSiteTitle(blogData.title);
  return (
    <>
      <motion.div
        className='min-h-screen bg-black text-white px-6'
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5 }}
      >
        <div className='max-w-3xl mx-auto px-6 py-10 bg-black text-white'>
          {/* Blog Title */}
          <h1 className='text-4xl font-bold mb-3'>{blogData.title}</h1>

          {/* Author */}
          <p className='text-sm text-gray-500 mb-6 float-left'>by {blogData.author}</p>
          <div className='float-end w-auto text-sm text-gray-500 mb-6'>Publish Date: {new Date(blogData.createdDate).toDateString()}</div>

          {/* Blog Image */}
          <img src={blogData.image} alt='Blog' className='w-full h-80 object-cover rounded-lg border border-gray-700 mb-6' />

          {/* Description */}
          <div
            className='text-gray-300 leading-relaxed space-y-4 prose max-w-none dark:prose-invert'
            dangerouslySetInnerHTML={{ __html: blogData.description }}
          ></div>
          <div className='my-5'>
            <Link
              to={"/blogs/" + previusBlogId}
              className='hover:underline text-gray-400 float-left'
              style={previusBlogId ? undefined : { pointerEvents: "none" }}
            >
              ← Previous
            </Link>
            <Link
              to={"/blogs/" + nextBlogId}
              className='hover:underline text-gray-400 float-right'
              style={nextBlogId ? undefined : { pointerEvents: "none" }}
            >
              Next →
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default BlogDetailPage;
