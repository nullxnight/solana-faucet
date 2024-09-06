import React, { useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import image from './image.png';
import './MainLayout.css';

const MainLayout = () => {

    const [suppliedPublicKey, setsuppliedPublicKey] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [amountValue, setamountValue] = useState(0.5);
    const handleInputChange = (e) => {
        setsuppliedPublicKey(e.target.value);
    }

    const handleDropdownChange = (e) => {
        setamountValue(e.target.value);
    }

    const handleSubmit = (e) => {
        try {
            if (!suppliedPublicKey) {
                throw new Error("Provide Public key!");
            } else if (suppliedPublicKey.length < 32 || suppliedPublicKey.length > 44) {
                console.log("Invalid Public key length!");
            };    
            e.preventDefault();
            const pubKey = new PublicKey(suppliedPublicKey);
            console.log(pubKey.toString());
            console.log(amountValue);
            const requestSol = amountValue * 1000000000;
            const connection = new Connection("https://api.devnet.solana.com");
            connection.requestAirdrop(pubKey, requestSol)

        } catch (err) {
            setErrorMessage("Invalid public key. Please check your input.");
            // console.error("Error:", err);
        }
    
    };

    return(
        <>
        <div className="logo-header-container">
            <img 
                src={image} 
                alt="justlogo" 
                className="logo"
            />
            <h1 className="logo-title">NIGHT FAUCET</h1>
        </div>
        <div className="mainContent">
            <form action="" onSubmit={handleSubmit}>
                <h3 className="form-title">Request Airdrop</h3>
                <span style={{color: "gray"}} className="form-discp">Maximum of 2 requests per hour</span>
                <br />
                <hr />
                <div className="input-dropdown-container">
                    <input 
                        type="text" 
                        name="" 
                        className="input-box" 
                        placeholder="Wallet Address" 
                        value={suppliedPublicKey}
                        onChange={handleInputChange} 
                    />
                    <select className="dropdown" value={amountValue} onChange={handleDropdownChange}>
                        <option value="0.5">0.5</option>
                        <option value="1">1</option>
                        <option value="2.5">2.5</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <br />
                <button className="submit-btn">Confirm Airdrop</button>
            </form>
        </div>
        </>
    );
}

export default MainLayout;
