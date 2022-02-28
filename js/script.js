const searchPhone = () => {
    const searchText = document.getElementById('search-field').value;
    document.getElementById('search-field').value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data));
};
const displayPhone = phones => {
    console.log(phones);
};