import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormHelperText,
  Box,
} from "@mui/material";

const MyForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const items = ["male", "female", "others"];

  return (
    <Box sx={{ mt: 4, maxWidth: 400, mx: "auto" }}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormControl fullWidth margin="normal">
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ""}
              />
            )}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ""}
              />
            )}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel id="gender-label">Gender</InputLabel>
          <Controller
            name="gender"
            control={control}
            defaultValue=""
            rules={{ required: "Gender is required" }}
            render={({ field }) => (
              <Select
                {...field}
                labelId="gender-label"
                label="Gender"
                error={!!errors.gender}
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                {items.map((item) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText error={!!errors.gender}>
            {errors.gender ? errors.gender.message : ""}
          </FormHelperText>
        </FormControl>

        <FormControl component="fieldset" margin="normal">
          <Controller
            name="subscription"
            control={control}
            defaultValue=""
            rules={{ required: "Subscription is required" }}
            render={({ field }) => (
              <RadioGroup {...field}>
                <FormControlLabel
                  value="free"
                  control={<Radio />}
                  label="Free"
                />
                <FormControlLabel
                  value="premium"
                  control={<Radio />}
                  label="Premium"
                />
              </RadioGroup>
            )}
          />
          <FormHelperText error={!!errors.subscription}>
            {errors.subscription ? errors.subscription.message : ""}
          </FormHelperText>
        </FormControl>

        <FormControl margin="normal">
          <Controller
            name="agree"
            control={control}
            defaultValue={false}
            rules={{ required: "You must agree to the terms" }}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label="I agree to the terms and conditions"
              />
            )}
          />
          <FormHelperText error={!!errors.agree}>
            {errors.agree ? errors.agree.message : ""}
          </FormHelperText>
        </FormControl>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default MyForm;
