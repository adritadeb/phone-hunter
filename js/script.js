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
        .then(data => displayDetails(data.data));
};
const displayDetails = phoneDetails => {
    console.log(phoneDetails)
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.textContent = '';
    const div = document.createElement('div');
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const div3 = document.createElement('div');
    div1.innerHTML = `<img src="${phoneDetails.image}" class="card-img-top w-50 mt-2 ms-2" alt="...">
    <div class="card-body">
        <h5 class="card-title">Name: ${phoneDetails.name}</h5>
    </div>`;
    if (!phoneDetails.releaseDate) {
        div2.innerHTML = `<h5 class="ms-3">Release date: No release date found</h5>`;
    }
    else {
        div2.innerHTML = `<h5 class="ms-3">Release date: ${phoneDetails.releaseDate}</h5>`;
    }
    div3.innerHTML = ` <h5 class="ms-3">Main features:</h5>
    <ul class="card-title">
        <li>Storage: ${phoneDetails.mainFeatures.storage}</li>
        <li>Display size: ${phoneDetails.mainFeatures.displaySize}</li>
        <li>ChipSet: ${phoneDetails.mainFeatures.chipSet}</li>
        <li>Memory: ${phoneDetails.mainFeatures.memory}</li>
    </ul>`;
    div.appendChild(div1);
    div.appendChild(div2);
    div.appendChild(div3);
    detailsContainer.appendChild(div);
};