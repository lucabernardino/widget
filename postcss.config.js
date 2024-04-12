import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import prefixSelector from 'postcss-prefix-selector';

export default {
  plugins: [
    tailwindcss,
    autoprefixer,
    prefixSelector({
      prefix: '#dawn_vox_app', // Add your custom prefix
      transform: function(prefix, selector, prefixedSelector) {
        if (selector.startsWith('html') || selector.startsWith('body')) {
          return prefix + selector.substring(4); // Avoid prefixing 'html' and 'body'
        }
        return prefix + ' ' + selector; // Default transform to prefix other selectors
      }
    })
  ]
};
