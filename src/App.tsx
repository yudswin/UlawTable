import { Authenticated, GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Login, ForgotPassword, Register, Home } from "./pages";
import { dataProvider, liveProvider, authProvider } from "./providers";
import Layout from "./components/layout";
import { resources } from "./config/resources";
import Doc from "./pages/doc";


function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <AntdApp>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              liveProvider={liveProvider}
              notificationProvider={useNotificationProvider}
              routerProvider={routerBindings}
              authProvider={authProvider}
              resources={resources}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
                projectId: "Zd4bQ5-pzvYcd-2sXSOZ",
                liveMode: "auto",
              }}
            >
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Home />} />
                <Route path="/welcome" element={<WelcomePage />} />
                <Route path="/doc" element={<Doc />} />
                {/* <Route element={
                  // <Authenticated
                  //   key="authenticated-layout"
                  //   fallback={<CatchAllNavigate to="/login" />}
                  // >
                  //   <Layout>
                  //     <Outlet />
                  //   </Layout>
                  // </Authenticated>
                  <Layout>
                    <Outlet />
                  </Layout>
                }>
                </Route> */}
                <Route index element={<Home />} />
              </Routes>
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </AntdApp>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
