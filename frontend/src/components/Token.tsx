import React, { useContext, useEffect, useState } from "react";
import { TokenContext } from "./../hardhat/SymfoniContext";

interface Props {}

const decimals = 18;
const TokenSmartContractAddress = "0xEFD6399D26e88689e798c4E178814f08969D2Ba2";

const toWholeCoins: (number: number) => bigint = (num: number) => {
  return BigInt(num * 10 ** decimals);
};

const fromWholeCoins: (number: number) => number = (num: number) => {
  return num / 10 ** decimals;
};

export const Token: React.FC<Props> = () => {
  const tokenContext = useContext(TokenContext);

  const [token, setToken] = useState<any>(null);
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [balance, setBalance] = useState(0);
  const [tokenAddress, setTokenAddress] = useState("0x000000000000000000");
  const [sendBalance, setSendBalance] = useState(0);
  const [sendAddress, setSendAddress] = useState("0x000000000000000000");

  useEffect(() => {
    const doAsync = async () => {
      if (!tokenContext.instance) return;

      const tokenInstance = await tokenContext.instance.attach(
        TokenSmartContractAddress
      );

      setToken(tokenInstance);
      setTokenAddress(tokenInstance.address);
      setName(await tokenInstance.name());
      setSymbol(await tokenInstance.symbol());
    };
    doAsync();
  }, [tokenContext]);

  const fetchBalance = async () => {
    if (!tokenContext.instance || !token) return;

    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const balance = await token.balanceOf(account);
    setBalance(fromWholeCoins(balance));
  };

  const transfer = async () => {
    if (!tokenContext.instance || !token) return;

    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    token.transfer(sendAddress, toWholeCoins(sendBalance));
  };

  return (
    <>
      <div>
        <p>
          Name: {name}
          <br />
          Symbol: {symbol}
          <br />
          Contract adress: {tokenAddress}
        </p>

        <p>
          <button onClick={fetchBalance}>Fetch balance</button>
          <br />
          Your balance: {balance}
        </p>

        <h2>Transfer</h2>
        <form onSubmit={transfer}>
          <p>
            <label htmlFor="sendBalance">Balance</label>
            <br />
            <input
              type="number"
              name="sendBalance"
              id="sendBalance"
              onChange={(e) => setSendBalance(parseInt(e.target.value))}
            />
          </p>

          <p>
            <label htmlFor="sendAddress">Adress</label>
            <br />
            <input
              type="text"
              name="sendAddress"
              id="sendAddress"
              onChange={(e) => setSendAddress(e.target.value)}
            />
            <br />
            <button type="submit">Send</button>
          </p>
        </form>
      </div>
    </>
  );
};
