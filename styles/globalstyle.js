import { css } from '@emotion/react';
import colors from "@styles/color/light";

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

  .center {
    width: 1200px;
    margin : 0 auto;
  }
`;

export const searchBtn = css`
  width : 100px;
  height: 50px;
  border : 1px solid #ccc;
  border-radius : 3px;

  background-color : ${colors.bronze100} ;
`;


export default style;