import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { MainContainer } from "./components/MainContainer";
import { Form } from "./components/Form";
import { Input } from "./components/Input";
import { PrimaryButton } from "./components/PrimaryButton";

import { InputLabel, Typography, MenuItem, Select } from "@material-ui/core";
import * as yup from "yup";
import { useData } from "./DataContext";
import { yupResolver } from "@hookform/resolvers/yup";
const schema = yup.object().shape({
  receiverAddress: yup
    .string()
    .matches(/^0x[a-fA-F0-9]{40}$/, "Address should start with 0x")
    .required("Receiver address is required to proceed with transaction"),
  amount: yup
    .string()
    .matches(/^(?=.)([+-]?([0-9]*)(\.([0-9]+))?)$/, "It should be a number")
    .required("Empty field not allowed"),
});
export const Step1 = () => {
  const { setValues, data } = useData();
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      receiverAddress: data.receiverAddress,
      amount: data.amount,
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const history = useHistory();

  const onSubmit = (data) => {
    history.push("/step2");
    data["dropDownValue"] = 0;
    setValues(data);
  };
  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        Step 1
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          ref={register}
          name="receiverAddress"
          type="text"
          label="Receiver Address"
          error={!!errors.receiverAddress}
          helperText={errors?.receiverAddress?.message}
        />
        <Input
          ref={register}
          name="amount"
          type="number"
          label="Amount"
          error={!!errors.amount}
          helperText={errors?.amount?.message}
        />

        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
};
