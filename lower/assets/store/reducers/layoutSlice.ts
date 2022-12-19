import { createSlice } from '@reduxjs/toolkit';

export const layoutSlice = createSlice({
    name: 'layout',
    initialState: {
        topbarTheme: 'dark',
        layoutWith: 'fluid',
        leftSidebarType: 'default',
        leftSidebarColor: 'greatwhale',
        preloader: false
    },
    reducers: {
        setTopbarTheme: (state, action) => {
            state.topbarTheme = action.payload;
        },
        setPreloader: (state, action) => {
            state.preloader = action.payload;
        }
    }
});
export const { setTopbarTheme, setPreloader } = layoutSlice.actions;
export default layoutSlice.reducer;