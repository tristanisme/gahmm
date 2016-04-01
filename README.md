# GAHmm

A simple Firefox addon that redirects Google Analytics tracking on *all* websites to your own GA account. The data that website's normally collect about your activity gets sent to you instead of the website's owner.

## Why?

Reasons to use this might include...
- To learn how other people use GA.
- Self analytics.
- As an alternative to blocking GA that doesn't cause some links to break (I haven't tested this).

## How does it work?

It intercepts and modifies HTTP requests from Firefox.

For example this HTTP request...

https: //www.google-analytics.com/collect?v=1&_v=j41&a=1514558475&t=pageview&_s=1&dl=**https%3A%2F%2Fwww.petcircle.com.au%2F**&ul=en-gb&de=UTF-8&dt=Pet%20food%20online%20%7C%20Pet%20Circle&sd=24-bit&sr=1600x900&vp=1548x240&je=0&fl=21.0%20r0&_u=SCCAgAAr~&jid=1486004412&cid=130006103.1458379477&tid=**UA-11111111-1**&gtm=GTM-KTBCBV&cd1=SHIBA07&cd2=org.apache.jsp.s1.welcome_jsp&z=48977340

becomes...

https: //www.google-analytics.com/collect?v=1&_v=j41&a=1514558475&t=pageview&_s=1&dl=**https%3A%2F%2Fwww.yoursite.com%2Fwww.petcircle.com.au%2F**&ul=en-gb&de=UTF-8&dt=Pet%20food%20online%20%7C%20Pet%20Circle&sd=24-bit&sr=1600x900&vp=1548x240&je=0&fl=21.0%20r0&_u=SCCAgAAr~&jid=1486004412&cid=130006103.1458379477&tid=**UA-22222222-2**&gtm=GTM-KTBCBV&cd1=SHIBA07&cd2=org.apache.jsp.s1.welcome_jsp&z=48977340

## How do I use this?

1. Set up your own GA property.
2. Install the addon. No binaries at the moment sorry.
3. Go to addon preferences to enter in your own GA tracking ID and domain.

## Disclaimer

This was created as a fun learning project and an experiment. It has not been thoroughly tested and is not intended for wide use.
