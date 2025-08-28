import { Link } from "react-router-dom";
import { setSiteTitle } from "../utils/utils";

const HomePage = () => {
  setSiteTitle("Home Page");
  return (
    <div className='min-h-screen bg-black text-white flex flex-col'>
      {/* Hero Section */}
      <section className='flex-grow flex flex-col items-center justify-center text-center px-6'>
        <h1 className='text-4xl md:text-5xl font-extrabold mb-4'>
          😊 Welcome to <span className='text-gray-300'>MyBlog</span>
        </h1>
        <p className='text-lg text-gray-400 max-w-2xl mb-8'>
          A simple blogging platform where you can share your thoughts, ideas, and stories with the world. Create, explore, and connect with
          others through blogs.
        </p>

        {/* Create Blog Button */}
        <Link
          to='/profile/blogs/new'
          className='px-6 py-3 bg-white text-black font-semibold rounded-md border border-gray-700 hover:bg-gray-200 transition'
        >
          Create Your First Blog
        </Link>
      </section>

      {/* About Section */}
      <section className='w-full border-t border-gray-700 py-12'>
        <div className='max-w-4xl mx-auto px-6 text-center'>
          <h2 className='text-2xl font-bold mb-4'>About MyBlog</h2>
          <p className='text-gray-400 text-base leading-relaxed'>
            MyBlog is designed for writers, developers, and creators who want a clean and minimal space to express themselves. With a focus
            on simplicity and dark theme aesthetics, you can focus purely on your words without distractions.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
