import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import HatsForm from './HatsForm';
import Hats from './Hats';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="hats">
            <Route path="new" element={<HatsForm />} />
          </Route>
          <Route path="hats">
            <Route path="" element={<Hats />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
