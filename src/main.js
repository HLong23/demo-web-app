import user_data from "./resource/database/client.json" with { type: "json" };

let userRepo = [...user_data];
let userTableBodyHtml = document.getElementById("userList");

function renderUserList(userRepo) {
    console.log(userRepo);
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
            "        <td><button onclick='deleteUser(event.currentTarget.parentNode.parentNode)'>Delete</button></td>\n" +
            "        <td><button onclick='changeUser(event.currentTarget.parentNode.parentNode)'>Change</button></td>\n" +
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
        .normalize("NFD")// tách dấu ra khỏi chữ
        .replace(/[\u0300-\u036f]/g, "") // xoá dấu toàn bộ
        // .replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "") chỉ xoá sắc huyền hỏi ngã nặng
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

function searchByColumn() {
    let idKeyword = document.getElementById("searchId").value;
    let nameKeyword = removeVietnameseTones(document.getElementById("searchName").value);
    let birthKeyword = document.getElementById("searchBirthYear").value;
    let provinceKeyword = removeVietnameseTones(document.getElementById("searchProvince").value);
    let cityKeyword = removeVietnameseTones(document.getElementById("searchCity").value);

    let matchingUsers = userRepo.filter(user =>
        user.id.toString().includes(idKeyword) &&
        removeVietnameseTones(user.name).includes(nameKeyword) &&
        user.birthYear.toString().includes(birthKeyword) &&
        removeVietnameseTones(user.province).includes(provinceKeyword) &&
        removeVietnameseTones(user.city).includes(cityKeyword)
    );

    renderUserList(matchingUsers);
}

document.getElementById("searchId").addEventListener("input", debounceColumnSearch);
document.getElementById("searchName").addEventListener("input", debounceColumnSearch);
document.getElementById("searchBirthYear").addEventListener("input", debounceColumnSearch);
document.getElementById("searchProvince").addEventListener("input", debounceColumnSearch);
document.getElementById("searchCity").addEventListener("input", debounceColumnSearch);

let timeoutColumn;
function debounceColumnSearch() {
    clearTimeout(timeoutColumn);

    timeoutColumn = setTimeout(() => {
        searchByColumn();
    }, 300);
}

function deleteUser(eventTarget) {
    let currentId = eventTarget.firstElementChild.innerHTML;
    let currentIndex = userRepo.findIndex(user => user.id === currentId);
    userRepo.splice(currentIndex, 1);
    console.log(userRepo);
    userTableBodyHtml.removeChild(eventTarget);

    // userRepo.pop();
    // renderUserList(userRepo);
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

function changeUser(eventTarget) {
    let button = eventTarget.lastElementChild.lastElementChild;

    if (button.innerHTML === "Change") {
        let currentName = eventTarget.children[1].innerHTML;
        let currentBirthYear = eventTarget.children[2].innerHTML;
        let currentProvince = eventTarget.children[3].innerHTML;
        let currentCity = eventTarget.children[4].innerHTML;

        eventTarget.children[1].innerHTML = `<input value="${currentName}">`;
        eventTarget.children[2].innerHTML = `<input value="${currentBirthYear}">`;
        eventTarget.children[3].innerHTML = `<input value="${currentProvince}">`;
        eventTarget.children[4].innerHTML = `<input value="${currentCity}">`;

        button.innerHTML = "Apply";
    } else {
        let currentId = eventTarget.firstElementChild.innerHTML;
        let currentIndex = userRepo.findIndex(user => user.id == currentId);
        let newName = eventTarget.children[1].firstElementChild.value;
        let newBirthYear = eventTarget.children[2].firstElementChild.value;
        let newProvince = eventTarget.children[3].firstElementChild.value;
        let newCity = eventTarget.children[4].firstElementChild.value;

        userRepo[currentIndex].name = newName;
        userRepo[currentIndex].birthYear = newBirthYear;
        userRepo[currentIndex].province = newProvince;
        userRepo[currentIndex].city = newCity;

        eventTarget.children[1].innerHTML = newName;
        eventTarget.children[2].innerHTML = newBirthYear;
        eventTarget.children[3].innerHTML = newProvince;
        eventTarget.children[4].innerHTML = newCity;

        button.innerHTML = "Change";
    }
}

window.searchByColumn = searchByColumn;
window.changeUser = changeUser;
window.deleteUser = deleteUser;
window.addUser = addUser;
window.deleteUser = deleteUser;
renderUserList(userRepo);
