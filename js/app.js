const chats = db.collection('chats');

//Default username and room
//Checking if any username was stored at last else giving it default 'anon' username
let username = localStorage.username ? localStorage.username : 'anon';
let room = 'general';
let unsub;

//DOM queries
const list = document.querySelector('.chat-list');
const nameForm = document.querySelector('.new-name');
const msgForm = document.querySelector('.new-message');
const updateMsg = document.querySelector('.update-msg');
const rooms = document.querySelector('.buttons');

//Submitting a new chat using the form
msgForm.addEventListener('submit', e => {
    e.preventDefault();
    const msg = msgForm.message.value.trim();                                                                                                                                                                                                                                                               
    addChat(msg)
        .then(() => {
            msgForm.reset();
            console.log('New chat added to firestore');
        })
        .catch((err) => console.log(err));
});

//Submitting a new name using the form
nameForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = nameForm.name.value.trim();
    //Function to change username
    changeUsername(name);
    console.log(`Username changed to ${name}`);
    //Reset the form
    nameForm.reset();
    //Show and hide the popup alert
    updateMsg.textContent = `Your name was updated to ${name}`;
    setTimeout(() => updateMsg.textContent = '', 3000);
});

//Changing the rooms
rooms.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        //Get the new room name and change it
        newRoom = e.target.getAttribute('id');
        changeRoom(newRoom);
        console.log(`Room changed to ${newRoom}`);
        //Clear the chats
        chatsClear();
        //Setup new event listener for the new room and retrieve the chats
        getChats(chat => addChatUI(chat));
    }
});