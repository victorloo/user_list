const BASE_URL = 'https://lighthouse-user-api.herokuapp.com'
const INDEX_URL = BASE_URL + '/api/v1/users/'
// const AVATAR_URL = 'https://randomuser.me/api/portraits/men/'
const data = []
const dataPanel = document.getElementById('data-panel')
// const btn = document.getElementsByClassName('.btn')

axios.get(INDEX_URL).then((response) => {
  data.push(...response.data.results)
  displayUserList()

  dataPanel.addEventListener('click', function () {
    if (event.target.matches('.btn')) {
      console.log(event.target.dataset.id)
      showUser(event.target.dataset.id)
    }
  })
}).catch((err) => { console.log(err) })


function showUser(id) {
  const modalName = document.getElementById('user-title')
  const modalAvatar = document.getElementById('user-avatar')
  const modalBirthday = document.getElementById('user-birthday')
  const modalAge = document.getElementById('user-age')
  const modalGender = document.getElementById('user-gender')
  const modalRegion = document.getElementById('user-region')
  const modalEmail = document.getElementById('user-email')
  // set request url
  const url = INDEX_URL + id
  // send request to show api
  axios.get(url).then((response) => {
    const data = response.data
    // insert data into modal ui
    modalName.textContent = `${data.name} ${data.surname}`
    modalAvatar.innerHTML = `<img src="${data.avatar}" class="img-fluid" alt="Responsive image">`
    modalBirthday.textContent = `Birthday: ${data.birthday}`
    modalAge.textContent = `Age: ${data.age}`
    modalGender.textContent = `Gender: ${data.gender}`
    modalRegion.textContent = `Region: ${data.region}`
    modalEmail.textContent = `Email: ${data.email}`
  }).catch((err) => { console.log(err) })
}

function displayUserList() {
  let htmlContent = ''
  data.forEach(function (user, index) {
    htmlContent += `
        <div class="col-sm-auto mb-2">
          <div class="card md-auto">
           <div class="card border-white" style="width: 160px">
            <img class="card-img-top rounded mw-100 " data-id="${user.id}"  src="${user.avatar}" alt="Card image cap">
            <div class="card-body user-item-body">
            <h5 class="card-title">${user.name} ${user.surname}</h5>
            <button class="btn btn-primary btn-show-user" data-toggle="modal" data-target="#user-modal" data-id="${user.id}">Say Hi 👋🏻</button>
            </div>
            </div>
          </div>
        </div>
      `
  })
  dataPanel.innerHTML = htmlContent
}