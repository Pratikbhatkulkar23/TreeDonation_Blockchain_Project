import abi from "./conntract/abi.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./App.css";
import Donate from "./compont/donate";
import save from "./Save.png";
import Donera from "./compont/Donera";
function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x673C9771dbFE554442c983309Bc5Bf9D3Af01065";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
        
          setAccount(account);
          setState({ provider, signer, contract });
      
        } else {
          alert("Please install metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    connectWallet();
  }, []);
 
  return (
    <div className="App">
      <div style={{ backgroundColor: "#EFEFEF", height: "100%" }}>
      <img src={save} className="img-fluid" alt=".." width="100%" />
      <p
        class="text-muted lead "
        style={{ marginTop: "10px", marginLeft: "5px" }}
      >
        <small>Connected Account - {account}</small>
      </p>
      <div className="container">
     <Donate state={state} ></Donate>
     <Donera state={state}></Donera>
      </div>
    </div>
    </div>
  );
}

export default App;
