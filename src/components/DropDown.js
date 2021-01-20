import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { PrimaryButton } from "./PrimaryButton";
import { makeStyles } from "@material-ui/core/styles";
import { useData } from "../DataContext";
import { useForm } from "react-hook-form";
import Web3 from "web3";
import Portis from "@portis/web3";
import metamasklogo from "./METAMASK.png";
import fortmaticLogo from "./fortmatic.png";
import portislogo from "./PORTIS.png";
import walletconnectlogo from "./WALLETCONNECT.png";
import Swal from "sweetalert2";
import coinbaselogo from "./COINBASE.png";
import WalletConnectProvider from "@walletconnect/web3-provider";

import Fortmatic from "fortmatic";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  dropDown: {
    justifyContent: "center",
  },
}));

export const DropDown = () => {
  const [status, setStatus] = useState(true);

  const [dropDownValue, setDropDownValue] = useState("");
  const { setValues, data } = useData();
  useEffect(() => {
    if (dropDownValue !== "") {
      //getDropDownValue(data);
      setStatus(false);
    }
  }, [dropDownValue]);
  const { register } = useForm({
    defaultValues: {
      dropDownValue: data.dropDownValue,
    },
    mode: "onBlur",
  });

  const styles = useStyles();
  const handleChange = async (e) => {
    if (e.target.value === 0) {
      data["dropDownValue"] = e.target.value;
      setValues(data);
    } else if (e.target.value === 1) {
      let web3 = new Web3(
        Web3.givenProvider ||
          "https://ropsten.infura.io/v3/4d39325e4c914146b733ef5b792ab2a0"
      );
      window.web3 = web3;
      try {
        await window.ethereum.enable();
        const account = await web3.eth.getAccounts();
        console.log(account[0]);
        console.log(
          "BALANCE ",
          await web3.eth.getBalance(account[0].toString())
        );
        data["addr"] = account[0];
        data["dropDownValue"] = e.target.value;
        data["web3"] = web3;
        setValues(data);
      } catch (err) {
        console.log("ERROR:HEHE", err.message);
        if (err.message.includes(" 'enable' of undefined")) {
          Swal.fire(
            "METAMASK ERROR!",
            "PLEASE INSTALL OR ENABLE METAMASK ON YOUR BROWSER"
          );
          Swal.update({
            icon: "error",
          });
          data["dropDownValue"] = 0;
          setValues(data);
        }
      }
    } else if (e.target.value === 2) {
      const provider = new WalletConnectProvider({
        infuraId: "4d39325e4c914146b733ef5b792ab2a0", // Required
      });
      try {
        await provider.enable();

        const web3 = new Web3(provider);

        const account = await web3.eth.getAccounts();

        console.log("WALLET CONNECT ACCOUNT", account[0]);

        console.log(
          "BALANCE ",
          await web3.eth.getBalance(account[0].toString())
        );
        data["addr"] = account[0];
        data["dropDownValue"] = e.target.value;
        data["web3"] = web3;
        setValues(data);
      } catch (err) {
        console.log(err.message);
      }
    } else if (e.target.value === 3) {
      const portis = new Portis(
        "44b187a3-c957-4ab6-9c74-64e7133a14d7",
        "ropsten"
      );
      const web3 = new Web3(portis.provider);

      window.web3 = web3;
      //await window.ethereum.enable();
      const account = await web3.eth.getAccounts();
      console.log(account[0]);
      console.log("BALANCE ", await web3.eth.getBalance(account[0].toString()));
      data["addr"] = account[0];
      data["dropDownValue"] = e.target.value;
      data["web3"] = web3;
      console.log("WEB##3", data["web3"]);

      setValues(data);
    } else if (e.target.value === 4) {
      let fm = new Fortmatic("pk_test_66779BFC53FD0766", "ropsten", 3);
      try {
        let web3 = new Web3(await fm.getProvider());
        try {
          await web3.eth.getAccounts(async (err, accounts) => {
            if (err) console.log("ERROR: ", err);
            console.log("FORTMATIC ", accounts[0]);
            console.log(
              "BALANCE ",
              await web3.eth.getBalance(accounts[0].toString())
            );
            data["addr"] = accounts[0];
            data["dropDownValue"] = e.target.value;
            data["web3"] = web3;
            setValues(data);
          });
        } catch (err) {
          console.log("OOPS SOMETHING BAD HAPPENED");
        }
      } catch (err) {
        console.log(err.message);
      }
    } else if (e.target.value === 5) {
      let web3 = new Web3(
        Web3.givenProvider ||
          "https://ropsten.infura.io/v3/4d39325e4c914146b733ef5b792ab2a0"
      );

      try {
        let address = await web3.eth.getCoinbase();
        console.log("ADDRESS", address);
        let balance = await web3.eth.getBalance(address);
        console.log("BALANCE", balance);
        data["addr"] = address;
        data["dropDownValue"] = e.target.value;
        data["web3"] = web3;
        setValues(data);
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const handleWallet = async (e) => {
    console.log("INSIDE", e.target.value);
  };
  return (
    <>
      <FormControl className={styles.root}>
        <InputLabel className={styles.dropDown}>Connect Wallet</InputLabel>
        <Select
          className={styles.dropDown}
          name="dropDownValue"
          ref={register}
          onChange={handleChange}
          defaultValue={0}
        >
          <MenuItem className={styles.dropDown} value={0}>
            <strong>Select a wallet</strong>
          </MenuItem>
          <MenuItem className={styles.dropDown} value={1}>
            <img
              src={metamasklogo}
              alt="logo"
              width="30"
              style={{ marginRight: "5px" }}
            />
            MetaMask
          </MenuItem>
          <MenuItem className={styles.dropDown} value={2}>
            <img
              src={walletconnectlogo}
              alt="logo"
              style={{ marginRight: "5px" }}
              width="30"
            />
            WalletConnect
          </MenuItem>
          <MenuItem className={styles.dropDown} value={3}>
            <img
              src={portislogo}
              alt="logo"
              style={{ marginRight: "5px" }}
              width="30"
            />
            Portis
          </MenuItem>
          <MenuItem className={styles.dropDown} value={4}>
            <img
              src={fortmaticLogo}
              alt="logo"
              style={{ marginRight: "5px" }}
              width="30"
            />
            Fortmatic
          </MenuItem>
          <MenuItem className={styles.dropDown} value={5}>
            <img
              src={coinbaselogo}
              alt="logo"
              style={{ marginRight: "5px" }}
              width="30"
            />
            Coinbase
          </MenuItem>
        </Select>
      </FormControl>
    </>
  );
};
