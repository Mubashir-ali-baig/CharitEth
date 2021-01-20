import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useData } from "./DataContext";
import { ABI } from "./components/AbiData";
import { makeStyles } from "@material-ui/core/styles";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import Web3 from "web3";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
} from "@material-ui/core";
import { MainContainer } from "./components/MainContainer";
import Typography from "@material-ui/core/Typography";
import { PrimaryButton } from "./components/PrimaryButton";
import { DropDown } from "./components/DropDown";
const useStyles = makeStyles({
  root: {
    marginBottom: "20px",
  },
  table: {
    marginBottom: "5px",
  },
});

export const Result = () => {
  let history = useHistory();
  const [addr, setAddr] = useState("");
  const [balance, setBalance] = useState("0");
  const [amount, setAmount] = useState(0);
  const styles = useStyles();

  const [gasPrice, setGasPrice] = useState(0);
  const [txProgress, setTxProgress] = useState(false);
  const [status, setStatus] = useState(true);

  let { setValues, data } = useData();
  useEffect(() => {
    if (data["amount"] === undefined) {
      history.push("./");
    }
    if (data["addr"] !== "") {
      getBalance();
    }
  }, [addr, balance]);

  const getBalance = async () => {
    console.log("ADDRESS", data["addr"]);
    console.log("WEB##3", data["web3"]);

    try {
      let bal = await data["web3"].eth.getBalance(data["addr"]);
      setBalance(data["web3"].utils.fromWei(bal));
    } catch (err) {
      console.log("ERROR", err.message);
      if (data["web3"] === undefined) {
        history.push("./");
      }
    }
  };

  //const Transaction = async (addr, entries) => {
  //  try {
  //    let contractAddress = "0x6c06c109b3585fe4D1EC4339dDD08514fb54B5D5";
  //    let contract = await new web3.eth.Contract(ABI, contractAddress, {
  //      from: addr, // default from address
  //      gasPrice: "10000000000",
  //    });
  //    console.log(contract);
  //    let abiData = await contract.methods.transfer(
  //      "0x43D964B802c2Ce187653F6A01D6678E6cA0DC9Bb",
  //      web3.utils.toWei("2")
  //    );

  //    console.log(abiData);

  //    let txObject = {
  //      from: addr,
  //      to: contractAddress,
  //      data: abiData,
  //    };

  //    try {
  //      web3.eth
  //        .sendTransaction(txObject)
  //        .then((receipt) => {
  //          console.log(receipt);
  //          Swal.fire(
  //            "Transaction successfull!",
  //            `You've sent ${entries[1][1]} ETH to ${entries[0][1]}.`
  //          );
  //          Swal.update({
  //            icon: "success",
  //          });
  //        })
  //        .catch((err) => {
  //          console.log(err.message);
  //          console.log(err.message);
  //          Swal.fire("Transaction Failed!", `${err}`);
  //          Swal.update({
  //            icon: "error",
  //          });
  //        });
  //    } catch (err) {
  //      Swal.fire("Transaction Failed!", `${err}`);
  //      Swal.update({
  //        icon: "error",
  //      });
  //      console.log(err);
  //    }
  //  } catch (err) {
  //    console.log(err);
  //  }
  //  //});
  //};

  //const open = async (addr, toAddr, amount) => {
  //  let contractAddress = "0x6c06c109b3585fe4D1EC4339dDD08514fb54B5D5";

  //  let contract = await new web3.eth.Contract(ABI, contractAddress);
  //  setTxProgress(true);
  //  const tx = await contract.methods
  //    .transfer(toAddr, web3.utils.toWei(amount, "ether"))
  //    .send({ from: addr })
  //    .on("transactionHash", (hash) => {
  //      console.log(hash);
  //    })
  //    .on("confirmation", function (confirmationNumber, receipt) {
  //      if (confirmationNumber === 2) {
  //        console.log(receipt);
  //        console.log("Confirmed");
  //        Swal.fire(
  //          "Transaction successfull!",
  //          `You've sent ${entries[1][1]} XIO to ${entries[0][1]}.`
  //        );
  //        Swal.update({
  //          icon: "success",
  //        });
  //        setTxProgress(false);
  //      }
  //    })
  //    .on("error", (err) => {
  //      console.log("Cancelled");
  //      Swal.fire("Transaction Failed!", `${err.message}`);
  //      Swal.update({
  //        icon: "error",
  //      });
  //    });

  //const value = await (await temp)?.methods
  //  .updateProposalStatus(id, status)
  //  .send({ from: fromAccount })
  //  .on("transactionHash", (hash) => {
  //    console.log(hash);
  //  })
  //  .on("confirmation", function (confirmationNumber, receipt) {
  //    if (confirmationNumber === 2) {
  //      console.log(receipt);
  //      console.log("Confirmed");
  //    }
  //  })
  //  .on("error", () => {
  //    console.log("Cancelled");
  //    setMetaMaskRejectError(true);
  //    props.close();
  //  });
  //};

  const opeEth = async (addr, toAdd, val) => {
    let toWei = data["web3"].utils.toWei(val.toString());
    const transactionParameters = {
      gasPrice: data["web3"].utils.toHex("10000000000"),
      to: toAdd, // Required except during contract publications.
      from: addr, // must match user's active address.
      value: data["web3"].utils.toHex(toWei), // Only required to send ether to the recipient from the initiating external account.
      chainId: 3,
    };

    console.log("value ----> ", transactionParameters.value);
    let web3 = data["web3"];
    setTxProgress(true);
    window.ethereum = web3;
    const txHash = web3.eth
      .sendTransaction(transactionParameters)
      .then(async (err, txHash) => {
        console.log("HELLOOOO", txHash);
        setTxProgress(false);
        await getBalance();
        Swal.fire(
          "Transaction successfull!",
          `You've sent ${entries[1][1]} ETH to ${entries[0][1]}.`
        );
        Swal.update({
          icon: "success",
        });
      })
      .catch((err) => {
        setTxProgress(false);
        console.log("ERRR");
      });
    //const txHash = await window.ethereum.request({
    //  method: "eth_sendTransaction",
    //  params: [transactionParameters],
    //});

    //if (txHash) {
    //  Swal.fire(
    //    "Transaction successfull!",
    //    `You've sent ${entries[1][1]} ETH to ${entries[0][1]}.`
    //  );
    //  Swal.update({
    //    icon: "success",
    //  });
    //} else {
    //}
  };

  var entries = Object.entries(data).filter((entry) => entry[0] !== "files");

  const onSubmit = async () => {
    try {
      entries = Object.entries(data).filter((entry) => entry[0] !== "files");
      console.log(entries);
      //await open(
      //  data["addr"],
      //  data["receiverAddress"],
      //  entries[1][1].toString()
      //);
      await opeEth(data["addr"], data["receiverAddress"], entries[1][1]);
    } catch (err) {
      console.log("ERROR: ", err.message);
    }
  };

  const handleLink = () => {
    console.log("INSIDE HANDLE LINK");
    data["dropDownValue"] = 0;
    setValues(data);
    history.push("./");
  };

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        Pre-Transaction Details
      </Typography>
      <TableContainer className={styles.root} component={Paper}>
        <Table className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell>Field</TableCell>
              <TableCell align="left">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Your Wallet Address</TableCell>
              <TableCell>{data["addr"]}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Reciever Address</TableCell>
              <TableCell>{data["receiverAddress"]}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Amount</TableCell>
              <TableCell>{data["amount"]}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Your Current Balance</TableCell>
              <TableCell>{balance.toString()} ETH</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {!txProgress ? (
        <>
          <PrimaryButton onClick={onSubmit}>Checkout</PrimaryButton>

          <Link onClick={handleLink}>Make another transaction</Link>
        </>
      ) : (
        <CircularProgress />
      )}
    </MainContainer>
  );
};
