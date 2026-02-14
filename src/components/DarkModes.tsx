import React, { useState, useEffect } from "react";
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, Paper, Button } from "@mui/material";

export function DarkModes() {
  const [activeMode, setActiveMode] = useState("none");

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (activeMode !== "flashlight") return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [activeMode]);

  const [lightning, setLightning] = useState(false);
  const [lightningOrigin, setLightningOrigin] = useState({ x: 50, y: 50 });

  useEffect(() => {
    if (activeMode !== "thunderstorm") return;

    let timeoutId: NodeJS.Timeout;

    const triggerLightning = () => {
      // Randomize where lightning is strongest
      setLightningOrigin({
        x: Math.random() * 100,
        y: Math.random() * 100,
      });

      setLightning(true);

      // Turn off after flash
      setTimeout(() => {
        setLightning(false);
      }, 120);

      // 30% chance of double strike
      if (Math.random() < 0.3) {
        setTimeout(() => {
          setLightning(true);
          setTimeout(() => setLightning(false), 100);
        }, 200);
      }

      const nextStrike = Math.random() * 5000 + 2000;
      timeoutId = setTimeout(triggerLightning, nextStrike);
    };

    triggerLightning();

    return () => {
      clearTimeout(timeoutId);
      setLightning(false);
    };
  }, [activeMode]);

  const [power, setPower] = useState(0); // 0 to 100

  useEffect(() => {
    if (activeMode !== "handcrank") return;

    const decay = setInterval(() => {
      setPower((prev) => Math.max(prev - 1, 0));
    }, 50); // drains pretty fast

    return () => clearInterval(decay);
  }, [activeMode]);

  useEffect(() => {
    if (activeMode !== "handcrank") return;

    let isDragging = false;
    let lastY = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      lastY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const delta = Math.abs(lastY - e.clientY);
      lastY = e.clientY;

      setPower((prev) => Math.min(prev + delta * 0.5, 100));
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [activeMode]);

  return (
    <Box
      sx={{
        p: 3,
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        animation: lightning ? "shake 0.3s ease-in-out" : "none",
        "@keyframes shake": {
          "0%": { transform: "translate(0, 0)" },
          "20%": { transform: "translate(-5px, 0)" },
          "40%": { transform: "translate(5px, 0)" },
          "60%": { transform: "translate(-5px, 0)" },
          "80%": { transform: "translate(5px, 0)" },
          "100%": { transform: "translate(0, 0)" },
        },
      }}
    >
      {/* --- CONTROL PANEL --- */}
      <Paper sx={{ p: 3, mb: 4, display: "flex", alignItems: "center", gap: 3, zIndex: 10, position: "relative" }}>
        <Typography variant="h6">Dark Mode Testing Facility</Typography>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Select Mode</InputLabel>
          <Select value={activeMode} label="Select Mode" onChange={(e) => setActiveMode(e.target.value)}>
            <MenuItem value="none">Nothing</MenuItem>
            <MenuItem value="flashlight">Flashlight Cursor</MenuItem>
            <MenuItem value="handcrank">Hand-Crank</MenuItem>
            <MenuItem value="thunderstorm">Thunder</MenuItem>
          </Select>
        </FormControl>
      </Paper>

      {/* --- DUMMY CONTENT --- */}
      {/* We wrap this in a container so we can target it easily with CSS later */}
      <Box className="cursed-content-area" sx={{ maxWidth: 800, mx: "auto" }}>
        <Typography variant="h3" gutterBottom>
          The Unreadable Manifesto
        </Typography>

        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </Typography>

        <Button variant="contained" color="secondary" sx={{ my: 2 }}>
          Useless Button
        </Button>

        <Typography sx={{ mt: 2 }}>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Typography>

        <Typography sx={{ mt: 2 }}>
          Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est
          eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.
        </Typography>
      </Box>
      {activeMode === "flashlight" && (
        <Box
          sx={{
            pointerEvents: "none",
            position: "fixed",
            inset: 0,
            background: `radial-gradient(
                    circle 150px at ${mousePos.x}px ${mousePos.y}px,
                    transparent 0px,
                    rgba(0,0,0,0.7) 75px,
                    rgba(0,0,0,0.99) 150px
                )`,
            zIndex: 9,
          }}
        />
      )}

      {activeMode === "thunderstorm" && (
        <Box
          sx={{
            pointerEvents: "none",
            position: "fixed",
            inset: 0,
            background: lightning
              ? `radial-gradient(
                circle at ${lightningOrigin.x}% ${lightningOrigin.y}%,
                rgba(255,255,255,0.9) 0%,
                rgba(255,255,255,0.6) 20%,
                rgba(0,0,0,0.95) 60%
            )`
              : "rgba(0,0,0,0.97)",
            transition: "background 80ms ease-out",
            zIndex: 9,
          }}
        />
      )}

      {activeMode === "handcrank" && (
        <Box
          sx={{
            pointerEvents: "none",
            position: "fixed",
            inset: 0,
            background: `
                radial-gradient(
                circle ${power * 12}px at 50% 50%,
                rgba(255,255,255,0.9) 0%,
                rgba(255,255,255,0.6) 30%,
                rgba(0,0,0,0.98) 70%
                )
            `,
            transition: "background 80ms linear",
            zIndex: 9,
          }}
        />
      )}
    </Box>
  );
}
