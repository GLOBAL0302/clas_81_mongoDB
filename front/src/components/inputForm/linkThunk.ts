import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../../axiosApi.ts';
import { ILink, ILinkWithOutShortUrl } from '../../types';
import { setNewLink } from './linkSlice.ts';

export const submitLink = createAsyncThunk<void,ILinkWithOutShortUrl>(
  "link/submitThunk",
  async (item, thunkAPI) =>{
    const {data} =  await axiosApi.post<ILink | null>("/links", item);
   if(data){
     const newItem = {
       shortUrl: data.shortUrl,
       originalUrl : data.originalUrl
     }
     thunkAPI.dispatch(setNewLink(newItem));
   }
  }
);

export const redirect = createAsyncThunk<void, ILink>(
  "link/redirectThunk",
  async (item)=>{
    await axiosApi.get(`/links/${item.shortUrl}`);
  }
)