import firebase from 'firebase'

export default function () {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      firebase.auth().signOut()
    }
  })
}
