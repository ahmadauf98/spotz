import firebase from 'firebase'

export default function ({ redirect }) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // console.log('Authenticated User')
    } else {
      return redirect('/')
    }
  })
}
