import './App.css';
import {Grid2, Typography } from '@mui/material';
import InputForm from './components/inputForm/inputForm.tsx';
import { useAppDispatch, useAppSelector } from './app/hooks.ts';
import { selectOneLink } from './components/inputForm/linkSlice.ts';
import { redirect } from './components/inputForm/linkThunk.ts';

const App = () => {
  const dispatch = useAppDispatch();
  const oneLink = useAppSelector(selectOneLink);
  const onCLickLink = ()=>{
    if(oneLink){
      dispatch(redirect(oneLink));
    }
  }

  return (
    <Grid2>
      <InputForm />
      <Grid2 container flexDirection="column" alignItems="center">
        <Typography  variant="h5" component="h5">Your Link is Below</Typography>
        {oneLink &&
          <Typography
            onClick = {onCLickLink}
            sx={{
            textDecoration:"underline",
            color:"blue"
          }}  variant="body1" component="p">http://localhost:8000/{oneLink.shortUrl}</Typography>
        }
      </Grid2>
    </Grid2>
  );
};

export default App;
