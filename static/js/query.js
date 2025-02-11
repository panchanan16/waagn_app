const request = new DataCall()

async function createComplaint(e) {
    e.preventDefault()
    const formData = new FormData(document.getElementById('complaint-register-form'))
    const response = await request.GET_POST('v1/compaint', 'POST', formData, 'form')
    if (response.success) {
        document.getElementById('complaint-register-form').reset();
        renderComplaints()
    }
}


async function renderComplaints() {
    const response = await request.GET_POST('v1/compaints', 'GET')
    const table = document.getElementById('complaints-table')
    if (response.success) {
        console.log(response)
        table.innerHTML = ''
        response.data.forEach(item => {
        table.innerHTML += `<tr class="table-rows" onclick="renderDriverDetails(${item.driver_id})">
        <td>${item.complain_id}</td>
        <td class="search-item">${item.order_id_tracking_number}</td>
        <td>${item.customer_name}</td>
        <td>${item.complaint_type}</td>
        <td>
            ${item.date_of_complaint}
        </td>
        <td>
            <div onclick="deleteComplaint(this, ${item.complain_id})">
                <i class="material-icons" style="color: red; cursor: pointer; font-size: 35px">delete_forever</i>
            </div>
        </td>
        </tr>`
        });
    }

}


async function deleteComplaint(target, id) {
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
            const response = await request.DEL_UPD(`v1/compaint/${id}`, 'DELETE')
            if (response.success) { target.parentNode.parentNode.remove() }
        } else {
            return;
        }
    });
}

renderComplaints()