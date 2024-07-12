import { Avatar, Box, Container, Typography, Button, TextField, FormControlLabel, Checkbox, Grid, Link } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useSignInMutation } from "../state/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInStart, signInSuccess, signInFailure } from "../state/index";
import { useDispatch } from "react-redux";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Asterisko Coffee
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}



export default function SignIn() {
    const [signin, { isLoading, isError, isSuccess, error }] = useSignInMutation();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(signInStart());
        try {
            const response = await signin(formData).unwrap();
            console.log("User signed in successfully:", response);
            dispatch(signInSuccess(response));
            setFormData({
                email: "",
                password: "",
            }); // Reset the form fields
            navigate('/dashboard');
        } catch (err) {
            console.error("Failed to sign in:", err);
            dispatch(signInFailure(err));
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={isLoading} // Disable button while loading
                    >
                        Sign In
                    </Button>
                    {isSuccess && (
                        <Typography variant="body2" color="success.main">
                            User signed in successfully!
                        </Typography>
                    )}
                    {isError && (
                        <Typography variant="body2" color="error.main">
                            {error?.data?.message || "Failed to sign in"}
                        </Typography>
                    )}
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="sign-up" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}