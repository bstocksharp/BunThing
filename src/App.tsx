import { Routes, Route, Navigate, Link } from "react-router-dom";
import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { Login } from "@/components/Login";
import { DarkModesControl } from "@/components/DarkModeControls";
import { Home } from "@/components/Home";

export function App() {
  const { token, loading, logout } = useAuth();

  if (loading) return <Typography>Loading...</Typography>;

  const isHomePage = location.pathname === "/";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: !isHomePage ? "background.default" : undefined,
        color: "text.primary",
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Bun
          </Typography>

          <DarkModesControl />

          {token && (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Box>
  );
}

export default App;
