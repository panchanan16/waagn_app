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
}

renderPartnerInForm()