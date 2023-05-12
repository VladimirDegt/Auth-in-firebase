import { initializeApp } from "firebase/app";
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, update } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC7Z7_-Y0HZydiU1oV6nn67k_xdA2wTdKw",
  authDomain: "auth-4cd7f.firebaseapp.com",
  projectId: "auth-4cd7f",
  storageBucket: "auth-4cd7f.appspot.com",
  messagingSenderId: "584186100730",
  appId: "1:584186100730:web:7d9867ccbf4b0067e48243",
  databaseURL: "https://auth-4cd7f-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app)

export function onFormSubmit (e) {
    e.preventDefault();

    const username = e.target.elements.username.value
    const email = e.target.elements.email.value
    const password = e.target.elements.password.value

    if(document.querySelector('#signUp')){
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

        const user = userCredential.user;
  
        set(ref(database, 'users/' + user.uid), {
          username,
          email,
        })
        console.log('user created!');
        alert('user created!')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
  
        alert(errorMessage);
    });
    } else if(document.querySelector('#signIn')) {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        const dt = new Date();
        update(ref(database, 'users/' + user.uid), {
          last_login: dt,
        })

        alert('user loged in!')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alert(errorMessage);
  });
    }
  };

  const user = auth.currentUser;
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log('пользователь в сис-ме и можно ему разрешить сделать ...');
    } else {

    }
  });

  export function onClickLogOut() {
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log('пользователь вышел');
      alert('user loged out')
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage);
    });
  }