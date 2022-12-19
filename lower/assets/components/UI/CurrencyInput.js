import React, { forwardRef } from "react";
import NumberFormat from "react-number-format";
import { Input } from "components/UI/Input";
import { Controller } from "react-hook-form";

const CurrencyFormat = forwardRef(function CurrencyFormat(props, ref) {
    const { onChange, prefix, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => onChange(parseFloat(values.value).toFixed(2))}
            prefix={prefix}
            thousandSeparator=" "
            isNumericString
        />
    )
});

export const CurrencyInput = ({ control, curSym, ...props }) => {

    return <Controller
        name={props.name}
        control={control}
        render={({ field: { name, onBlur, onChange, value, ref } }) =>
        (<Input
            id={`price_${props.name}`}
            {...props}
            register={{ name, onBlur, value, ref }}
            value={value}
            InputProps={{
                inputComponent: CurrencyFormat,
                inputProps: {
                    onChange,
                    prefix: curSym,
                    ref
                }
            }}
        />)}
    />
}