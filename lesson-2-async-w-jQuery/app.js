/* eslint-env jquery */

(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        
        $.ajax({
            url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
            headers: {Authorization: 'Client-ID 170b97d43cef8290e0ead8f00f1dcdfcbdd1cf31b823409180eae48549bb928a'} 

        }).done(addImage)
        .fail(function(err){
            requestError(err, 'image');
        });
        
        $.ajax({
            url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=04f3710211c743a9ae0b6ef354109b63`,

        }).done(addArticles)
        .fail(function(err){
            requestError(err, 'articles');
        });

    });

    function addImage(images){
        const firstImage = images.results[0];

        htmlContent = `<figure>
            <img src="${firstImage.urls.regular}" alt="${searchedForText}">
            <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
        </figure>`;

        responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
    };

    function addArticles (data) {
        let htmlContent = '';

        if(data.response && data.response.docs && data.response.docs.length > 1){
            result = data.response.docs.slice(2);
            htmlContent = '<ul>' + result.map( article => `<li class="article"> 
                <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
                <p>${article.snippet}</p>
                </li>`
            ).join('') + '</ul>';
        } else {
            htmlContent = '<div class="error-no-articles">No articles available</div>';
        }

        responseContainer.insertAdjacentHTML('beforeend', htmlContent);
    };

})();
