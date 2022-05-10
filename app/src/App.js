import React, { useState, useEffect } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';
import MyCandyMachine from './MyCandyMachine';
// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {

  const [walletAddress, setWalletAddress] = useState(null);

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window

      if (solana && solana.isPhantom) {
        console.log('Phantom wallet found!')

        const response = await solana.connect({ onlyIfTrusted: true })
        console.log(
          'Connected with Public Key:',
          response.publicKey.toString()
        );

        setWalletAddress(response.publicKey.toString())
      } else {
        alert('Get phantom wallet')
      }
    } catch (error) {
      console.error(error);

    }
  }


  const connectWallet = async () => {
    const { solana } = window

    if (solana) {
      //Kada user zeli da se konektuje mi pozivamu connect funkciju iz solana objekta.
      const response = await solana.connect()
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };
  /*
  * We want to render this UI when the user hasn't connected
  * their wallet to our app yet.
  */
  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected()
    }

    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad);

  }, [])

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🍭 Candy Drop</p>
          <p className="sub-text">NFT drop machine with fair mint</p>
          {/* Render your connect to wallet button right here */}
          {!walletAddress && renderNotConnectedContainer()}
        </div>
        {/* Check for walletAddress and then pass in walletAddress */}
        {walletAddress && <MyCandyMachine walletAddress={window.solana} />}
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <div
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</div>
        </div>
      </div>
    </div>
  );
};

export default App;
