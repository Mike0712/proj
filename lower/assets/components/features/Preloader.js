import React from 'react';
import { CircularProgress, Box } from '@mui/material';


export const Preloader = () => {
    return <Box sx={{
        width: '100%',
        height: '100%',
        textAlign: 'center',
        '&:hover': {
            backgroundColor: 'primary.main',
            opacity: [0.9, 0.8, 0.7],
        },
    }}>
        <CircularProgress disableShrink />
    </Box>
}