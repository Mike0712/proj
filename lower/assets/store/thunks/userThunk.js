import { createAsyncThunk } from "@reduxjs/toolkit";
import { useAxios } from "hooks/api";

export const authThunk = createAsyncThunk(
    'user/auth',
    async () => {
        const resp = await useAxios().get('/api/profile');

        return resp;
    }
)