import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import the Apollo client wrapper
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
  
import Home from './pages/Home';
import Matchup from './pages/Matchup';
import Vote from './pages/Vote';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
})

function App() {
  return (
    // Wrap everything in the ApolloProvider and client being passed in a `props`
      <ApolloProvider client={ client }>
          <Router>
              <div className="flex-column justify-center align-center min-100-vh bg-primary">
                  <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/matchup" element={<Matchup />} />
                      <Route path="/matchup/:id" element={<Vote />} />
                  </Routes>
              </div>
          </Router>
      </ApolloProvider>
  );
}

export default App;
