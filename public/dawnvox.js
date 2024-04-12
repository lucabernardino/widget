(function() {
  const baseUrl = 'https://dawnvox.com/';
  const manifestUrl = `${baseUrl}manifest.json`;

  function createMountPoint() {
    const appDiv = document.createElement('div');
    appDiv.id = 'dawn_vox_app';
    document.body.appendChild(appDiv);
  }

  function loadAssets(manifest) {
    const assets = [];
    Object.keys(manifest).forEach(key => {
      const entry = manifest[key];
      if (entry.css) {
        entry.css.forEach(css => {
          const link = document.createElement('link');
          link.href = `${baseUrl}${css}`;
          link.rel = 'stylesheet';
          document.head.appendChild(link);
        });
      }
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

  function init() {
    fetch(manifestUrl)
      .then(response => response.json())
      .then(manifest => {
        createMountPoint();
        return loadAssets(manifest);
      })
      // .then(() => {
      //   if (window.dawnVoxConfig) {
      //     // Pass the configuration to your Vue app
      //     initVueApp(window.dawnVoxConfig);  // Assuming `initVueApp` is your app initialization function
      //   }
      // })
      .catch(error => {
        console.error('Error loading the Vue app:', error);
      });
  }

  init();
})();
