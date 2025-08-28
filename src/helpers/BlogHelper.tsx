import { toast } from "react-toastify";
import { BlogModel } from "../models/BlogModel";
import { globalTostTheme } from "../utils/tost-theme-util";
import { showConfirmToast } from "../components/ui/ConfirmToast";
const KEY = "blogs";

export function getAllBlogs(): BlogModel[] {
  return JSON.parse(localStorage.getItem(KEY) ?? "[]");
}

export function addBlog(blog: BlogModel): void {
  const blogs = getAllBlogs();
  blogs.push(blog);
  localStorage.setItem(KEY, JSON.stringify(blogs));
  toast.success("Blog Published Successfully!", globalTostTheme);
}

export function getBlogById(blogId: string): BlogModel {
  const blogs = getAllBlogs();
  const blog = blogs.find((b) => b.blogId == blogId);
  if (blog) {
    return blog;
  }
  return new BlogModel();
}

export function getBlogsByUserId(userId: string): BlogModel[] {
  const blogs = getAllBlogs();
  const blogsByUserId = blogs.filter((b) => b.userId == userId);
  if (blogsByUserId) {
    return blogsByUserId;
  }
  return [];
}

export function updateBlog(newBlog: BlogModel): void {
  const blogs = getAllBlogs();
  const index = blogs.findIndex((b) => b.blogId == newBlog.blogId);
  if (index > -1) {
    blogs[index] = newBlog;
    toast.success("Blog Updated Successfully!", globalTostTheme);
    localStorage.setItem(KEY, JSON.stringify(blogs));
  }
}

export function deleteBlog(blogId: string, onConfirm: Function): void {
  function deleteBlogInternal(blogId: string) {
    let blogs = getAllBlogs();
    blogs = blogs.filter((blog) => blog.blogId !== blogId);
    localStorage.setItem(KEY, JSON.stringify(blogs));
    onConfirm();
  }
  showConfirmToast({
    text: "Are you sure you want to delete this?",
    onConfirm: () => deleteBlogInternal(blogId),
  });
}

export function getPreviusAndNextBlogId(blogId: string): [string | undefined, string | undefined] {
  const blogs = getAllBlogs();
  const index = blogs.findIndex((b) => b.blogId === blogId);
  if (index > -1) {
    if (index - 1 >= 0) {
      // previus available
      if (index + 1 < blogs.length) {
        // next available
        return [blogs[index - 1].blogId, blogs[index + 1].blogId];
      }
      return [blogs[index - 1].blogId, undefined];
    }
    else if (index + 1 < blogs.length) {
      return [undefined, blogs[index + 1].blogId];
    }
  }
  return [undefined, undefined];
}
