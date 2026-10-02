import fs from 'fs';
import type { IncomingMessage, ServerResponse } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

import react from '@vitejs/plugin-react';
import type { ViteDevServer } from 'vite';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

import { buildDebugContentSecurityPolicy } from './debugCsp';
import { getDebugCspSourcesByScope } from './debugCspScopeSources';
import { proxyPlugin } from './proxy';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(() => {
    return {
        base: './',
        server: {
            port: 5173,
            strictPort: true,
            cors: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
            },
        },
        plugins: [
            svgr(),
            react(),
            {
                name: 'serve-config-from-root',
                apply: 'serve',
                configureServer(server: ViteDevServer) {
                    server.middlewares.use(
                        (req: IncomingMessage, res: ServerResponse, next: () => void) => {
                            const manifestPath = path.resolve(__dirname, 'manifest.json');
                            let manifest: unknown;

                            try {
                                manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
                            } catch {
                                manifest = undefined;
                            }

                            res.setHeader(
                                'Content-Security-Policy',
                                buildDebugContentSecurityPolicy(
                                    manifest,
                                    getDebugCspSourcesByScope(),
                                ),
                            );

                            if (req.url === '/config.json') {
                                const configPath = path.resolve(__dirname, 'config.json');
                                if (fs.existsSync(configPath)) {
                                    res.setHeader('Content-Type', 'application/json');
                                    res.setHeader('Access-Control-Allow-Origin', '*');
                                    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
                                    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
                                    res.end(fs.readFileSync(configPath, 'utf-8'));
                                    return;
                                }
                            }
                            next();
                        },
                    );
                },
            },
            proxyPlugin(),
        ],
        build: {
            sourcemap: false,
            cssCodeSplit: true,
            rollupOptions: {
                output: {
                    sourcemapIgnoreList: () => false,
                },
            },
        },
        css: {
            devSourcemap: true,
            preprocessorOptions: {
                scss: {},
            },
        },
    };
});
