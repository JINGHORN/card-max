import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    // 打包输出到dist文件夹
    outDir: 'dist',
    // 适配GitHub Pages路径
    base: '/card/' 
  }
})