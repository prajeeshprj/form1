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
    var username = formData.get("username")
    var email = formData.get("mail-id")
    var password = formData.get("password")
    var confirmPassword = formData.get("confirmPassword")
    var phone = formData.get("phoneNumber")

  if(  nameValidation(name,"name-error")&&
    emailValidation(email,"mail-id-error")&&
    phoneNumberValidation(phone,"phoneNumber-error")&&
    passwordValidation(password,"password-error")&&
    confirmPasswordValidation(confirmPassword,password,"confirmPassword-error")&&
    usernameValidation( username,"username-error")
  ){
    submit({
        name,
        email,
        password,
        phone,
        username
    });
}else{
    console.log("failed");
}

}
function submit(data) {
let postRequest = function (url,data ){
return new Promise(function(resolve, reject){
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 201) {
    resolve(JSON.parse(this.responseText));
  }else if (this.readyState == 4){
      reject (JSON.parse(this.responseText || "error"));
  }
};
xhttp.open("POST",url, true);
xhttp.setRequestHeader("Content-type", "application/json");
xhttp.send(JSON.stringify(data));
});  
};

fetch("http://192.168.1.39:3000/user",{
    method:"POST",
    headers: {
        "Content-type": "application/json"
    },
    body:JSON.stringify(data),
})
.then((response)=> response.json())
.then((result) =>{ 
window.location.href = "./user.html?id=" + result.id;
})
.catch((err) => {
console.log(err);
});

}
    
    function nameValidation(value,id){
       return !isEmptyOrShort(value, id , 3, "Name");
    }

    function isEmptyOrShort(value, id, minlength, key){
        
        if(!value){
            setError(id, "Please enter your"+key);
            return true;
        }
        if(value.length < minlength){
            setError(id, key + "must be atleast" + minlength + "characters");
        return true;
        }
        setError(id, "");
        return false;

    }

    function emailValidation(value, id){
        if(!value){
            setError(id,"please enter your email");
            return false;
        }
        if (!value.includes("@")) {
            setError(id, "Please enter a valid email");
            return false;
        }
        setError(id, "");
        return true;
    }
    function phoneNumberValidation(value, id) {
        return !isThatAPhoneNumber(value, id, 10, "phoneNumber");
    }
    function isThatAPhoneNumber(value, id, minlength, key)
    {
        if(!value){
            setError(id,"please enter your"+key);
            return true;
        }
        
        if(value.length < minlength){
            setError(id,"muse be"+ minlength+"character" )
            return true;
        }
        setError(id, "");
        return false;
    }
    function passwordValidation(value,id)
    {
        return !isEmptyOrShort(value,id,8,"password")
    }
    function confirmPasswordValidation(value,password,id){
        if(value!==password){
            setError(id,"password is not matching")
            return false
        }
        setError(id,"")
        return true
    }
    function usernameValidation(value,id){
        return !isEmptyOrShort(value,id,3,"username")
    }
    
    

    function setError(id, message){
        _(id).innerHTML = message;
    }
