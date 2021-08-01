/* conversor of image src to data */ 

import { imageCollector } from "./get-img-poster.js"

import { imageCollectorNewPoster} from "../list-movies/change-current-img-poster.js"

imageCollector();





/* session data */ 

const listLogin = JSON.parse(sessionStorage.getItem('currentUser'))[0];
const listPassword = JSON.parse(sessionStorage.getItem('currentUser'))[1];



    
/* movieList constructor create (C)rud */

class itemList {


    constructor(poster, name, category, genre, releaseYear, login, senha, status) {

        this._poster = poster,
        this._name = name,
        this._category = category,
        this._genre = genre,
        this._releaseYear = releaseYear,
        this._login = login,
        this._senha = senha,
        this._status = status
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
    const inputStatus = document.querySelector('[data-status]').value

    const vetorList = JSON.parse(localStorage.getItem('ListMovies')) || [];
    vetorList.push(new itemList(inputPosterConverted, inputNameVideo, inputCategoryVideo, inputGenreVideo, inputReleaseYear,listLogin,listPassword, inputStatus));
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
             tdName.innerHTML = `<p class="td-name">${register._name}</p>`
           
             
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
             tdStatus.innerHTML =  `<select value="" id="" data-status><option value="">${register._status}</option><option value="Já vi">Já vi</option><option value="Quero ver">Quero ver</option><option value="Abandonei">Abandonei</option><option value="Vendo">Vendo</option></select>`

             const EditPoster = document.createElement('span');
             tr.appendChild(EditPoster);
             EditPoster.classList.add('previewNewPoster')
     
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
                imageCollectorNewPoster();
    
                /*  - - Name  collectData- -*/
                const currentTDName = evento.target.closest('tr').firstChild.nextSibling;
            
                currentTDName.innerHTML = `<input type="text" id="newName" placeholder="${currentTDName.textContent}">`

                /*  - - Category  collectData- -*/

                const currentTDCategory = evento.target.closest('tr').firstChild.nextSibling.nextSibling;
                currentTDCategory.innerHTML = `<input type="text" id="newCategory" placeholder="${currentTDCategory.textContent}">`

                 /*  - - Genre  collectData- -*/
                 const currentTDGenre = evento.target.closest('tr').firstChild.nextSibling.nextSibling.nextSibling;
                 currentTDGenre.innerHTML = `<input type="text" id="newCategory" placeholder="${currentTDGenre.textContent}">`

                 /*  - - Year  collectData- -*/
                 const currentTDYear = evento.target.closest('tr').firstChild.nextSibling.nextSibling.nextSibling.nextSibling;
                 currentTDYear.innerHTML = `<input type="text" id="newCategory" placeholder="${currentTDYear.textContent}">`

                 /*  - - Status  collectData- -*/
                 const currentTDStatus = evento.target.closest('tr').firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.lastChild;

        
             
                
    
              
                /* - - - change current itens - - */ 
        
                    const btnConfirmarAlt = document.querySelector('[data-btnConfirmarAlt]');
             
                    btnConfirmarAlt.addEventListener('click', (evento) => { 

                        



                        /* - - -nome - - - */ 

                        
                       const newNameInput = evento.target.closest('tr').firstChild.nextSibling.children[0];

                       const currentNameInput = newNameInput.placeholder;

                       
                        /* - - -validation -  - - - */ 

                       const findCurrentEdit =  listMovie.find(atribute => atribute._name == currentNameInput);
                       const findCurrentEditor = listMovie.find(atribute => atribute._login == currentUser);

                        if( findCurrentEdit && findCurrentEditor ) {

                         
                            if(newNameInput.value == '') {

                                console.log('manter nome atual')
                            }else{

                                findCurrentEdit._name = newNameInput.value;

                            }
                               
                            
                            

                                /* - - -poster- - - */   

                            

                            const newPosterInput = evento.target.closest('tr').lastChild.previousElementSibling.previousElementSibling.src;

                            if (newPosterInput == undefined){
                               
                             console.log ('manter imagem atual')
                            }else {
     
                             findCurrentEdit._poster = newPosterInput
                            }


                            /* - - -category- - - */  

                            const newCategoryInput = evento.target.closest('tr').firstChild.nextSibling.nextSibling.children[0].value;

                            if(newCategoryInput == '') {

                                console.log('manter categoria atual')
                            }else{

                                findCurrentEdit._category = newCategoryInput;

                            }

                              /* - - -genre- - - */  
                             
                              const newGenreInput = evento.target.closest('tr').firstChild.nextSibling.nextSibling.nextSibling.children[0].value;

                              if(newGenreInput == '') {
  
                                  console.log('manter genêro atual')
                              }else{
  
                                  findCurrentEdit._genre = newGenreInput;
  
                              }

                              /* - - -year- - - */  
                             
                              const newYearInput = evento.target.closest('tr').firstChild.nextSibling.nextSibling.nextSibling.nextSibling.children[0].value;

                              if(newYearInput == '') {
  
                                  console.log('manter ano atual')
                              }else{
  
                                  findCurrentEdit._releaseYear = newYearInput;
  
                              }

                              /* - - -status- - - */  
                             
                              const newStatusInput = evento.target.closest('tr').firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.children[0].value;

                              console.log(newStatusInput)
                            
                                if (newStatusInput == '') {

                                    console.log('manter status atual')
                                } else {

                                    findCurrentEdit._status = newStatusInput;
                                }
  
                                  
  
                              

                           

     
                            localStorage.setItem('ListMovies', JSON.stringify(listMovie));

                            window.location.href = "movierow.html"
                        }
         
                    

                        
                      

                      // const currentNameInput = newNameInput.placeholder;

                            
                        
                
                    })

                }
                
             })

        })
          /* - - Delete - - cru(D) */ 

         