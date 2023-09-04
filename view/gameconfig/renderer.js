const { ipcRenderer } = require('electron');
const fs = require('fs');

const path = require('path');

const replaceText = (selector, text, color) => {
    const element = document.querySelector(selector);
    element && (element.innerText = text);
    element && color && (element.style.color = color);
  };

window.addEventListener('DOMContentLoaded', () => {    
  fs.readFile(path.join(__dirname, '../../package.json'), 'utf8', (err, data) => {
    replaceText('#appversion', JSON.parse(data).version);
  });

  const backElement = document.getElementById('back');
  backElement && backElement.addEventListener('click', () => {
    window.location.href = '../main/index.html';
  });
});
