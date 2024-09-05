import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Skeleton from '@mui/material/Skeleton';
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { CardActions } from '@mui/material';
import MyButton from '../FORM-INPUTS/MyButton';


const CardSkeleton = () => {
  return (
    <Card sx={{ maxWidth: 345 }}>
    <CardHeader
      avatar={
        <Skeleton animation="wave" variant="circular" width={40} height={40} />
      }
      action={null}
      title={ <Skeleton
        animation="wave"
        height={10}
        width="80%"
        style={{ marginBottom: 6 }}
      />}
      subheader={<Skeleton animation="wave" height={10} width="40%" />}
    />
   <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
    <CardContent>
    <React.Fragment>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
    </CardContent>
    <CardActions sx={{display:"flex",justifyContent:"space-around"}}>
      <IconButton aria-label="add to favorites">
        <FavoriteIcon />
      </IconButton>
      <IconButton aria-label="share">
        <ShareIcon />
      </IconButton>
      <Skeleton animation="wave" height={10} width="10rem" />
    </CardActions>
  </Card>
  )
}

export default CardSkeleton