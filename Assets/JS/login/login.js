
/* login information */ 


/* login form */ 

const form = document.querySelector('[data-login-form]');




form.addEventListener('submit', (event)=>{

    event.preventDefault();

    /* validation of the login and password */ 

    const users = JSON.parse(window.localStorage.getItem('Users'));

    
    const loginInput = document.querySelector('[data-login]').value;
    const passwordInput = document.querySelector('[data-login-password]').value;
    

    const currentLogin = users.find(atribute => atribute._login == loginInput);
    const currentPassword = users.find(atribute => atribute._senha == passwordInput);

    if (currentLogin && currentPassword) {

        /* success session - hour definition */ 
        const time = new Date();
        const hora= time.getHours()

/* function to get a zero before the second number of minuto (ex: 02 min) */

function newhour() {
    function pad(s) {
        return (s < 10) ? '0' + s : s;
    }
    var date = new Date();
    return [date.getHours(), date.getMinutes()].map(pad).join(':');
}
/* - - - -*/

        const min = newhour;


       
        const currentTime = `${hora}:${min}`

        const day = time.getDate();
        const month = time.getMonth();
        const actualMonth = month + 1;
        const year = time.getFullYear()
        const currentDate = `${day}/${actualMonth}/${year}`

        const currentDateTime = `${currentDate} - ${currentTime}`

        
        sessionStorage.setItem('sessionLogin', JSON.stringify(currentDateTime))

       const data = [loginInput,passwordInput]

     


        sessionStorage.setItem ('currentUser', JSON.stringify(data));


        /* redirect */

        window.location.href = "movierow.html"

    }
    /* wrong login */ 
    else{

        const divAlert = document.querySelector('[data-alert]');
        divAlert.innerHTML = `<h2> Senha Incorreta </h2>` 

    
            
        
    }

   
})
