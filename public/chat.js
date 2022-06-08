const room = window.location.pathname.replace(/\//g, '')
console.log(room)
const socket = io(`http://localhost:3000/${room}`)

let user = ""

socket.on('update_mensagem', (messages)=>{
    updateMensagem(messages)
})
function updateMensagem(messages){
   const div_mensagem = document.querySelector('#mensagem')
   let list_message = "<ul>"

   messages.forEach(mensa => {
       list_message += `<div class="container-texto">
                                            <h3>${mensa.user}</h3>
                                            <li> ${mensa.msg} </li>
                                  </div>`
   })

    list_message +=  "</ul>"
    div_mensagem.innerHTML = list_message
}
 

document.addEventListener('DOMContentLoaded', ()=>{
    const form = document.querySelector('#mensage_form')
    form.addEventListener('submit', (event)=>{
            event.preventDefault()
            if(!user){
                alert('defina um usuario')
                return
            }
            const envio = document.forms['message_form']['msg'].value
            document.forms['mensage_form']['msg'].value = ""
            socket.emit('new_menssage', {user: user, msg: envio})
            console.log(envio)
})
 const user_form = document.querySelector('#user_form')
    user_form.addEventListener('submit', (event)=>{
            event.preventDefault()
            user = document.forms['user_form_name']['name'].value
            user_form.parentNode.removeChild(user_form)
})
})