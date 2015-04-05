/** Author Details
 * @name Vasu Jain
 * @email vj@brk.im
 * @date 04/03/15
 * @license Gnu Public License (GPL)
 */
/**
 * YouTube Test Cases
 */
QUnit.test("YouTube Test" , function(assert) {
    var youTubeArrayTrue = [
        "https://www.youtube.com/watch?v=WB370ewOklw",
        "https://www.youtube.com/embed/WB370ewOklw?autoplay=1",
        "https://www.youtube.com/embed/DGD62Pan_z4",
        "https://www.youtube.com/watch?feature=player_embedded&v=22CrPtjODPY&app=desktop",
        "https://www.youtube.com/watch?v=-SQ2bvbmAMU&list=PLzufeTFnhupxIlcUF3d5tyRrr0CVpmAVh",
        "https://www.youtube.com/watch?v=kwijX850Btk",
        "https://www.youtube.com/watch?v=kwijX8501_Btk",
        "https://www.youtube.com/watch?v=_kwijX850Btk",
        "https://www.youtube.com/watch?v=kw_ijX850Btk",
        "https://www.youtube.com/watch?v=-kwi-jX850Btk"
        ];
    var youTubeArrayFalse = [
        "https://www.youtube.com/v/WB370ewOklw?autoplay=1",
        "http://www.youtube.com/watch_popup?v=WB370ewOklw",
        "https://www.youtube.com/watch?v=k#wijX850Btk",
        "https://www.yoeutube.com/watch?v=-SQ2bvbmAMU&list=PLzufeTFnhupxIlcUF3d5tyRrr0CVpmAVh"
    ];

    for(var i=0; i<youTubeArrayTrue.length; i++) {
        assert.ok(checkCurrentTab(youTubeArrayTrue[i], 11), true, "Test:" + i + " pass");
    }

    for(var j=0; j<youTubeArrayFalse.length; j++) {
        assert.notOk(checkCurrentTab(youTubeArrayFalse[j], 12), false, "Test:" + j + " pass");
    }
});

/**
 * Vimeo Test Cases
 */
QUnit.test("Vimeo Test" , function(assert) {
    var vimeoArrayTrue = [
        "https://vimeo.com/35514005",
        "https://player.vimeo.com/video/35514005?autoplay=1",
        "https://vimeo.com/59286998",
        "https://player.vimeo.com/video/59286998?autoplay=1"
    ];
    var vimeoArrayFalse = [
        "https://player.vivmeo.com/video/59286998?autoplay=1"
    ];

    for(var i=0; i<vimeoArrayTrue.length; i++) {
        assert.ok(checkCurrentTab(vimeoArrayTrue[i], 11), true, "Test:" + i + " pass");
    }

    for(var j=0; j<vimeoArrayFalse.length; j++) {
        assert.notOk(checkCurrentTab(vimeoArrayFalse[j], 11), false, "Test:" + j + " pass");
    }
});

/**
 * Facebook Test Cases
 */
QUnit.test("Facebook Test" , function(assert) {
    var fbArrayTrue = [
        "https://www.facebook.com/video.php?v=10152541108348990",
        "http://www.facebook.com/video/embed?video_id=10152541108348990",
        "https://www.facebook.com/video/embed?video_id=625719987572544",
        "https://www.facebook.com/video.php?v=625719987572544"
    ];
    var fbArrayFalse = [
        "https://www.ffacebook.com/video.php?v=625719987572544"
    ];

    for(var i=0; i<fbArrayTrue.length; i++) {
        assert.ok(checkCurrentTab(fbArrayTrue[i], 11), true, "Test:" + i + " pass");
    }

    for(var j=0; j<fbArrayFalse.length; j++) {
        assert.notOk(checkCurrentTab(fbArrayFalse[j], 11), false, "Test:" + j + " pass");
    }
});

/**
 * DailyMotion Test Cases
 */
QUnit.test("DailyMotion Test" , function(assert) {
    var dmArrayTrue = [
        "http://www.dailymotion.com/video/x2kcwa1_major-lazer-dj-snake-lean-on-feat-mo-official-music-video_music",
        "http://www.dailymotion.com/embed/video/x2kcwa1?autoStart=1",
        "http://www.dailymotion.com/video/x182jt2",
        "http://www.dailymotion.com/video/xsbrgx_hawaii-s-clouds-an-hdr-timelapse_travel"
    ];
    var dmArrayFalse = [
        "http://www.ddailymotion.com/video/xsbrgx_hawaii-s-clouds-an-hdr-timelapse_travel"
    ];

    for(var i=0; i<dmArrayTrue.length; i++) {
        assert.ok(checkCurrentTab(dmArrayTrue[i], 11), true, "Test:" + i + " pass");
    }

    for(var j=0; j<dmArrayFalse.length; j++) {
        assert.notOk(checkCurrentTab(dmArrayFalse[j], 11), false, "Test:" + j + " pass");
    }
});

/**
 * Testing URL trim function
 */
QUnit.test("TrimLongUrl", function(assert) {
    var longUrlArray = [
        "http://www.dailymotion.com/video/x2kcwa1_major-lazer-dj-snake-lean-on-feat-mo-official-music-video_music",
        "http://www.dailymotion.com/embed/video/x2kcwa1?autoStart=1",
        "http://www.dailymotion.com/video/xsbrgx_hawaii-s-clouds-an-hdr-timelapse_travel",
        "https://www.youtube.com/watch?feature=player_embedded&v=22CrPtjODPY&app=desktop"
    ];
    var shortUrlArray = [
        "http://www.dailymotion.com/video/x182jt2",
        "https://www.youtube.com/embed/DGD62Pan_z4"
    ];

    for(var i=0; i<longUrlArray.length; i++) {
        assert.equal(trimLongUrl(longUrlArray[i], 42).length, 45, "Test:" + i + " pass");
    }
    for(var j=0; i<shortUrlArray.length; j++) {
        assert.equal(trimLongUrl(shortUrlArray[j], 42).length, shortUrlArray[j].length, "Test:" + j + " pass");
    }
});