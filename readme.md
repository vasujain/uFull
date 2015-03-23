******************************************************************************
uFull - Chrome Extension to turn youtube videos to full screen within browser
******************************************************************************

How often have you felt a need to maximize youtube player to full of browser not the full of screen. Yep, i wanted that and didnt find anything, so got this one out.
Simply click the extension while watching a youtube video and it will maximize it to full screen if its a valid URL.

Example youtube Video:  https://www.youtube.com/watch?v=SRo9RcE65lo this video will be maximized by using the Extension.

Url like 
    https://www.youtube.com/watch?v=5lRcfg_XUfQ
to ==>
    https://www.youtube.com/embed/5lRcfg_XUfQ

How does the Idea came ?
*********************************
Last week while watching i felt if i could maximize a YouTube video to entire browser (not screen) it would be really great for my multi tasking itch. But YouTube doesn't provide any such feature, all they provide is theatre mode or full screen, none of which i wanted. So wrote one Chrome Extension for that for those folks who share the pain or not. :)

Why ?
*******
Yep, full screen is there, but as i mentioned it is more of an ointment for my multi tasking itch. That way you dont miss notifications from apps / browser tabs / OS Notifications etc. 
Website

Details
*******
"name" : "uFull",
"description" : "Chrome Extension to turn youtube videos to full screen within browser",
"version" : "0.5.0",
"permissions" : [
    "tabs",
    "bookmarks",
    "activeTab"
]

Icon License
************
Icons under CC Attribution-Noncommercial-No Derivate 4.0 license from http://www.iconarchive.com/show/circle-icons-by-martz90/video-camera-icon.html

Regex Match Object
******************
    [0]https://www.youtube.com/watch?v=BKOlYDyo3sA
    [1]https://
    [2]www.youtube.com
    [3]www.
    [4]/watch?v=
    [5]BKOlYDyo3sA
    
Tab Object
***********
Array[1]
    0: Object
        active: true
        favIconUrl: "https://s.ytimg.com/yts/img/favicon_32-vflWoMFGx.pn"
        height: 753
        highlighted: true
        id: 185
        incognito: false
        index: 9
        pinned: false
        selected: true
        status: "complete"
        title: "How it works - YouTube"
        url: "https://www.youtube.com/watch?v=WB370ewOklw"
        width: 1439
        windowId: 22
        
Would love comments/feedbacks/bug etc. over Github