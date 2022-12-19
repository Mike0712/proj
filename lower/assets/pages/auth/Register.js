import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { withTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { registerThunk } from "store/reducers/userSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form } from "components/UI/Form";
import { Input } from "components/UI/Input";
import { PrimaryButton } from "components/UI/PrimaryButton";
import { Link } from "react-router-dom";


const fieldReq = '{{field}} is a required field';
const schema = yup.object().shape({
    name: yup
        .string()
        .required(fieldReq),
    email: yup
        .string()
        .email('{{field}} should have correct format')
        .required(fieldReq),
    password: yup
        .string()
        .min(6, 'A {{field}} must be at least {{digit}} characters')
        .required(fieldReq),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords does not match'),
})

function Register({ t }) {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({});

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
        const { name, email, password } = data;
        dispatch(registerThunk({ email, login: name, password }));
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
                        register={register('name')}
                        label={t('Username')}
                        placeholder={t('Enter name')}
                        required
                        error={!!errors.name}
                        helperText={errors?.name?.message}
                    />
                </div>
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
                    <PrimaryButton type="submit">{t('Register')}</PrimaryButton>
                </div>
                <div className="mt-4 text-center"><p>{t('Already have an account')}?
                    <Link className="text-muted" to="/login">
                        <i className="mdi mdi-lock me-1"></i>{t('Login')}?
                    </Link>
                </p>
                </div>
            </Form>
        </>
    )
}

export default withTranslation()(Register)