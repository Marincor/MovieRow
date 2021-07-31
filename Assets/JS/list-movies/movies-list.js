/* conversor of image src to data */ 

import { imageCollector } from "./get-img-poster.js"

import { imageCollectorNewPoster} from "../list-movies/change-current-img-poster.js"

imageCollector();





/* session data */ 

const listLogin = JSON.parse(sessionStorage.getItem('currentUser'))[0];
const listPassword = JSON.parse(sessionStorage.getItem('currentUser'))[1];



    
/* movieList constructor create (C)rud */

class itemList {


    constructor(poster, name, category, genre, releaseYear, login, senha) {

        this._poster = poster,
        this._name = name,
        this._category = category,
        this._genre = genre,
        this._releaseYear = releaseYear,
        this._login = login,
        this._senha = senha,

        this._status = ''
    }
}





const listForm = document.querySelector('[data-form]');

listForm.addEventListener('submit' , addItemTask )
    

function addItemTask (evento) {

    evento.preventDefault()

    const inputPosterConverted = document.getElementById("previewPoster").src;
    const inputNameVideo = document.querySelector('[data-movie-name]').value;
    const inputCategoryVideo = document.querySelector('[data-movie-category]').value;
    const inputGenreVideo = document.querySelector('[data-genre]').value;
    const inputReleaseYear = document.querySelector('[data-movie-year]').value

    const vetorList = JSON.parse(localStorage.getItem('ListMovies')) || [];
    vetorList.push(new itemList(inputPosterConverted, inputNameVideo, inputCategoryVideo, inputGenreVideo, inputReleaseYear,listLogin,listPassword));
    localStorage.setItem('ListMovies', JSON.stringify(vetorList));

    window.location.href = "movierow.html"
   
}



  




/* - - Render list - c(R)ud  - */



const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))[0];
const currentPassword = JSON.parse(sessionStorage.getItem('currentUser'))[1];

const listMovie = JSON.parse(localStorage.getItem('ListMovies'));





    const findlistMovieUser = listMovie.find(atribute => atribute._login == currentUser);
    const findlistMoviepassword = listMovie.find(atribute => atribute._senha == currentPassword);
    
    function renderList ( ) {

        if(findlistMovieUser && findlistMoviepassword) {

            readList()
        }
    
    }
    renderList();
    

    /* - - Filtro por usuário logado */ 

    function readList() {

        function returnListUser (value){
            if (value._login == findlistMovieUser._login)
            return value;
        }
    
        const listUser = listMovie.filter(returnListUser);
    
        listUser.forEach(register => { 
    
            
    
            const table = document.querySelector('[data-table]');
    
             /* criação da linha */
             const tr = document.createElement('tr');
            
     
          /*  - - -conteudo - - - */
     
             /* poster */ 
             const tdPoster = document.createElement('td');
             tr.appendChild(tdPoster)
             tdPoster.innerHTML = `<img src="${register._poster}" data-tdPoster />`;
     
             /* name */ 
             const tdName = document.createElement('td')
             tr.appendChild(tdName)
             tdName.innerHTML = `<p>${register._name}</p>`
           
             
             /* category */ 
             const tdCategory = document.createElement('td')
             tr.appendChild(tdCategory)
             tdCategory.innerHTML = `<p>${register._category}</p>`
     
             /* genre */ 
             const tdGenre = document.createElement('td')
             tr.appendChild(tdGenre)
             tdGenre.innerHTML = `<p>${register._genre}</p>`
             
             /* year */ 
             const tdYear = document.createElement('td')
             tr.appendChild(tdYear)
             tdYear.innerHTML = `<p>${register._releaseYear}</p>`
     
             /* status */ 
             const tdStatus = document.createElement('td')
             tr.appendChild(tdStatus)
             tdStatus.innerHTML =  `<select name="${register._status}" id="" data-status><option value="Já vi">Já vi</option><option value="Quero ver">Quero ver</option><option value="Abandonei">Abandonei</option><option value="Vendo">Vendo</option></select>`
     
              /* Edit btn */ 

              
             const btnEdit = document.createElement('button');
             btnEdit.classList.add("btnEdit")
             btnEdit.textContent = "Editar"
             
              tr.appendChild(btnEdit)
            
              /* Delete btn */ 
              const tdBtnDelete = document.createElement('button');
              tdBtnDelete.textContent = "Excluir"
              tr.appendChild(tdBtnDelete)
            
              table.appendChild(tr);
    
        })
    

    }

        /* - - Edit - - cr(U)d */ 

        const btnEditarArray = document.querySelectorAll('.btnEdit');

        btnEditarArray.forEach( btnEditar => {

            btnEditar.addEventListener('click', (evento)=> {

                const currentUsertoEditItem = listMovie.find(atribute => atribute._login == currentUser)
    
                if (currentUsertoEditItem) {
    
                    btnEditar.innerHTML = `<button data-btnConfirmarAlt> Confirmar alteração </button>`
    
    
                /* - - Poster collectData  - -*/
                const currentTdPoster =  evento.target.closest('tr').firstChild;
                currentTdPoster.innerHTML = `<input type="file" id="newPoster" data-img-PosterEdit>`
                const newPosterConverted = document.querySelector('#previewNewPoster');
                imageCollectorNewPoster();
    
                /*  - - Name  collectData- -*/
                const currentTDName = evento.target.closest('tr');
               
                console.log(currentTDName)
                
    
              
                /* - - - change current itens - - */ 
        
                    const btnConfirmarAlt = document.querySelector('[data-btnConfirmarAlt]');

                    btnConfirmarAlt.addEventListener('click', (evento) => { 

                        let newPoster = listMovie.find(atribute => atribute._poster = newPosterConverted.src);
        
                    
                
                        const newVetorEdit = listMovie || [];
                        localStorage.setItem('ListMovies', JSON.stringify(newVetorEdit));
        
                        
                        window.location.href = "movierow.html"
                    })

                }
                
             })

        })
          /* - - Delete - - cru(D) */ 

         