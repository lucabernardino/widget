(function() {
  // Configuration
  const baseUrl = 'https://dawnvox.com/';
  const manifestUrl = `${baseUrl}manifest.json`;

  // Create a div element where Vue app will mount
  function createMountPoint() {
      const appDiv = document.createElement('div');
      appDiv.id = 'dawn_vox_app';
      document.body.appendChild(appDiv);
  }

  // Load JS and CSS files
// Load JS and CSS files based on the manifest structure you provided
function loadAssets(manifest) {
  const assets = [];

  // Load each entry in the manifest
  Object.keys(manifest).forEach(key => {
      const entry = manifest[key];
      // Check for and load CSS
      if (entry.css) {
          entry.css.forEach(css => {
              const link = document.createElement('link');
              link.href = `${baseUrl}${css}`;
              link.rel = 'stylesheet';
              document.head.appendChild(link);
          });
      }

      // Check for and load JS
      if (entry.file) {
          const promise = new Promise((resolve) => {
              const script = document.createElement('script');
              script.src = `${baseUrl}${entry.file}`;
              script.onload = resolve;
              document.body.appendChild(script);
          });
          assets.push(promise);
      }
  });

  return Promise.all(assets);
}


  // Fetch the manifest and load files
  function init() {
      fetch(manifestUrl)
          .then(response => response.json())
          .then(manifest => {
              createMountPoint();
              return loadAssets(manifest);
          })
          .then(() => {
              console.log('Vue app loaded successfully.');
          })
          .catch(error => {
              console.error('Error loading the Vue app:', error);
          });
  }

  init();
})();
