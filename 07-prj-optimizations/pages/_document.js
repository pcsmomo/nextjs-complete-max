import { Html, Head, Main, NextScript } from "next/document";
// <Head /> from next/document and next/head are different

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        {/* this is located outside of our app which is sometimes useful */}
        <div id="overlays" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
