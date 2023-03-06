//Function to add a new chat to the firestore database
const addChat = async (message) => {
    const now = new Date();
    const chat = {
        message: message,
        room: room,
        username: username,
        created_at: firebase.firestore.Timestamp.fromDate(now)
    };
    const response = await chats.add(chat);
    return response;
};

//Function to retrieve chats from the firestore database
const getChats = (callback) => {
    unsub = chats
        .where('room', '==', room).orderBy('created_at')
        .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type === 'added') {
                    //call the callbackfunction that updates the UI
                    callback(change.doc.data());
                }
            });
        });
};

//Function to update the username
const changeUsername = (newUsername) => {
    username = newUsername;
    localStorage.username = newUsername;
};

//Function to update the room
const changeRoom = (newRoom) => {
    room = newRoom;
    //Get rid of the real time listener for the old room if it exists
    if (unsub) {
        unsub();
    }
};