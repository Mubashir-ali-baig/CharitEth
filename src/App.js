import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Header } from "./components/Header";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Result } from "./Result";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import Web3Modal from "web3modal";
import Web3 from "web3";

function App() {
  //const [addr, setAddr] = useState("");
  //const [balance, setBalance] = useState("0");
  //const [amount, setAmount] = useState(0);
  //const [receiverAddr, setReceiever] = useState("");
  //const [gasPrice, setGasPrice] = useState(0);

  //const onSubmitForm = (data) => {
  //  console.log(data);
  //  setReceiever(data.receiver);
  //  setGasPrice(data.gasPrice);
  //  setAmount(data.amount);

  //};

  //const loadBlockChainData = async () => {

  //  let accountAddress = await web3.eth.getAccounts();
  //  setAddr(accountAddress[0]);
  //};

  //const getBalance = async () => {
  //  console.log(addr);
  //  let bal = await web3.eth.getBalance(addr);
  //  setBalance(web3.utils.fromWei(bal));
  //};

  return (
    <>
      <Header />
      <Router>
        <Switch>
          <Route exact path="/" component={Step1} />
          <Route exact path="/step2" component={Step2} />
          <Route exact path="/result" component={Result} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
