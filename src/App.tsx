import Sidebar from "./components/Sidebar";
import "./global.css";

function App() {
  return (
    <div className="flex min-h-screen flex-row bg-gray-100 text-gray-800">
      <Sidebar />
      <main className="main -ml-48 flex flex-grow flex-col p-4 transition-all duration-150 ease-in md:ml-0 ll">
        <div className="flex h-full items-center justify-center bg-white text-center text-5xl font-bold shadow-md margin">
          Content
        </div>
      </main>
    </div>
  );
}

export default App;
