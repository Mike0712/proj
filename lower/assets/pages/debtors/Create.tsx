import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Container } from "reactstrap";
import Breadcrumbs from "components/common/Breadcrumbs";
import CardForm from "components/debtors/CardForm";
import { useDispatch } from "react-redux";
import { clearForm } from "store/reducers/debtorSlice";
import { Preloader } from "components/features/Preloader";
import { Action } from "store/types/common";

function Create() {
  const { t } = useTranslation();
  const [preloader, setPreloader] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearForm());
    setPreloader(false);
  }, [dispatch]);

  return (
    <div className="page-content">
      {preloader ? (
        <Preloader />
      ) : (
        <Container fluid>
          <Breadcrumbs
            title={t("Debtors")}
            breadcrumbItem={t("Create a debtor")}
          />
          <CardForm mode={Action.c} />
        </Container>
      )}
    </div>
  );
}

export default Create;
