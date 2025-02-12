const request_modal = new DataCall()

async function login_partner(formId, e) {
    e.preventDefault()
    const formData = new FormData(document.getElementById(formId));
    const response = await request_modal.GET_POST('v1/auth/user/login', 'POST', formData, 'form')
    if (response.success) {
        console.log(response)
        window.sessionStorage.setItem('partnername', response.name);
        window.sessionStorage.setItem('partnerid', response.id);
        window.location.href = location.origin + response.redirect;
    }
}