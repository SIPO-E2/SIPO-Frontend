import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="App flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1>Welcome to the App!</h1>
        <p>
          This is a simple sidebar layout with React, TypeScript, TailwindCSS,
          and Bootstrap.
        </p>
      </main>
    </div>
  );
}

export default App;
