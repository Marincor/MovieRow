const btnOut = document.querySelector('[data-out]');

btnOut.addEventListener('click', ()=>{

    sessionStorage.removeItem('sessionLogin');

    window.location.href = "index.html"
})