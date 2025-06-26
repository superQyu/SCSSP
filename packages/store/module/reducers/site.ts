import { createSlice } from '@reduxjs/toolkit';

export interface SiteInitialState {
  siteInfor: object;
  [key: string]: any;
}
// 默认状态
const initialState: SiteInitialState = {
  siteInfor: {},
  websocket: {
    person: 0,
    car: 0,
    material: 0,
  },
  noticeCount: 0
};

export const siteSlice: any = createSlice({
  name: 'site',
  initialState: initialState,
  reducers: {
    setSiteInfor: (state, action) => {
      state.siteInfor = action.payload;
    },
    setWebsocket: (state, action) => {
      state.websocket = action.payload;
    },
    setNoticeCount: (state, action) => {
      state.noticeCount = action.payload;
    },
  },
});

export const { setSiteInfor, setWebsocket,setNoticeCount } = siteSlice.actions;

export default siteSlice.reducer;
