import './App.css';
import VotingPage from './pages/VotingPage';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Home from './pages/Home';
function App() {
  return (
    <div>
     <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/VotingPage' element={<VotingPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
