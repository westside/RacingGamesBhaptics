const { ipcRenderer, shell } = require('electron');
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

  const rf2link1 = document.getElementById('rf2link1');
  rf2link1 && rf2link1.addEventListener('click', () => {
    shell.openExternal("https://www.mediafire.com/file/s6ojcr9zrs6q9ls/rf2_sm_tools_3.7.15.1.zip/file")
  });

  const rf2link2 = document.getElementById('rf2link2');
  rf2link2 && rf2link2.addEventListener('click', () => {
    shell.openExternal(`file://${__dirname}/../../dll`)
  });
});
