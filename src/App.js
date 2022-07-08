import './App.css';

function App() {
  return (
    <div className="App">
      <div className="App">
        <div id="mySidebar" className="h-full text-start fixed z-10 w-56 top-0 left-0 bg-slate-300 overflow-x-hidden pt-16 sidebar transition">
          <a className="py-2 pl-8 pr-2 text-2xl text-slate-800 block transition hover:text-slate-900" href="/">Dashboard</a>
          <a className="py-2 pl-8 pr-2 text-2xl text-slate-800 block transition hover:text-slate-900" href="/library">Library</a>
          <a className="py-2 pl-8 pr-2 text-2xl text-slate-800 block transition hover:text-slate-900" href="/import-csv">Import CSV</a>
          <a className="py-2 pl-8 pr-2 text-2xl text-slate-800 block transition hover:text-slate-900" href="/po">Purchase Order</a>
          <a className="py-2 pl-8 pr-2 text-2xl text-slate-800 block transition hover:text-slate-900" href="/costumers">Costumers</a>
        </div>
        <div id="main" className="ml-56">
        
        </div>
      </div>
    </div>
  );
}

export default App;
