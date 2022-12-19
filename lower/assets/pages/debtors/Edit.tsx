import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "components/common/Breadcrumbs";
import CardForm from "components/debtors/CardForm";
import { Preloader } from "components/features/Preloader";
import { useDispatch } from "react-redux";
import { accountDebtThunk } from "store/thunks/debtorThunk";
import { useParams } from "react-router-dom";
import { Action } from "store/types/common";
import { PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "store";

type EditParams = {
  id: string;
};

function Edit() {
  const { t } = useTranslation();
  const [preloader, setPreloader] = useState(true);
  const dispatch: AppDispatch = useDispatch();
  const params = useParams<EditParams>();
  const debtorId = params.id;
  useEffect(() => {
    if (debtorId) {
      dispatch(accountDebtThunk({ action: Action.r, data: { debtorId } })).then(
        (resp: PayloadAction<any>) => {
          setPreloader(false);
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div className="page-content">
      {preloader ? (
        <Preloader />
      ) : (
        <Container fluid>
          <Breadcrumbs title={t("Debtors")} breadcrumbItem={t("Edit debtor")} />
          <CardForm mode={Action.u} debtorId={params.id} />
        </Container>
      )}
    </div>
  );
}
export default Edit;
