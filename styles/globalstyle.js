import { css } from '@emotion/react';

/** 글로벌 default css 세팅 */
export const style = css`
  @charset "UTF-8";

  * {
    margin: 0px;
    padding: 0px;
  }

  ul, ol {
    list-style: none;
  }

  li {
    cursor: pointer;
  }

  a {
    text-decoration: none
  }
`;

export const searchBtn = css`
  width : 100px;
  height : 100%;
  border : 1px solid #ccc;
  border-radius : 3px;
`;
