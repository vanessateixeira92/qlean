import { createGlobalStyle } from "styled-components";
import Typography from "./components/generic/Typography";
import Colors from "./components/generic/Colors";

const GlobalStyle = createGlobalStyle`
 
 * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

   html, body {
    height: 100%;
    margin: 0;
    overflow: hidden;
  } 
  
  body {
    font-family: ${Typography.fontFamilyOutfit};
    color: ${Colors.textPrimary};
    font-weight: ${Typography.fontWeightRegular};
  }
`;

export default GlobalStyle;
