# Next.js & React - The Complete Guide (incl. Two Paths!)

Next.js & React - The Complete Guide (incl. Two Paths!) by Maximilian Schwarzmüller

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

</details>
