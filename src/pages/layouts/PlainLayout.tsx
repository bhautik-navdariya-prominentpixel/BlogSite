import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "../../components/ui/Header";

const PlainLayout = () => {
  return (
    <div className='min-h-screen flex flex-col bg-black text-white'>
      <Header />
      <ToastContainer style={{ marginTop: "55px" }} />

      {/* Main Content */}
      <main className='flex-grow flex items-center justify-center px-4 mt-4 mb-3'>
        {/* Form Container */}
        <Outlet />
      </main>

      {/* Footer */}
      {/* <footer className='w-full border-t border-gray-700 py-4'>
        <div className='max-w-4xl mx-auto px-6 text-center text-sm text-gray-400'>
          © {new Date().getFullYear()} MyBlog. All Rights Reserved.
        </div>
      </footer> */}
    </div>
  );
};

export default PlainLayout;
