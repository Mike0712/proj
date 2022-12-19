import { forwardRef } from "react"
import NumberFormat from "react-number-format";
import { Controller } from "react-hook-form"
import { Input } from "./Input"

const NumFormat = forwardRef(function NumFormat(props, ref) {
    const { onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => onChange(values.value)}
            isNumericString
        />
    )
});


export const NumberInput = ({ control, ...props }) => {
    return <Controller
        name={props.name}
        control={control}
        render={({ field: { name, onBlur, onChange, value, ref } }) =>
            <Input
                id={`number_${props.name}`}
                {...props}
                register={{name, onBlur, value, ref}}
                InputProps={{
                    inputComponent: NumFormat,
                    inputProps: {
                        onChange,
                        ref,
                        ...props.inputProps
                    }
                }}
            />}
    />
}