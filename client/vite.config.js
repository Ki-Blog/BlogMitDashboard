import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api/auth': {
        target: "",
        secure: false,
      },
      '/api/user': {
        target: "",
        secure: false,
      },
      '/api/post': {
        target: "",
        secure: false,
      },
      '/api/comment': {
        target: "",
        secure: false,
      },
    },
  },
  plugins: [react()],
});