import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import axios from 'axios';

const Item = ({ item }) => {
  const { id, name, category, width, height, length, price } = item;
  const [update, setUpdate] = React.useState(false);

  React.useEffect(() => {}, [update]);

  const deleteItem = async (id) => {
    await axios.delete(`/item/delete/${id}`);
    window.location.reload(false);
  };

  const card = (
    <React.Fragment>
      <CardContent>
        <Typography variant='h5' component='div'>
          {name}
        </Typography>
        <br />
        <Typography variant='body2'>
          Category: {category}
          <br />
          Width: {width}
          <br />
          height: {height}
          <br />
          Length: {length}
          <br />
          Price: {price}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container>
          <Grid item xs={6}>
            {' '}
            <Button size='small' color='primary' variant='contained'>
              Update
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              size='small'
              color='error'
              variant='outlined'
              onClick={() => {
                deleteItem(id);
              }}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </React.Fragment>
  );

  return (
    <Box sx={{ minWidth: 275, margin: 1 }}>
      <Card variant='outlined'>{card}</Card>
    </Box>
  );
};

export default Item;
