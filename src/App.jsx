import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import GameDetail from './pages/GameDetail';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games/:slug" element={<GameDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;