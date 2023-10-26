window.onload = init;

function init() {
    if(!localStorage.getItem("token")) {

        document.querySelector('.btn-primary').addEventListener('click', login);
    } else{
        window.location.href = "trabajadores.html";
    }
} 
function login() {
    var name = document.getElementById('input-name').value;
    var pass = document.getElementById('input-password').value;


    axios({
        method: 'post',
        url: 'http://localhost:4000/admines/login',
        data: {
            user_name: name,
            user_password: pass
        }
    }).then( function(res){
        if(res.data.code === 201){
            localStorage.setItem("token", res.data.message);
            window.location.href = "trabajadores.html";
        }else{
            alert("Usuario y/o Contraseña incorrectos");
        }
            

    }).catch(function(err){
        console.log(err);
    });
}