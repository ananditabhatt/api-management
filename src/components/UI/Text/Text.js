import React from 'react';
import hbanner from "../../../assets/hero-banner.jpg"
import classes from './Text.css'
const Text = props => (
  <div style={{ display: "flex" }}>
    <div className={classes.innerdiv4}>
      <img src={hbanner} />
      <h6>Integrate messaging into your digital platforms</h6>

      <p>
        Get the power to communicate with engaging SMS messaging in your web and
        mobile apps in near real-time and at scale.Telstra’s Messaging API is a
        simple, secure and reliable REST API that simply integrates SMS
        messaging across your existing marketing suit.
      </p>
      <p>
        Inform and educate your audiences as a group or as individuals, promptly
        notify and update employees of changes like roster updates, boost
        security by enabling two factor authentication, or provide SMS alerts
        for utility outages or delivery statuses to improve customer and
        employee experience. Our Messaging API is perfectly suited for a range
        of messaging applications.
      </p>
      <h6>
        <a href="https://www.telstra.com.au/business-enterprise/products/mobility-solutions/messaging-and-apis/messaging-api/request-callback">
          Request a call back
        </a>{" "}
      </h6>
    </div>
  </div>
);

export default Text;