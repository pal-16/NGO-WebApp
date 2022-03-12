import React, { Suspense, lazy } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Box, Container } from "@material-ui/core";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Spinner from "../src/components/common/Spinner";
import { AuthProvider } from "./context/AuthContext";
import { SnackbarProvider } from "./context/SnackbarContext";
import SnackBar from "./components/common/SnackBar";
const LazyLanding = lazy(() => import("./components/common/Landing"));
const LazyPageNotFound = lazy(() => import("./components/common/PageNotFound"));
const LazyUser = lazy(() => import("./components/user/User"));
const LazyOrganization = lazy(() => import("./components/organization/Organization"));

const App = () => {
  return (
    <BrowserRouter>
      <SnackbarProvider>
        <AuthProvider>
          <SnackBar />
          <Box
            display="flex"
            flexDirection="column"
            className="App"
            style={{
              position: "relative",
              minHeight: "100vh"
            }}
          >
            <Box>
              <Header />
            </Box>
            <Box
              flexGrow={1}
              style={{ marginBottom: "auto", minHeight: "80vh" }}
            >
              <Suspense fallback={<Spinner />}>
                <Container>
                  <Switch>
                    <Route exact path="/" component={LazyLanding} />
                    <Route path="/user" component={LazyUser} />
                    <Route path="/organization" component={LazyOrganization} />
                    <Route path="*" component={LazyPageNotFound} />
                  </Switch>
                </Container>
              </Suspense>
            </Box>
            <Box>
              <Footer />
            </Box>
          </Box>
        </AuthProvider>
      </SnackbarProvider>
    </BrowserRouter>
  );
};

export default App;
