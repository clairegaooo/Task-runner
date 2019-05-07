getMessages = () => {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            if (localStorage.getItem('data') === null) {
                localStorage.setItem('data', this.responseText);
            }
            showMessages();
        }
    };
    xhttp.open('GET', './data.json', true);
    xhttp.setRequestHeader('Access-Control-Allow-Headers', '*');
    xhttp.withCredentials = false;
    xhttp.send();
};

showMessages = () => {
    let messages = JSON.parse(localStorage.getItem('data'));
    for (let i = 0; i < messages.length; i++) {
        let node = document.createElement('tr');
        node.innerHTML = '<td>' + messages[i].name + '</td><td>'+ messages[i].date +'</td><td>' + messages[i].assigned + '</td>';
        document.querySelector('#messages table').appendChild(node);
    }
};

addMessages = (message) => {
    let node = document.createElement('tr');
    node.innerHTML = '<td>' + message.name + '</td><td>'+ message.date +'</td><td>' + message.assigned + '</td>';
    document.querySelector('#messages table').appendChild(node);
};

clearFormField = () => {
    document.getElementById('task-name').value = '';
    document.getElementById('task-date').value = '';
    document.getElementById('task-assigned').value = '';
};

postMessage = (event) => {
    event.preventDefault();
    let newMessage = {
        name: document.getElementById('task-name').value,
        date: document.getElementById('task-date').value,
        assigned: document.getElementById('task-assigned').value
    };
    if (newMessage.name === '' || newMessage.date === '' || newMessage.assigned === '') {
        alert('"Task Name", "Date", and "Assigned To" are all required');
    } else {
        addMessages(newMessage);
        let messages = JSON.parse(localStorage.getItem('data'));
        messages.push(newMessage);
        localStorage.setItem('data', JSON.stringify(messages));
        clearFormField();
    }
};
