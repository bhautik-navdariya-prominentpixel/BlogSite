const DefaultErrorPage = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-black text-white px-6'>
      <h1 className='text-6xl font-bold mb-4'>500</h1>
      <h2 className='text-2xl font-semibold mb-2'>Something went wrong</h2>
      <p className='text-gray-400 mb-6'>We're working on it. Please try again later.</p>
      <a href='/' className='px-6 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition'>
        Go Back Home
      </a>
    </div>
  );
};

export default DefaultErrorPage;
