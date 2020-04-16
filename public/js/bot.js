//const socket = io('https://convid19verify.herokuapp.com/');//Hold the url of the server
const socket = io('https://convid19verify.herokuapp.com/');
const format = '@$%().,/!*1234567890abcdefghijklmnopqrstuvwxyz';

const socketTrigger = () => {

    socket.on('bot-chat', function(data){
       console.log(JSON.parse(data))
    });

    const sendChat = (e) => {
        e.preventDefault(); 
        
        let msg = document.querySelector('#MSG'); //Get the message input
        if ($.trim(msg) == '') {
            return false;
        }
        //Show user chat message to the DOM
        function insertMessage(msg) {
            $('<div class="message message-personal">' + msg + '</div>').appendTo($('.messages-content')).addClass('new');  
          }
        insertMessage(msg.value) 

        socket.emit('bot_chat', { //Send to bot server
            'device_id': localStorage.getItem('device_id'),
           'message': msg.value,
        });
        
        msg.value = '';
        return false;
    }

    const randomStr = (len, format) => { 
        let ans = ''; 
        for (var i = len; i > 0; i--) { 
            ans +=  
              format[Math.floor(Math.random() * format.length)]; 
        } 
        return ans; 
    } 

    //Store a unique identification of this device
    !localStorage.getItem('device_id') ? localStorage.setItem('device_id', randomStr(32, format)) : null;

    //Trigger the sendchat function
    const chatForm = document.querySelector('#chatForm');
    chatForm.addEventListener('submit', (e) => sendChat(e, chatForm))//Use submit event to connect to the socket connect
}

socketTrigger();//Triigger on load