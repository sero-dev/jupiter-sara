window.onload = function() {
  let navigatorInfo = document.getElementById('navigator');
  navigatorInfo.innerHTML = 
    `<b>App Name</b>: ${navigator.appName}<br>
    <b>Product</b>: ${navigator.product}<br>
    <b>App Version</b>: ${navigator.appVersion}<br>
    <b>User Agent</b>: ${navigator.userAgent}<br>
    <b>Platform</b>: ${navigator.platform}<br>
    <b>Language</b>: ${navigator.language}`

  let windowInfo = document.getElementById('window');
  windowInfo.innerHTML =
    `<b>Window Height</b>: ${window.innerHeight}<br>
    <b>Window Width</b>: ${window.innerWidth}`

  let screenInfo = document.getElementById('screen');
  screenInfo.innerHTML =
    `<b>Screen Height</b>: ${screen.height}<br>
    <b>Screen Width</b>: ${screen.width}<br>
    <b>Avaiable Height</b>: ${screen.availHeight}<br>
    <b>Color Depth</b>: ${screen.colorDepth}<br>
    <b>Pixel Depth</b>: ${screen.pixelDepth}`


  let locationInfo = document.getElementById('location');
  locationInfo.innerHTML =
    `<b>App Name</b>: ${location.href}<br>
    <b>Product</b>: ${location.hostname}<br>
    <b>App Version</b>: ${location.pathname}<br>
    <b>User Agent</b>: ${location.protocol}`

  let geolocationInfo = document.getElementById('geolocation');
  if (navigator.geolocation) navigator.geolocation.getCurrentPosition(showPosition);
  else geolocationInfo.innerHTML = "Geolocation is not supported by this browser.";

  function showPosition(position) {
    geolocationInfo.innerHTML = 
      `<b>Latitude</b>: ${position.coords.latitude}<br>
      <b>Longitude</b>: ${position.coords.longitude}`
  }
}