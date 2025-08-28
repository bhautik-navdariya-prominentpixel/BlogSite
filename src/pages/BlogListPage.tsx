import BlogList from "../components/blog/BlogList";
import { setSiteTitle } from "../utils/utils";

const BlogListPage = () => {
  setSiteTitle("Blogs");
  return (
    <>
      <BlogList type="PUBLIC" />
    </>
  )
};

export default BlogListPage;
