import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Cormorant:wght@300;400;500&amp;display=swap"
            rel="stylesheet"
          />
          <link rel="manifest" href="/app.webmanifest" />
          <link rel="shortcut icon" href="/favicon.png" />
          <link rel="apple-touch-icon" sizes="64x64" href="/favicon.png" />
          <link rel="icon" type="image/png" sizes="64x64" href="/favicon.png" />
          {process.env.NODE_ENV === "production" && (
            <script
              async
              defer
              data-website-id="5267c73d-8fd5-4a8a-9177-1a21b5526e1b"
              src="https://analytics.nierrein.guide/umami.js"
            ></script>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
