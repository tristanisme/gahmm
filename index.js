//TODO: COMMENTS
//TODO: PUT ON GITHUB
//TODO: README.md
//TODO: TIDY VARIABLE NAMES
//TODO: MAKE SURE I DIDN'T BREAK IT!
//TODO: MAKE MORE TESTABLE AND ADD TESTS? isGaRequest(url) return bool, modifyIfNeeded(url) returns url
let { Cc, Ci } = require('chrome');
let self = require("sdk/self");
let preferences = require("sdk/simple-prefs").prefs;
let observerService = Cc["@mozilla.org/observer-service;1"].getService(Ci.nsIObserverService);
let ioService = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);

//TODO: REMOVE METHOD
function makeURI(aURL, aOriginCharset, aBaseURI) {
    return ioService.newURI(aURL, aOriginCharset, aBaseURI);
}

var observer = {
    observe: function (aSubject, aTopic, aData) {
        aSubject.QueryInterface(Ci.nsIHttpChannel);
        let url = aSubject.URI.spec;
        let myUa = preferences.gaTrackingId
        let gaRegex = /^http(s|):\/\/www\.google-analytics\.com.*tid=UA.*/i
        if (gaRegex.test(url) && url.indexOf(myUa) < 0) {
            let ownUrlStr = url.replace(new RegExp("tid=UA-\\d+-\\d+", "i"), "tid=" + myUa);
            if (ownUrlStr !== url) {
                let myDomain = preferences.gaDomainName;
                ownUrlStr = ownUrlStr.replace(new RegExp("&dl=http"), "&dl=http%3A%2F%2F" + myDomain + "%2F");
                aSubject.redirectTo(makeURI(ownUrlStr, aSubject.URI.originCharset, null));
                aSubject.setRequestHeader("Referer", myDomain, false);
            }
        }
    }
}


observerService.addObserver(observer, "http-on-modify-request", false);