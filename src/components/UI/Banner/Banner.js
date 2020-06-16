import React from 'react'
import classes from './Banner.css'
import logojpg from "../../../assets/logojpg.jpg"

const Banner = () => {
    return(
        <div className={classes.innerdiv1}>
<div className={classes.innerdiv1Main}>
  <div className={classes.innerdiv1MainDiv1}>
    <div className={classes.innerdivTitle}>
      <h3>45 years of Telstra services</h3>
    </div>
    <div>
      <p>
        Telstra is now fully privatised and was undergoing a
        change program to become more developer focused.
        Telstra’s APIs made Telstra’s knowledge of the real
        world available to developers. You used it to build
        amazing things and never stopped.
      </p>
    </div>

    <div className={classes.myBtn}>
      {" "}
      <a href="https://www.telstra.com.au/">Learn More</a>
    </div>
  </div>

  <div className={classes.innerdiv1MainDiv2}>
    <img src={logojpg} width="200px" height="200px" />
  </div>
</div>
</div>
    )
}

export default Banner;


