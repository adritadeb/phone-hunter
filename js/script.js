const searchPhone = () => {
    const searchText = document.getElementById('search-field').value;
    document.getElementById('search-field').value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data));
};
const displayPhone = phones => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    phones.forEach(phone => {
        console.log(phone);
        const div = document.createElement('div');
        div.innerHTML = ` <div class="col">
        <div class="card h-100">
            <img src="${phone.image}" class="card-img-top w-50 mt-2 ms-2" alt="...">
            <div class="card-body">
                <h5 class="card-title">Name: ${phone.phone_name}</h5>
                <h5 class="card-title">Brand: ${phone.brand}</h5>
            </div>
            <button onclick="loadDetails('${phone.slug}')" id="details-btn" class="btn w-50 ms-2 mb-3">Explore</button>
        </div>
    </div>`;
        phoneContainer.appendChild(div);
    });
};
const loadDetails = phoneInfo => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneInfo}`;
    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data));
};