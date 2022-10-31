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

</details>
