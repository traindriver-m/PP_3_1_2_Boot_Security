let allRoles = [];
let allUsers = [];

fetch('/api/all-users').then(listUser => {
        listUser.json().then(user => {
                allUsers = user;
                console.log(allUsers);
                createTable();
            }
        )
    }
)

fetch('/api/all-roles').then(
    list => {
        list.json().then(
            roles => {
                allRoles = roles;
                console.log(allRoles);
            }
        )
    }
)


$('#editButtonUser').click(function () {
    let editUser = {
        id: -1,
        firstName: "",
        lastName: "",
        age: 0,
        email: "",
        password: "",
        roles: []
    };
    editUser.id = document.getElementById("idEditModal").value;
    editUser.firstName = document.getElementById("firstNameEditModal").value;
    editUser.lastName = document.getElementById("lastNameEditModal").value;
    editUser.age = document.getElementById("ageEditModal").value;
    editUser.email = document.getElementById("emailEditModal").value;
    editUser.password = document.getElementById("passwordEditModal").value;
    [].slice.call(document.getElementById("rolesEditModal")).forEach(op => {
        if (op.selected) {
            allRoles.forEach(role => {
                if (role.role == op.text) {
                    editUser.roles.push(role);
                }
            })
        }
    })
    fetch("/api/create-user", {
        method: 'POST',
        body: JSON.stringify(editUser),
        headers: {'Content-Type': 'application/json'}
    }).then(res => {
        if (res.ok) {
            allUsers.forEach(user => {
                if (user.id == editUser.id) {
                    $('#editModalUser').modal('hide');
                    user.firstName = editUser.firstName;
                    user.lastName = editUser.lastName;
                    user.age = editUser.age;
                    user.email = editUser.email;
                    user.password = editUser.password;
                    user.roles = editUser.roles;
                }
            })
            createTable();
        }
    })
})

$('#deleteButtonUser').click(function () {
    let id = document.getElementById("idDeleteModal").value;
    $('#deleteModalUser').modal('hide');

    fetch('/api/delete-user/' + id, {
        method: 'DELETE'
    }).then(res => {
        if (res.ok) {
            document.getElementById(id).remove();
            allUsers.forEach(users => {
                if (users.id == id) {
                    delete allUsers[allUsers.indexOf(users)];
                    console.log(allUsers);
                }
            })
        }
    })
    createTable();
})

function createTable() {
    let temp = "";
    allUsers.forEach(user => {
        temp += "<tr id=\"" + user.id + "\">";
        temp += "<td>" + user.id + "</td>";
        temp += "<td>" + user.firstName + "</td>";
        temp += "<td>" + user.lastName + "</td>";
        temp += "<td>" + user.age + "</td>";
        temp += "<td>" + user.email + "</td>";
        temp += "<td>";
        let stringRole = "";
        user.roles.forEach(r => {
            stringRole += r.role + " ";
        })
        temp += stringRole + "</td>"
        temp += "<td><button class='btn btn-primary' onclick='editUserBTN(this)' id='editBtn" + user.id + "'>Edit</button></td>";
        temp += "<td><button class='btn btn-danger' onclick='deleteUserBTN(this)' id='deleteBTN" + user.id + "'>Delete</button></td></tr>";
    })
    document.getElementById("tableUserBody").innerHTML = temp;
}

function editUserBTN(element) {
    console.log(element);
    console.log(element.id);
    console.log(element.id.slice(7));
    allUsers.forEach(user => {
        if (user.id == element.id.slice(7)) {
            document.getElementById("idEditModal").value = user.id;
            document.getElementById("firstNameEditModal").value = user.firstName;
            document.getElementById("lastNameEditModal").value = user.lastName;
            document.getElementById("ageEditModal").value = user.age;
            document.getElementById("emailEditModal").value = user.email;
            document.getElementById("passwordEditModal").value = user.password;
            let temp = "";
            allRoles.forEach(roleUserAll => {
                let bool = false;
                user.roles.forEach(role => {
                    if (roleUserAll.id == role.id) {
                        bool = true;
                    }
                })
                if (bool) {
                    temp += "<option selected" + ">" + roleUserAll.role + "</option>";
                } else temp += "<option>" + roleUserAll.role + "</option>";
            })
            document.getElementById("rolesEditModal").innerHTML = temp;
        }
    });
    $('#editModalUser').modal('show');
}

function deleteUserBTN(element) {
    allUsers.forEach(user => {
        if (user.id == element.id.slice(9)) {
            document.getElementById("idDeleteModal").value = user.id;
            document.getElementById("firstNameDeleteModal").value = user.firstName;
            document.getElementById("lastNameDeleteModal").value = user.lastName;
            document.getElementById("ageDeleteModal").value = user.age;
            document.getElementById("emailDeleteModal").value = user.email;
        }
    });
    $('#deleteModalUser').modal('show');
}

$('#addUserBtn').click(function () {
    let newUser = {
        firstName: "",
        lastName: "",
        age: 0,
        pass: "",
        roles: []
    };
    newUser.firstName = document.getElementById("firstNameNew").value;
    newUser.lastName = document.getElementById("lastNameNew").value;
    newUser.age = document.getElementById("ageNew").value;
    newUser.email = document.getElementById("emailNew").value;
    newUser.password = document.getElementById("passwordNew").value;
    newUser.roles = [];
    [].slice.call(document.getElementById("rolesNew")).forEach(op => {
        if (op.selected) {
            allRoles.forEach(r => {
                if (r.role == op.text) {
                    newUser.roles.push(r);
                }
            })
        }
    });
    fetch('/api/create-user', {
        method: 'POST',
        headers: {'Content-Type': 'application/json; charset=utf-8'},
        Accept: 'application/json, */*; q=0.01',
        body: JSON.stringify(newUser)
    }).then(resp => {
        if (resp.ok) {
            fetch('/api/one/' + newUser.email).then(otv => {
                otv.json().then(otv1 => {
                    allUsers.push(otv1);
                    createTable();
                    console.log(otv1);
                    document.getElementById("firstNameNew").value = "";
                    document.getElementById("lastNameNew").value = "";
                    document.getElementById("ageNew").value = "";
                    document.getElementById("emailNew").value = "";
                    document.getElementById("passwordNew").value = "";
                    document.getElementById("rolesNew").selectedIndex = -1;
                })

            })
        }
    })

})
