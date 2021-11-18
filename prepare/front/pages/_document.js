/* eslint-disable consistent-return */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

// App.js 위의 _document.js이다 즉 전체 페이지 적용
// _document.js랑 _app.js에서는 getInitalProps를 사용한다.
// getInitalProps은 _document.js랑 _app.js에서만 사용하는 특수 메소드.
export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () => originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
      });

      // _document 기본 형태
      // 작업 내용은 styled component SSR 적용.
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } catch (error) {
      console.error(error);
    } finally {
      sheet.seal();
    }
  }

  // polyfill.io에서 script를 받을 수 있음
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
