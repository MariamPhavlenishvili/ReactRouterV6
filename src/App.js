import { Route, Routes, Navigate } from 'react-router-dom';
import AllQuotes from './components/pages/AllQuotes';
import NewQuote from './components/pages/NewQuote';
import QuoteDetail from './components/pages/QuoteDetail';
import Layout from './components/layout/Layout';
import NotFound from './components/pages/NotFound';

function App() {
  return (
    <Layout>
      <Routes>
          <Route path="/" element={ <Navigate to="/quotes"/> } />
          <Route path="/quotes" element={ <AllQuotes/> } />
          <Route path="/quotes/:quoteId/*" element={ <QuoteDetail/> } />
          <Route path="/new-quote" element={ <NewQuote/> } />
          <Route path="*" element={ <NotFound/> } />
        </Routes>

    </Layout>
  );
}

export default App;
