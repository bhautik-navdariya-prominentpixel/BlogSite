import BlogList from "../components/blog/BlogList";
import { setSiteTitle } from "../utils/utils";

const MyBlogsPage = () => {
  setSiteTitle("My Blogs");
  return (
    <>
      <BlogList type="PERSONAL" />
    </>
  );
};

export default MyBlogsPage;
