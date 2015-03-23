/** Author Details
 * @name Vasu Jain
 * @email vj@brk.im
 * @date 03/08/15
 * @license Open Source
 */

/**
 * Global Variables
 * @type {string} redirectUrl : Setting up a default Redirect URL
 * @type {string} divOutputHtml : Sets Output Div HTML content
 *
 */
var redirectUrl = "http://www.google.com";
var divOutputHtml = "";

/**
 * Run script as soon as the document's DOM is ready.
 */
document.addEventListener('DOMContentLoaded', function () {
    getCurrentTab();
    //document.getElementById('buttonId').addEventListener('click', function(){}
});

/**
 * Get the current tab from where the Extn. is invoked
 */
function getCurrentTab() {
    return chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
        checkCurrentTab(tabs[0].url, tabs[0].id);
    });
}

/**
 * RegEx stuff and redirection to embed URL for youtube
 */
function checkCurrentTab(tabUrl, tabId) {

    //Nasty Youtube URL Regex... can be improved for mobile URLs and international Domains like .in,.uk etc
    var regEx = /(http\:\/\/|https\:\/\/)?((www\.)youtube\.com|youtu\.?be)(\/watch\?v=)(\S{11})/;
    var match = regEx.exec(tabUrl);

    var regExForFullUrl = /(http\:\/\/|https\:\/\/)?((www\.)youtube\.com|youtu\.?be)(\/embed\/)(\S{11})/;
    var matchFullUrl = regExForFullUrl.exec(tabUrl);

    //Check if URL is a valid YouTube URL
    if (match == null && matchFullUrl == null) {
        updateRedirectUrl(match, tabUrl, tabId, false);
    } else {
        if(matchFullUrl==null) {
            //Sanity check... to set up the new URL
            if (match.length >= 6) {
                match[4] = "\/embed\/";
            }
            updateRedirectUrl(match, tabUrl, tabId, true);
        } else if (match == null) {
            if (matchFullUrl.length >= 6) {
                matchFullUrl[4] = "\/watch\?v=";
            }
            updateRedirectUrl(matchFullUrl, tabUrl, tabId, true);
        }

    }
}

/**
 * RegEx stuff and redirection to embed URL for youtube
 * @param: regex match object
 * @param: Tab Id
 *
 */
function updateRedirectUrl(regexMatch, tabUrl, tabId, redirectFlag) {
    if(redirectFlag) {
        divOutputHtml += "<div class='youtubeValidUrl'><b>Redirected from: </b><span class='invalidUrlText'>" + regexMatch[0] + "</span></div>";
        redirectUrl = regexMatch[1] + regexMatch[2] + regexMatch[4] + regexMatch[5];
        divOutputHtml += "<div class='youtubeValidUrl'><b>Redirected To: </b><span class='invalidUrlText'>" + redirectUrl + "</span></div>";
        document.getElementById("convertUrl").innerHTML = divOutputHtml;
        chrome.tabs.update(tabId, {url: redirectUrl});
    } else {
        divOutputHtml = "<div class='invalidURL'><b>Invalid URL: </b><br><span class='invalidUrlText'>" + tabUrl + "</span></div>";
        document.getElementById("convertUrl").innerHTML = divOutputHtml;
    }

}
