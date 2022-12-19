import React from "react";
import { Controller } from "react-hook-form";
import { LocalizationProvider, DatePicker } from "@mui/lab"
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { ru, fr, de } from "date-fns/locale";
import { Input } from 'components/UI/Input'

const localeMap = { ru, fr, de }
const maskMap = {
    fr: '__/__/____',
    en: '__/__/____',
    ru: '__.__.____',
    de: '__.__.____',
}

export const DateInput = (props) => {
    const locale = 'ru';
    const { maxDate, control, ...elms } = props
    return <Controller
        name={elms.name}
        control={control}
        render={({ field: { name, onBlur, onChange, value } }) =>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={localeMap[locale]}>
                <DatePicker
                    mask={maskMap[locale]}
                    name={name}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    disabled={elms.disabled}
                    maxDate={maxDate}
                    renderInput={(params) => {
                        return <Input
                            id={`datetime-${name}`}
                            {...params}
                            {...elms}
                            register={{ name }}
                        />
                    }}
                />
            </LocalizationProvider>
        }
    />
}
