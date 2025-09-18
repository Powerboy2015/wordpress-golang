import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
    host: true,       // binds to 0.0.0.0, not just localhost
    port: 3000,       // keeps port 3000
    strictPort: true, // fail if 3000 is in use
    allowedHosts: ["localhost","reader.zochi.space"]
  },
})
