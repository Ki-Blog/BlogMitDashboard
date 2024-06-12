import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api/auth': {
        target: "https://B317DE025C2BC2BA239A7F13A3704AF7.gr7.eu-central-1.eks.amazonaws.com:4000",
        secure: false,
      },
      '/api/user': {
        target: "https://B317DE025C2BC2BA239A7F13A3704AF7.gr7.eu-central-1.eks.amazonaws.com:4001",
        secure: false,
      },
      '/api/post': {
        target: "https://B317DE025C2BC2BA239A7F13A3704AF7.gr7.eu-central-1.eks.amazonaws.com:4003",
        secure: false,
      },
      '/api/comment': {
        target: "https://B317DE025C2BC2BA239A7F13A3704AF7.gr7.eu-central-1.eks.amazonaws.com:4003",
        secure: false,
      },
    },
  },
  plugins: [react()],
});
