import React from 'react'
import classes from './Information.css'
import TwitterHandleInfo from './TwitterHandle/TwitterHandleInfo';

const Info = () => {
    return (
        <div className={classes.innerdiv3}>
            <div className={classes.innerdiv3first}>
                <div>
                    <span class="XX-large-icon fa fa-compass"></span>
                    <h4>Explore and test</h4>
                    <hr />
                    <p>
                        Explore a growing list of trusted Internet of things or Messaging
                        interfaces (APIs) and try them out for
                        yourself.
    </p>
                </div>
                <div>
                    <span class="large-icon fa fa-cogs"></span>
                    <h4>Integrate</h4>
                    <hr />
                    <p>
                        Request access to start integrating APIs and use our
                        software development kits (SDKs) to save you time.
    </p>
                </div>
                <div>
                    <span class="fa fa-tasks"></span>
                    <h4>Manage </h4>
                    <hr />
                    <p>
                        Our  tools will help you gain insight into your
                        API usage and app performance to help drive your business
                        decisions.
    </p>
                </div>
            </div>
            <TwitterHandleInfo TwitterhandleClass={classes.Twitterhandle} url="https://twitter.com/telstradev?ref_src=twsrc%5Etfw" 
            label='Tweets by telstradev' />
        </div>)
}

export default Info;