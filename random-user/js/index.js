const BASE_URL = 'https://randomuser.me/api/'
const SEED = 'Stagisti2023'
const PAGE_SIZE = 10

function initPage() {
  onPageChange(getCurrentPage())
}

async function getUsers(page) {
  setLoading(true)
  fetch(`${BASE_URL}?page=${page}&results=${PAGE_SIZE}&seed=${SEED}&exc=login,gender,id,registered`).then((res) => {
    return res.json()
  }).then(json => {
    setupTable(json)
  }).catch((err) => {
    console.log(err)
  }).finally(() => {
    setLoading(false)
  })
}

function setLoading(isLoading) {
  document.getElementById('loader').style.display = isLoading ? 'block' : 'none'
}

function setupTable(data) {
  var tbody = document.getElementById('table-body')
  var tableContent = ''
  data.results.forEach(item => {
    tableContent += generateTableRow(item)
  });
  tbody.innerHTML = tableContent
}

function generateTableRow(item) {
  return `<tr class='table-row' onclick='goToDetail(${JSON.stringify(item)})'>
    <td><img src='${item.picture.thumbnail}'/></td>
    <td>${item.name.first} ${item.name.last}</td>
    <td>${item.nat}</td>
  </tr>`
}

function goToDetail(item) {
  sessionStorage.setItem('user', JSON.stringify(item))
  window.location.href = "./detail.html"
}


function initDetail() {
  let user = JSON.parse(sessionStorage.getItem('user'))
  let content = ''
  if (user) {
    content = generateDetailPage(user)
  } else {
    content = 'Errore'
  }
  document.getElementById('main').innerHTML = content
}

function setCurrentPage(page) {
  sessionStorage.setItem('currentPage', page)
  let pageEl = document.getElementById('currentPage')
  pageEl.innerHTML = page
}

function getCurrentPage() {
  return sessionStorage.getItem('currentPage') || 1
}

function onPageChange(page) {
  if (page > 0) {
    setCurrentPage(page)
    getUsers(page)
  }
}

function changePage(action) {
  let currentPage = getCurrentPage()
  let newPage = action === '+' ? +currentPage+1 : +currentPage-1

  onPageChange(newPage)
}

function generateDetailPage(item) {
  let content = ''
  content = `<div class='detail-page'>
    <div class="detail-img-container"><img src='${item.picture.large}' /></div>
    ${generateUserInfoBox(item)}
    ${generateAddresBox(item.location)}
    ${generateContactMeBox(item)}
  </div>`
  return content
}

function generateUserInfoBox(item) {
  let dob = new Date(item.dob.date)
  return `<div class='box'>
    <h3>User Info</h3>
    <p>${item.name.title} ${item.name.first} ${item.name.last}</p>
    <p>Date of Birth: ${dob.toLocaleDateString()} (${item.dob.age}yo)</p>
  </div>`
}

function generateAddresBox(location) {
  return `<div class='box'>
    <h3>Address</h3>
    <p>${location.street.name} ${location.street.number}<br>${location.city} ${location.postcode}<br>${location.state}<br>${location.country}</p>
  </div>`
}

function generateContactMeBox(item) {
  return `<div class='box'>
    <h3>Contact me!</h3>
    <p>Email: ${item.email}</p>
    <p>Phone: ${item.phone}</p>
    <p>Cell: ${item.cell}</p>
  </div>`
}