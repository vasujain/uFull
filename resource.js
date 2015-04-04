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
    var yt = fillYouTubeUrl(tabUrl, tabId);
    var fb = fillFacebookUrl(tabUrl, tabId);
    var vm = fillVimeoUrl(tabUrl, tabId);
    var dm = fillDailyMotionUrl(tabUrl, tabId);

    // Display Invalid URL if URL does not match any supported channel
    if(!yt && !fb && !vm && !dm) {
        displayInvalidUrl(tabUrl);
        return false;
    } else {
        return true;
    }
}

/**
 * Check Current URL for Youtube URL, than redirect
 * @param: Current URL
 * @param: Tab Id
 * @return: boolean true(Valid URL)/false(invalid URL)
 *
 */
function fillYouTubeUrl(tabUrl, tabId) {
    //Nasty Youtube URL Regex... can be improved for mobile URLs and international Domains like .in,.uk etc
    var regExServiceUrl = /(http\:\/\/|https\:\/\/)?((www\.)youtube\.com|youtu\.?be)(\/watch\?)((\S*\&v\=)|(v\=))([_-a-z0-9A-Z]+)/;
    var matchServiceUrl = regExServiceUrl.exec(tabUrl);

    var regExEmbedUrl = /(http\:\/\/|https\:\/\/)?((www\.)youtube\.com|youtu\.?be)(\/embed\/)(\S{11})/;
    var matchEmbedUrl = regExEmbedUrl.exec(tabUrl);

    //Check if URL is a valid YouTube URL
    if (matchServiceUrl == null && matchEmbedUrl == null) {
        return false;
    } else {
        if(matchEmbedUrl==null) {
            //Sanity check... to set up the new URL
            if (matchServiceUrl.length >= 6) {
                matchServiceUrl[4] = "\/embed\/";
            }
            redirectUrl = matchServiceUrl[1] + matchServiceUrl[2] + matchServiceUrl[4] + matchServiceUrl[8] + "?autoplay=1";
            updateRedirectUrl(matchServiceUrl, tabUrl, tabId, true, redirectUrl);
        } else if (matchServiceUrl == null) {
            if (matchEmbedUrl.length >= 6) {
                matchEmbedUrl[4] = "\/watch\?v=";
            }
            redirectUrl = matchEmbedUrl[1] + matchEmbedUrl[2] + matchEmbedUrl[4] + matchEmbedUrl[5];
            updateRedirectUrl(matchEmbedUrl, tabUrl, tabId, true, redirectUrl);
        }
        return true;
    }
}

/**
 * Check Current URL for Facebook URL, than redirect
 * @param: Current URL
 * @param: Tab Id
 * @return: boolean true(Valid URL)/false(invalid URL)
 *
 */
function fillFacebookUrl(tabUrl, tabId) {
    //Nasty Facebook URL Regex... can be improved for mobile URLs and international Domains like .in,.uk etc
    var regExServiceUrl = /(http\:\/\/|https\:\/\/)?((www\.)facebook\.com)(\/video\.php\?v=)(\d{1,20})/;
    var matchServiceUrl = regExServiceUrl.exec(tabUrl);

    var regExEmbedUrl = /(http\:\/\/|https\:\/\/)?((www\.)facebook\.com)(\/video\/embed\?video_id=)(\d{1,20})/;
    var matchEmbedUrl = regExEmbedUrl.exec(tabUrl);

    //Check if URL is a valid Facebook URL
    if (matchServiceUrl == null && matchEmbedUrl == null) {
        return false;
    } else {
        if(matchEmbedUrl==null) {
            //Sanity check... to set up the new URL
            if (matchServiceUrl.length >= 6) {
                matchServiceUrl[4] = "\/video\/embed\?video_id=";
            }
            redirectUrl = matchServiceUrl[1] + matchServiceUrl[2] + matchServiceUrl[4] + matchServiceUrl[5];
            updateRedirectUrl(matchServiceUrl, tabUrl, tabId, true, redirectUrl);
        } else if (matchServiceUrl == null) {
            if (matchEmbedUrl.length >= 6) {
                matchEmbedUrl[4] = "\/video\.php\?v=";
            }
            redirectUrl = matchEmbedUrl[1] + matchEmbedUrl[2] + matchEmbedUrl[4] + matchEmbedUrl[5];
            updateRedirectUrl(matchEmbedUrl, tabUrl, tabId, true, redirectUrl);
        }
        return true;
    }
}

/**
 * Check Current URL for Vimeo URL, than redirect
 * @param: Current URL
 * @param: Tab Id
 * @return: boolean true(Valid URL)/false(invalid URL)
 *
 */
function fillVimeoUrl(tabUrl, tabId) {
    //Nasty Vimeo URL Regex... can be improved for mobile URLs and international Domains like .in,.uk etc
    var regExServiceUrl = /(http\:\/\/|https\:\/\/)?(vimeo\.com\/)(\d{1,20})/;
    var matchServiceUrl = regExServiceUrl.exec(tabUrl);

    var regExEmbedUrl = /(http\:\/\/|https\:\/\/)?(player\.)(vimeo\.com\/)(video\/)(\d{1,20})/;
    var matchEmbedUrl = regExEmbedUrl.exec(tabUrl);

    //Check if URL is a valid YouTube URL
    if (matchServiceUrl == null && matchEmbedUrl == null) {
        return false;
    } else {
            if(matchEmbedUrl==null) {
            //Sanity check... to set up the new URL
                if (matchServiceUrl.length >= 4) {
                    matchServiceUrl[4] = "player.";
                    matchServiceUrl[5] = "video\/";
                    matchServiceUrl[6] = "?autoplay=1";
                }
            redirectUrl = matchServiceUrl[1] + matchServiceUrl[4] + matchServiceUrl[2] + matchServiceUrl[5] + matchServiceUrl[3] + matchServiceUrl[6];
            updateRedirectUrl(matchServiceUrl, tabUrl, tabId, true, redirectUrl);
        } else if (matchServiceUrl == null) {
            redirectUrl = matchEmbedUrl[1] + matchEmbedUrl[3] + matchEmbedUrl[5];
            updateRedirectUrl(matchEmbedUrl, tabUrl, tabId, true, redirectUrl);
        }
        return true;
    }
}

/**
 * Check Current URL for DailyMotion URL, than redirect
 * @param: Current URL
 * @param: Tab Id
 * @return: boolean true(Valid URL)/false(invalid URL)
 *
 */
function fillDailyMotionUrl(tabUrl, tabId) {
    //Nasty DailyMotion URL Regex... can be improved for mobile URLs and international Domains like .in,.uk etc
    var regExServiceUrl = /(http\:\/\/|https\:\/\/)?((www\.)dailymotion\.com\/)(video\/)([a-z0-9]+)(\_*)(\S*)/;
    var matchServiceUrl = regExServiceUrl.exec(tabUrl);

    var regExEmbedUrl = /(http\:\/\/|https\:\/\/)?((www\.)dailymotion\.com\/)(embed\/)(video\/)([a-z0-9]+)/;
    var matchEmbedUrl = regExEmbedUrl.exec(tabUrl);

    //Check if URL is a valid YouTube URL
    if (matchServiceUrl == null && matchEmbedUrl == null) {
        return false;
    } else {
        if(matchEmbedUrl==null) {
            //Sanity check... to set up the new URL
            if (matchServiceUrl.length >= 5) {
                matchServiceUrl[8] = "embed\/";
            }
            redirectUrl = matchServiceUrl[1] + matchServiceUrl[2] + matchServiceUrl[8] + matchServiceUrl[4] + matchServiceUrl[5];
            updateRedirectUrl(matchServiceUrl, tabUrl, tabId, true, redirectUrl);
        } else if (matchServiceUrl == null) {
            redirectUrl = matchEmbedUrl[1] + matchEmbedUrl[2] + matchEmbedUrl[5] + matchEmbedUrl[6];
            updateRedirectUrl(matchEmbedUrl, tabUrl, tabId, true, redirectUrl);
        }
        return true;
    }
}

/**
 * RegEx stuff and redirection to embed URL for youtube
 * @param: regex match object
 * @param: Tab Id
 *
 */
function updateRedirectUrl(regexMatch, tabUrl, tabId, redirectFlag, redirectUrl) {
    if(redirectFlag) {
        divOutputHtml += "<div class='validUrl'><b>Redirected from: </b><br/><span class='urlText'>" + regexMatch[0] + "</span></div>";
        divOutputHtml += "<div class='validUrl'><b>Redirected To: </b><br/><span class='urlText'>" + redirectUrl + "</span></div>";
        document.getElementById("convertUrl").innerHTML = divOutputHtml;
        chrome.tabs.update(tabId, {url: redirectUrl});
    }
}

/**
 * Display Invalid URL Text
 */
function displayInvalidUrl(tabUrl) {
    tabUrl = trimLongUrl(tabUrl, 42);
    divOutputHtml = "<div class='invalidURL'><b>Invalid URL: </b><br><span class='urlText'>" + tabUrl + "</span></div>";
    document.getElementById("convertUrl").innerHTML = divOutputHtml;
}

/**
 * Trim a URL to fit screen
 * @param: currentUrl
 * @param: trimSize
 * @return: returnUrl
 *
 */
function trimLongUrl(currentUrl, trimSize) {
    var returnUrl = currentUrl;
    if(currentUrl.length > trimSize) {
        var str = String(currentUrl);
        returnUrl = str.substring(0,trimSize) + "...";
        return(returnUrl);
    }
    return returnUrl;
}

