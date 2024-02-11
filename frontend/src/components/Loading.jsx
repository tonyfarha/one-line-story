import { Box, CircularProgress, LinearProgress } from '@mui/material';

export const LoadingSpinner = () => {
    return (
        <Box bgcolor='#121212' width='100%' height='100vh' display='flex' justifyContent='center' alignItems='center'>
            <CircularProgress style={{ 'color': '#6870fa' }} size='80px' />
        </Box>
    )
}

export const LinearIndeterminate = () => {
    return (
        <Box position={'fixed'} zIndex={1} sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>
    );
}
