import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen text-white bg-gray-900">
      <Navbar />
      <main className="">
        {children}
      </main>
    </div>
  );
};

export default Layout; 