import { onFormSubmit, onClickLogOut } from "./js/listeners/onFormSubmit";
import { refs } from "./js/refs-elements";

refs.form.addEventListener('submit', onFormSubmit);
document.querySelector('#logOut').addEventListener('click', onClickLogOut);




