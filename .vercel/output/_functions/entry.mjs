import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_6ex3e_72.mjs';
import { manifest } from './manifest_CtU2K2pg.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about-me.astro.mjs');
const _page3 = () => import('./pages/api/send-email.astro.mjs');
const _page4 = () => import('./pages/blog/posts/how-to-create-an-animated-border-with-tailwind.astro.mjs');
const _page5 = () => import('./pages/blog/posts/markdown-tutorial.astro.mjs');
const _page6 = () => import('./pages/blog/posts.astro.mjs');
const _page7 = () => import('./pages/blog/tags/_tag_.astro.mjs');
const _page8 = () => import('./pages/blog/tags.astro.mjs');
const _page9 = () => import('./pages/blog/techs/_category_.astro.mjs');
const _page10 = () => import('./pages/blog/techs.astro.mjs');
const _page11 = () => import('./pages/blog.astro.mjs');
const _page12 = () => import('./pages/contact.astro.mjs');
const _page13 = () => import('./pages/portfolio/projects/cyvera-digitals.astro.mjs');
const _page14 = () => import('./pages/portfolio/projects/sage-movies.astro.mjs');
const _page15 = () => import('./pages/robots.txt.astro.mjs');
const _page16 = () => import('./pages/rss.xml.astro.mjs');
const _page17 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about-me.md", _page2],
    ["src/pages/api/send-email.ts", _page3],
    ["src/pages/blog/posts/how-to-create-an-animated-border-with-tailwind.md", _page4],
    ["src/pages/blog/posts/markdown-tutorial.md", _page5],
    ["src/pages/blog/posts/index.astro", _page6],
    ["src/pages/blog/tags/[tag].astro", _page7],
    ["src/pages/blog/tags/index.astro", _page8],
    ["src/pages/blog/techs/[category].astro", _page9],
    ["src/pages/blog/techs/index.astro", _page10],
    ["src/pages/blog/index.astro", _page11],
    ["src/pages/contact.astro", _page12],
    ["src/pages/portfolio/projects/cyvera-digitals.md", _page13],
    ["src/pages/portfolio/projects/sage-movies.md", _page14],
    ["src/pages/robots.txt.ts", _page15],
    ["src/pages/rss.xml.js", _page16],
    ["src/pages/index.astro", _page17]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "ebeb7dfa-7df4-4d07-bc67-f5153318e092",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
