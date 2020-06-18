import React from 'react';
import classes from './VideosPanel';
import ReactPlayer from 'react-player'

const videosPanel = props => (
    <div style={{ height:'45vh', backgroundColor: '#000000cf',display:'flex'}} className={classes.Videospanel}>
       <div style={{ width: '62vh', height: '37vh', margin:'3vh'}} className={classes.PlayerWrapper}> <ReactPlayer width='100%' height='100%' playing loop muted url='https://www.youtube.com/embed/WX-JlYrqBas?start=31' /></div>
       <div style={{ width: '62vh', height: '37vh', margin:'3vh'}} className={classes.PlayerWrapper}> <ReactPlayer width='100%' height='100%' playing loop muted url='https://www.youtube.com/embed/3kufOrWwCps' /></div>
       <div style={{ width: '62vh', height: '37vh', margin:'3vh'}} className={classes.PlayerWrapper}> <ReactPlayer width='100%' height='100%' playing loop muted url='https://www.youtube.com/embed/_HX3fteygjY?start=12' />   </div> 
    </div>
);

export default videosPanel;