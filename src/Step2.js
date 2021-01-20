import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { MainContainer } from "./components/MainContainer";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import { useForm } from "react-hook-form";
import { Input } from "./components/Input";
import { PrimaryButton } from "./components/PrimaryButton";
import { Form } from "./components/Form";
import { useData } from "./DataContext";
import { DropDown } from "./components/DropDown";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const schema = yup.object().shape({
  gasLimit: yup
    .string()
    .matches(/^[0-9]*$/, "It should be a number")
    .required("Empty field not allowed"),
  gasPrice: yup.string().matches(/^[0-9]*$/, "It should be a number"),
});

export const Step2 = () => {
  const { setValues, data } = useData();
  const history = useHistory();
  console.log(data);
  useEffect(() => {
    if (data["amount"] === undefined) {
      history.push("./");
    }
  }, [data]);

  const { register, handleSubmit, watch, errors } = useForm({
    defaultValues: {
      gasLimit: data.gasLimit,
      hasPrice: data.hasPrice,
      gasPrice: data.gasPrice,
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const hasPrice = watch("hasPrice");

  const onSubmit = (data) => {
    console.log(data);
    setValues(data);
    history.push("./result");
  };

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        Step 2
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          ref={register}
          id="gasLimit"
          type="number"
          name="gasLimit"
          label="Gas Limit"
          required
          error={!!errors.gasLimit}
          helperText={errors?.gasLimit?.message}
        />
        <FormControlLabel
          control={
            <Checkbox
              defaultValue={data.hasPrice}
              defaultChecked={data.hasPrice}
              color="primary"
              inputRef={register}
              name="hasPrice"
            />
          }
          label="Do you want to enter a gas price"
        />
        {hasPrice && (
          <Input
            ref={register}
            id="gasPrice"
            type="number"
            label="Gas Price"
            name="gasPrice"
            error={!!errors.gasPrice}
            helperText={errors?.gasPrice?.message}
          />
        )}
        <DropDown />
        <PrimaryButton
          status={
            data["dropDownValue"] === 0 || data["dropDownValue"] === undefined
              ? true
              : false
          }
        >
          Next
        </PrimaryButton>
      </Form>
    </MainContainer>
  );
};
