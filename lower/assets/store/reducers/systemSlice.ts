import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const useFetching = () => {}
const checkSchemaThunk = createAsyncThunk(
    'auth/checkSchema',
    async (params: any) => {
        const resp = await useFetching();
        return resp;
    }
);

export const wsSlice = createSlice({
    name: 'system',
    initialState: {
        errors: null,
        formErrors: null,
        smsExpireTime: 0
    },
    reducers: {
        setErrors: (state, action) => {
            const { payload } = action;
            if (payload === 'clear') {
                state.errors = null;
                state.formErrors = null;
            }
            if (payload === 'clearErr') {
                state.errors = null;
            }
            if (payload === 'clearFormErr') {
                state.formErrors = null;
            }
            if (typeof payload === 'object') {
                if (payload.detail === 'IPT') {
                    state.formErrors = payload.message;
                } else {
                    state.errors = payload.message;
                }
            }
        },
        setSmsExpireTime: (state, action) => {
            state.smsExpireTime = action.payload;
        }
    },
    extraReducers: (builder) => {
        // builder.addCase(checkSchemaThunk.fulfilled, (state, action) => {
        //     if (action.payload.status === 'error') {
        //         state.formErrors = action.payload.message;
        //     } else {
        //         state.formErrors = null;
        //     }
        // });
    }
});

export { checkSchemaThunk };
export const { setErrors, setSmsExpireTime } = wsSlice.actions;
export default wsSlice.reducer;