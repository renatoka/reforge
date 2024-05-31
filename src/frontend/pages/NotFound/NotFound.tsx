import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold">404 Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <button
        className="rounded px-4 py-2 text-white underline hover:opacity-80"
        onClick={() => navigate(-1)}
      >
        Go back
      </button>
    </div>
  );
}

export default NotFound;
