import { createSlice } from '@reduxjs/toolkit';

export interface InitialState {
  [key: string]: any;
}

const initialState: InitialState = {
  data: [],
  menuTab: [],
  dictionary: []
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
    setDict: (state, action) => {
      state.dictionary = action.payload;
    },
  },
});

export const { setData, setMenuTab, setDict } = commonSlice.actions;

export default commonSlice.reducer;
