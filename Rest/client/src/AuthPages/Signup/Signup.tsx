import React, { useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { AlertContext } from "../../Context/AlertContext/AlertContext";
import { signupApi } from "../../Context/AuthContext/Api";
import { useStyles } from "../styles";
import { initialValues, validationSchema } from "./formInitials";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useFormik } from "formik";
const SignUp = (): JSX.Element => {
  const { setLoading } = useContext(AuthContext);
  const { showServerError, showSignupError } = useContext(AlertContext);
  const classes = useStyles();
  const [passwordType, setPasswordType] = useState("password");
  const [rePasswordType, setRePasswordType] = useState("password");

  const handleClickShowPassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  const handleClickShowRetypePassword = () => {
    if (rePasswordType === "password") {
      setRePasswordType("text");
    } else {
      setRePasswordType("password");
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema,
      onSubmit: (values, { resetForm }) => {
        try {
          setLoading(true);

          signupApi({
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            date_of_birth: new Date(values.date_of_birth),
            roleId: 1,
          });
          setLoading(false);
        } catch (e) {
          setLoading(false);

          if (e.response && e.response.status === 400) {
            showSignupError();
          } else {
            showServerError();
          }
        }
      },
    });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Box className={classes.row}>
            <Box width="50%">
              <TextField
                error={errors.firstName && touched.firstName ? true : false}
                onBlur={handleBlur}
                helperText={
                  errors.firstName && touched.firstName ? errors.firstName : ""
                }
                value={values.firstName}
                onChange={handleChange}
                name="firstName"
                variant="outlined"
                margin="normal"
                fullWidth
                id="firstName"
                label="First Name"
                autoComplete="firstName"
                autoFocus
              />
            </Box>
            <Box width="50%" ml={2}>
              <TextField
                error={errors.lastName && touched.lastName ? true : false}
                onBlur={handleBlur}
                helperText={
                  errors.lastName && touched.lastName ? errors.lastName : ""
                }
                value={values.lastName}
                onChange={handleChange}
                name="lastName"
                variant="outlined"
                margin="normal"
                fullWidth
                id="lastName"
                label="Last Name"
                autoComplete="lastName"
                autoFocus
              />
            </Box>
          </Box>

          <TextField
            error={errors.email && touched.email ? true : false}
            onBlur={handleBlur}
            helperText={errors.email && touched.email ? errors.email : ""}
            value={values.email}
            onChange={handleChange}
            name="email"
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
          />
          <TextField
            name="date_of_birth"
            id="date"
            error={errors.date_of_birth && touched.date_of_birth ? true : false}
            onBlur={handleBlur}
            helperText={
              errors.date_of_birth && touched.date_of_birth
                ? errors.date_of_birth
                : ""
            }
            value={values.date_of_birth}
            onChange={handleChange}
            label="Birthday"
            variant="outlined"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          <TextField
            error={errors.password && touched.password ? true : false}
            onBlur={handleBlur}
            helperText={
              errors.password && touched.password ? errors.password : ""
            }
            value={values.password}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={passwordType}
            id="password"
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
                    {passwordType === "password" ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            variant="outlined"
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.Repassword && touched.Repassword ? true : false}
            value={values.Repassword}
            helperText={
              errors.Repassword && touched.Repassword ? errors.Repassword : ""
            }
            label="Confirm Password"
            name="Repassword"
            fullWidth
            type={rePasswordType}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowRetypePassword}>
                    {rePasswordType === "password" ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignUp;
