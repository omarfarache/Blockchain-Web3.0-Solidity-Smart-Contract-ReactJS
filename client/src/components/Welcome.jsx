import React, { useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";

import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import { Loader } from ".";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-4 outline-none bg-transparent text-white border text-sm white-glassmorphism"
  />
);

const Welcome = () => {
  const {
    currentAccount,
    connectWallet,
    handleChange,
    sendTransaction,
    formData,
    isLoading,
  } = useContext(TransactionContext);

  const handleSubmit = (e) => {
    const { addressTo, amount, message } = formData;

    e.preventDefault();

    if (!addressTo || !amount || !message) return;

    sendTransaction();
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
          <h1 className="text-2xl sm:text-5xl text-white  py-1">
            MY CHAIN <br /> BlockChain and Crypto Platform .
          </h1>
          <div className="flex mf:flex-row flex-col items-start justify-between py-12 px-2 ">
            <p className="text-2xl sm:text-2xl text-white  py-1">
              Send and Receive Crypto Worldwide Easily !
            </p>
          </div>

          {!currentAccount && (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#093B25] p-3 rounded-full cursor-pointer border-[#3d4f7c] hover:bg-black border-[1px] mt-2 "
            >
              <AiFillPlayCircle className="text-white mr-2 " />
              <p className="text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
          )}
        </div>

        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            <p className="text-2xl sm:text-xl text-white  py-1">
              Your Account Address is ( first you should connect your wallet to
              metamask) : {shortenAddress(currentAccount)}
            </p>
            <div>
              <br />
            </div>
          </div>
          <div className="p-5 sm:w-96 w-full flex-1 flex-col justify-left  blue-glassmorphism">
            <Input
              placeholder="Receiver Address"
              name="addressTo"
              type="text"
              handleChange={handleChange}
            />
            <Input
              placeholder="Amount"
              name="amount"
              type="number"
              handleChange={handleChange}
            />

            <Input
              placeholder="Description"
              name="message"
              type="text"
              handleChange={handleChange}
            />

            {isLoading ? (
              <Loader />
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-black rounded-full cursor-pointer font-semibold"
              >
                Transfer
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
