import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";

export const Login = () => {

    document.title = 'Login';

    const { user, login } = useAuthContext();

    if (user) {
        return <Navigate to='/' />;
    }

    const handleFormSubmit = (values) => {
        login(values);
    };

    return (
        <Box bgcolor='#121212' display='flex' justifyContent='center' alignItems='center' minWidth='100%' minHeight='100vh'>

            <Box bgcolor='#213e78' width='350px' padding='20px 50px 50px 50px' borderRadius='4px'>
                <h2>Login</h2>
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={checkoutSchema}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <Box
                                display="grid"
                                gap="20px"
                            >
                                <Box height='73px'>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        label="Email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.email}
                                        name="email"
                                        error={!!touched.email && !!errors.email}
                                        helperText={touched.email && errors.email}
                                        sx={{ gridColumn: "span 4" }}
                                    />
                                </Box>
                                <Box height='73px'>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="password"
                                        label="Password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.password}
                                        name="password"
                                        error={!!touched.password && !!errors.password}
                                        helperText={touched.password && errors.password}
                                        sx={{ gridColumn: "span 4" }}
                                    />
                                </Box>
                            </Box>
                            <Box display="flex" justifyContent="center" mt="20px">
                                <Button type="submit" variant="contained">
                                    Login
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </Box>
    );
};

const checkoutSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Required field"),
    password: yup.string().required("Required field"),
});
const initialValues = {
    email: "",
    password: ""
};
