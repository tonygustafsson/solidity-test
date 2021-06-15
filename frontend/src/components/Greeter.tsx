import React, { useContext, useEffect, useState } from "react";
import { GreeterContext } from "./../hardhat/SymfoniContext";

interface Props {}

export const Greeter: React.FC<Props> = () => {
  const greeter = useContext(GreeterContext);
  const [message, setMessage] = useState("");
  const [counter, setCounter] = useState(0);
  const [inputGreeting, setInputGreeting] = useState("");
  const [inputCounter, setInputCounter] = useState("");
  const [greeterAddress, setGreeterAddress] = useState("0x");

  useEffect(() => {
    const doAsync = async () => {
      if (!greeter.instance) return;

      setGreeterAddress(greeter.instance.address);
      console.log("Greeter is deployed at ", greeter.instance.address);

      setMessage(await greeter.instance.greet());

      const newCount = (await greeter.instance.getCount()) as number;
      setCounter(newCount);
    };
    doAsync();
  }, [greeter]);

  const handleSetGreeting = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!greeter.instance) throw Error("Greeter instance not ready");

    const tx = await greeter.instance.setGreeting(inputGreeting);
    console.log("setGreeting tx", tx);
    await tx.wait();
    const result = await greeter.instance.greet();
    console.log("New greeting mined, result: ", result);

    setMessage(result);
  };

  const handleSetCounter = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!greeter.instance) throw Error("Greeter instance not ready");

    const newCountValue = parseInt(inputCounter);
    const tx = await greeter.instance.setCount(newCountValue);
    console.log("setCount tx", tx);
    await tx.wait();
    const result = await greeter.instance.getCount();
    console.log("New counter mined, result: ", result);

    setCounter(result);
  };

  return (
    <>
      <div>
        <p>Greeter adress: {greeterAddress}</p>

        <p>Message: {message}</p>
        <input onChange={(e) => setInputGreeting(e.target.value)}></input>
        <button onClick={(e) => handleSetGreeting(e)}>Set greeting</button>
      </div>

      <div>
        <p>Counter: {counter}</p>
        <input
          type="number"
          onChange={(e) => setInputCounter(e.target.value)}
        ></input>
        <button onClick={(e) => handleSetCounter(e)}>Set counter</button>
      </div>
    </>
  );
};
