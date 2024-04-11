import { createSlice } from '@reduxjs/toolkit';

export interface InitialState {
  [key: string]: any;
}

const initialState: InitialState = {
  data: [],
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
  },
});

export const { setData } = commonSlice.actions;

export default commonSlice.reducer;
