import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <h1>Nomio React</h1>
        <Routes>
          <Route path="/" element={<div>Home Page Placeholder</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;