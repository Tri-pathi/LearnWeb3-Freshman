import { ABI, contactAddress } from "./utils.js";
import { Contract, errors, ethers } from "./ethers-5.1.esm.min.js";
const MoodContractAddress = contactAddress;
const moodABI = ABI;
const connectButton = document.getElementById("connectButton")

const setmood=document.getElementById("setMood")
const getmood=document.getElementById("getMood");

connectButton.onclick=Connect;
setmood.onclick=setMood;
getmood.onclick=getMood;

 
async function Connect(){
  if(typeof window.ethereum!=="undefined"){
    try {
      await ethereum.request({method:"eth_requestAccounts"})
      
    } catch (error) {
      console.log(error);
    }
  connectButton.innerHTML="Connected";
  const accounts=await ethereum.request({method:"eth_accounts"});
  console.log(accounts);}
  else{
    console.log("Please Install Metamask")
    
  }
}

async function setMood ()  {
  const mood=document.getElementById("mood").value;
  console.log(`setting the mood of ${mood} type`);
  if(typeof window.ethereum!=="undefined"){
  const provider=new ethers.providers.Web3Provider(window.ethereum);
  await provider.send('eth_requestAccounts',[]);
  const signer=provider.getSigner();

const moodContract=new ethers.Contract(MoodContractAddress,moodABI,signer);
try {
  const transactionResponse=await moodContract.setMood(mood)
   await listenForTransactionMine(transactionResponse,provider);
} catch (error) {
  console.log(error);
}}else{
  setmood.innerHTML="Pleasee install MetaMask";
}
};
async  function getMood () {
 if(typeof window.ethereum!=="undefined"){
  const provider=new ethers.providers.Web3Provider(window.ethereum);
  await provider.send('eth_requestAccounts',[]);
  const signer=provider.getSigner();

const moodContract=new ethers.Contract(MoodContractAddress,moodABI,signer);   try {
    const mood=await moodContract.getMood();
    console.log(mood);
    
   } catch (error) {
    console.log(error);
   }
 }else{
  getmood.innerHTML="Please install MetaMask";
 }
}
function listenForTransactionMine(transactionResponse, provider) {
  console.log(`Mining ${transactionResponse.hash}`)
  return new Promise((resolve, reject) => {
      try {
          provider.once(transactionResponse.hash, (transactionReceipt) => {
              console.log(
                  `Completed with ${transactionReceipt.confirmations} confirmations. `
              )
              resolve()
          })
      } catch (error) {
          reject(error)
      }
  })
}
