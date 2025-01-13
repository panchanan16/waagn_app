console.log('welcome to login js')

const request_modal = new DataCall()

async function login_admin(formId, e) {
    e.preventDefault()
    const formData = new FormData(document.getElementById(formId));
    const response = await request_modal.GET_POST('v1/auth/admin/login', 'POST', formData, 'form')
    if (response.success) {
        window.location.href = location.origin + response.redirect;
    }
}