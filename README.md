# Getting Started with Create React App

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


# smart contract function and variable GUIDE
## variable guide
### startTimeStamp
    presale start time
### endTimeStamp
    presale end time
### tokenPrice
    current token price
### decimal
    token decimal
### round
    get round
### tokenAmount
    current token amount

## function guide
### createSupply(uint256 tokenAmount)
    token generate
### startPresale(uint256 _startTimeStamp, uint256 _endTimeStamp)
    start presale round
### buyToken(unit256 num)
    buy token 
### calculateRemainingTime
    get remaining presale time 
### getTokenPrice
    get current token price 
### getTokenPriceDecimal
    get token price decimal 
### getBalance
    get token amount 
### getRound
    get round

