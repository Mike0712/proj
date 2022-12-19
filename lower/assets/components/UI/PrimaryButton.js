import { Button } from "@mui/material";
import React from "react";

export const PrimaryButton = ((props) => {
    const { children } = props;
    return (
        <Button
            sx={{
                marginLeft: '1em'
            }}
            variant="contained"
            color="primary"
            {...props}
        >
            {children}
        </Button>
    );
})