fetch('/api/all-roles').then(res => {
    res.json().then(roles => {
        let temp = "";
        let newRole = {
            id:0,
            role:""
        };
        document.getElementById("rolesNew").size = roles.length;
        roles.forEach(r => {
            newRole.id=r.id;
            newRole.role = r.role;
            temp += "<option>" + newRole.role + "</option>>"
        })
        document.getElementById("rolesNew").innerHTML = temp
    })
})