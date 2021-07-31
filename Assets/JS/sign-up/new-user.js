import { imageCollector } from "./get-image.js";

imageCollector();



class Usuario {
  constructor(avatar, nome, login, senha) {
    this._avatar = avatar;
    this._nome = nome;
    this._login = login;
    this._senha = senha;
  }
}




const signForm = document.querySelector("[data-form-sign-up]");

signForm.addEventListener("submit", (evento) => {
  evento.preventDefault();

  /* input avatar */
  const getImage = sessionStorage.getItem("imagem");
  const deleteImage = sessionStorage.removeItem("imagem");
  const deleteInputImg = (document.querySelector("[data-sign-avatar]").value =
    "");

  /* input nome */
  const inputName = document.querySelector("[data-sign-name]").value;

  /* input login */
  const inputLogin = document.querySelector("[data-sign-login]").value;

  /* input senha */
  const inputSenha = document.querySelector("[data-sign-senha]").value;


  const vetor = JSON.parse(localStorage.getItem("Users")) || [];

  vetor.push(new Usuario(getImage, inputName, inputLogin, inputSenha));

  localStorage.setItem("Users", JSON.stringify(vetor));
  window.location.href = 'signupconclusion.html'
});
