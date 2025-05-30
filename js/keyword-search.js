// Keyword search functionality for the LinkedIn Keywords Research Tool

document.addEventListener('DOMContentLoaded', function() {
  // Initialize the keyword search form
  const searchForm = document.getElementById('keywordSearchForm');
  if (searchForm) {
    searchForm.addEventListener('submit', handleKeywordSearch);
    
    // Set initial values based on URL parameters
    const keywordParam = getUrlParameter('keyword');
    const categoryParam = getUrlParameter('category');
    
    if (keywordParam) {
      document.getElementById('keyword').value = keywordParam;
    }
    
    if (categoryParam) {
      const categoryRadio = document.querySelector(`input[name="category"][value="${categoryParam}"]`);
      if (categoryRadio) {
        categoryRadio.checked = true;
      }
    }
  }
  
  // Initialize search results page if we're on it
  const searchResultsContainer = document.getElementById('searchResults');
  if (searchResultsContainer && window.location.pathname.includes('search.html')) {
    const keyword = getUrlParameter('keyword');
    const category = getUrlParameter('category') || 'profile';
    
    if (keyword || category) {
      generateSearchResults(keyword, category);
    }
  }
});

// Handle keyword search form submission
function handleKeywordSearch(e) {
  e.preventDefault();
  
  const keywordInput = document.getElementById('keyword');
  const keyword = keywordInput.value.trim();
  
  const categoryInputs = document.querySelectorAll('input[name="category"]');
  let category = 'profile'; // Default
  
  for (const input of categoryInputs) {
    if (input.checked) {
      category = input.value;
      break;
    }
  }
  
  // Redirect to search page with parameters
  if (keyword) {
    window.location.href = `./search.html?keyword=${encodeURIComponent(keyword)}&category=${encodeURIComponent(category)}`;
  } else {
    window.location.href = `./search.html?category=${encodeURIComponent(category)}`;
  }
}

// Generate search results based on keyword and category
function generateSearchResults(keyword, category) {
  const searchResultsContainer = document.getElementById('searchResults');
  if (!searchResultsContainer) return;
  
  // Show loading spinner
  searchResultsContainer.innerHTML = `
    <div class="spinner-container">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `;
  
  // Simulate API call delay
  setTimeout(() => {
    // Generate mock results
    const results = generateMockKeywordResults(keyword, category);
    
    // Display results
    displaySearchResults(results, keyword, category);
  }, 1500);
}

// Generate mock keyword results
function generateMockKeywordResults(keyword, category) {
  const results = [];
  
  // If no keyword provided, generate category-specific keywords
  if (!keyword) {
    if (category === 'profile') {
      return [
        { keyword: 'Project Manager', popularity: 95, relevance: 100, difficulty: 85, viewsIncrease: 78 },
        { keyword: 'Digital Marketing Specialist', popularity: 92, relevance: 100, difficulty: 80, viewsIncrease: 75 },
        { keyword: 'Software Engineer', popularity: 98, relevance: 100, difficulty: 90, viewsIncrease: 82 },
        { keyword: 'Data Analyst', popularity: 94, relevance: 100, difficulty: 82, viewsIncrease: 76 },
        { keyword: 'Product Manager', popularity: 93, relevance: 100, difficulty: 84, viewsIncrease: 77 }
      ];
    } else if (category === 'job') {
      return [
        { keyword: 'Remote Work', popularity: 96, relevance: 100, difficulty: 75, viewsIncrease: 80 },
        { keyword: 'Entry Level Position', popularity: 90, relevance: 100, difficulty: 65, viewsIncrease: 72 },
        { keyword: 'Senior Role', popularity: 88, relevance: 100, difficulty: 78, viewsIncrease: 70 },
        { keyword: 'Hybrid Work', popularity: 94, relevance: 100, difficulty: 72, viewsIncrease: 78 },
        { keyword: 'Full-time', popularity: 92, relevance: 100, difficulty: 68, viewsIncrease: 75 }
      ];
    } else { // content
      return [
        { keyword: 'Industry Trends', popularity: 91, relevance: 100, difficulty: 70, viewsIncrease: 85 },
        { keyword: 'Career Advice', popularity: 93, relevance: 100, difficulty: 75, viewsIncrease: 88 },
        { keyword: 'Leadership Tips', popularity: 89, relevance: 100, difficulty: 72, viewsIncrease: 82 },
        { keyword: 'Professional Development', popularity: 90, relevance: 100, difficulty: 74, viewsIncrease: 84 },
        { keyword: 'Networking Strategies', popularity: 87, relevance: 100, difficulty: 68, viewsIncrease: 80 }
      ];
    }
  }
  
  // Main keyword result
  results.push({
    keyword: keyword,
    popularity: Math.floor(Math.random() * 15) + 85, // 85-99
    relevance: 100,
    difficulty: Math.floor(Math.random() * 20) + 70, // 70-89
    viewsIncrease: Math.floor(Math.random() * 20) + 70 // 70-89
  });
  
  // Generate variations
  const prefixes = ['Professional', 'Expert', 'Certified', 'Experienced', 'Top'];
  const suffixes = ['Specialist', 'Professional', 'Expert', 'Manager', 'Consultant'];
  
  // Add prefix variations
  for (let i = 0; i < 2; i++) {
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    if (!keyword.toLowerCase().includes(prefix.toLowerCase())) {
      results.push({
        keyword: `${prefix} ${keyword}`,
        popularity: Math.floor(Math.random() * 15) + 70, // 70-84
        relevance: Math.floor(Math.random() * 10) + 85, // 85-94
        difficulty: Math.floor(Math.random() * 20) + 60, // 60-79
        viewsIncrease: Math.floor(Math.random() * 15) + 65 // 65-79
      });
    }
  }
  
  // Add suffix variations
  for (let i = 0; i < 2; i++) {
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    if (!keyword.toLowerCase().includes(suffix.toLowerCase())) {
      results.push({
        keyword: `${keyword} ${suffix}`,
        popularity: Math.floor(Math.random() * 15) + 70, // 70-84
        relevance: Math.floor(Math.random() * 10) + 85, // 85-94
        difficulty: Math.floor(Math.random() * 20) + 60, // 60-79
        viewsIncrease: Math.floor(Math.random() * 15) + 65 // 65-79
      });
    }
  }
  
  // Add category-specific variations
  if (category === 'profile') {
    results.push(
      { 
        keyword: `${keyword} Skills`, 
        popularity: Math.floor(Math.random() * 10) + 75, 
        relevance: Math.floor(Math.random() * 10) + 85, 
        difficulty: Math.floor(Math.random() * 15) + 65, 
        viewsIncrease: Math.floor(Math.random() * 10) + 70 
      },
      { 
        keyword: `${keyword} Experience`, 
        popularity: Math.floor(Math.random() * 10) + 75, 
        relevance: Math.floor(Math.random() * 10) + 85, 
        difficulty: Math.floor(Math.random() * 15) + 65, 
        viewsIncrease: Math.floor(Math.random() * 10) + 70 
      }
    );
  } else if (category === 'job') {
    results.push(
      { 
        keyword: `${keyword} Jobs`, 
        popularity: Math.floor(Math.random() * 10) + 75, 
        relevance: Math.floor(Math.random() * 10) + 85, 
        difficulty: Math.floor(Math.random() * 15) + 65, 
        viewsIncrease: Math.floor(Math.random() * 10) + 70 
      },
      { 
        keyword: `${keyword} Career`, 
        popularity: Math.floor(Math.random() * 10) + 75, 
        relevance: Math.floor(Math.random() * 10) + 85, 
        difficulty: Math.floor(Math.random() * 15) + 65, 
        viewsIncrease: Math.floor(Math.random() * 10) + 70 
      }
    );
  } else { // content
    results.push(
      { 
        keyword: `${keyword} Trends`, 
        popularity: Math.floor(Math.random() * 10) + 75, 
        relevance: Math.floor(Math.random() * 10) + 85, 
        difficulty: Math.floor(Math.random() * 15) + 65, 
        viewsIncrease: Math.floor(Math.random() * 10) + 70 
      },
      { 
        keyword: `${keyword} Tips`, 
        popularity: Math.floor(Math.random() * 10) + 75, 
        relevance: Math.floor(Math.random() * 10) + 85, 
        difficulty: Math.floor(Math.random() * 15) + 65, 
        viewsIncrease: Math.floor(Math.random() * 10) + 70 
      }
    );
  }
  
  return results;
}

// Generate related keywords based on main keyword and category
function generateRelatedKeywords(mainKeyword, category) {
  // This function generates mock related keywords
  const relatedKeywords = [];
  
  // Common industry-related terms
  const industryTerms = [
    'Technology', 'Finance', 'Healthcare', 'Marketing', 'Education',
    'Manufacturing', 'Retail', 'Consulting', 'Engineering', 'Design'
  ];
  
  // Common skill-related terms
  const skillTerms = [
    'Leadership', 'Communication', 'Analytics', 'Strategy', 'Management',
    'Development', 'Planning', 'Research', 'Coordination', 'Implementation'
  ];
  
  // Add industry-related keywords
  for (let i = 0; i < 3; i++) {
    const industry = industryTerms[Math.floor(Math.random() * industryTerms.length)];
    relatedKeywords.push({
      keyword: `${industry} ${mainKeyword}`,
      relevance: Math.floor(Math.random() * 15) + 75 // 75-89
    });
  }
  
  // Add skill-related keywords
  for (let i = 0; i < 3; i++) {
    const skill = skillTerms[Math.floor(Math.random() * skillTerms.length)];
    relatedKeywords.push({
      keyword: `${mainKeyword} ${skill}`,
      relevance: Math.floor(Math.random() * 15) + 75 // 75-89
    });
  }
  
  // Add category-specific related keywords
  if (category === 'profile') {
    relatedKeywords.push(
      { keyword: `${mainKeyword} Professional`, relevance: 92 },
      { keyword: `${mainKeyword} Expert`, relevance: 88 },
      { keyword: `Senior ${mainKeyword}`, relevance: 85 }
    );
  } else if (category === 'job') {
    relatedKeywords.push(
      { keyword: `${mainKeyword} Position`, relevance: 90 },
      { keyword: `${mainKeyword} Opportunity`, relevance: 87 },
      { keyword: `${mainKeyword} Role`, relevance: 89 }
    );
  } else { // content
    relatedKeywords.push(
      { keyword: `${mainKeyword} Insights`, relevance: 91 },
      { keyword: `${mainKeyword} Strategies`, relevance: 88 },
      { keyword: `${mainKeyword} Best Practices`, relevance: 86 }
    );
  }
  
  // Sort by relevance
  return relatedKeywords.sort((a, b) => b.relevance - a.relevance);
}

// Display search results
function displaySearchResults(results, keyword, category) {
  const searchResultsContainer = document.getElementById('searchResults');
  if (!searchResultsContainer) return;
  
  // Clear previous results
  searchResultsContainer.innerHTML = '';
  
  // Create results header
  const resultsHeader = document.createElement('div');
  resultsHeader.className = 'mb-4';
  
  if (keyword) {
    resultsHeader.innerHTML = `
      <h2>Results for "${keyword}" in ${getCategoryDisplayName(category)}</h2>
      <p class="text-muted">Found ${results.length} keywords that can boost your LinkedIn presence</p>
    `;
  } else {
    resultsHeader.innerHTML = `
      <h2>Top Keywords for ${getCategoryDisplayName(category)}</h2>
      <p class="text-muted">Found ${results.length} popular keywords for this category</p>
    `;
  }
  
  searchResultsContainer.appendChild(resultsHeader);
  
  // Create results list
  const resultsList = document.createElement('div');
  resultsList.className = 'keyword-results-list';
  
  results.forEach(result => {
    const resultCard = document.createElement('div');
    resultCard.className = 'card keyword-result-card mb-3';
    
    // Check if keyword is saved
    const isSaved = isKeywordSaved(result.keyword, category);
    
    resultCard.innerHTML = `
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-start">
          <h3 class="h5 mb-3">${result.keyword}</h3>
          <button 
            class="save-keyword-btn ${isSaved ? 'saved-keyword-btn' : ''}" 
            data-keyword="${result.keyword}" 
            data-category="${category}"
            title="${isSaved ? 'Remove from saved keywords' : 'Save keyword'}"
          >
            <i class="bi ${isSaved ? 'bi-bookmark-fill' : 'bi-bookmark'}"></i>
          </button>
        </div>
        
        <div class="mb-3">
          <span class="keyword-metric">
            <i class="bi bi-graph-up me-1"></i> Popularity: ${result.popularity}%
          </span>
          <span class="keyword-metric">
            <i class="bi bi-bullseye me-1"></i> Relevance: ${result.relevance}%
          </span>
          <span class="keyword-metric">
            <i class="bi bi-bar-chart-fill me-1"></i> Difficulty: ${result.difficulty}%
          </span>
          <span class="keyword-metric">
            <i class="bi bi-eye me-1"></i> % Views: +${result.viewsIncrease}%
          </span>
        </div>
        
        <p class="text-muted mb-0 small">
          <i class="bi bi-info-circle me-1"></i>
          Using this keyword can increase your profile views by approximately ${result.viewsIncrease}%.
        </p>
      </div>
    `;
    
    resultsList.appendChild(resultCard);
  });
  
  searchResultsContainer.appendChild(resultsList);
  
  // Add event listeners to save buttons
  const saveButtons = document.querySelectorAll('.save-keyword-btn');
  saveButtons.forEach(button => {
    button.addEventListener('click', function() {
      const keyword = this.getAttribute('data-keyword');
      const category = this.getAttribute('data-category');
      
      if (this.classList.contains('saved-keyword-btn')) {
        // Remove from saved
        removeSavedKeyword(keyword, category);
        this.classList.remove('saved-keyword-btn');
        this.innerHTML = '<i class="bi bi-bookmark"></i>';
        this.title = 'Save keyword';
      } else {
        // Add to saved
        saveKeyword(keyword, category);
        this.classList.add('saved-keyword-btn');
        this.innerHTML = '<i class="bi bi-bookmark-fill"></i>';
        this.title = 'Remove from saved keywords';
      }
    });
  });
  
  // Display related keywords if we have a main keyword
  if (keyword) {
    displayRelatedKeywords(keyword, category, searchResultsContainer);
  }
}

// Display related keywords section
function displayRelatedKeywords(keyword, category, container) {
  // Generate related keywords
  const relatedKeywords = generateRelatedKeywords(keyword, category);
  
  // Create related keywords section
  const relatedSection = document.createElement('div');
  relatedSection.className = 'related-keywords-section mt-5';
  
  relatedSection.innerHTML = `
    <h3 class="mb-4">Related Keywords</h3>
    <p class="text-muted mb-4">These related keywords can help expand your LinkedIn presence</p>
    <div class="row g-3" id="relatedKeywordsContainer"></div>
  `;
  
  container.appendChild(relatedSection);
  
  const relatedContainer = document.getElementById('relatedKeywordsContainer');
  
  // Add related keywords
  relatedKeywords.forEach(related => {
    const relatedCard = document.createElement('div');
    relatedCard.className = 'col-md-4 col-sm-6';
    
    // Check if keyword is saved
    const isSaved = isKeywordSaved(related.keyword, category);
    
    relatedCard.innerHTML = `
      <div class="card h-100 related-keyword-card">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start">
            <h4 class="h6 mb-2">${related.keyword}</h4>
            <button 
              class="save-keyword-btn btn-sm ${isSaved ? 'saved-keyword-btn' : ''}" 
              data-keyword="${related.keyword}" 
              data-category="${category}"
              title="${isSaved ? 'Remove from saved keywords' : 'Save keyword'}"
            >
              <i class="bi ${isSaved ? 'bi-bookmark-fill' : 'bi-bookmark'}"></i>
            </button>
          </div>
          <div class="d-flex align-items-center">
            <span class="badge bg-primary bg-opacity-10 text-primary me-2">
              <i class="bi bi-bullseye me-1"></i> Relevance: ${related.relevance}%
            </span>
            <a href="./search.html?keyword=${encodeURIComponent(related.keyword)}&category=${encodeURIComponent(category)}" class="btn btn-sm btn-outline-primary ms-auto">
              <i class="bi bi-search"></i>
            </a>
          </div>
        </div>
      </div>
    `;
    
    relatedContainer.appendChild(relatedCard);
  });
  
  // Add event listeners to save buttons in related keywords
  const relatedSaveButtons = relatedContainer.querySelectorAll('.save-keyword-btn');
  relatedSaveButtons.forEach(button => {
    button.addEventListener('click', function() {
      const keyword = this.getAttribute('data-keyword');
      const category = this.getAttribute('data-category');
      
      if (this.classList.contains('saved-keyword-btn')) {
        // Remove from saved
        removeSavedKeyword(keyword, category);
        this.classList.remove('saved-keyword-btn');
        this.innerHTML = '<i class="bi bi-bookmark"></i>';
        this.title = 'Save keyword';
      } else {
        // Add to saved
        saveKeyword(keyword, category);
        this.classList.add('saved-keyword-btn');
        this.innerHTML = '<i class="bi bi-bookmark-fill"></i>';
        this.title = 'Remove from saved keywords';
      }
    });
  });
}

// Helper function to get category display name
function getCategoryDisplayName(category) {
  switch (category.toLowerCase()) {
    case 'profile':
      return 'Profile';
    case 'job':
      return 'Job Search';
    case 'content':
      return 'Content';
    default:
      return category;
  }
}