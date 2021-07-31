export const imageCollector = () => {




    const inputPoster = document.querySelector('#myFileInput');
    
    
    
    function readImage() {
    if (this.files && this.files[0]) {
        var file = new FileReader();
        file.onload = function(e) {
     
            const previewPoster = document.getElementById("previewPoster").src = e.target.result;
           
           
            
        };       
        file.readAsDataURL(this.files[0]);
    }
    
    
    }
    inputPoster.addEventListener("change", readImage, false);
    
    
    
    }