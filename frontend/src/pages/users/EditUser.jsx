import { useEffect, useState } from 'react';
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useUserContext } from "../../contexts";
import { useParams } from 'react-router-dom';

export const EditUser = () => {
    const { getUser, isLoading, updateUser } = useUserContext();
    const { id } = useParams()
    const isNonMobile = useMediaQuery("(min-width:600px)");
    let [initialValues, setInitialValues] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        role: ""
    });
    
    useEffect(() => {
        initForm();
    }, [])

    const initForm = async () => {
        const user = await getUser(id);
        setInitialValues( { ...user, password: '' });
    }

    const handleFormSubmit = async (values) => {
        const res = await updateUser(id, values);
        if(res) {
            // 
        }
    };

    return (
        <Box m="20px">
            <Header title="EDIT USER" subtitle="Update User" />

            <Formik
                enableReinitialize
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
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                            }}
                        >
                            <Box height='73px' sx={{ gridColumn: "span 2" }}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    type="text"
                                    label="First Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstname}
                                    name="firstname"
                                    error={!!touched.firstname && !!errors.firstname}
                                    helperText={touched.firstname && errors.firstname}
                                />
                            </Box>
                            <Box height='73px' sx={{ gridColumn: "span 2" }}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    type="text"
                                    label="Last Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastname}
                                    name="lastname"
                                    error={!!touched.lastname && !!errors.lastname}
                                    helperText={touched.lastname && errors.lastname}
                                />
                            </Box>
                            <Box height='73px' sx={{ gridColumn: "span 2" }}>
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
                                />
                            </Box>
                            <Box height='73px' sx={{ gridColumn: "span 2" }}>
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
                                    helperText='Leave the current password field blank to keep your existing password unchanged'
                                />
                            </Box>
                            <Box height='73px' sx={{ gridColumn: "span 2" }}>
                                <FormControl fullWidth>
                                    <InputLabel>Role</InputLabel>
                                    <Select
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.role}
                                        label="Role"
                                        name="role"
                                        error={!!touched.role && !!errors.role}
                                    >
                                        <MenuItem selected value='user'>User</MenuItem>
                                        <MenuItem value='admin'>Admin</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button disabled={isLoading} type="submit" color="primary" variant="contained">
                                Save changes
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

const checkoutSchema = yup.object().shape({
    firstname: yup.string().required("Required field"),
    lastname: yup.string().required("Required field"),
    email: yup.string().email("Invalid email").required("Required field"),
    password: yup.string(),
    role: yup.string().required("Required field"),
});
