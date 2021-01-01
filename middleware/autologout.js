import firebase from 'firebase'

export default function () {
  var auth = firebase.auth().currentUser

  if (auth != null) {
    firebase.auth().signOut()
  }
}
