import React from "react";
import { Controller } from "react-hook-form";
import MuiPhoneNumber from "material-ui-phone-number";
import { withTranslation } from "react-i18next";

const PhoneNumberField = ({ t, error, helperText, tReady, control, ...props }) => {
    return <Controller
        name={props.name}
        control={control}
        render={({ field: { name, onBlur, onChange, value } }) => {
            return (
                <MuiPhoneNumber
                    id={`pn-${name}`}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    {...props}
                    error={error}
                    helperText={error && t(helperText, { field: t(props.label) })}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                />
            )
        }}
    />
}

export const PhoneNumber = withTranslation('translation', { withRef: true })(PhoneNumberField)