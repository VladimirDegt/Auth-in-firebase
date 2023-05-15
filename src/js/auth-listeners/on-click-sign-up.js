import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { ref, set } from "firebase/database";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { auth, database } from "./auth-config-firebase";

export function onClickSignUp (e) {

  const username = document.querySelector('[name="username"]').value
  const email = document.querySelector('[name="email"]').value
  const password = document.querySelector('[name="password"]').value

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    set(ref(database, 'users/' + user.uid), {
      username,
      email,
    })
    Notify.success('Пользователь зарегистрирован!')
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message; 
    Notify.failure(errorMessage);
  });
};

  const user = auth.currentUser;
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log('пользователь зарегистрировался и ему доступен следующий контент');
    } else {
    }
  });

