import './mainStyle/index.css';
import ArtworkGallery from './pages/artworkGallery/ArtworkGallery.jsx';
import ArtworkDetail from './pages/artworkDetail/ArtworkDetail.jsx';
import Layout from './components/Layout.jsx';
import NotFound from './pages/NotFound.jsx';
// import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <Router> */}
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* <Route path="*" element={<NotFound />} /> */}
            <Route index element={<ArtworkGallery />} />
            <Route path='/artwork/:id' element={<ArtworkDetail />} />
          </Route>
        </Routes>
      {/* </Router> */}
    </div>
  );
}

export default App;
