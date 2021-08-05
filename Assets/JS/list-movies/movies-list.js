/* conversor of image src to data */

import { imageCollector } from "./get-img-poster.js";

import { imageCollectorNewPoster } from "../list-movies/change-current-img-poster.js";

imageCollector();

/* session data */

const listLogin = JSON.parse(sessionStorage.getItem("currentUser"))[0];
const listPassword = JSON.parse(sessionStorage.getItem("currentUser"))[1];

/*- - - - -  - - -  - -- - movieList constructor create (C)rud - - - - - -- - - - - -- - - - -- - -- - - - - - - */

class itemList {
  constructor(
    poster,
    name,
    category,
    genre,
    releaseYear,
    login,
    senha,
    status
  ) {
    (this._poster = poster),
      (this._name = name),
      (this._category = category),
      (this._genre = genre),
      (this._releaseYear = releaseYear),
      (this._login = login),
      (this._senha = senha),
      (this._status = status);
  }
}

const listForm = document.querySelector("[data-form]");

listForm.addEventListener("submit", addItemTask);

function addItemTask(evento) {
  evento.preventDefault();

  const inputPosterConverted = document.getElementById("previewPoster").src;
  const inputNameVideo = document.querySelector("[data-movie-name]").value;
  const inputCategoryVideo = document.querySelector(
    "[data-movie-category]"
  ).value;
  const inputGenreVideo = document.querySelector("[data-genre]").value;
  const inputReleaseYear = document.querySelector("[data-movie-year]").value;
  const inputStatus = document.querySelector("[data-status]").value;

  const vetorList = JSON.parse(localStorage.getItem("ListMovies")) || [];
  vetorList.push(
    new itemList(
      inputPosterConverted,
      inputNameVideo,
      inputCategoryVideo,
      inputGenreVideo,
      inputReleaseYear,
      listLogin,
      listPassword,
      inputStatus
    )
  );
  localStorage.setItem("ListMovies", JSON.stringify(vetorList));

  window.location.href = "movierow.html";
}

/* - - - - - -- - - - - -- - - - -- - -- -  - - -- Render list - c(R)ud   - - - - -- - -  - - -- - -- - - - - - -- */

const currentUser = JSON.parse(sessionStorage.getItem("currentUser"))[0];
const currentPassword = JSON.parse(sessionStorage.getItem("currentUser"))[1];

const listMovie = JSON.parse(localStorage.getItem("ListMovies"));

const findlistMovieUser = listMovie.find(
  (atribute) => atribute._login == currentUser
);
const findlistMoviepassword = listMovie.find(
  (atribute) => atribute._senha == currentPassword
);

function renderList() {
  if (findlistMovieUser && findlistMoviepassword) {
    readList();
  }
}
renderList();

/* - - Filtro por usuário logado */

function readList() {
  function returnListUser(value) {
    if (value._login == findlistMovieUser._login) return value;
  }

  const listUser = listMovie.filter(returnListUser);

  listUser.forEach((register) => {
    const table = document.querySelector("[data-table]");

    /* criação da linha */
    const tr = document.createElement("tr");
    tr.classList.add('content__table__tbody-tr')

    /*  - - -conteudo - - - */

    /* poster */
    const tdPoster = document.createElement("td");
    tr.appendChild(tdPoster);
    tdPoster.innerHTML = `<img src="${register._poster}" data-tdPoster class="content__table__img content__table__tbody-item"/>`;

    /* name */
    const tdName = document.createElement("td");
    tr.appendChild(tdName);
    tdName.innerHTML = `<p class="td-name content__table__tbody-item" >${register._name}</p>`;

    /* category */
    const tdCategory = document.createElement("td");
    tr.appendChild(tdCategory);
    tdCategory.innerHTML = `<select value="" id="" data-genre><option value="" class="content__table__tbody-item">${register._category}</option><option value="Filme">Filme</option><option value="Série">Série</option><option value="Documentário">Documentário</option><option value="Novela">Novela</option><option value="Programa">Programa</option><option value="Animação">Animação</option></select>`;

    /* genre */
    const tdGenre = document.createElement("td");
    tr.appendChild(tdGenre);
    tdGenre.innerHTML = `<select value="" id="" data-genre><option value="" class="content__table__tbody-item">${register._genre}</option><option value="Ação">Ação</option><option value="Comédia">Comédia</option><option value="Drama">Drama</option><option value="Romance">Romance</option><option value="Terror">Terror</option><option value="Thriller">Thriller</option><option value="Suspense">Suspense</option></select>`;

    /* year */
    const tdYear = document.createElement("td");
    tr.appendChild(tdYear);
    tdYear.innerHTML = `<p class="content__table__tbody-year">${register._releaseYear}</p>`;

    /* status */
    const tdStatus = document.createElement("td");
    tr.appendChild(tdStatus);
    tdStatus.innerHTML = `<select value="" id="" data-status><option value="" class="content__table__tbody-item">${register._status}</option><option value="Já vi">Já vi</option><option value="Quero ver">Quero ver</option><option value="Abandonei">Abandonei</option><option value="Vendo">Vendo</option></select>`;

    const EditPoster = document.createElement("span");
    tr.appendChild(EditPoster);
    EditPoster.classList.add("previewNewPoster");

    /* Edit btn */

    const btnEdit = document.createElement("button");
    btnEdit.classList.add("btnEdit");
    btnEdit.classList.add("btn")
    btnEdit.textContent = "✏️";

    tr.appendChild(btnEdit);

    /* Delete btn */
    const tdBtnDelete = document.createElement("button");
    tdBtnDelete.classList.add("btnDelete");
    tdBtnDelete.classList.add('btn')
    tdBtnDelete.textContent = "🗑️";

    tr.appendChild(tdBtnDelete);

    table.appendChild(tr);
  });
}

/* - - - - - - -- - - - - - -- - -- - - - - - - Edit - - cr(U)d   - - - - -- - - - - -- - - - -- - -- - - - - - -*/

const btnEditarArray = document.querySelectorAll(".btnEdit");

btnEditarArray.forEach((btnEditar) => {
  btnEditar.addEventListener("click", (evento) => {
    const currentUsertoEditItem = listMovie.find(
      (atribute) => atribute._login == currentUser
    );

    if (currentUsertoEditItem) {
      btnEditar.innerHTML = `<button data-btnConfirmarAlt class="btn">✔️</button>`;

      /* - - Poster collectData  - -*/
      const currentTdPoster = evento.target.closest("tr").firstChild;
      currentTdPoster.innerHTML = `<input type="file" id="newPoster" data-img-PosterEdit>`;
      imageCollectorNewPoster();

      /*  - - Name  collectData- -*/
      const currentTDName = evento.target.closest("tr").firstChild.nextSibling;

      currentTDName.innerHTML = `<input type="text" id="newName" placeholder="${currentTDName.textContent}">`;

      /*  - - Year  collectData- -*/
      const currentTDYear =
        evento.target.closest("tr").firstChild.nextSibling.nextSibling
          .nextSibling.nextSibling;
      currentTDYear.innerHTML = `<input type="text" id="newCategory" placeholder="${currentTDYear.textContent}">`;

      /* - - - change current itens - - */

      const btnConfirmarAlt = document.querySelector("[data-btnConfirmarAlt]");

      btnConfirmarAlt.addEventListener("click", (evento) => {
        /* - - -nome - - - */

        const newNameInput =
          evento.target.closest("tr").firstChild.nextSibling.children[0];

        const currentNameInput = newNameInput.placeholder;

        /* - - -validation -  - - - */

        const findCurrentEdit = listMovie.find(
          (atribute) => atribute._name == currentNameInput
        );
        const findCurrentEditor = listMovie.find(
          (atribute) => atribute._login == currentUser
        );

        if (findCurrentEdit && findCurrentEditor) {
          if (newNameInput.value == "") {
            console.log("manter nome atual");
          } else {
            findCurrentEdit._name = newNameInput.value;
          }

          /* - - -poster- - - */

          const newPosterInput =
            evento.target.closest("tr").lastChild.previousElementSibling
              .previousElementSibling.src;

          if (newPosterInput == undefined) {
            console.log("manter imagem atual");
          } else {
            findCurrentEdit._poster = newPosterInput;
          }

          /* - - -category- - - */

          const newCategoryInput =
            evento.target.closest("tr").firstChild.nextSibling.nextSibling
              .children[0].value;

          if (newCategoryInput == "") {
            console.log("manter categoria atual");
          } else {
            findCurrentEdit._category = newCategoryInput;
          }

          /* - - -genre- - - */

          const newGenreInput =
            evento.target.closest("tr").firstChild.nextSibling.nextSibling
              .nextSibling.children[0].value;

          if (newGenreInput == "") {
            console.log("manter genêro atual");
          } else {
            findCurrentEdit._genre = newGenreInput;
          }

          /* - - -year- - - */

          const newYearInput =
            evento.target.closest("tr").firstChild.nextSibling.nextSibling
              .nextSibling.nextSibling.children[0].value;

          if (newYearInput == "") {
            console.log("manter ano atual");
          } else {
            findCurrentEdit._releaseYear = newYearInput;
          }

          /* - - -status- - - */

          const newStatusInput =
            evento.target.closest("tr").firstChild.nextSibling.nextSibling
              .nextSibling.nextSibling.nextSibling.children[0].value;

          console.log(newStatusInput);

          if (newStatusInput == "") {
            console.log("manter status atual");
          } else {
            findCurrentEdit._status = newStatusInput;
          }

          localStorage.setItem("ListMovies", JSON.stringify(listMovie));

          window.location.href = "movierow.html";
        }
      });
    }
  });
});

/* -  - - - - -- - - - - -- -- -- - - - - - -- Delete - - cru(D)  - - - - -- - - - - -- - - - -- - -- - - - - - - */

const btnDeleteArray = document.querySelectorAll(".btnDelete");

btnDeleteArray.forEach((btnDelete) => {
  btnDelete.addEventListener("click", (evento) => {
    const trNameMovie =
      evento.target.closest("tr").firstChild.nextElementSibling.lastElementChild
        .textContent;

    const findTrNameMovie = listMovie.find(
      (atribute) => atribute._name == trNameMovie
    );

    let i = 0;

    let foundPosition = listMovie[i] == findTrNameMovie;

    while (foundPosition == false) {
      i++;
    }

    if (foundPosition == true) {
      listMovie.splice(i, 1);

      localStorage.setItem("ListMovies", JSON.stringify(listMovie));

      window.location.href = "movierow.html";
    }
  });
});
