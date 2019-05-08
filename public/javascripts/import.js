window.onload = function() {
  let fileInput = document.getElementById('filename');
  let fileReader = new FileReader();
  let resultContainer = document.getElementById('result-container');
  let downloadButton = document.getElementById('download-file');
  let title = document.getElementsByTagName('title')[0].innerText.split(' - ')[0].trim().toLowerCase()
  let filetype;

  function loadData(data) {
    for (let i = 0; i < data.Result.length; i++) {
      let result = document.createElement('div');
      let checkbox = document.createElement('input');
      let link = document.createElement('a');
      let header = document.createElement('h2');
      let span = document.createElement('span');
      let description = document.createElement('p');

      link.href = data.Result[i].url;
      checkbox.setAttribute('type', 'checkbox');
      header.innerText = data.Result[i].title;
      span.innerText = data.Result[i].url;
      description.innerText = data.Result[i].description;
      result.className = 'result';
      span.className = 'url';

      link.appendChild(header);
      result.appendChild(checkbox);
      result.appendChild(link);
      result.appendChild(span);
      result.appendChild(description);

      resultContainer.appendChild(result);
    }
  }

  function csvToJSON(data) {
    let lines = data.split('\n');
    let container = {};
    let results = [];

    for (let i = 0; i < lines.length; i++) {
      let obj = {};
      let currentline = lines[i].split(',');

      obj['title'] = currentline[0];
      obj['url'] = currentline[1];
      obj['description'] = currentline[2];

      results.push(obj);
    }

    container['Result'] = results;
    return JSON.stringify(container);
  }

  function xmlToJSON(data) {
    let parser = new DOMParser();
    let xmlFile = parser.parseFromString(data, 'text/xml');

    let container = {};
    let results = [];

    let rootElement = xmlFile.getElementsByTagName('results')[0];

    for (var i = 0; i < rootElement.children.length; i++) {
      let obj = {};

      obj['title'] =
        rootElement.childNodes[i].childNodes[0].childNodes[0].nodeValue;
      obj['url'] =
        rootElement.childNodes[i].childNodes[1].childNodes[0].nodeValue;
      obj['description'] =
        rootElement.childNodes[i].childNodes[2].childNodes[0].nodeValue;

      results.push(obj);
    }

    container['Result'] = results;
    return JSON.stringify(container);
  }

  function createJSONFile(checkedBoxes) {
    let container = {};
    let results = [];

    for (var i = 0; i < checkedBoxes.length; i++) {
      let parent = checkedBoxes[i].parentNode;
      let obj = {};

      obj['title'] = parent.children[1].children[0].innerText;
      obj['url'] = parent.children[2].innerText;
      obj['description'] = parent.children[3].innerText.trim();
      results.push(obj);
    }

    container['Result'] = results;
    return new Blob([JSON.stringify(container)], { type: 'application/json' });
  }

  function createCSVFile(checkedBoxes) {
    let fileString = '';
    for (var i = 0; i < checkedBoxes.length; i++) {
      let parent = checkedBoxes[i].parentNode;

      currentLine =
        parent.children[1].children[0].innerText +
        ',' +
        parent.children[2].innerText +
        ',' +
        parent.children[3].innerText.trim() +
        '\n';
      fileString += currentLine;
    }

    return new Blob([fileString], { type: 'text/csv' });
  }

  function createXMLFile(checkedBoxes) {
    let xmlDoc = document.implementation.createDocument(null, 'results');
    let results = xmlDoc.getElementsByTagName('results')[0];

    for (var i = 0; i < checkedBoxes.length; i++) {
      let parent = checkedBoxes[i].parentNode;

      let result = xmlDoc.createElement('result');
      let title = xmlDoc.createElement('title');
      let url = xmlDoc.createElement('url');
      let description = xmlDoc.createElement('description');

      title.appendChild(
        xmlDoc.createTextNode(parent.children[1].children[0].innerText)
      );
      url.appendChild(xmlDoc.createTextNode(parent.children[2].innerText));
      description.appendChild(
        xmlDoc.createTextNode(parent.children[3].innerText.trim())
      );

      results.appendChild(result);
      result.appendChild(title);
      result.appendChild(url);
      result.appendChild(description);
    }

    let serializer = new XMLSerializer();
    return new Blob([serializer.serializeToString(xmlDoc)], {
      type: 'text/xml'
    });
  }

  fileReader.onload = function(e) {
    let text = fileReader.result.trim();

    while (resultContainer.firstChild)
      resultContainer.removeChild(resultContainer.firstChild);

    if (filetype == 'text/xml') text = xmlToJSON(text);
    else if (filetype == 'text/csv' || filetype == 'application/vnd.ms-excel')
      text = csvToJSON(text);
    loadData(JSON.parse(text));
  };

  fileInput.onchange = function(e) {
    let file = fileInput.files[0];
    filetype = file.type;
    fileReader.readAsText(file);
  };

  downloadButton.onclick = function(e) {
    let type = document.querySelector('input[name="type"]:checked').value;
    let checkedBoxes = document.querySelectorAll('.result>input:checked');
    let now = new Date();
    let blob;

    let filename = title.replace(' ', '_') + '_' +
      now.getFullYear().toString() +
      (now.getMonth() + 1).toString() +
      now.getDate().toString() +
      now.getHours().toString() +
      now.getMinutes().toString()

    if (checkedBoxes.length == 0) console.log('Error');
    else {
      if (type == 'CSV') {
        blob = createCSVFile(checkedBoxes);
        filename += '.csv';
      } else if (type == 'XML') {
        blob = createXMLFile(checkedBoxes);
        filename += '.xml';
      } else {
        blob = createJSONFile(checkedBoxes);
        filename += '.json';
      }

      let url = URL.createObjectURL(blob);
      let div = document.createElement('div');
      let anchor = document.createElement('a');

      document.body.appendChild(div);
      div.appendChild(anchor);

      anchor.innerHTML = '&nbsp;';
      div.style.width = '0';
      div.style.height = '0';
      anchor.href = url;
      anchor.download = filename;

      var event = new MouseEvent('click', {});
      anchor.dispatchEvent(event);
      document.body.removeChild(div);
    }
  };
};
