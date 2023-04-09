import { css } from "@emotion/react";

const marginUnit = 4;
const borderRadiusUnit = 5;

export const spacing = {
  mt: (value : any) => css`
    margin-top: ${value * marginUnit}px;
  `,
  mb: (value : any) => css`
    margin-bottom: ${value * marginUnit}px;
  `,
  ml: (value : any) => css`
    margin-left: ${value * marginUnit}px;
  `,
  mr: (value : any) => css`
    margin-right: ${value * marginUnit}px;
  `,
  mx: (value : any) => css`
    margin-left: ${value * marginUnit}px;
    margin-right: ${value * marginUnit}px;
  `,
  my: (value : any) => css`
    margin-top: ${value * marginUnit}px;
    margin-bottom: ${value * marginUnit}px;
  `,
  m: (value : any) => css`
    margin-top: ${value * marginUnit}px;
    margin-bottom: ${value * marginUnit}px;
    margin-left: ${value * marginUnit}px;
    margin-right: ${value * marginUnit}px;
  `,
};

export const radius = {
  m: (value : any) => css`
    border-radius: ${value * borderRadiusUnit}px;
    border-radius: ${value * borderRadiusUnit}px;
    border-radius: ${value * borderRadiusUnit}px;
    border-radius: ${value * borderRadiusUnit}px;
`,
}