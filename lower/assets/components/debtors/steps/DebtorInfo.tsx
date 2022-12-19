import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'components/UI/Form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
    Col,
    Row,
} from "reactstrap";
import { useForm } from 'react-hook-form';
import { Input } from 'components/UI/Input';
import { PhoneNumber } from 'components/UI/PhoneNumber';
import { PrimaryButton } from 'components/UI/PrimaryButton';
import { setValues } from 'store/reducers/debtorSlice';
import { Box } from '@mui/system';
import { RootState, AppDispatch } from 'store'


const fieldReq = '{{field}} is a required field';
const schema = yup.object().shape({
    firstName: yup
        .string()
        .required(fieldReq),
    lastName: yup
        .string()
        .required(fieldReq),
    additionalName: yup
        .string(),
    phoneNumber: yup
        .string()
        .test('phoneNumber', '{{field}} is not valid', value => {
            if (!value) return true;
            value = value.replace(/\D/g, '');
            return value.length >= 11
        })
        .required(fieldReq)
});

interface DebtorInfoProps {
    t: any,
    mode: string,
    next: Function
}

function DebtorInfo({ t, mode, next }: DebtorInfoProps) {
    const dispatch = useDispatch<AppDispatch>();
    const formData = useSelector((state: RootState) => state.debtor.formData.debtor);
    const { register, handleSubmit, formState: { errors }, control } = useForm({
        defaultValues: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            additionalName: formData.additionalName,
            phoneNumber: formData.phoneNumber
        },
        mode: "onBlur",
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: any) => {
        data.phoneNumber = data.phoneNumber.replace(/\D/g, '')
        dispatch(setValues({ sch: 'debtor', data }));
        next();
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col lg="6">
                    <Input
                        register={register('firstName')}
                        label={t('First name')}
                        placeholder={t('Enter first name')}
                        required
                        disabled={mode === 'card'}
                        error={!!errors.firstName}
                        helperText={errors?.firstName?.message}
                    />
                </Col>
                <Col lg="6">
                    <Input
                        register={register('lastName')}
                        label={t('Last name')}
                        placeholder={t('Enter last name')}
                        required
                        disabled={mode === 'card'}
                        error={!!errors.lastName}
                        helperText={errors?.lastName?.message}
                    />
                </Col>
            </Row>
            {localStorage.getItem('I18N_LANGUAGE') === 'ru' ? <Row>
                <Col lg="6">
                    <Input
                        register={register('additionalName')}
                        label="Отчество"
                        placeholder="Введите отчество"
                        error={!!errors.additionalName}
                        disabled={mode === 'card'}
                        helperText={errors?.additionalName?.message}
                    />
                </Col>
            </Row> : null}
            <Row>
                <Col lg="6">
                    <PhoneNumber
                        control={control}
                        name="phoneNumber"
                        required
                        defaultCountry="ru"
                        disabled={mode === 'card'}
                        label={t('Phone number')}
                        error={!!errors.phoneNumber}
                        helperText={errors?.phoneNumber?.message}
                    />
                </Col>
            </Row>
            <Box sx={{ marginTop: '20px', textAlign: 'right' }}>
                <PrimaryButton type="submit">{t('Next')}</PrimaryButton>
            </Box>
        </Form>
    )
}

export default DebtorInfo