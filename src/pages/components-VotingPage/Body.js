import React, { useContext,useEffect,useState } from "react";

import { VotingContext } from "../context/VotingContext";
import { ethers } from "ethers";
import Voting from '../utils/Voting.json';
import { contractAddress } from "../utils/constants";
import GetBlockchain from "../utils/getBlockchain";
const Body = () => {

  const { castVote, formData, isLoading ,setformData,handleVote,handleAddCandidate,handlesubmit } = useContext(VotingContext);
  const[simpleStorage,setSimpleStorage] = useState(undefined);
  const[data,setData] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      const simpleStorage = await GetBlockchain();
      const data = await simpleStorage.readData();
      setSimpleStorage(simpleStorage);
      setData(data);
    };
    init();
  },[]);

  const updateData = async e => {
    e.preventDefault();
    const data = e.target.elements[0].vaalue;
    const tx = await simpleStorage.updateData(data);
    await tx.wait();
    const newData = await simpleStorage.readData;
    setData(newData);
  }; 

  if(typeof simpleStorage === 'undefined' || typeof data === 'undefined'){
    return 'Loading...';
  }

  return (
  /*  <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-3 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
          <h1 className="text-center text-3xl sm:text-5xl text-white text-gradient py-2">
            Cast your vote <br /> from your comfort space
          </h1>
          <p className="text-center mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
          All of us may have been created equal. But we'll never actually be equal until we all vote. So don't wait
          </p>
        </div>
        <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
        <form onSubmit={handleVote}>
            <input type="number" name="voteTo" placeholder="VoteTo" className="text-center my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"/>
            <button type="submit" className="text-center my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism">
              Cast vote
            </button>
        </form>
        <form onSubmit={handleAddCandidate}>
            <input type="text" name="candidateName" placeholder="CandidateName" className="text-center my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"/>
            <button type="submit" className="text-center my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism">
              Cast vote
            </button>
        </form>
        <form onSubmit={handlesubmit}>
            <button type="submit" className="text-center my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism">
              getOwner
            </button>
        </form>
        </div>
      </div>
    </div>*/
    <div className="container">
      <div className="row">
        <div className="col-sm-6">
          <h2>Data</h2>
          <p>{data.toString()}</p>
        </div>
        <div className="col-sm-6">
          <h2>Change data</h2>
          <form className="form-inline" onSubmit={e => updateData(e)}>
            <input type="text" className="form-control" placeholder="data"/>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Body;