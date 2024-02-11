import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { AdminRoutes, Protect } from "./utils";
import { useAuthContext } from "./contexts";
import { NotFound } from "./pages/NotFound";
import { Login } from "./pages";

function App() {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
    const { user } = useAuthContext();

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    {user && <Sidebar isSidebar={isSidebar} />}
                    <main className="content">
                        <Routes>

                            <Route path="/login" element={<Login />} />

                            <Route element={<Protect />}>

                                <Route path="/" element={<></>} />

                                <Route element={<AdminRoutes />}>

                                    <Route path="/admin" element={<></>} />

                                </Route>

                            </Route>

                            <Route path="*" element={<NotFound />} />

                        </Routes>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
