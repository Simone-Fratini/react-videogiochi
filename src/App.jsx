import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Layout from './components/Layout';
import Home from './pages/Home';
import GameDetail from './pages/GameDetail';
import Games from './pages/Games';
import NewReleases from './pages/NewReleases'
import SearchPage from './pages/SearchPage';
import TopRatedGames from './pages/TopRatedGames';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/:slug" element={<GameDetail />} />
            <Route path="/newReleases" element={<NewReleases />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/toprated" element={<TopRatedGames />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}

export default App;