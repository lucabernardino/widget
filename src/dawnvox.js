(function() {
  const baseUrl = 'https://dawnvox.com/';
  const manifestUrl = `${baseUrl}manifest.json`;

  function createMountPoint() {
    const appDiv = document.createElement('div');
    appDiv.id = 'dawn_vox_app';
    document.body.appendChild(appDiv);
  }

  function loadMainAssets(manifest) {
    const mainEntry = manifest["src/main.js"];
    if (!mainEntry) return;

    // Load CSS files if they exist
    if (mainEntry.css) {
      mainEntry.css.forEach(css => {
        const link = document.createElement('link');
        link.href = `${baseUrl}${css}`;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
      });
    }

    // Load the JavaScript file
    if (mainEntry.file) {
      const script = document.createElement('script');
      script.src = `${baseUrl}${mainEntry.file}`;
      script.async = true;  // Ensure script is loaded asynchronously
      document.body.appendChild(script);
    }
  }

  function init() {
    fetch(manifestUrl)
      .then(response => response.json())
      .then(manifest => {
        createMountPoint();
        loadMainAssets(manifest);
      })
      .then(() => {
        if (window.Dawnvox) {
          // Pass the configuration to your Vue app
          initVueApp(window.Dawnvox);  // Assuming `initVueApp` is your app initialization function
        }
      })
      .catch(error => {
        console.error('Error loading the Vue app:', error);
      });
  }

  init();
})();
