import { BrowserRouter as Router } from 'react-router-dom'

import NavBar from './components/NavBar';
import Routes from './routes'

function App() {
  return (
    <Router>
      <NavBar />
      <Routes />
    </Router>
  );
}

export default App;
