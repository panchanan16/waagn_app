const request = new DataCall()

async function renderPartnerInForm() {
    const response = await request.GET_POST('v1/partners', 'GET')
    if (response.success) {
       response.data[0].forEach((item)=> {
          document.getElementById('partner-box').innerHTML += `<option value="${item.company_id}">${item.company_name}</option>`
       }) 
    }
}



async function createUser(e) {
    e.preventDefault()
    const formData = new FormData(document.getElementById('create-user-form'))
    const response = await request.GET_POST('v1/auth/user/register', 'POST', formData, 'form')
    if (response.success) { renderUsers() }
}


async function renderUsers(params) {
    const response = await request.GET_POST('v1/auth/users', 'GET')
    if (response.success) {
        const table = document.getElementById('users-table')
        table.innerHTML = ""
        response.data.forEach((item)=> {
            table.innerHTML += `<tr class="table-rows" onclick="renderDriverDetails(${item.driver_id})">
            <td>${item.partner_id}</td>
            <td class="search-item">${item.company_name}</td>
            <td class="search-item">${item.name}</td>
            <td>${item.user_name}</td>
            <td>
                <div onclick="deleteUser(this, ${item.partner_id})">
                  <i class="material-icons" style="color: red; cursor: pointer; font-size: 35px">delete_forever</i>
                </div>
            </td>
            </tr>`
        })
    }
}


async function deleteUser(target, id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
        reverseButtons: true,
        confirmButtonColor: '#E3242B',
        cancelButtonColor: '#1b1b1b'
    }).then(async (result) => {
        if (result.isConfirmed) {
            const response = await request.DEL_UPD(`v1/auth/user/${id}`, 'DELETE')
            if (response.success) { target.parentNode.parentNode.remove() }
        } else {
            return;
        }
    });
}

renderUsers()
renderPartnerInForm()