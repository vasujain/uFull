/* Created by vasujain on 03/08/15. */

// Run script as soon as the document's DOM is ready.

var redirectUtubeUrl = "";

document.addEventListener('DOMContentLoaded', function() {
    getCurrentTab();
});
document.getElementById('convertUrl').addEventListener('click', function(){
    redirectUrl();
});


chrome.extension.onRequest.addListener(function(request, sender) {
    chrome.tabs.update(sender.tab.id, {url: request.redirect});
});


function getCurrentTab() {
    return chrome.tabs.query({currentWindow : true, active:true}, function (tabs){
        checkCurrentTab(tabs[0].url);
    });
}

function redirectUrl() {
    chrome.tabs.update(tab.id, {url: "https://www.youtube.com/"});
    //chrome.extension.sendRequest({redirect : redirectUtubeUrl});
}

function checkCurrentTab(tabUrl) {
    var regEx = /(http\:\/\/|https\:\/\/)?((www\.)youtube\.com|youtu\.?be)(\/watch\?v=)(\w{11})/;
    var match = regEx.exec(tabUrl);

    var appendOutPut = "";
    if(match == null) {
        appendOutPut = "<div style='color: #D8000C;background-color: #FFBABA;'>Invalid URL: " + tabUrl + "</div>";
    } else {
        if(match.length >= 6) {
            match[4] = "\/embed\/";
        }
        appendOutPut += "<div style='color: #4F8A10;background-color: #DFF2BF;'>" + match[0] + "</div>";
        redirectUtubeUrl = match[1] + match[2] + match[4] + match[5];
        appendOutPut += "<div style='color: #4F8A10;background-color: #DFF2BF;'>" + redirectUrl + "</div>";
    }
    document.getElementById("output").innerHTML = appendOutPut;




        /**
     * 6
         [0]https://www.youtube.com/watch?v=BKOlYDyo3sA
         [1]https://
         [2]www.youtube.com
         [3]www.
         [4]/watch?v=
         [5]BKOlYDyo3sA


     https://www.youtube.com/watch?v=BKOlYDyo3sA,https://,www.youtube.com,www.,/embed/,BKOlYDyo3sA
     */

    //https://www.youtube.com/watch?v=5lRcfg_XUfQ
    //https://www.youtube.com/embed/5lRcfg_XUfQ

}
