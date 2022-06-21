export function loadEditPhoto() {
    $("#pictureField").change(function (e) { 
        e.preventDefault();
        
        const choosedFile = this.files[0];
        if (choosedFile) {
            const reader = new FileReader();
            const photo = document.getElementById("photo");
            
            reader.addEventListener('load', function(){
                photo.setAttribute("src", reader.result);
            });

            reader.readAsDataURL(choosedFile);
        }
    });
}