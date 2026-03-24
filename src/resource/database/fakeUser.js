const firstNames = ["Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Đỗ"];
const middleNames = ["Văn", "Thị", "Minh", "Quang", "Hữu"];
const lastNames = ["An", "Bình", "Cường", "Dung", "Em", "Hoa", "Khang", "Long"];

const provinces = [
    { name: "Hà Nội", cities: ["Cầu Giấy", "Đống Đa", "Hoàn Kiếm"] },
    { name: "Hồ Chí Minh", cities: ["Quận 1", "Quận 7", "Tân Bình"] },
    { name: "Đà Nẵng", cities: ["Hải Châu", "Sơn Trà"] },
    { name: "Hải Phòng", cities: ["Ngô Quyền", "Lê Chân"] }
];

function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateUsers(n = 200) {
    const users = [];

    for (let i = 1; i <= n; i++) {
        const province = random(provinces);

        users.push({
            id: i,
            name: `${random(firstNames)} ${random(middleNames)} ${random(lastNames)}`,
            birthYear: 1995 + Math.floor(Math.random() * 10),
            province: province.name,
            city: random(province.cities)
        });
    }

    return users;
}

const users = generateUsers(200);
console.log(users);