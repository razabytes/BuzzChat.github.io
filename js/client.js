const socket = io("http://localhost:8000", { transports: ["websocket"] });
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageinp')
const messageContainer = document.querySelector(".container")

const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name)

var audio = new Audio('whistle.mp3')


const append = (message, ntify)=>{
    const messageElement = document.createElement('div')
    messageElement.innerText= message;
    messageElement.classList.add('ntfy')
    messageContainer.append(messageElement);
}

const appendMessage = (message, position)=>{
    const messageElement = document.createElement('div')
    messageElement.innerText= message;
    messageElement.classList.add('message');
    messageElement.classList.add(position)
    messageContainer.append(messageElement);
    
   if(position=='left'){
    audio.play();
   }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message =messageInput.value;
    appendMessage(`You: ${message}`,'right')
    socket.emit('send',message)
    messageInput.value =''
})

socket.on('user-joined', name=>{

    append(`${name} joined the chat`,'left')
})

socket.on('receive', data=>{
    appendMessage(`${data.name} : ${data.message}`,'left')
})

socket.on('left', name=>{
    append(`${name} left the chat`)
})



