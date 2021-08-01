export const imageCollectorNewPoster = () => {




    const inputnewPoster = document.querySelector('#newPoster');
    
    
    
    function readImage() {
    if (this.files && this.files[0]) {
        var file = new FileReader();
        file.onload = function(e) {
     
            const previewPoster = document.querySelectorAll(".previewNewPoster");

            previewPoster.forEach(span => {

                span.src = e.target.result;
            })
           
           
            
        };       
        file.readAsDataURL(this.files[0]);
    }
    
    
    }
    inputnewPoster.addEventListener("change", readImage, false);
    
    
    
    }