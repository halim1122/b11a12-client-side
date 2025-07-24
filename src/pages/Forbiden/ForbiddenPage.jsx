// src/pages/ForbiddenPage.jsx
import { Link } from 'react-router';
import { FaBan } from 'react-icons/fa';

const ForbiddenPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 px-4">
      <FaBan className="text-red-600 text-7xl mb-4" />
      <h1 className="text-3xl font-bold text-red-700 mb-2">403 - Forbidden Access</h1>
      <p className="text-gray-700 mb-6 text-center max-w-md">
        You don’t have permission to view this page. Please contact the administrator or go back to the homepage.
      </p>
      <Link to="/" className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
        Back to Home
      </Link>
    </div>
  );
};

export default ForbiddenPage;
