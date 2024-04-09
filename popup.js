document.addEventListener('DOMContentLoaded', function() {
  var colorPicker = document.getElementById('colorPicker');
  var changeColorButton = document.getElementById('changeColor');
  var resetColorButton = document.getElementById('resetColor');
  var hideLinksButton = document.getElementById('hideLinks');
  var showLinksButton = document.getElementById('showLinks');

  // Load the saved link color from Chrome storage
  chrome.storage.sync.get('linkColor', function(data) {
    if (data.linkColor) {
      colorPicker.value = data.linkColor;
    }
  });

  changeColorButton.addEventListener('click', function() {
    var linkColor = colorPicker.value;
    chrome.tabs.executeScript({
      code: `
        var links = document.querySelectorAll('a');
        links.forEach(function(link) {
          link.style.color = '${linkColor}';
        });
      `
    });

    // Save the link color to Chrome storage
    chrome.storage.sync.set({ 'linkColor': linkColor });
  });

  resetColorButton.addEventListener('click', function() {
    // Reset the link color to the default
    chrome.tabs.executeScript({
      code: `
        var links = document.querySelectorAll('a');
        links.forEach(function(link) {
          link.style.color = '';
        });
      `
    });

    // Remove the saved link color from Chrome storage
    chrome.storage.sync.remove('linkColor');

    // Reset the color picker to the default value
    colorPicker.value = '#1a0dab';
  });

  hideLinksButton.addEventListener('click', function() {
    chrome.tabs.executeScript({
      code: `
        var links = document.querySelectorAll('a');
        links.forEach(function(link) {
          link.style.display = 'none';
        });
      `
    });
  });

  showLinksButton.addEventListener('click', function() {
    chrome.tabs.executeScript({
      code: `
        var links = document.querySelectorAll('a');
        links.forEach(function(link) {
          link.style.display = 'initial';
        });
      `
    });
  });
});