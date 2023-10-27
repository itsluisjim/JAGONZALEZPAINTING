// smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
  
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

const browserLanguage = navigator.language;

  // Parse the language code if it includes the region (e.g., "en-US" to "en")
const defaultLanguage = browserLanguage.split('-')[0];
  
let translations = {};

function processTextWithBold(text) {
  const regex = /\*\*(.*?)\*\*/g;
  const parts = text.split(regex);

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 0) {
      // Regular text
      const textNode = document.createTextNode(parts[i]);
      fragment.appendChild(textNode);
    } else {
      // Text enclosed in **, so create a <span> for bold appearance
      const span = document.createElement("span");
      span.textContent = parts[i];
      fragment.appendChild(span);
    }
  }

  return fragment;
}

function changeLanguage(language) {
  const elements = document.querySelectorAll("[data-translate]");
  elements.forEach((element) => {
    const key = element.getAttribute("data-translate");
    if(key == "owner-message"){
      element.textContent = "";
      element.appendChild(processTextWithBold(translations[key][language]))
      
    } else {
      element.textContent = translations[key][language];
    }
  });

  // Store the selected language in local storage
  localStorage.setItem('selectedLanguage', language);
}

const languageSelector = document.getElementById("language-selector");
languageSelector.addEventListener("change", (event) => {
  const selectedLanguage = event.target.value;
  changeLanguage(selectedLanguage);
});

// Function to load the user's selected language from local storage
function loadSelectedLanguage() {
  let selectedLanguage = localStorage.getItem('selectedLanguage');

  if (!selectedLanguage) {
    // Use the default language if no language is selected
    selectedLanguage = defaultLanguage;
  }

  if (selectedLanguage) {
    // Set the selected option in the dropdown
    const languageSelector = document.getElementById('language-selector');
    for (let i = 0; i < languageSelector.options.length; i++) {
      if (languageSelector.options[i].value === selectedLanguage) {
        languageSelector.selectedIndex = i;
        break;
      }
    }
    

    // Change the language content
    changeLanguage(selectedLanguage);
  }
}

function loadTranslations(callback) {
  fetch('content/content-translations.json')
    .then(response => response.json())
    .then(data => {
      translations = data;
      callback();
    })
    .catch(error => console.error('Error loading translations:', error));
}

// Call loadTranslations before loading the selected language
// Call loadSelectedLanguage when the page loads
window.addEventListener('load', loadTranslations(loadSelectedLanguage));