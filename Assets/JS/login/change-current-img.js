const imageCollectorNewProfile = () => {
  const inputNewProfile = document.querySelector("#profileChangeimg");

  function readImage() {
    if (this.files && this.files[0]) {
      var file = new FileReader();
      file.onload = function (e) {
        const previewPoster = (document.querySelector(
          "#previewNewProfile"
        ).src = e.target.result);

        const previewPosterSRC =
          document.querySelector("#previewNewProfile").src;

        sessionStorage.setItem("provisorePIc", previewPosterSRC);
      };
      file.readAsDataURL(this.files[0]);
    }
  }
  inputNewProfile.addEventListener("change", readImage, false);
};

imageCollectorNewProfile();

/* - - - --  Task Change  - -- - - - */

const inputNewProfileImg = document.querySelector("#profileChangeimg");

const currentSessionUser = JSON.parse(sessionStorage.getItem("currentUser"))[0];
const currentSessionPass = JSON.parse(sessionStorage.getItem("currentUser"))[1];

const usersSotrage = JSON.parse(localStorage.getItem("Users"));

const findCurrentSessionUser = usersSotrage.find(
  (atribute) => atribute._login == currentSessionUser
);
const findCurrentSessionPass = usersSotrage.find(
  (atribute) => atribute._senha == currentSessionPass
);

inputNewProfileImg.addEventListener("change", () => {
  if (!inputNewProfileImg.value == "") {
    inputNewProfileImg.value = "";

    const btnConf = document.createElement("button");

    btnConf.textContent = "confirmar nova foto de perfil";

    const div = document.querySelector("[data-dados]");

    div.appendChild(btnConf);

    btnConf.addEventListener("click", () => {
      const newProfIMGconverted = sessionStorage.getItem("provisorePIc");

      findCurrentSessionUser._avatar = newProfIMGconverted;

      localStorage.setItem("Users", JSON.stringify(usersSotrage));

      window.location.href = "movierow.html";
    });
  }
});
