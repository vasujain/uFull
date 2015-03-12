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
    var regEx = /(http\:\/\/|https\:\/\/)?((www\.)youtube\.com|youtu\.?be)(\/watch\?v=)(\w{11})/;
    var match = regEx.exec(tabUrl);

    //Check if URL is a valid YouTube URL
    if (match == null) {
        divOutputHtml = "<div style='color: #D8000C;background-color: #FFBABA;'>Invalid URL: " + tabUrl + "</div>";
        document.getElementById("convertUrl").innerHTML = divOutputHtml;
    } else {
        //Sanity check... to set up the new URL
        if (match.length >= 6) {
            match[4] = "\/embed\/";
        }
        divOutputHtml += "<div style='color: #4F8A10;background-color: #DFF2BF;'>" + match[0] + "</div>";
        redirectUrl = match[1] + match[2] + match[4] + match[5];
        divOutputHtml += "<div style='color: #4F8A10;background-color: #DFF2BF;'>" + redirectUrl + "</div>";
        document.getElementById("convertUrl").innerHTML = divOutputHtml;
        chrome.tabs.update(tabId, {url: redirectUrl});
    }

}

