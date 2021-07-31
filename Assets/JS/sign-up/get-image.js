

export const imageCollector = () => {




const imgInput = document.querySelector('#myAvatarInput');



function readImage() {
if (this.files && this.files[0]) {
    var file = new FileReader();
    file.onload = function(e) {
 
        const preview = document.getElementById("previewCollector").src = e.target.result;
       
       
        sessionStorage.setItem('imagem', preview)
    };       
    file.readAsDataURL(this.files[0]);
}


}
imgInput.addEventListener("change", readImage, false);




}

