// Main JavaScript file for the LinkedIn Keywords Research Tool

// Set current year in footer
document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  const currentYearElement = document.getElementById('current-year');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  // Initialize Bootstrap tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Initialize Bootstrap popovers
  const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
  popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });
});

// Helper function to get URL parameters
function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  const results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Helper function to save keywords to local storage
function saveKeyword(keyword, category) {
  let savedKeywords = JSON.parse(localStorage.getItem('savedKeywords')) || [];
  
  // Check if keyword already exists
  const exists = savedKeywords.some(item => 
    item.keyword.toLowerCase() === keyword.toLowerCase() && 
    item.category.toLowerCase() === category.toLowerCase()
  );
  
  if (!exists) {
    savedKeywords.push({
      keyword,
      category,
      date: new Date().toISOString()
    });
    
    localStorage.setItem('savedKeywords', JSON.stringify(savedKeywords));
    return true; // Successfully saved
  }
  
  return false; // Already exists
}

// Helper function to remove saved keyword
function removeSavedKeyword(keyword, category) {
  let savedKeywords = JSON.parse(localStorage.getItem('savedKeywords')) || [];
  
  savedKeywords = savedKeywords.filter(item => 
    !(item.keyword.toLowerCase() === keyword.toLowerCase() && 
      item.category.toLowerCase() === category.toLowerCase())
  );
  
  localStorage.setItem('savedKeywords', JSON.stringify(savedKeywords));
}

// Helper function to check if a keyword is saved
function isKeywordSaved(keyword, category) {
  const savedKeywords = JSON.parse(localStorage.getItem('savedKeywords')) || [];
  
  return savedKeywords.some(item => 
    item.keyword.toLowerCase() === keyword.toLowerCase() && 
    item.category.toLowerCase() === category.toLowerCase()
  );
}

// Helper function to format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}