/* get sessiontime do block direct acess to movierow.html page*/

const time = new Date();
const hora= time.getHours();
/* every session take 15min */

/* function to get a zero before the second number of minuto (ex: 02 min) */

function newhour() {
    function pad(s) {
        return (s < 10) ? '0' + s : s;
    }
    var date = new Date();
    return [date.getHours(), date.getMinutes()-15].map(pad).join(':');
}
/* - - - -*/

const min = newhour();
const currentTime = `${hora}:${min}`




const day = time.getDate();
const month = time.getMonth();
const actualMonth = month + 1;
const year = time.getFullYear()
const currentDate = `${day}/${actualMonth}/${year}`

const currentDateTime = `${currentDate} - ${currentTime}`

const currentDateSession = JSON.parse(sessionStorage.getItem ('sessionLogin'));


if  (currentDateTime < currentDateSession) {

    /* web api collector */

    const dataLocal = JSON.parse(localStorage.getItem("Users"));

    const dataSession = JSON.parse(sessionStorage.getItem("currentUser"));
    const dataSessionLogin = dataSession[0];
    const dataSessionPass = dataSession[1];

    /* request and fill of profile informations */

    const trueLogin = dataLocal.find(
      (atribute) => atribute._login == dataSessionLogin
    );
    const truePassword = dataLocal.find(
      (atribute) => atribute._senha == dataSessionPass
    );

    if (trueLogin && truePassword) {
        

      const img = (document.querySelector("#profileImage").src = trueLogin._avatar || "./Assets/IMG/profile-null/blank-profile-picture.jpg") ;

      const userName = document.querySelector("[data-nome]");
      userName.innerHTML = `Olá, ${trueLogin._nome}`;
    }

   

}
/* after 15min pass and a load happen (or change browser tab) session end */
else {

  window.location.href = 'index.html'
}