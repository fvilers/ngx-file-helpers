export default {
  input: './build/esm5/ngx-file-helpers.js',
  output: {
    file: './dist/bundles/ngx-file-helpers.umd.js',
    name: 'ngxFilesHelpers',
    format: 'umd',
    globals: {
      '@angular/core': 'ng.core',
      '@angular/common': 'ng.common',
    }
  }
};
