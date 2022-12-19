import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { Form } from "components/UI/Form";
import { Input } from "components/UI/Input";
import { PrimaryButton } from "components/UI/PrimaryButton";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signInThunk } from 'store/reducers/userSlice';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const fieldReq = '{{field}} is a required field';
const schema = yup.object().shape({
    email: yup
        .string()
        .email('{{field}} should have correct format')
        .required(fieldReq),
    password: yup
        .string()
        .required(fieldReq)
})


function Login({ t }) {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({})

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: formData.email,
            password: formData.password
        },
        mode: "onBlur",
        resolver: yupResolver(schema)
    })

    const onSubmit = (data) => {
        toast.error('2345243523454', {
            theme: 'colored',
            autoClose: 10000,
        })
        setFormData(data);
        dispatch(signInThunk(data));
    }


    return (
        <>
            <Form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <Input
                        register={register('email')}
                        type="email"
                        label="email"
                        placeholder={t('Enter email')}
                        required
                        error={!!errors.email}
                        helperText={errors?.email?.message}
                    />
                </div>
                <div className="mb-3">
                    <Input
                        register={register('password')}
                        type="password"
                        label="Password"
                        required
                        error={!!errors.password}
                        helperText={errors?.password?.message}
                    />
                </div>
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="customControlInline"
                    />
                    <label
                        className="form-check-label"
                        htmlFor="customControlInline"
                    >
                        {t('Remember me')}
                    </label>
                </div>
                <div className="mt-3 d-grid">
                    <PrimaryButton type="submit">{t('Log In')}</PrimaryButton>
                </div>
                <div className="mt-4 text-center">
                    <Link className="text-muted" to="/forgot-password">
                        <i className="mdi mdi-lock me-1"></i>{t('Forgot your password')}?
                    </Link>
                </div>
            </Form>
            <div className="mt-5 text-center">
                <p>
                    {t('Don\'t have an account')}?
                    <Link to="/register" className="fw-medium text-primary">
                        {t('Signup Now')}
                    </Link>{" "}
                </p>
            </div>
        </>
    )
}

export default withTranslation()(Login)