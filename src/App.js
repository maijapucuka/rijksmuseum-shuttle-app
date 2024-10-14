import './mainStyle/index.css';
import ArtworkGallery from './pages/artworkGallery/ArtworkGallery.jsx';
import ArtworkDetail from './pages/artworkDetail/ArtworkDetail.jsx';
import Layout from './components/Layout.jsx';
import NotFound from './pages/notFound/NotFound.jsx';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ArtworkGallery />} />
            <Route path='/artwork/:id' element={<ArtworkDetail />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
    </div>
  );
}

export default App;
