import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
    apiKey: "AIzaSyA0IzrknKgr35F-QFrH66pIQBmQpOi39Is",
    authDomain: "fast-trace-6ba7f.firebaseapp.com",
    databaseURL: "https://fast-trace-6ba7f.firebaseio.com",
    projectId: "fast-trace-6ba7f",
    storageBucket: "fast-trace-6ba7f.appspot.com",
    messagingSenderId: "304308000260",
    appId: "1:304308000260:web:bdf1ec2130b1d38c88c751",
})

export const auth = app.auth()
export default app
