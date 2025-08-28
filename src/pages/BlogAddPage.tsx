
import BlogForm from "../components/blog/BlogForm";
import { setSiteTitle } from "../utils/utils";

const BlogAddPage = () => {
  setSiteTitle("Add New Blog");
  return (
    <BlogForm mode="ADD"/>
  );
};

export default BlogAddPage;
