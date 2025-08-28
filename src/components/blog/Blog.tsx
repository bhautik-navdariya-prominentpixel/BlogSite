import { Link, useNavigate } from "react-router-dom";
import type { BlogModel } from "../../models/BlogModel";
import type { MouseEvent } from "react";
import { deleteBlog } from "../../helpers/BlogHelper";

const Blog = (props: { blog: BlogModel; actionButtons: boolean; userId: string; changeState: Function }) => {
  const navigate = useNavigate();
  function onDeleteBlog(e: MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    deleteBlog(props.blog.blogId, () => {
      props.changeState((prev: boolean) => !prev);
    });
  }
  return (
    <>
      <Link
        to={"/blogs/" + props.blog.blogId}
        className='flex bg-black border border-gray-700 rounded-lg overflow-hidden text-inherit shadow-md shadow-gray-900 
                transition-all duration-300 
                hover:-translate-y-2 hover:shadow-xl'
      >
        {/* Left: Image */}
        <div className='w-1/3'>
        {
          props.blog.image &&
          <img src={props.blog.image} alt='Blog' className='h-[250px] w-full object-cover' />
        }
        </div>

        {/* Right: Content */}
        <div className='w-2/3 p-6 flex flex-col justify-between'>
          <div>
            <div className='text-xl font-bold mb-1 line-clamp-3'>{props.blog.title}</div>
            <div className='text-sm text-gray-500 mb-3'>by {props.blog.userId === props.userId ? "You" : props.blog.author}</div>
            {/* <div
              className='text-gray-400 text-sm mb-4 line-clamp-3 max-h-[80px]'
              style={{fontSize: "14px !important"}}
              // dangerouslySetInnerHTML={{ __html: props.blog.description.replaceAll(/[h1]/g, "div") }}
            ></div> */}
          </div>

          <div className='text-sm text-gray-500 mb-3'>Publish Date: {new Date(props.blog.createdDate).toDateString()}</div>

          {/* Buttons */}
          {props.actionButtons && (
            <div className='flex gap-3'>
              <button
                onClick={(e: MouseEvent) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate("/profile/blogs/" + props.blog.blogId + "/edit");
                }}
                className='px-4 py-2 bg-blue-950 border border-blue-950 rounded-md text-sm text-white hover:bg-blue-900 transition'
              >
                Edit
              </button>
              <button
                onClick={onDeleteBlog}
                className='px-4 py-2 bg-red-950 border border-red-950 rounded-md text-sm hover:bg-red-900 transition'
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </Link>
    </>
  );
};

export default Blog;
