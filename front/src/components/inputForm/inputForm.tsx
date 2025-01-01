import { useState } from 'react';
import { Button, Grid2, TextField, Typography } from '@mui/material';
import { useAppDispatch } from '../../app/hooks.ts';
import { submitLink } from './linkThunk.ts';



const initialState = {
  originalUrl: ""
}

const InputForm = () => {
  const [formValue, setFormValue] = useState(initialState);
  const dispatch = useAppDispatch();

  const onSubmit = async (e:React.ChangeEvent<HTMLFormElement>)=>{
    e.preventDefault();

    await dispatch(submitLink(formValue))
    setFormValue(initialState);
  }
  const onChange = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
   const {name, value} = e.target
    setFormValue(prevState => ({...prevState, [name]: value}))
  }

  return (
    <Grid2 marginBottom={3} container onSubmit={onSubmit} component="form" flexDirection="column" alignItems="center" gap={3}>
      <Typography  variant="h3" component="h3" > Shorten your link!</Typography>
      <Grid2 width="60%">
        <TextField required value={formValue.originalUrl}  fullWidth onChange={onChange} id="originalUrl" name='originalUrl' label="URL" variant="filled" />
      </Grid2>
      <Grid2>
        <Button variant="outlined" type="submit">ShorTen</Button>
      </Grid2>
    </Grid2>
  );
};

export default InputForm;