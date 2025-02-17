# Decentralised Certificate Verification System
🎓 Decentralized Certificate Verification System
A blockchain-based system for issuing and verifying educational certificates securely using Ethereum & Solidity. This project leverages MetaMask, React, and Ethers.js to ensure authenticity and prevent fraud.

🌟 Features
✅ Issue Certificates – Institutions can issue certificates securely on the blockchain.
✅ Verify Certificates – Anyone can verify certificates using a wallet address.
✅ MetaMask Integration – Users can connect their Ethereum wallet.
✅ Immutable & Tamper-Proof – Certificates are stored permanently on the blockchain.
✅ Secure Access – Issuing certificates is protected with a login (default credentials: default / default).

🛠️ Tech Stack
Frontend: React.js, Bootstrap
Blockchain: Solidity, Ethereum Smart Contracts
Web3 Integration: MetaMask, Ethers.js
Development Environment: Hardhat

🚀 Installation & Setup
🔹 Prerequisites
Node.js & npm installed
MetaMask extension in your browser
Ethereum test network (Sepolia recommended)
🔹 Clone the Repository
#bash
git clone https://github.com/your-username/Decentralized-Certificate-System.git
cd Decentralized-Certificate-System
🔹 Install Dependencies
#bash
npm install
🔹 Run the Local Blockchain (Hardhat)
#bash
npx hardhat node
🔹 Deploy the Smart Contract
#bash
npx hardhat run scripts/deploy.js --network localhost
Copy the contract address from the terminal and update it in App.js.

🔹 Start the Frontend
#bash
npm start
Open http://localhost:3000 in your browser.

📝 Usage Guide
1️⃣ Connect Wallet
Click "Connect Wallet" to link MetaMask.
2️⃣ Issue Certificate (Admin Only)
Login using default / default
Enter recipient details and click "Issue Certificate"
3️⃣ Verify Certificate
Enter a wallet address and click "Verify"
View the certificate details on the blockchain.

🛡️ Security Measures
🔒 Certificates are permanently stored on the blockchain.
🔑 Only authorized users can issue certificates.
🔍 Verification is transparent & tamper-proof.

🤝 Contribution
Want to improve this project? Feel free to fork, star, and contribute.

#bash
git checkout -b feature-branch
git commit -m "Add your feature"
git push origin feature-branch
📜 License
This project is licensed under the MIT License.

