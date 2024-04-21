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
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `${baseUrl}${mainEntry.file}`;
        script.async = false;  // Load this script synchronously
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    }
  }

  function init() {
    fetch(manifestUrl)
      .then(response => response.json())
      .then(manifest => {
        createMountPoint();
        return loadMainAssets(manifest);
      })
      .then(() => {
        // Ensure initVueApp is available before calling it
        if (window.initVueApp && window.Dawnvox) {
          initVueApp(window.Dawnvox);  // Assuming `initVueApp` is your app initialization function
        }
      })
      .catch(error => {
        console.error('Error loading the Vue app:', error);
      });
  }

  init();
})();
