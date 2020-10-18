// var comments = [
//   ['YouDanmaku', 2],
//   ['I am really enjoying all of these comments', 26],
//   ['danmaku looks great', 22],
//   ['comment 2', 35],
//   ['中文测试 Chinese', 25],
//   ['¡Hola, Mundo!', 23],
//   ['Hello world', 22],
//   ['ユーチューブ動画', 23],
//   ['comment 2', 38],
//   ['comment 2', 39],
//   ['comment 2', 46],
//   ['comment 2', 52],
//   ['comment 2', 22],
//   ['comment 3', 21],
//   ['hello Hack PSU', 5],
//   ['happy Hack', 8],
//   ['hello Hack PSU', 17],
// ];
var comments = {
  '00:21': [
    'this is from write again',
    'this is from write again',
    'this is from write again',
    'this is from write again',
    'this is from write again',
    'this is from write again',
    'this is from write again',
    'this is from write again',
  ],
  '00:23': ['new test', 'new test2', 'new test696996'],
};

var i = 0;
flag = false;
// comments.sort(function (comment1, comment2) {
//   if (comment1[1] < comment2[1]) {
//     return -1;
//   }
//   if (comment1[1] > comment2[1]) {
//     return 1;
//   }
//   return 0;
// });
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  writeDataToFireBase(request.comment);
  sendResponse({ confirm: 'received' });
});

function writeDataToFireBase(comment) {
  var liveTime = getVideoTime();
  console.log(liveTime);
  var href = location.href.split('/');
  // if (href.length > )
  console.log(href[5]);
  console.log(comment);
}

// var oldURL = location.href;
// function checkURL() {
//   var newURL = location.href;
//   if (newURL != oldURL) {
//     insert_comment_block();
//     oldURL = newURL;
//     flag = true;
//   }
// }

// Can let Alvin and Eugene check
function checkLiveTime() {
  var liveTime = getVideoTime(); // They will give us
  if (comments[liveTime] !== null) {
    insertCommments(comments[liveTime]);
  }
}

// function getVideoTime() {
//   var timestamp;
//   var time = document
//     .getElementsByClassName('ytp-time-current')[0]
//     .innerHTML.split(':');
//   if (time.length == 2) {
//     timestamp = Number(time[0]) * 60 + Number(time[1]);
//   } else {
//     timestamp = Number(time[0] * 3600) + Number(time[1]) * 60 + Number(time[2]);
//   }

//   return timestamp;
// }

function getVideoTime() {
  var timestamp = 0;
  var element = document.getElementsByClassName('vjs-time-range-current');
  if (element.length > 0) {
    timestamp = element[0].innerHTML;
  }
  return timestamp;
}

function insertCommments(commentsAtTime) {
  for (j = 0; j < commentsAtTime.length; j++) {
    insertCommment(comments[liveTime][j]);
  }
}
function displayCommment(commentText) {
  var commentSpan = document.createElement('span');
  var t = document.createTextNode(commentText);
  commentSpan.appendChild(t);
  $(commentSpan).css({
    position: 'absolute',
    width: 'auto',
    'max-width': '250px',
    'white-space': 'nowrap',
    color: '0xffffff',
    height: '20px',
    left: '0',
    top: '0',
    cursor: 'pointer',
    'font-weight': '600',
    'font-size': '48',
    'z-index': '300000',
  });
  document.body.appendChild(commentSpan);

  // var obj = commentSpan;
  var speed = Math.floor(Math.random() * 3) + 2;
  var delay = 10;
  var videoDiv = document.getElementsByClassName('player-view')[0];
  var videoCoordinates = videoDiv.getBoundingClientRect();
  var xPos = videoCoordinates.right - commentSpan.offsetWidth;
  var yPos = Math.floor(
    Math.random() * videoDiv.offsetHeight * 0.2 + videoCoordinates.top
  );

  function rollMethod() {
    var minX = videoCoordinates.left;
    // var minY = rect.top;
    // var maxX, maxY;
    // maxX = videoField.offsetWidth;
    // maxY = videoField.offsetHeight;
    commentSpan.style.left = xPos + 'px';
    commentSpan.style.top = yPos + 'px';
    xPos = xPos - speed;
    if (xPos < minX) {
      $(commentSpan).remove();
    }
  }
  // var floatGo =
  setInterval(rollMethod, delay);
}
/*
var danmaku = {
    comment_datas: [],
    ajaxLoadComments: function() {
        var videoId = location.href.substr(location.href.indexOf("=") + 1);
        var data = {
            call   : "loadComments",
            videoID: videoId
        };
        var self = this;
        chrome.extension.sendRequest(data, function(response) {
            self.comment_datas = JSON.parse(response.result);
        });
    }
//    start: function() {}
}
*/

/*

function displayer() {
    danmaku.ajaxLoadComments();
}*/

// function insert_comment_block() {
//   var textbox =
//     "<div id ='comment_block' class='yt-card'><form id='comment_form'><textarea id='comment' /><input type='submit' id='submit' value='Post'></form></div>";
//   $(textbox).insertBefore('#watch-discussion');

//   $('#submit').on('click', function (e) {
//     e.preventDefault();

//     var videoId = location.href.substr(location.href.indexOf('=') + 1);

//     var timestamp;
//     var time = document
//       .getElementsByClassName('ytp-time-current')[0]
//       .innerHTML.split(':');
//     if (time.length == 2) {
//       timestamp = Number(time[0]) * 60 + Number(time[1]);
//     } else {
//       timestamp =
//         Number(time[0] * 3600) + Number(time[1]) * 60 + Number(time[2]);
//     }

//     var comment = document.getElementById('comment').value;
//     comment = comment.replace(/(\r\n|\n|\r)/gm, ' ');
//     if (comment.length > 140) {
//       alert('Too many characters!');
//       return false;
//     }
//     var dataString =
//       'VideoId=' + videoId + '&Timestamp=' + timestamp + '&Comment=' + comment;

//     $.ajax({
//       type: 'POST',
//       url: 'https://youtubecomment.azurewebsites.net/youtube/upload.php',
//       data: dataString,
//       cache: false,
//       success: function (response) {
//         $('#comment_form').html(response);
//       },
//     });

//     return false;
//   });
// }

// var timeout = null;
// document.addEventListener(
//   'DOMSubtreeModified',
//   function () {
//     if (timeout) {
//       clearTimeout(timeout);
//     }
//     timeout = setTimeout(checkURL, 500);
//   },
//   false
// );

//setInterval(checkLiveTime, 500);

//window.onload = displayCommment("Comment is the best thing");

var intervalID = window.setInterval(checkLiveTime, 500);
