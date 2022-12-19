import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "components/common/Breadcrumbs";
import CardForm from "components/debtors/CardForm";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { accountDebtThunk } from "store/thunks/debtorThunk";
import { Preloader } from "components/features/Preloader";
import { AppDispatch } from "store";
import { Action } from "store/types/common";
import { PayloadAction } from "@reduxjs/toolkit";

type DebtorParams = {
  id: string;
};

function Debtor() {
  const { t } = useTranslation();
  const [preloader, setPreloader] = useState(true);
  const dispatch: AppDispatch = useDispatch();
  const params = useParams<DebtorParams>();
  const debtorId = params.id;
  useEffect(() => {
    if (debtorId) {
      dispatch(accountDebtThunk({ action: Action.r, data: { debtorId } })).then(
        ({ payload }: PayloadAction<any>) => {
          if (payload) {
            setPreloader(false);
          }
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
          <Breadcrumbs
            title={t("Debtors")}
            breadcrumbItem={t("Debtor's card")}
          />
          <CardForm mode={Action.r} debtorId={debtorId} />
        </Container>
      )}
    </div>
  );
}

export default Debtor;
