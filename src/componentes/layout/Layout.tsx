"use client";

import { themePalette } from "@/src/theme/theme.config";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { HeaderBar } from "./HeaderBar";
import { Footer } from "./Footer";

export type LayoutProps = {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const theme = useTheme();
  
    const headerHeight = 80; // adjust to your HeaderBar height in px
  
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Fixed Header */}
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 1100,
            borderBottom: `2px solid ${themePalette.NAVCOLOR}`,
          }}
        >
          <HeaderBar />
        </Box>
  
        {/* Main content + Footer */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            mt: `${headerHeight}px`, // push content below fixed header
            minHeight: `calc(100vh - ${headerHeight}px)`, // ensure full viewport height
            backgroundColor: theme.palette.background.default, // avoid white gap
          }}
        >
          <Box
            component="main"
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              mb: 0, // no bottom margin
            }}
          >
            {children}
          </Box>
          <Footer />
        </Box>
      </Box>
    );
  };