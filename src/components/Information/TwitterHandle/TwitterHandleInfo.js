import React from 'react';
import classes from './TwitterHandleInfo.css';

const twitterHandleInfo = props => (
    <div className={props.TwitterhandleClass}>
        <a
            class="twitter-timeline"
            data-width="290"
            data-height="650"
            data-theme="light"
            href={props.url}>
            {props.label}</a>{" "}
        <script
            async
            src="https://platform.twitter.com/widgets.js"
            charset="utf-8"
        ></script>
    </div>
);

export default twitterHandleInfo;