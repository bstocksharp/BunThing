// ...existing code...
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Popover,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import { useTheme } from "@/context/ThemeContext";

export function DarkModesControl() {
  const { isDark, toggleDarkMode } = useTheme();

  const [showModes, setShowModes] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const longPressTimer = useRef<number | null>(null);
  const longPressed = useRef(false);
  const mouseDownTarget = useRef<HTMLElement | null>(null);
  const LONG_PRESS_MS = 600;

  // overlay mode state
  const [activeMode, setActiveMode] = useState<
    "none" | "flashlight" | "handcrank"
  >("none");

  // flashlight
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (activeMode !== "flashlight") return;
    const onMove = (e: MouseEvent) =>
      setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [activeMode]);

  // handcrank (power)
  const [power, setPower] = useState(0);
  useEffect(() => {
    if (activeMode !== "handcrank") return;
    // Decay : -1 every 50ms
    const decay = window.setInterval(
      () => setPower((p) => Math.max(p - 1, 0)),
      50,
    );
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
      setPower((prev) => Math.min(prev + delta * 0.1, 100));
    };
    const handleMouseUp = () => (isDragging = false);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [activeMode]);

  const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    mouseDownTarget.current = e.currentTarget as HTMLElement;
    longPressTimer.current = window.setTimeout(() => {
      longPressed.current = true;
      // If an effect is already active, long-press should cancel it instead of opening modes
      if (activeMode !== "none") {
        setActiveMode("none");
        longPressed.current = false;
        return;
      }
      setAnchorEl(mouseDownTarget.current);
      setShowModes(true);
    }, LONG_PRESS_MS);
  };

  const clearLongPress = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const handleMouseUp = () => {
    clearLongPress();
  };

  const handleClick = () => {
    // If any special overlay is active, any click (short or long) cancels it
    if (activeMode !== "none") {
      setActiveMode("none");
      setShowModes(false);
      longPressed.current = false;
      return;
    }

    if (showModes) {
      setShowModes(false);
      longPressed.current = false;
      return;
    }
    if (longPressed.current) {
      longPressed.current = false;
      return;
    }
    toggleDarkMode();
  };

  return (
    <>
      <Button
        color="inherit"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={clearLongPress}
        onClick={handleClick}
      >
        {isDark ? "☀️" : "🌙"}
      </Button>

      <Popover
        open={showModes}
        anchorEl={anchorEl}
        onClose={() => {
          setShowModes(false);
          longPressed.current = false;
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <List sx={{ width: 240 }}>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                setActiveMode("flashlight");
                setShowModes(false);
              }}
            >
              Flashlight Cursor
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                setActiveMode("handcrank");
                setShowModes(false);
              }}
            >
              Hand-Crank
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>

      {/* Overlays */}
      {activeMode === "flashlight" && (
        <Box
          sx={{
            pointerEvents: "none",
            position: "fixed",
            inset: 0,
            background: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, transparent 0px, 
                    rgba(0,0,0,0.7) 75px, 
                    rgba(0,0,0,0.99) 150px)`,
            zIndex: 1400,
          }}
        />
      )}

      {activeMode === "handcrank" && (
        <Box
          sx={{
            pointerEvents: "none",
            position: "fixed",
            inset: 0,
            background: `radial-gradient(circle ${power * 20}px at 50% 50%, 
                    rgba(255,255,255,0.9) 0%, 
                    rgba(255,255,255,0.6) 30%, 
                    rgba(0,0,0,0.98) 70%)`,
            transition: "background 80ms linear",
            zIndex: 1400,
          }}
        >
          <Box sx={{ position: "fixed", left: 16, bottom: 16, zIndex: 1500 }}>
            <Typography variant="caption" color="white">
              Power: {Math.round(power)}%
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
}
