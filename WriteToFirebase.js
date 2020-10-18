// add the bottom 2 scripts to html file
{
  /* <script src="https://www.gstatic.com/firebasejs/7.24.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.24.0/firebase-firestore.js"></script> */
}
const { doesNotMatch } = require('assert');
const firebase = require('firebase');
var admin = require('firebase/firestore');

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
    let dataObj = {};
    if (docSnapshot.exists) {
      usersRef.onSnapshot((doc) => {
        var data = doc.data();
        if (data[timeStamp] == null || data[timeStamp] == '') {
          dataObj[timeStamp] = [comment];
          console.log('in if');
          usersRef.update(dataObj).then(function () {
            console.log('end');
          });
        } else {
          dataObj[timeStamp] = data[timeStamp];
          dataObj[timeStamp].push(comment);
          console.log('in else');
          usersRef.update(dataObj).then(function () {
            console.log('end');
          });
        }
      });
    } else {
      let dataObj = {};
      dataObj[timeStamp] = [comment];
      console.log('in a very different place');
      usersRef.set(dataObj).then(function () {
        console.log('end');
      });
    }
  });
}
// var count = 0;
// if (count == 0) {
//   writeData('new2', '00:17', 'hi');
//   count++;
// }
