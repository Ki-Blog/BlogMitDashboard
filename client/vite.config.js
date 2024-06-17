import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api/auth': {
        target: "625613c13274fc3f570cec109a741f92.gr7.eu-central-1.eks.amazonaws.com",
        secure: false,
      },
      '/api/user': {
        target: "625613c13274fc3f570cec109a741f92.gr7.eu-central-1.eks.amazonaws.com",
        secure: false,
      },
      '/api/post': {
        target: "625613c13274fc3f570cec109a741f92.gr7.eu-central-1.eks.amazonaws.com",
        secure: false,
      },
      '/api/comment': {
        target: "625613c13274fc3f570cec109a741f92.gr7.eu-central-1.eks.amazonaws.com",
        secure: false,
      },
    },
  },
  plugins: [react()],
});