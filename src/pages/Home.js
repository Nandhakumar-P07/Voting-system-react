import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom'
import { VotingContext } from "./context/VotingContext";

const Home = () => {
  const{connectWallet,currentAccount} =useContext(VotingContext);

  return (
    <div>home
      {!currentAccount && (
    <Button variant="contained" onClick={connectWallet}>Connect wallet</Button>
      )}
    <Button variant="text"><Link to="/VotingPage">Voting page</Link></Button>
    </div>
  )
}
export default Home;