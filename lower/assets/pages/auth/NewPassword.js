import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Form } from "components/UI/Form";
import { Link, useLocation } from "react-router-dom";
import { Input } from "components/UI/Input";
import { withTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PrimaryButton } from "components/UI/PrimaryButton";
import { Alert } from "reactstrap";
import { newPswdThunk, checkResetTokenThunk } from "store/reducers/userSlice";


const fieldReq = '{{field}} is a required field';
const schema = yup.object().shape({
    password: yup
        .string()
        .min(6, 'A {{field}} must be at least {{digit}} characters')
        .required(fieldReq),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords does not match'),
})

function NewPassword({ t }) {
    const dispatch = useDispatch();
    const location = useLocation();
    const [formData, setFormData] = useState({});
    const [token, setToken] = useState();
    const [success, setSuccess] = useState();


    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');
        dispatch(checkResetTokenThunk(token))
            .then(({ payload }) => {
                if (payload.status === 'success') {
                    setToken(token);
                }
                if (payload.status === 'error') {
                    setToken(false);
                }
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
        },
        mode: "onBlur",
        resolver: yupResolver(schema)
    })

    const onSubmit = (data) => {
        setFormData(data);
        dispatch(newPswdThunk({ token, password: data.password }))
            .then(({ payload }) => {
                if (payload.status === 'success') {
                    setSuccess(true)
                }
            });
    }

    return (
        false === token ?
            <Alert color="danger">
                {t('This link is wrong')}
            </Alert>
            :
            success ?
                <Alert color="success">
                    Password changed successfully. Just <Link to="/login">signin</Link> with new password
                </Alert> :
                <Form className="form-horizontal" onSubmit={handleSubmit(onSubmit)} >
                    <div className="mb-3">
                        <Input
                            register={register('password')}
                            type="password"
                            label={t('Password')}
                            placeholder={t('Enter password')}
                            tFields={{ digit: 6 }}
                            required
                            error={!!errors.password}
                            helperText={errors?.password?.message}
                        />
                    </div>
                    <div className="mb-3">
                        <Input
                            register={register('confirmPassword')}
                            type="password"
                            label={t('Confirm password')}
                            placeholder={t('Confirm password')}
                            error={!!errors.confirmPassword}
                            helperText={errors?.confirmPassword?.message}
                        />
                    </div>
                    <div className="mt-3 d-grid">
                        <PrimaryButton type="submit">{t('Set new password')}</PrimaryButton>
                    </div>
                </Form >
    )
}

export default withTranslation()(NewPassword)