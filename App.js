
import React, { useState, useEffect } from "react";
const { ethers } = require("ethers");

function App() {
  const [certificate, setCertificate] = useState(null);
  const [issueData, setIssueData] = useState({ recipient: "", name: "", course: "", year: "" });
  const [address, setAddress] = useState("");
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ id: "", password: "" });

  const contractAddress = "your_smartcontract_address_here"; 
  const ABI = [
    "function issueCertificate(address recipient, string name, string course, uint year) public",
    "function getCertificate(address student) public view returns (string memory, string memory, uint, bool)"
  ];

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setAddress(accounts[0]);
        setIsWalletConnected(true);
        console.log("Connected Wallet:", accounts[0]);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      alert("MetaMask not detected. Please install MetaMask.");
    }
  };

  const checkIfWalletIsConnected = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          setAddress(accounts[0].address);
          setIsWalletConnected(true);
          console.log("Wallet already connected:", accounts[0].address);
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
      }
    }
  };

  const issueCertificate = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert("You must log in first!");
      return;
    }
    try {
      if (!window.ethereum) return;
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ABI, signer);

      const tx = await contract.issueCertificate(
        issueData.recipient,
        issueData.name,
        issueData.course,
        parseInt(issueData.year)
      );
      console.log("Transaction Hash:", tx.hash);
      await tx.wait();
      alert("Certificate Issued Successfully!");
    } catch (error) {
      console.error("Error issuing certificate:", error);
    }
  };

  const verifyCertificate = async () => {
    try {
      if (!window.ethereum) return;
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, ABI, provider);
      const data = await contract.getCertificate(address);
      setCertificate({ name: data[0], course: data[1], year: data[2].toString(), exists: data[3] });
    } catch (error) {
      console.error("Error verifying certificate:", error);
      alert("Certificate not found.");
      setCertificate(null);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.id === "default" && loginData.password === "default") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid Credentials");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center">Decentralized Certificate Verification System</h2>

      <div className="text-center mt-3">
        <button onClick={connectWallet} className="btn btn-warning">
          {isWalletConnected ? `Connected: ${address.slice(0, 6)}...${address.slice(-4)}` : "Connect Wallet"}
        </button>
      </div>

      {!isLoggedIn && (
        <div className="card p-4 mt-4">
          <h4>Admin Login</h4>
          <form onSubmit={handleLogin}>
            <input className="form-control mb-2" type="text" placeholder="Login ID" onChange={(e) => setLoginData({ ...loginData, id: e.target.value })} required />
            <input className="form-control mb-2" type="password" placeholder="Password" onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} required />
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </div>
      )}

      {isLoggedIn && (
        <div className="card p-4 mt-4">
          <h4>Issue Certificate</h4>
          <form onSubmit={issueCertificate}>
            <input className="form-control mb-2" type="text" placeholder="Recipient Address" onChange={(e) => setIssueData({ ...issueData, recipient: e.target.value })} required />
            <input className="form-control mb-2" type="text" placeholder="Student Name" onChange={(e) => setIssueData({ ...issueData, name: e.target.value })} required />
            <input className="form-control mb-2" type="text" placeholder="Course Name" onChange={(e) => setIssueData({ ...issueData, course: e.target.value })} required />
            <input className="form-control mb-2" type="number" placeholder="Year" onChange={(e) => setIssueData({ ...issueData, year: e.target.value })} required />
            <button type="submit" className="btn btn-primary">Issue Certificate</button>
          </form>
        </div>
      )}

      <div className="card p-4 mt-4">
        <h4>Verify Certificate</h4>
        <input className="form-control mb-2" type="text" placeholder="Enter Address" onChange={(e) => setAddress(e.target.value)} />
        <button className="btn btn-success" onClick={verifyCertificate}>Verify</button>
        {certificate && (
          <div className="alert alert-info mt-3">
            <h5>Certificate Details</h5>
            <p><strong>Name:</strong> {certificate.name}</p>
            <p><strong>Course:</strong> {certificate.course}</p>
            <p><strong>Year:</strong> {certificate.year}</p>
            <p><strong>Status:</strong> {certificate.exists ? "✅ Valid" : "❌ Not Found"}</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default App;
