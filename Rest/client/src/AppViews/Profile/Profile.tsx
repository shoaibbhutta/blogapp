import React, { useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { useStyles } from "./styles";
import { baseUrl } from "../../Context/BaseApi/server";
import { initialValues, validationSchema } from "./formInitials";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
// import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useFormik } from "formik";
export default function Profile() {
  const { user, updateUser } = useContext(AuthContext);

  const classes = useStyles();
  const [passwordType, setPasswordType] = useState("password");
  const [rePasswordType, setRePasswordType] = useState("password");
  const [profileImage, setProfileImage] = useState<File | null>(null);

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
  const handleProfileImageUplaod = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setProfileImage(e.target.files[0]);
    console.log(e.target.files);
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues(user),
      validationSchema,
      enableReinitialize: true,
      onSubmit: (values, { resetForm }) => {
        try {
          const data = new FormData();
          Object.keys(values).map((key) => data.append(key, values[key]));
          if (profileImage) {
            data.append("image", profileImage);
          }
          updateUser(data);
        } catch (e) {
          console.log(e);
        }
      },
    });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          type="file"
          name="image"
          onChange={handleProfileImageUplaod}
        />
        <label htmlFor="contained-button-file">
          <Avatar
            className={classes.avatar}
            src={
              user && user.profileImageUrl && !profileImage
                ? baseUrl + user.profileImageUrl
                : profileImage && URL.createObjectURL(profileImage)
            }
          />
          {/* profileImage && user ? URL.createObjectURL(profileImage) : baseUrl +
          user.profileImageUrl && user ? user.profileImageUrl : "/df" */}
          {profileImage ? (
            <Button
              onClick={() => setProfileImage(null)}
              // className={classes.close}
              variant="outlined"
              color="secondary"
            >
              Cancel
            </Button>
          ) : (
            ""
          )}
        </label>
        <Typography component="h1" variant="h5">
          {user && user.firstName + " " + user && user.lastName}
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
            disabled
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
            Update Profile
          </Button>
        </form>
      </div>
    </Container>
  );
}
