window.addEventListener("load",main);

function _(id){
    return document.getElementById(id);
}
function main(){
    _("signup-form").addEventListener("submit",validate);
}
function validate(event){
    event.preventDefault();
    var formData = new FormData(event.target)
    // target
    var name =formData.get("Name")
    var username = formData.get("Username")
    var email = formData.get("mail-id")
    var password = formData.get("Password")
    var confirmPassword = formData.get("confirmpassword")
    var phone = formData.get("PhoneNumber")
    nameValidation(name,"name-error");
    emailValidation(email,"mail-id-error");
    phoneNumberValidation(phone,"phoneNumber-error")
}
    // if(!Username && Username<10)
    // _("username-error").innerHTML = "Please enter username"
    // if(!mail id)
    // _("mail id-error").innerHTML = "Please enter valid mail id"
    // if(phoneNumber<10)
    // _("phonenmber-error").innerHTML = "Please enter valid mail id"
    

    function nameValidation(value,id){
        isEmptyOrShort(value, id , 3, "Name");
    }

    function isEmptyOrShort(value, id, minlength, key){
        if(!value){
            setError(id, "Please enter your"+key);
            return;
        }
        if(value.length < minlength){
            setError(id, key + "must be atleast" + minlength + "characters");
        return;
        }
        setError(id, "");

    }

    function emailValidation(value, id){
        if(!value){
            setError(id,"please enter your email");
            return;
        }
        if (!value.includes("@")) {
            setError(id, "Please enter a valid email");
            return;
        }
        setError(id, "");
    }
    function  phoneNumberValidation(value,id){
        isEmptyOrShort(value, id , 10, "phoneNumber");
    }

    function isEmptyOrShort(value, id, minlength, key)
    {
        if(!value){
            setError(id,"please enter your phoneNumber");
            return;
        }
        
        if(value.length < minlength){
            setError(id,"atLeast"+ minlength+"is needed" )
            return;
        }
        setError(id, "");



    }

    function setError(id, message){
        _(id).innerHTML = message;
    }
