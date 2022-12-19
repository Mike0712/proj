import React, { useState } from "react";
import { Form } from "components/UI/Form"
import { withTranslation } from "react-i18next"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { PrimaryButton } from "components/UI/PrimaryButton";
import { Input } from "components/UI/Input";
import { useForm } from "react-hook-form";
import { forgotThunk } from "store/reducers/userSlice";
import { Alert } from "reactstrap";

const fieldReq = '{{field}} is a required field';
const schema = yup.object().shape({
    email: yup
        .string()
        .email('{{field}} should have correct format')
        .required(fieldReq)
})


function Forgot({ t }) {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({});
    const [success, setSuccess] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: formData.email,
            password: formData.password
        },
        mode: "onBlur",
        resolver: yupResolver(schema)
    })

    const onSubmit = (data) => {
        setFormData(data);
        dispatch(forgotThunk(data.email))
            .then(({ payload }) => {
                if (payload.status === 'success') setSuccess(payload.message)
            });
    }

    return (<>
        {success ?
            <Alert color="success" style={{ marginTop: "13px" }}>{success}</Alert> :
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
                <div className="mt-3 d-grid">
                    <PrimaryButton type="submit">{t('Reset')}</PrimaryButton>
                </div>
            </Form>
        }
    </>)
}

export default withTranslation()(Forgot)