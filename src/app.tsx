import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await window.electronAPI.apiRequest({
        channel: 'getAllUsers'
      });
      if (response.resolved) {
        setUsers(response.data);
      } else {
        console.error(response.error);
      }
    })();
  }, []);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-900">
      <div className="flex flex-col items-center gap-3 text-white">
        <h1 className="text-3xl font-bold">Welcome to Reforge 🚀</h1>
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <p>
            Vite + React + TypeScript + TailwindCSS + Electron Forge + Prisma +
            SQLite
          </p>
          <p>
            Make sure to read <span className="underline">README.md</span> file
            to get started.
          </p>
        </div>
      </div>
    </div>
  );
}

root.render(<App />);
export default App;
