import logo from './logo.svg';
import './mainStyle/index.css';
import ArtworkGallery from './components/artworkGalley/ArtworkGallery.jsx';
import ArtworkDetail from './components/artworkDetail/ArtworkDetail.jsx';
import Layout from './components/layout/layout.jsx';
// import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ArtworkGallery />} />
            <Route path='/artwork/:id' element={<ArtworkDetail />} />
            </Route>
        </Routes>
    </div>
  );
}

export default App;
