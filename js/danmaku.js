var comments = {
  '00:00:01': ['Welcome to the recording!'],
};
var firebaseConfig = {
  apiKey: 'AIzaSyCZ4aKEj0k1tOXw9C1fbhgbs5lXU7GQMQ0',
  authDomain: 'dubhacks-292821.firebaseapp.com',
  databaseURL: 'https://dubhacks-292821.firebaseio.com',
  projectId: 'dubhacks-292821',
  storageBucket: 'dubhacks-292821.appspot.com',
  messagingSenderId: '186332677431',
  appId: '1:186332677431:web:94290b053b2adf92b7c6b2',
  measurementId: 'G-VGGMLBTLY1',
};

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

function writeData(classId, timeStamp, comment) {
  const usersRef = db.collection('Classes').doc(classId);
  usersRef.get().then((docSnapshot) => {
    // makes sure class exists
    let dataObj = {};
    if (docSnapshot.exists) {
      var data = docSnapshot.data();
      if (data[timeStamp] == null || data[timeStamp] == '') {
        dataObj[timeStamp] = [comment];
        usersRef.update(dataObj);
        return true;
      } else {
        dataObj[timeStamp] = data[timeStamp];
        dataObj[timeStamp].push(comment);
        console.log(dataObj);
        usersRef.update(dataObj);
        return true;
      }
    } else {
      let dataObj = {};
      dataObj[timeStamp] = [comment];
      usersRef.set(dataObj);
      return true;
    }
  });
}

function getURL() {
  var href = location.href.split('/');

  return href[5].split('?')[0];
}

console.log(getURL());

async function readData(classId) {
  const data = await db
    .collection('Classes')
    .doc(classId)
    .get()
    .then((res) => {
      return res.data();
    });
  return data;
}

async function callAsync() {
  comments = await readData(getURL());
}

callAsync();

var i = 0;
flag = false;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  writeDataToFireBase(request.comment);
  sendResponse({ confirm: 'received' });
});

function writeDataToFireBase(comment) {
  if (comment !== "") {
    insertComment(comment);
    var liveTime = getVideoTime();
    var href = getURL();
    //console.log(href);
    //console.log(comment);
    writeData(href, liveTime, comment);
  }

}

var prev_livetime = '';
function checkLiveTime() {
  var liveTime = getVideoTime();
  if (prev_livetime == liveTime) {
  } else {
    prev_livetime = liveTime;
    console.log('checkLiveTime is working');
    if (comments && comments[liveTime]) {
      insertComments(comments[liveTime], liveTime);
    }
  }
}

function getVideoTime() {
  var timestamp = 0;
  var element = document.getElementsByClassName('vjs-time-range-current');
  if (element.length > 0) {
    timestamp = element[0].innerHTML;
  }
  return timestamp;
}

function insertComments(commentsAtTime, liveTime) {
  console.log('insertsComments');
  console.log(commentsAtTime);
  for (j = 0; j < commentsAtTime.length; j++) {
    insertComment(comments[liveTime][j]);
  }
}
function insertComment(commentText) {
  var commentSpan = document.createElement('span');
  var t = document.createTextNode(commentText);
  commentSpan.appendChild(t);
  var color =
    '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
  $(commentSpan).css({
    position: 'absolute',
    width: 'auto',
    'max-width': '250px',
    'white-space': 'nowrap',
    color: color,
    height: '25px',
    left: '0',
    top: '0',
    cursor: 'pointer',
    'font-weight': '600',
    'font-size': '500',
    'z-index': '300000',
  });
  document.body.appendChild(commentSpan);

  var speed = Math.floor(Math.random() * 3) + 1;
  var delay = 5; //was 10
  var videoDiv = document.getElementsByClassName('player-view')[0];
  var videoCoordinates = videoDiv.getBoundingClientRect();
  var xPos = videoCoordinates.right - commentSpan.offsetWidth;
  var yPos =
    Math.floor(Math.random() * videoDiv.offsetHeight + videoCoordinates.top) -
    25;
  if (yPos < videoCoordinates.top) {
    yPos = videoCoordinates.top;
  }
  function rollMethod() {
    var minX = videoCoordinates.left;
    commentSpan.style.left = xPos + 'px';
    commentSpan.style.top = yPos + 'px';
    xPos = xPos - speed;
    if (xPos < minX) {
      $(commentSpan).remove();
    }
  }
  setInterval(rollMethod, delay);
}

function insertComments(commentsAtTime, liveTime) {
  console.log('insertsComments');
  console.log(commentsAtTime);
  for (j = 0; j < commentsAtTime.length; j++) {
    insertComment(comments[liveTime][j]);
  }
}


// var intervalID =
window.setInterval(checkLiveTime, 1000);
