console.log('partner connected')

const request = new DataCall()

async function getAllpartners(e) {
    const response =  await request.GET_POST('v1/partners', 'GET')
    console.log(response)
}

async function createpartner(e) {
    e.preventDefault()
    const formData = new FormData(document.getElementById('partner-create-form'))
    const response =  await request.GET_POST('v1/partner', 'POST', formData, 'form')
    console.log(response)
}

getAllpartners();