import { createSlice } from "@reduxjs/toolkit";
import { accountDebtThunk } from "store/thunks/debtorThunk";

interface Debtor {
  firstName: string;
  lastName: string;
  additionalName: string;
  phoneNumber: string;
  email: string;
}

interface Document {
  docName: string;
  docDate: string | null;
  company: string;
  currencyId: string;
  amount: string;
  deadline: string | null;
  files?: string[];
}

interface FormData {
  debtor: Debtor;
  document: Document;
}

const initFormData = { debtor: {}, document: {} } as FormData;
export const debtorSlice = createSlice({
  name: "debtor",
  initialState: {
    list: null,
    debtor: null,
    formData: initFormData,
  },
  reducers: {
    setValues(state, action) {
      //   const { sch, data } = action.payload;
      // state.formData[sch] = data;
    },
    clearForm(state) {
      state.formData = { ...initFormData };
    },
  },
  extraReducers: {
    [accountDebtThunk.fulfilled.type]: (state, { payload }) => {
      if (payload) {
        const { data } = payload;
        if (data) {
          state.formData.document = data;
        }
      }
    },
  },
});

export const { setValues, clearForm } = debtorSlice.actions;
export default debtorSlice.reducer;
