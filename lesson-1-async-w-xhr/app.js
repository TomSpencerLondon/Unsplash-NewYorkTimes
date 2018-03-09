(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        const unsplashRequest = new XMLHttpRequest();
        unsplashRequest.onload = addImage;
        unsplashRequest.onerror = function (err) {
            requestError(err, 'image');
        };

        unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        unsplashRequest.setRequestHeader('Authorization', 'Client-ID 170b97d43cef8290e0ead8f00f1dcdfcbdd1cf31b823409180eae48549bb928a');
        unsplashRequest.send();
        function addImage(){
            debugger;
            let htmlContent = '';
            const data = JSON.parse(this.responseText);
            const firstImage = data.results[0];

            htmlContent = `<figure>
                <img src="${firstImage.urls.regular}" alt="${searchedForText}">
                <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
            </figure>`;

            responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
        };
    });
})();
