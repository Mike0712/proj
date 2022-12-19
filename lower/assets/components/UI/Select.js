import React from "react";
import { Autocomplete } from "@mui/material";
import { Controller } from "react-hook-form";
import { Input } from 'components/UI/Input'
export const Select = ({ control, options = [], ikey = null, ...props }) => {
    return <Controller
        name={props.name}
        control={control}
        render={({ field: { name, onBlur, onChange, value } }) => {
            const indexName = ikey || name;
            const val = options.find(item => item[indexName] === value);
            return <Autocomplete
                value={val || null}
                options={options}
                disablePortal
                disabled={props.disabled}
                onChange={(event, val) => {
                    return onChange(val && val[indexName])
                }}
                name={name}
                renderInput={(params) => <Input register={{ name, onBlur, value }}
                    {...params} {...props} />}
            />
        }}
    />
}
