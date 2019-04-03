let container = document.getElementById('results');
let xhr = new XMLHttpRequest();

xhr.addEventListener('load', function() {
    for(let i = 0; i < this.response.Result.length; i++) {

        let result = document.createElement('div');
        result.classList.add('result');
        result.innerHTML = '<a href="' + this.response.Result[i].url + '"><h2>' + this.response.Result[i].title + '</h2></a>\n' +
            '<span class="url">' + this.response.Result[i].url+ '/</span>\n' +
            '<p>' + this.response.Result[i].description + '</p>\n';

        container.appendChild(result);
    }
});

xhr.responseType = 'json';
xhr.open("GET", "../../results/results.json");
xhr.send();