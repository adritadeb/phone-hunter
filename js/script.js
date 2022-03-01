// search phone
const searchPhone = () => {
    const searchText = document.getElementById('search-field').value.toLowerCase();
    document.getElementById('search-field').value = '';
    // loading spinner
    document.getElementById('spinner').style.display = 'block';

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data));

};
// display card common code
const showCard = results => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    results.forEach(result => {
        const div = document.createElement('div');
        div.innerHTML = ` <div class="col">
            <div class="card h-100">
                <img src="${result.image}" class="card-img-top w-50 mt-2 ms-2" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Name: ${result.phone_name}</h5>
                    <h5 class="card-title">Brand: ${result.brand}</h5>
                </div>
                <button onclick="loadDetails('${result.slug}')" id="details-btn" class="btn w-50 ms-2 mb-3">Explore</button>
            </div>
        </div>`;
        phoneContainer.appendChild(div);
    });
}
// show search results
const displayPhone = phones => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    // show phone quantity
    const phoneQuantity = document.getElementById('phone-quantity');
    phoneQuantity.textContent = '';
    const quantityDiv = document.createElement('div');
    quantityDiv.innerHTML = `<h4 id="phone-quantity" class="text-white text-center p-sm-1 p-md-3">${phones.length} results for you</h4>`;
    phoneQuantity.appendChild(quantityDiv);
    // show results
    if (phones.length === 0) {
        phoneQuantity.style.display = 'none';

        phoneContainer.innerHTML = `<h3 id="no-result" class="mx-auto py-4 text-center text-white rounded">No result found</h3>`;
    }
    else if (phones.length > 20) {
        phoneQuantity.style.display = 'block';
        const twentyResults = phones.slice(0, 20);
        showCard(twentyResults);
    }
    else {
        phoneQuantity.style.display = 'block';
        showCard(phones);
    }
    // loading spinner
    document.getElementById('spinner').style.display = 'none';
};
// load phone details
const loadDetails = phoneInfo => {
    // loading spinner
    document.getElementById('spinner').style.display = 'block';

    const url = `https://openapi.programming-hero.com/api/phone/${phoneInfo}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.data));
};
// show phone details
const displayDetails = phoneDetails => {
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.textContent = '';
    const div = document.createElement('div');
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const div3 = document.createElement('div');
    const div4 = document.createElement('div');
    // part 1
    div1.innerHTML = `<img src="${phoneDetails.image}" class="card-img-top w-50 mt-2 ms-2" alt="...">
    <div class="ms-3 mt-2">
        <h5 class="card-title">Name: ${phoneDetails.name}</h5>
    </div>`;
    // part 2
    if (!phoneDetails.releaseDate) {
        div2.innerHTML = `<h5 class="ms-3">Release date: Comming soon</h5>`;
    }
    else {
        div2.innerHTML = `<h5 class="ms-3">Release date: ${phoneDetails.releaseDate}</h5>`;
    }
    // part 3
    div3.innerHTML = `<h5 class="ms-3">Main features:</h5>
    <ul class="card-title">
        <li><b>Storage</b>: ${phoneDetails.mainFeatures.storage}</li>
        <li><b>Display size</b>: ${phoneDetails.mainFeatures.displaySize}</li>
        <li><b>ChipSet</b>: ${phoneDetails.mainFeatures.chipSet}</li>
        <li><b>Memory</b>: ${phoneDetails.mainFeatures.memory}</li>
        <li><b>Sensors</b>: ${phoneDetails.mainFeatures.sensors}</li>
    </ul>`;
    div.appendChild(div1);
    div.appendChild(div2);
    div.appendChild(div3);
    // part 4
    if (phoneDetails.others) {
        div4.innerHTML = `<h5 class="ms-3">Others:</h5>
    <ul class="card-title">
        <li><b>WLAN</b>: ${phoneDetails.others.WLAN}</li>
        <li><b>Bluetooth</b>: ${phoneDetails.others.Bluetooth}</li>
        <li><b>GPS</b>: ${phoneDetails.others.GPS}</li>
        <li><b>NFC</b>: ${phoneDetails.others.NFC}</li>
        <li><b>Radio</b>: ${phoneDetails.others.Radio}</li>
        <li><b>USB</b>: ${phoneDetails.others.USB}</li>
    </ul>`;
        div.appendChild(div4);
    }
    detailsContainer.appendChild(div);
    // loading spinner
    document.getElementById('spinner').style.display = 'none';
};