import user_data from "./resource/database/client.json" with { type: "json" };

let userRepo = [...user_data];

function renderUserList(userRepo) {
    console.log(userRepo);
    let userTableBodyHtml = document.getElementById("userList");
    let content = "";
    for (let i = 0; i < userRepo.length; i++) {
        let currentUser = userRepo[i];
        let currentContent =
            "<tr>\n" +
            "        <td>" + currentUser.id + "</td>\n" +
            "        <td>" + currentUser.name + "</td>\n" +
            "        <td>" + currentUser.birthYear + "</td>\n" +
            "        <td>" + currentUser.province + "</td>\n" +
            "        <td>" + currentUser.city + "</td>\n" +
            "</tr>";
        content += currentContent;
    }
    userTableBodyHtml.innerHTML = content;
}

function debounce(fn, delay) {
    let timeout; // biến lưu timer

    return function (...args) {
        clearTimeout(timeout); // huỷ lần trước

        timeout = setTimeout(() => {
            fn.apply(this, args); // gọi function gốc
        }, delay);
    };
}

const debounceSearch = debounce((keyword) => {
    searchUser(keyword);
}, 500);

function removeVietnameseTones(str) {
    let rs =  str
        .normalize("NFD") // tách dấu ra khỏi chữ
        .replace(/[\u0300-\u036f]/g, "") // xoá dấu
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .toLowerCase();
    console.log(rs);
    return rs;
}

document.getElementById("searchUser")
    .addEventListener("input", (e) => {
        debounceSearch(e.target.value);
    });

function searchUser(keyword) {
    let matchingUsers = userRepo.filter(
        user => {
            return user.name.includes(keyword) || removeVietnameseTones(user.name).includes(keyword) ||
                user.province.includes(keyword) || removeVietnameseTones(user.province).includes(keyword) ||
                    user.city.includes(keyword) || removeVietnameseTones(user.city).includes(keyword)
        }
    );
    console.log(matchingUsers)
    renderUserList(matchingUsers);
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
// window.searchUser = searchUser;
renderUserList(userRepo);
