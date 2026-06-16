"use client";

import { Container, Grid } from "@mui/material";
import WidgetsIcon from '@mui/icons-material/Widgets';
import { BotonMenu } from "@/src/componentes/ui/button/BotonMenu";
import { themePalette } from "@/src/theme/theme.config";
import HandshakeIcon from '@mui/icons-material/Handshake';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";


export default function RecursosSection() {

  const router = useRouter();

  return (
    <motion.div
      initial={{ x: "100vw" }}
      animate={{ x: 0 }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      <Container maxWidth="lg">
        <Grid 
          container 
          spacing={4} 
          columns={12} 
          sx={{ 
            minHeight: '80vh', 
            justifyContent: "center", 
            alignItems: "center",
          }} 
        >
          {/* INVENTARIO */}
          <Grid size={{ xs: 12, sm: 4, }} sx={{display:"flex", justifyContent:"center"}} >
            <BotonMenu
              icon={<WidgetsIcon sx={{ fontSize: 40, color: "#FF6C37" }} />}
              label="INVENTARIO"
              onClick={() => {
                router.push("/inventario_form");
              }}
            />
          </Grid>

          {/* TRANSITO */}
          <Grid size={{ xs: 12, sm: 4 }} sx={{display:"flex", justifyContent:"center"}}>
            <BotonMenu
              icon={<DirectionsBoatIcon sx={{ fontSize: 40, color: "#2D9CDB" }} />}
              label="TRANSITO"
              onClick={() => {
                router.push("/transito_form");
              }}
            />
          </Grid>

          {/* OPORTUNIDADES */}
          <Grid size={{ xs: 12, sm: 4 }} sx={{display:"flex", justifyContent:"center"}}>
            <BotonMenu
              icon={<HandshakeIcon sx={{ fontSize: 40, color: themePalette.YELLOW_DARK }} />}
              label="OPORTUNIDADES"
              onClick={() => {
                router.push("/oportunidad_form");
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </motion.div>
    
  );
}