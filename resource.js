/* Created by vasujain on 03/08/15. */

// Run script as soon as the document's DOM is ready.

document.addEventListener('DOMContentLoaded', function() {
   document.getElementById('convertUrl').addEventListener('click', convertYouTubeUrl);
});


function convertYouTubeUrl() {
    getCurrentTab();
}

function getCurrentTab() {
    var currentActiveTab = "http://www.google.com";
    return chrome.tabs.query({currentWindow : true, active:true}, function (tabs){
        checkCurrentTab(tabs[0].url);
    });
}

function checkCurrentTab(tabUrl) {
    var regEx = "^(http\:\/\/|https\:\/\/)?((www\.)?youtube\.com|youtu\.?be)\/.+$";
    var checkRegEx = regEx.exec(tabUrl);

    console.log(tabUrl);
    console.log("#");
    console.log(checkRegEx);
}
//
//document.addEventListener('DOMContentLoaded', function () {
//    getBookMarksTree();
//    document.getElementById('downloadJson').addEventListener('click', downloadBookMarksJson);
//    document.getElementById('downloadHtml').addEventListener('click', downloadBookMarksHTML);
//    document.getElementById('createBookMark').addEventListener('click', createBookMarkNode);
//    document.getElementById('emailJson').addEventListener('click', emailJson);
//});


////print Bookmarks layout
//function getBookMarksTree() {
//    document.getElementById("myBookmarks").innerHTML += "<ul id='list-ul'>";
//    var bookmarkTree = printBookMarks();
//    document.getElementById("myBookmarks").innerHTML += "</ul>";
//}

//Chrome Bookmarks getTree
function printBookMarks() {
    chrome.bookmarks.getTree(function (bookmarkTree) {
        processNode(bookmarkTree[0]);
    });
}

////Process a Node using Recursion
//function processNode(bookmarkNode) {
//    if(bookmarkNode.children) {
//        bookmarkNode.children.forEach(function(childNode) {
//            processNode(childNode);
//        });
//    } else {
//        printNodeHtml(bookmarkNode);
//    }
//}

//// Print HTML Output for a Node
//function printNodeHtml(bookmarkNode) {
//    var bookmarkUrl = "" ;
//    if(bookmarkNode.url.length > 90) {bookmarkUrl = encodeURI(bookmarkNode.url.substr(0,95)) + "..."; } else {bookmarkUrl = encodeURI(bookmarkNode.url);}
//    document.getElementById("myBookmarks").innerHTML += "<li class='list-item'><span class='listName'>";
//    document.getElementById("myBookmarks").innerHTML += "<a href='" + bookmarkNode.url + "'>" + bookmarkUrl + "<a/>";
//    document.getElementById("myBookmarks").innerHTML += "</span></li>";
//}

////download BookMarks in Json
//function downloadBookMarksJson() {
//    chrome.bookmarks.getTree(function (bookmarkTree) {
//        var content = JSON.stringify(bookmarkTree[0], null, "\t");
//        var dl = document.createElement('a');
//        dl.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(content));
//        dl.setAttribute('download', 'bookmarks.json');
//        dl.click();
//    });
//}

//download BookMarks in HTML
//function downloadBookMarksHTML() {
//    var content = document.getElementById("myBookmarks").innerHTML;
//    var dl = document.createElement('a');
//    dl.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(content));
//    dl.setAttribute('download', 'bookmarks.html');
//    dl.click();
//}
//
//Create a Bookmark Node
//function createBookMarkNode() {
//    chrome.bookmarks.create({
//        'title': 'Extensions Folder'});
//    chrome.bookmarks.getTree(function (bookmarkTree) {
//       createNode();
//    });
//}

//function createNode(bookmarkNode) {
//    if(bookmarkNode.children) {
//        bookmarkNode.children.forEach(function(childNode) {
//            createNode(childNode);
//        });
//    } else {
//        printNodeHtml(bookmarkNode);
//    }
//}

//function emailJson() {
//    chrome.bookmarks.getTree(function (bookmarkTree){
//       var content = JSON.stringify(bookmarkTree[0], null, "\t");
//       var emailSubject = "Bookmarks Json generated from 'Get BookMarks' app";
//       var emailTo = "vasu.jain@live.in";
//       var emailFrom = "no-reply@brk.im";
//       var link = "mailto:" + emailTo + "&subject=" + escape(emailSubject);// + "&body=" + escape(content);
////       console.log(link);
////        chrome.extension.sendMessage({mailUrl: link}, function(response){ console.log("hi");});
//       window.location.href = link;
//    });
//}
//  console.log(JSON.stringify(bookmarkTree));
//  console.log(bookmarkNode.children[0].children[0]);

//  https://developer.chrome.com/extensions/permissions
//  https://groups.google.com/a/chromium.org/forum/#!topic/chromium-extensions/BT6Jq7Uylk8
//  https://developer.chrome.com/extensions/bookmarks#method_getTree
//  Icons: https://www.iconfinder.com/icons/304419/book_bookmark_education_learning_notebook_reading_school_icon
//  https://developer.chrome.com/extensions/tut_migration_to_manifest_v2#inline_scripts