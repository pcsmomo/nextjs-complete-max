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

</details>
