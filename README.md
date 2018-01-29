# A-Very-Simple-Oracle-
A simple example using Oraclize to pull outside data into smart contracts. This contract pulls the PPI of Frozen Orange Juice from Quandl. 

The main contract of this applicaiton is deployed on the Rinkeby testnet at the following address: 0x1f8e5aa40f69c39b089ead323a2bde70c0b45e28. 

To launch this application, connect to the Rinkeby network using the MetaMask Google Chrome extension. More information [here](https://metamask.io/) on how to set up MetaMask. 

You will need an account on the Rinkeby network with a bit of "fake ether" on the Rinkeby network. You can ask the faucet to send you some from the site [here.](https://faucet.rinkeby.io/)

Next, clone or copy this respositrory to your computer, and from the command window while in the folder run `npm run dev`. Webpack will build and serve the application. 

Then, using Chrome with your MetaMask extension to Rinkeby, you can access http://localhost:8080/ to connect to the application. 

From here, you will be prompted to confirm the transaction from your account to the smart contract that will update the PPI of Frozen OJ from Quandl. This update may take several seconds. You can verify the correct value has been pulled in via the Quandl site [here.](https://www.quandl.com/data/FRED/WPU02420301-Producer-Price-Index-by-Commodity-for-Processed-Foods-and-Feeds-Frozen-Concentrated-Orange-Juice-Consumer-and-Institutional)

Reminder: You can access the console log via F12 to see potential error messages. 
