let phaseNumber = document.getElementById('phase-number');
let searchForm = document.getElementById('search-form');

document.getElementById('phaseTwo')
    .addEventListener('click', function() {
    phaseNumber.innerText = 'Currently using Phase Two: Fixed List';
    searchForm.action = 'search/v2/';
});

document.getElementById('phaseThree')
    .addEventListener('click', function() {
    phaseNumber.innerText = 'Currently using Phase Three: From File';
    searchForm.action = 'search/v3/';
});

document.getElementById('phaseFour')
    .addEventListener('click', function() {
    phaseNumber.innerText = 'Currently using Phase Four: Google API';
    searchForm.action = 'search/v4/';
});

document.getElementById('phaseFive')
    .addEventListener('click', function() {
    phaseNumber.innerText = 'Currently using Phase Five: Our Search Engine';
    searchForm.action = 'search/v5/';
});