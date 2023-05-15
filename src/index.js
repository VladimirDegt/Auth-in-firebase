import { onClickSignUp } from "./js/auth-listeners/on-click-sign-up";
import { onClickSignIn } from "./js/auth-listeners/on-click-sign-in";
import { onClickLogOut } from "./js/auth-listeners/on-click-log-out";
import { onClickGoogle } from "./js/auth-listeners/on-click-google";

document.querySelector('#signUp').addEventListener('click', onClickSignUp);
document.querySelector('#signIn').addEventListener('click', onClickSignIn);
document.querySelector('#logOut').addEventListener('click', onClickLogOut);
document.querySelector('#google').addEventListener('click', onClickGoogle);




