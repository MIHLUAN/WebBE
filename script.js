const apiUrl = "http://localhost:5000/api/users"; // Địa chỉ API

// Lấy danh sách user
async function fetchUsers() {
    const response = await fetch(apiUrl);
    const users = await response.json();

    const userList = document.getElementById("userList");
    userList.innerHTML = ""; // Xóa danh sách cũ

    users.forEach(user => {
        const userDiv = document.createElement("div");
        userDiv.classList.add("user");
        userDiv.innerHTML = `
            <div>
                <strong>${user.name}</strong> (${user.age} tuổi) - ${user.email}
            </div>
            <div>
                <button onclick="showUpdateForm(${JSON.stringify(user)})">Edit</button>
                <button onclick="deleteUser('${user._id}')">Delete</button>
            </div>
        `;
        console.log(JSON.stringify(user))
        userList.appendChild(userDiv);
    });
}

// async function fetchUsers() {
//     const response = await fetch(apiUrl);
//     const users = await response.json();

//     const userList = document.getElementById("userList");
//     userList.innerHTML = ""; // Xóa danh sách cũ
//     users.forEach(user => {
//         const userDiv = document.createElement("div");
//         userDiv.classList.add("user");
//         userDiv.innerHTML = `
//             <div>
//                 <strong>${user.name}</strong> (${user.age} tuổi) - ${user.email}
//             </div>
//             <button onclick="deleteUser('${user._id}')">Delete</button>
//         `;
//         userList.appendChild(userDiv);
//     });
// }

// Thêm user mới
async function addUser(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("age").value;

    const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, age }),
    });

    if (response.ok) {
        document.getElementById("userForm").reset(); // Xóa form
        fetchUsers(); // Cập nhật danh sách
    }
}

// Xóa user
async function deleteUser(id) {
    const response = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });

    if (response.ok) {
        fetchUsers(); // Cập nhật danh sách
    }
}
// Hiển thị form cập nhật
function showUpdateForm(user) {
    console.log('ssdaas');
    document.getElementById("updateForm").style.display = "block";
    document.getElementById("updateName").value = user.name;
    document.getElementById("updateEmail").value = user.email;
    document.getElementById("updateAge").value = user.age;
    document.getElementById("updateId").value = user._id;
}

// Ẩn form cập nhật
function cancelUpdate() {
    document.getElementById("updateForm").style.display = "none";
    document.getElementById("updateForm").reset();
}

// Cập nhật user
async function updateUser(event) {
    event.preventDefault();

    const id = document.getElementById("updateId").value;
    const name = document.getElementById("updateName").value;
    const email = document.getElementById("updateEmail").value;
    const age = document.getElementById("updateAge").value;

    const response = await fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, age }),
    });

    if (response.ok) {
        cancelUpdate(); // Ẩn form và xóa dữ liệu
        fetchUsers(); // Cập nhật danh sách
    }
}

// Gắn sự kiện submit cho form cập nhật
document.getElementById("updateForm").addEventListener("submit", updateUser);

// Cập nhật danh sách hiển thị với nút chỉnh sửa

// Khởi động
document.getElementById("userForm").addEventListener("submit", addUser);
fetchUsers();
