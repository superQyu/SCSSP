import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  menuTab: [],
};
/**
 * @description commonSlice
 */
export const commonSlice: any = createSlice({
  name: 'common',
  initialState: initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setMenuTab: (state, action) => {
      state.menuTab = action.payload;
    },
  },
});

export const { setData, setMenuTab } = commonSlice.actions;

export default commonSlice.reducer;
