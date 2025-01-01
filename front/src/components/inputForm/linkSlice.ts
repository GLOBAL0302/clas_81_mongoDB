import { ILink } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { submitLink } from './linkThunk.ts';

interface LinkSlice {
  oneLink:ILink | null
  fetchLoading:boolean
}

const initialState:LinkSlice={
  oneLink:null,
  fetchLoading:false
}

const linkSlice = createSlice({
  name: 'link',
  initialState,
  reducers:{
    setNewLink:(state, {payload})=>{
      state.oneLink=payload;
    }

  },
  extraReducers:(builder)=>{
    builder
      .addCase(submitLink.pending, state => {
        state.fetchLoading =true
      })
      .addCase(submitLink.fulfilled, (state) => {
        state.fetchLoading = false
      })
      .addCase(submitLink.rejected, state => {
        state.fetchLoading = false
      })
  },
  selectors:{
    selectOneLink:(state => state.oneLink)
  }
});

export const linkReducer = linkSlice.reducer;
export const {setNewLink} = linkSlice.actions;
export const {selectOneLink}  =linkSlice.selectors;