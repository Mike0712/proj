import { createAsyncThunk } from "@reduxjs/toolkit";
import { useAxios } from "hooks/api";
import { AccountDebt } from "store/types/debtor";
import { Action, Args } from "store/types/common";

export const accountDebtThunk = createAsyncThunk(
  "account/debt",
  async ({ action, data }: Args<any>) => {
    let uri = "/api/account/debt";

    switch (action) {
      case Action.r:
        uri += `/${data.debtorId}`;
        return await useAxios().get<AccountDebt>(uri);
      case Action.c:
      case Action.u:
      case Action.d:
    }
  }
);

export const accountDebtsThunk = createAsyncThunk(
  "account/debts",
  async (_, thunkAPI) => {
    const resp = await useAxios().get<AccountDebt[]>("/api/account/debts");

    return resp;
  }
);
