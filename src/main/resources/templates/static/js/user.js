fetch('/api/all-users').then(res => {
        let temp = "";
        res.json().then(userTable => {
                userTable.forEach(item => {
                    temp += "<tr>";
                    temp += "<td>" + item.id + "</td>";
                    temp += "<td>" + item.firstName + "</td>";
                    temp += "<td>" + item.lastName + "</td>";
                    temp += "<td>" + item.age + "</td>";
                    temp += "<td>" + item.email + "</td>";
                    temp+= '<td>';
                    item.roles.forEach(role => {
                        temp += role.role + ' ';
                    })
                    temp+= '</td>';
                    temp += "<td><button class='btn btn-info' onclick='editUserBTN(this)' id='editBTN'" + item.id + '>Edit</button></td>';
                    temp += "<td><button class='btn btn-info' onclick='deleteUserBTN(this)' id='deleteBTN'" + item.id + '>Delete</button></td></tr>';

                })
                document.getElementById("tableUserBody").innerHTML = temp;
            }
        )
    }
)