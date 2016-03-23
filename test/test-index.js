var main = require("../index");
let preferences = require("sdk/simple-prefs").prefs;

let myTrackingId = preferences.gaTrackingId;
let myDomain = preferences.gaDomainName;

let dummyTrackingId = "UA-10101010-1";
let dummyDomain = "nowhere.com";

let sampleUrlPart1 = "www.google-analytics.com/r/collect?v=1&_v=j41&a=218326213&t=pageview&_s=1&dl=http%3A%2F%2F";
let sampleUrlPart2 = dummyDomain + "%2F&ul=en-gb&de=UTF-8&dt=" + dummyDomain + "%3A%20hello&sd=24-bit&tid=";
let sampleUrlPart3 = "&_r=1&gtm=GTM-XXXXXX&z=5555555555";

exports["test should change url"] = function(assert, done) {
    let shouldModifyFragment = sampleUrlPart1 + sampleUrlPart2 + dummyTrackingId + sampleUrlPart3;
    let shouldModify  = main.modifyUrlIfNeeded("http://" + shouldModifyFragment);
    assert.ok((shouldModify !== null), "return a new URL when modificaiton needed");
    assert.ok((shouldModify.indexOf(myTrackingId) > 0), "should have new tracking ID");
    assert.ok((shouldModify.indexOf(dummyTrackingId) < 0), "should have not have old tracking ID.");
    assert.ok((shouldModify.indexOf(myDomain + "%2F" + dummyDomain) > 0), "new domain should be prefixed to old domain " + shouldModify);

    let shouldModifySsl  = main.modifyUrlIfNeeded("https://" + shouldModifyFragment);
    assert.ok((shouldModifySsl !== null), "return a new URL when modificaiton needed");
    done();
};

exports["test should NOT change url"] = function(assert, done) {
  let notGa = main.modifyUrlIfNeeded("https://www.petcircle.com.au/");
  assert.ok((notGa === null), "return null for non GA urls");

  let noTrackingId = main.modifyUrlIfNeeded("https://www.google-analytics.com/analytics.js");
  assert.ok((noTrackingId  === null), "return null for URLs that do not contain a tracking ID.");

  let alreadyModified = main.modifyUrlIfNeeded("https://" + sampleUrlPart1 + myDomain + "%2Fhttp%3A%2F%2F" + sampleUrlPart2 + myTrackingId + sampleUrlPart3);
  assert.ok((alreadyModified === null), "return null for URLs that have already been modified.");
    done();
};

require("sdk/test").run(exports);
