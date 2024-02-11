import { useEffect, useState } from 'react';
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useStoryContext } from "../../contexts";
import { useParams } from 'react-router-dom';

export const EditStory = () => {
    const { getStory, isLoading, updateStory } = useStoryContext();
    const { id } = useParams();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    let [initialValues, setInitialValues] = useState({
        title: "",
        amountOfSentences: "",
        topic: ""
    });

    useEffect(() => {
        initForm();
    }, [])

    const initForm = async () => {
        const story = await getStory(id);
        setInitialValues(story);
    }

    const handleFormSubmit = async (values) => {
        const res = await updateStory(id, values);
        if (res) {
            // 
        }
    };

    return (
        <Box m="20px">
            <Header title="EDIT STORY" subtitle="Update Story" />

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
                            <Box height='73px' sx={{ gridColumn: "span 4" }}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    type="text"
                                    label="Title"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.title}
                                    name="title"
                                    error={!!touched.title && !!errors.title}
                                    helperText={touched.title && errors.title}
                                />
                            </Box>
                            <Box height='73px' sx={{ gridColumn: "span 2" }}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    type="number"
                                    InputProps={{ inputProps: { min: 1 } }}
                                    label="Amount of sentences"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.amountOfSentences}
                                    name="amountOfSentences"
                                    error={!!touched.amountOfSentences && !!errors.amountOfSentences}
                                    helperText={touched.amountOfSentences && errors.amountOfSentences}
                                />
                            </Box>
                            <Box height='73px' sx={{ gridColumn: "span 2" }}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    type="text"
                                    label="Topic"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.topic}
                                    name="topic"
                                    error={!!touched.topic && !!errors.topic}
                                    helperText={touched.topic && errors.topic}
                                />
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
    title: yup.string().required("Required field"),
    amountOfSentences: yup.number().min(1, "Value must be 1 or greater").required("Required field"),
    topic: yup.string()
});
