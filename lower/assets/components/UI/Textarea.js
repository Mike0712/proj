import { TextareaAutosize } from "@mui/material";
import React from "react";


export const Textarea = ({ register, ...props }) => {
    return (<TextareaAutosize
        maxRows={4}
        {...register}
        // {...props}
    />)
}