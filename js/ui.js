//Function to clear the list
const chatsClear = () => {
    list.innerHTML = '';
};

//Function to add chat to UI
const addChatUI = (chat) => {
    const time = dateFns.distanceInWordsToNow(
        chat.created_at.toDate(),
        { addSuffix: true }
    );
    const html = `
    <li class="chat">
	    <span class="username">${chat.username}</span>
	    <span class="message">${chat.message}</span>
	    <div class="time">${time}</div>
    </li>
    `;
    list.innerHTML += html;
};