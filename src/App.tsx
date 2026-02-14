import { Routes, Route, Navigate, Link } from "react-router-dom";
import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { Login } from "@/components/Login";
import { WeatherDisplay } from "@/components/WeatherDisplay";
import { DarkModes } from "./components/DarkModes";

export function App() {
  const { isDark, toggleDarkMode } = useTheme();
  const { token, username, loading, logout } = useAuth();

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.default",
        color: "text.primary",
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Bun + React
          </Typography>

          {/* New link to the testing ground! */}
          {token && (
            <Button color="inherit" component={Link} to="/cursed-modes" sx={{ mr: 2 }}>
              🧪 Lab
            </Button>
          )}

          <Button color="inherit" onClick={toggleDarkMode}>
            {isDark ? "☀️" : "🌙"}
          </Button>

          {token && (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Routes>
        <Route
          path="/"
          element={
            token ? (
              <Box sx={{ p: 3 }}>
                <Typography variant="h4">Welcome, {username}!</Typography>
                <WeatherDisplay />
              </Box>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/cursed-modes" element={token ? <DarkModes /> : <Navigate to="/login" />} />
      </Routes>
    </Box>
  );
}

export default App;
