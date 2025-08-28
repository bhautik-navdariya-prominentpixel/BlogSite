import { useParams } from "react-router-dom";
import BlogForm from "../components/blog/BlogForm";
import { getBlogById } from "../helpers/BlogHelper";
import { setSiteTitle } from "../utils/utils";

const BlogEditPage = () => {
  setSiteTitle("Update Blog");
  const {blogId} = useParams();
  const Blogdata = getBlogById(blogId ?? "");
  return (
    <>
      <BlogForm mode="EDIT" blogModeldata={Blogdata} />
    </>
  )
};

export default BlogEditPage;
