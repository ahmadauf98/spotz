import firebase from 'firebase'

export default function () {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('Authenticated User')
      firebase.auth().signOut()
    } else {
      console.log('Public User')
    }
  })
}
