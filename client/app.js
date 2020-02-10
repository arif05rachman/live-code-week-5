var base_url = "http://localhost:3000"
var token = localStorage.getItem('token')
console.log(token)

if (!token) {
    $( "#login" ).show()
    $( "#register" ).hide()
    $( "#show-comics" ).hide()
    $( "#update-comic" ).hide()
    $( "#logout" ).hide()
    $( "#alert" ).hide()
}else{
    $( "#alert" ).show()
    $( "#login" ).hide()
    $( "#register" ).hide()
    $( "#alert" ).hide()
    $( "#update-comic" ).hide()
}
 $('#form-login').on('submit', function (event) {
    event.preventDefault()
    var email = $('#email').val();
    var password = $('#password').val();
    $.ajax({
        type: "POST",
        url: base_url+"/login",
        data: {
            email:email,
            password:password
        }
    }).done(data =>{
        localStorage.setItem('token', data.token)
        $('#show-comics').show();
        $('#login').hide();
        console.log(data.token)
    }).fail(err =>{
        console.log(err)
    })
});
$('#form-register').on('submit', function (event) {
    event.preventDefault()
    var name = $('#name-reg').val();
    var email = $('#email-reg').val();
    var password = $('#password-reg').val();
    $.ajax({
        type: "POST",
        url: base_url+"/register",
        data: {
            name:name,
            email:email,
            password:password
        }
    }).done(data =>{
        $('#login').show();
        console.log(data.token)
    }).fail(err =>{
        console.log(err)
    })
});
$('#logout').on('click', function (event) {
    event.preventDefault()
    localStorage.removeItem('token')
    $( "#login" ).show()
    $( "#show-comics" ).hide()
});