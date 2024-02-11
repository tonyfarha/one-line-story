import { Box, Typography } from "@mui/material";

export const NotFound = () => {
    document.title = 'Not found';
    return (
        <Box display="flex" height={'100%'} justifyContent="center" alignItems="center">
            <Typography
                variant="h1"
            >
                404
            </Typography>
        </Box>
    )
}
