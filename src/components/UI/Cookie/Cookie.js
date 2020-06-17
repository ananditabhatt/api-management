import React from 'react';
import CookieConsent from "react-cookie-consent";
const Cookie = (props) => (

<CookieConsent
enableDeclineButton
flipButtons
style={{
  background: "rgba(0, 0, 0, 0.89)",
  color: "white"
}}
>
We use cookies to improve user experience. For this reasons. By
continuing to the site, you consent to store on some of your user data
in your local browser as per our cookies Policy. You can change your
cookie settings at any time by clicking “Cookie Preferences.” Please
read our Terms and Conditions and Privacy Policy for full details..
</CookieConsent>
)
export default Cookie;