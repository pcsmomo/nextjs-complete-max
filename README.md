# Next.js & React - The Complete Guide (incl. Two Paths!)

Next.js & React - The Complete Guide (incl. Two Paths!) by Maximilian Schwarzmüller

## Folder structure

- 04-prj-routing: Event project 01
- 06-prj-data-fetching: Event project 02
- 07-prj-optimizations: Event project 03
- 09-prj-api-routes: Event project 04
- 11-prj-blog: Blog project
- 13-auth: Auth project

## Details

<details open>
  <summary>Click to Contract/Expend</summary>

## Section 04. Project Time: Working with File-based Routing

### 77. Adding Buttons & Icons

[heroicons](https://heroicons.com/)

## Section 05. Page Pre-Rendering & Data Fetching

### 89. How NextJS Prepares & Pre-renders Pages

Two forms of pre-rendering

- Static Generation
  - pre-generate a page _during building time_
  - pages are prepared ahead to time and can be cached by the server / CDN serving the app
  - `export async function getStaticProps(context) {}`
  -
- Server-side Rendering

### 95. Utilizing Incremental Static Generation (ISR)

[DOC: Incremental Static Regeneration](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)

Re-generate it on every request, at most every X seconds

- Serve "old" page if re-generation is not needed yet
- Generate, store and server "new" page otherwise

> in Dev version, it will regenerate every reload \
> but in Production, it will generate every 10 seconds as defined

```js
return {
  revalidate: 10,
};
```

### 98. Working With Dynamic Parameters

> it can be done using `useRouter()` but that will render only on front side

```js
// localhost:3000/p1
export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;
  return {};
}
```

### 99. Introducing "getStaticPaths" For Dynamic Pages

[DOC: getStaticPaths](https://nextjs.org/docs/basic-features/data-fetching/get-static-paths)

### 104. Fallback Pages & "Not Found" Pages

1. `fallback: false`
   - deal with only specifically generated pages
2. `fallback: true`
   - good combination with
     ```js
     // getStaticProps()
     if (!product) {
       return { notFound: true };
     }
     // component
     if (!loadedProduct) {
       return <p>Loading...</p>;
     }
     ```
3. `fallback: "blocking"`
   - or just this

### 105. Introducing "getServerSideProps" for Server-side Rendering (SSR)

We can choose onlh one either

- `getStaticProps()`
  - with `getStaticPaths()`
- `getServerSideProps()`

### 106. Using "getServerSideProps" for Server-side Rendering

- `getServerSideProps()` returns as the same as `getStaticProps()` except `revalidate` as it will always run again

### 107. getServerSideProps and its Context

```js
export async function getServerSideProps(context) {
  const { params, req, res } = context;
  return { props: { username: "Max" } };
}
```

> `req` and `res` are the node js classes

- [Request: https://nodejs.org/api/http.html#http_class_http_incomingmessage](https://nodejs.org/api/http.html#http_class_http_incomingmessage)
- [Response: https://nodejs.org/api/http.html#http_class_http_serverresponse](https://nodejs.org/api/http.html#http_class_http_serverresponse)

### 110. Introducing Client-Side Data Fetching (And When To Use It)

- Data changing with high frequency (e.g. stock data)
- Highly user-specific data (e.g. last orders in an online shop)
- Partial data (e.g. data that's only used on a part of an page)

### 111. Implementing Client-Side Data Fetching

[firebase](https://firebase.google.com/)

1. Go to Console
2. Create a new project, 'nextjs-course'
3. Build -> Realtime Database -> Create Database
   - Security rules: Start in test mode
4. Add data
   ```json
   {
     "sales": {
       "s1": {
         "username": "Max",
         "volume": 100
       },
       "s2": {
         "username": "Manuel",
         "volume": 50
       }
     }
   }
   ```

## Section 06. Project Time: Page Pre-rendering & Data Fetching

### 118. Preparations

import `import.json` to the firebase

### 121. Optimizing Data Fetching

`getStaticPaths()` - `fallback`

- false: we created all possible pages
- true: it means we have fallback component which is `<p>Loading...<p>`
- blocking: will server-render pages

## Section 11. Complete App Example: Build a Full Blog A to Z

### 188. Rendering Markdown As JSX

```sh
npm install --save react-markdown
```

### 190. Adding Functions To Read & Fetch Data From Markdown Files

[npm gray-matter](https://www.npmjs.com/package/gray-matter)

- it parses meta data and content from a file

```sh
npm install --save gray-matter
```

### 195. Rendering Code Snippets From Markdown

[react-syntax-highlighter](https://www.npmjs.com/package/react-syntax-highlighter)

```sh
npm install --save react-syntax-highlighter
```

### 199. Storing Messages With MongoDB In A Database

```sh
npm install --save mongodb
```

### 201. Adding "head" Data

It is very important for post content page as it optimises search engines (SEO)

```jsx
<Head>
  <title>{props.post.title}</title>
  <meta name="description" content={props.post.excerpt} />
</Head>
```

## Section 12. Deploying NextJS Apps

### 207. Building NextJS Apps: Your Options

1. Standard Build
   - `next build`
   - Produces optimized production bundles and a server-side app: Requires NodeJS server
   - Pages are pre-rendered (if possible) but NodeJS server is required for API routes, server-side pages and page revalidations
   - Re-deploy needed if code changes or you don't use revalidations and need page updates
2. Full Static Build
   - `next export`
   - Produces 100% static app (HTML, CSS, JS): No NodeJS server required
   - Doesn't work if your app uses API routes, server-side pages or wants to use page revalidations
   - Re-deploy needed for all code and content changes

### 211. Running a Test Build & Reducing Code Size

```sh
npm run build

Route (pages)                                      Size     First Load JS
┌ ● / (ISR: 60 Seconds)                            1.05 kB        78.8 kB
├   └ css/0b7eed4ff99cfd8a.css                     606 B
├   /_app                                          0 B            74.5 kB
├ ○ /404                                           181 B          74.7 kB
├ λ /api/contact                                   0 B            74.5 kB
├ ○ /contact                                       1.3 kB         75.8 kB
├   └ css/f8039d3041f1b6e3.css                     709 B
├ ● /posts (ISR: 60 Seconds)                       861 B          78.7 kB
├   └ css/bf52dc61e5ba2b27.css                     436 B
└ ● /posts/[slug] (ISR: 5 Seconds) (772 ms)        272 kB          350 kB
    └ css/1c165c261101802e.css                     436 B
    ├ /posts/mastering-javascript (391 ms)
    └ /posts/getting-started-with-nextjs (381 ms)
+ First Load JS shared by all                      75.3 kB
  ├ chunks/framework-8c5acb0054140387.js           45.4 kB
  ├ chunks/main-2364f599a24c3599.js                25.7 kB
  ├ chunks/pages/_app-1aa950c7dc621994.js          2.6 kB
  ├ chunks/webpack-ee7e63bc15b31913.js             815 B
  └ css/2a9ae2bcaf0d7f3f.css                       783 B
```

`/posts/[slug] (ISR: 5 Seconds) (772 ms) 272 kB 350 kB` is too big!!

[react-syntax-highlighter - light build](https://github.com/react-syntax-highlighter/react-syntax-highlighter#light-build)

```sh
└ ● /posts/[slug] (ISR: 5 Seconds) (772 ms)        272 kB          350 kB
# -> After refactoring
└ ● /posts/[slug] (ISR: 5 Seconds) (762 ms)        49.9 kB         128 kB
```

> And this is before compression. \
> NodeJS will compress these files

```sh
npm run build
npm start
# Warning: For production Image Optimization with Next.js, the optional 'sharp' package is strongly recommended. Run 'yarn add sharp', and Next.js will use it automatically for Image Optimization.
npm install sharp --save
```

### 212. A Full Deployment Example (To Vercel)

1. create an vercel account
2. create a private repo
3. push all code to the repo
<!-- 4. github settings -> developer settings -> personal access token (classic)
   - note: local development
   - check `repo`, `admin:repo_hook`, `delete_repo`
   - generate -->
4. vercel -> import git repository
5. deploy with default settings
6. make a change and push to the github -> CD(continuous deployment)

### 214. Using the "export" Feature

Full Static Build : no serverside code

```sh
# run on 03-pages-file-based-routing
npm run build
npm run export
# it will generate 'out' directory
```

### 219. How Does Authentication Work (In React & NextJS Apps)?

#### Two ways to authenticate

- Server-side Sessions
  - Store unique identifier on server, send some identifier to client
  - Client sends identifier along with requests to protected reousrces
- Authentidcation Tokens (recommended for SPA)
  - Create (but not store) "permission" token on server, send token to client
  - Client sends token along with requests to protected resources

#### Reasons why using tokens

> SPAs works with tokens instead of sessions because

- Pages are served directly and populated with logic without hitting the server
  - (Some nextjs pages are not though)
- Backend APIs work in a "stateless" way (they don't care about connected clients)
  - Servers don't save information about authenticated clients

#### JWT (JSON Web Tokens)

- JSON Web Token
  - Issuer Data
  - Custom Data
  - Secret Signing Key
    - Only the signing server is able to verify an incoming token
- Signed, NOT encrypted (can be parsed + read by anyone)

### 220. Must Read: Install the Right next-auth Version

[next-auth v4 upgrade guide](https://next-auth.js.org/getting-started/upgrade-v4)

### 221. Using The "next-auth" Library

```sh
# v4 now
npm install --save next-auth
# in the course it uses v3
# npm install --save-exact next-auth@3
```

### 222. Adding A User Signup API Route

```sh
# prettify except .next folder
prettier -w . '!**/.next'
```

</details>
