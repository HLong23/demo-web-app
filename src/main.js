import user_data from "./resource/database/user.json" with { type: "json" };

let userRepo = [...user_data];

function renderUserList(userRepo) {
    let userTableBodyHtml = document.getElementById("userList");
    let content = "";
    for (let i = 0; i < userRepo.length; i++) {
        let currentUser = userRepo[i];
        let currentContent =
            "<tr>\n" +
            "        <td>" + currentUser.username + "</td>\n" +
            "        <td>" + currentUser.password + "</td>\n" +
            "</tr>";
        content += currentContent;
    }
    userTableBodyHtml.innerHTML = content;
}

function deleteUser() {
    userRepo.pop();
    renderUserList(userRepo);
}

function addUser() {
    let userName = prompt("Enter username");
    userRepo.push(
        {
            "username": userName,
            "password": "123456"
        }
    )
    renderUserList(userRepo);
}


window.deleteUser = deleteUser;
window.addUser = addUser;
renderUserList(userRepo);
