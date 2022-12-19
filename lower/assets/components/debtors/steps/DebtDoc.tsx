import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "components/UI/Form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CurrencyInput } from "components/UI/CurrencyInput";
import { FileUpload } from "components/UI/FileUpload";
import { useForm } from "react-hook-form";
import { Input } from "components/UI/Input";
import { Box } from "@mui/system";
import { PrimaryButton } from "components/UI/PrimaryButton";
import { setValues } from "store/reducers/debtorSlice";
import { setErrors } from "store/reducers/systemSlice";
import { accountDebtThunk } from "store/thunks/debtorThunk";
import { Select } from "components/UI/Select";
import { Col, Row, CardTitle } from "reactstrap";
import { DateInput } from "components/UI/DateInput";
import { Action } from "store/types/common";
import { AppDispatch, RootState } from "store";

const fieldReq = "{{field}} is a required field";
const schema = yup.object().shape({
  docName: yup.string().required(fieldReq),
  docDate: yup.string().required(fieldReq),
  company: yup.string().required(fieldReq),
  currencyId: yup.number().required(fieldReq).positive().integer(),
  amount: yup
    .number()
    .typeError("{{field}} must be a number")
    .required(fieldReq),
  deadline: yup.string().required(fieldReq),
});
const dtMaxDate = new Date();

interface DebtDocProps {
  t: any;
  mode: Action;
  next: Function;
  prev: Function;
}

export function DebtDoc({ t, mode, next, prev }: DebtDocProps) {
  const dispatch = useDispatch<AppDispatch>();
  const formData = useSelector(
    (state: RootState) => state.debtor.formData.document
  );
  const userData = useSelector((state: RootState) => state.user.userData);
  const currencies = useSelector((state: RootState) => state.dicts.currencies);
  const [savedFiles, setSavedFiles] = useState<string[]>([]);
  const [curSym] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      docName: formData.docName,
      docDate: formData.docDate || "",
      company: formData.company,
      currencyId: formData.currencyId,
      amount: formData.amount,
      deadline: formData.deadline || "",
      files: formData.files,
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (currencies.length === 0) {
      dispatch(accountDebtThunk({ action: Action.all }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (formData && formData.files && mode !== Action.c) {
      setSavedFiles(formData.files);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const hasCurrency = watch("currencyId");

  const onSubmit = async (data: any) => {
    if (data.files.length === 0 && savedFiles.length === 0) {
      dispatch(setErrors({ message: t("Files to upload not found") }));
    } else {
      let filesSaveResp;
      if (data.files.length) {
        const fd: any = new FormData();
        for (const file of data.files) {
          fd.append(file.path, file);
        }
        fd.append("userId", userData.id);
        filesSaveResp = await fetch(process.env.REACT_APP_UPLOAD_URL, {
          method: "POST",
          body: fd,
        }).then((resp) => resp.json());
      }
      if (filesSaveResp) {
        const saved = [...savedFiles];
        for (const file of filesSaveResp) {
          if (file.hasOwnProperty("succesful")) {
            saved.push(file.succesful);
          }
        }
        setSavedFiles(saved);
      }
      const { files, ...dt } = data;
      dt.filePaths = savedFiles;
      dispatch(setValues({ sch: "document", data: dt }));
      setValue("files", []);

      if (mode) {
        const debpSaveRes: any = await dispatch(accountDebtThunk({ action: mode }));
        if (!debpSaveRes.error) {
          const { debtDocumentId, debtorId } = debpSaveRes.payload;
          const newData = { ...dt };
          newData["debtorId"] = debtorId;
          newData["debtDocumentId"] = debtDocumentId;
          dispatch(setValues({ sch: "document", data: newData }));
          next();
        }
      }
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col lg="6">
            <Input
              register={register("docName")}
              label={t("Document's name")}
              placeholder={t("Enter document's name")}
              required
              disabled={mode === Action.r}
              error={!!errors.docName}
              helperText={errors?.docName?.message}
            />
          </Col>
          <Col lg="6">
            <DateInput
              control={control}
              label={t("Document's date")}
              name="docDate"
              maxDate={dtMaxDate}
              required
              disabled={mode === Action.r}
              error={!!errors.docDate}
              helperText={errors?.docDate?.message}
            />
          </Col>
        </Row>
        <Row>
          <Col lg="6">
            <Input
              register={register("company")}
              label={t("Creditor's name (company name)")}
              placeholder={t("Enter name")}
              required
              disabled={mode === Action.r}
              error={!!errors.company}
              helperText={errors?.company?.message}
            />
          </Col>
        </Row>
        <Row>
          <Col lg="6">
            <Select
              name="currencyId"
              control={control}
              label={t("Currency")}
              disabled={mode === Action.r}
              required
              options={currencies}
              error={!!errors.currencyId}
              helperText={errors?.currencyId?.message}
            />
          </Col>
          <Col lg="6">
            {hasCurrency ? (
              <CurrencyInput
                name="amount"
                control={control}
                curSym={curSym}
                label={t("Amount")}
                disabled={mode === Action.r}
                error={!!errors.amount}
                helperText={errors?.amount?.message}
              />
            ) : null}
          </Col>
          <Col lg="6">
            <div className="mb-3">
              <DateInput
                control={control}
                label={t("Deadline")}
                name="deadline"
                maxDate={dtMaxDate}
                required
                disabled={mode === Action.r}
                error={!!errors.deadline}
                helperText={errors?.deadline?.message}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <CardTitle className="h4">{t("Upload document")} *</CardTitle>
          <p className="card-title-desc"> </p>
          <FileUpload t={t} name="files" control={control} saved={savedFiles} />
        </Row>
        <Box sx={{ marginTop: "20px", textAlign: "right" }}>
          <PrimaryButton type="button" onClick={prev}>
            {t("Previous")}
          </PrimaryButton>
          <PrimaryButton type="submit">{t("Next")}</PrimaryButton>
        </Box>
      </Form>
    </>
  );
}
