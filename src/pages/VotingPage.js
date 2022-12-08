import React from 'react';
import { Navbar,Body} from './components-VotingPage/Voting_page_index'; 
const VotingPage = () => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-navbar">
        <Navbar />
      </div>       
      <div className="gradient-bg-body">
        <Body />
      </div>
    </div>
  )
}

export default VotingPage;