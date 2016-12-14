var userName = prompt("Enter your name: ");
var chat = $.connection.chatHub;
chat.client.messageReceived = function (originatorUser, message) {
    var container = $("#messages");
    container.append('<div class="message-row">' + generateChip(originatorUser) + '<span class="message-text">' + message + '</span></div>');
    container[0].scrollTop = container[0].scrollHeight;    
};

chat.client.getConnectedUsers = function (userList) {
    for (var i = 0; i < userList.length; i++)
        addUser(userList[i]);
};

chat.client.newUserAdded = function (newUser) {
    addUser(newUser);
}

$("#messageBox").focus();

$("#sendMessage").click(function () {
    chat.server.send(userName, $("#messageBox").val());
    $("#messageBox").val("");
    $("#messageBox").focus();
});

$("#messageBox").keyup(function (event) {
    if (event.keyCode == 13){
        event.preventDefault()
        $("#sendMessage").click();
    }   
});

function addUser(user){
    $("#userList").append('<li>' + generateChip(user) + '</li>');
}

function generateChip(originatorUser){
    return '<span class="mdl-chip mdl-chip--contact">'+
    '<span class="mdl-chip__contact mdl-color--teal mdl-color-text--white">'+originatorUser.substring(0,1).toUpperCase()+'</span>' +
    '<span class="mdl-chip__text">'+originatorUser+'</span></span>';
}

$.connection.hub.logging = true;
$.connection.hub.start().done(function () {
    chat.server.connect(userName);
});