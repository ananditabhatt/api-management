import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Aux from '../../../hoc/Aux';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 240,
    },
});

const Cards = (props) => {
    const classes = useStyles();
    let cards = (<Card className='.MuiPaper-rounded' style={{ maxWidth: "345", borderRadius: '4vh' }}>
        <CardActionArea>
            <CardMedia
                component="img"
                image={props.image}
                title={props.title} />
            <CardContent>
                <Typography gutterBottom variant="h6" component="h2">
                    {props.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {props.subvalue}
                </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions style={{borderTop : '1px solid #22526473'}}>
            <Button style={{margin: '0 auto'}} size="small" color="primary">
                {props.test?<a target="_blank" href={props.url} >Test your API</a>:<a href={props.url} >Learn More</a>}
            </Button>
        </CardActions>
    </Card>)
    return (
        <Aux>
            {props.red ? null : cards}
        </Aux>
    );
}

export default Cards;