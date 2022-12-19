import { TextField } from "@mui/material";
import React from "react";
import { withTranslation } from "react-i18next";

const InputField = ({ t, tFields = {}, error, helperText, tReady, register, ...props }) => {

    return <TextField
        id={`formrow-${register.name}`}
        {...register}
        {...props}
        fullWidth
        error={error}
        helperText={error && t(helperText, { field: t(props.label), ...tFields })}
        variant="outlined"
        margin="normal"
    />
}

export const Input = withTranslation('translation', { withRef: true })(InputField)