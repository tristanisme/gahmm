let { Cc, Ci } = require('chrome');
let self = require("sdk/self");
let pref = require("sdk/simple-prefs").prefs;
let observerService = Cc["@mozilla.org/observer-service;1"].getService(Ci.nsIObserverService);
let ioService = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);

// If the URL provided is to GA with a tracking ID, returns a modified url with different
// ID, otherwise return null.
modifyUrlIfNeeded = function modifyUrlIfNeeded(url){
    let gaRegex = /^http(s|):\/\/www\.google-analytics\.com.*tid=UA-\d+-\d+.*/i;
    if (gaRegex.test(url) && url.indexOf(pref.gaTrackingId) < 0){
        // replace their tracking ID with yours...
        let modUrl = url.replace(new RegExp("tid=UA-\\d+-\\d+", "i"), "tid=" + pref.gaTrackingId);
        // replace reported location with your domain (eg dl=http://them.com/ -> dl=http://you.com/them.com/)...
        return modUrl.replace(new RegExp("&dl=http(s|)%3A%2F%2F","i"), "&dl=http%3A%2F%2F" + pref.gaDomainName + "%2F");
    } else {
        return null;
    }
};

// intercept and occasionally modify HTTP/HTTPS requests...
let httpObserver = {
    observe: function (aSubject, aTopic, aData) {
        aSubject.QueryInterface(Ci.nsIHttpChannel);
        let url = aSubject.URI.spec;
        let modUrl = modifyUrlIfNeeded(url);
        if (modUrl){
            // replace URL and referrer in request...
            let urlObj = ioService.newURI(modUrl, aSubject.URI.originCharset, null);
            aSubject.redirectTo(urlObj);
            let myDomain = pref.gaDomainName;
            aSubject.setRequestHeader("Referer", "http://" + myDomain, false);
        }
    }
};
observerService.addObserver(httpObserver, "http-on-modify-request", false);

// expose functions to unit tests..
exports.modifyUrlIfNeeded = modifyUrlIfNeeded;