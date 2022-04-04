import "../styles/globals.css";
import "../styles/moreStyles.css";
import { ChakraProvider } from "@chakra-ui/react";
import "bulma/css/bulma.min.css";
import BulmaNavBar from "./Layout/bulma-Navbar";
import BulmaMenu from "./Layout/bulma-menu";
import { Fragment } from "react";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <BulmaNavBar />
      <div style={{ display: "flex", "flex-direction": "row" }}>
        <BulmaMenu className="column is-one-quarter" />
        <Component {...pageProps} />
      </div>
    </ChakraProvider>
  );
}

export default MyApp;
