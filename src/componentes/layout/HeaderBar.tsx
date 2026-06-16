"use client";

import { themePalette } from "@/src/theme/theme.config";
import { Avatar, Box, CircularProgress, Grid, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from '@/src/assets/img/iasaLogo.png';
import Image from 'next/image';
import { useRouter } from "next/navigation";

export const HeaderBar: React.FC = () => {
  const router = useRouter();
      
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: themePalette.BGWHITE, borderBottom: '1px solid #e0e0e0' }}>
      <Grid
        container
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 2, sm: 4, md: 10 }, // Margen dinámico para los lados en lugar de ml: 10 fijo
          py: 1
        }}
      >
        {/* LADO IZQUIERDO: LOGO */}
        <Grid size={{ xs: 5, sm: 6, md: 8 }}>
          <Box 
            sx={{ 
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              // Hacemos que el contenedor del logo se adapte
              width: { xs: "120px", sm: "160px", md: "200px" }, 
              height: "auto"
            }}
            onClick={() => router.push("/")}
          >
            <Image
              src={logo}
              alt="Logo"
              style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              priority
            />
          </Box>
        </Grid>

        {/* LADO DERECHO: USUARIO */}
        <Grid
          size={{ xs: 7, sm: 6, md: 4 }}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Stack
            direction="row"
            spacing={{ xs: 1, sm: 2 }}
            sx={{ alignItems: "center" }}
          >
            {/* Ocultamos o achicamos el texto en pantallas muy pequeñas para evitar colisiones */}
            <Box sx={{ textAlign: "right" }}>
              <Typography
                sx={{
                  fontSize: { xs: 14, sm: 16, md: 20 }, // Tipografía responsiva
                  fontWeight: 500,
                  color: "#1b2a4e",
                  lineHeight: 1.2
                }}
              >
                Invitado
              </Typography>
            </Box>

            <AccountCircleIcon
              sx={{
                fontSize: { xs: 32, sm: 36, md: 40 }, // Icono responsivo
                color: themePalette.YELLOW_DARK,
              }}
            />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};