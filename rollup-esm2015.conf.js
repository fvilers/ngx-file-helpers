export default {
  input: './build/esm2015/ngx-file-helpers.js',
  output: {
    file: './dist/esm2015/ngx-file-helpers.js',
    format: 'es',
    globals: {
      '@angular/core': 'ng.core',
      '@angular/common': 'ng.common',
    }
  }
};
