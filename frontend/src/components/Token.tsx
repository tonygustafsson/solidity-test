import React, { useContext, useEffect, useState } from "react";
import { TokenContext } from "./../hardhat/SymfoniContext";

interface Props {}

export const Token: React.FC<Props> = () => {
  const token = useContext(TokenContext);
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [tokenAddress, setTokenAddress] = useState("0x");

  useEffect(() => {
    token.factory?.attach("0x02AbA425f25e6Ab7d9C3e40F6b1c140ff4C617a2");

    const doAsync = async () => {
      if (!token.instance) return;

      setTokenAddress(token.instance.address);
      console.log("Token is deployed at ", token.instance.address);

      //const tokenName = await token.instance.name();
      //setName(tokenName);

      //setName(await token.instance.name());
      // setSymbol(await token.instance.symbol());
    };
    doAsync();
  }, [token]);

  const handleMint = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!token.instance) throw Error("Token instance not ready");

    const tx = await token.factory?.deploy(44444);

    if (!tx) {
      console.error("No TX!");
      return;
    }

    console.log("Deploy token tx", tx);

    // await tx.wait();

    const name = await tx.name();
    const adress = await tx.address;
    console.log("New name: ", name);

    setName(name);
    setTokenAddress(adress);
  };

  const fetch = async () => {
    if (!token.instance) throw Error("Token instance not ready");

    await token.instance.attach("0x91d565327e7a93741303f1251308e36c75768b32");

    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const balance = await token.instance?.balanceOf(account);
    console.log("Balance: ", balance?.toString());

    const adress = await token.instance.address;

    setTokenAddress(adress);
  };

  return (
    <>
      <div>
        <p>
          Name: {name}
          <br />
          Symbol: {symbol}
        </p>

        <p>Token adress: {tokenAddress}</p>

        <button onClick={handleMint}>MINT</button>
        <button onClick={fetch}>Fetch</button>
      </div>
    </>
  );
};
