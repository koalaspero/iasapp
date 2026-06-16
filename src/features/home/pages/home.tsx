"use client";

import { Container, Grid } from "@mui/material";
import AssessmentIcon from '@mui/icons-material/Assessment';
import { BotonMenu } from "@/src/componentes/ui/button/BotonMenu";
import { useRouter } from "next/navigation";
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';

import { motion } from "framer-motion";
import { useState } from "react";

export default function HomeSection() {
  const router = useRouter();
  const [isLeaving, setIsLeaving] = useState(false);

  const goToRecursos = () => {
    setIsLeaving(true);

    setTimeout(() => {
      router.push("/recursos");
    }, 300);
  };

  return (
    <motion.div
      animate={{
        x: isLeaving ? "-100vw" : 0,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      style={{ width: "100%" }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          columns={12}
          sx={{
            minHeight: "80vh",
            justifyContent: "center",
            alignItems: "center",
            py: 4,
          }}
        >
          <Grid size={{ xs: 12, sm: 4 }} sx={{ display: "flex", justifyContent: "center" }}>
            <BotonMenu
              icon={<AssessmentIcon sx={{ fontSize: 40, color: "#FF6C37" }} />}
              label="RESUMEN"
              onClick={() => {
                router.push("/resumen");
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }} sx={{ display: "flex", justifyContent: "center" }}>
            <BotonMenu
              icon={<DashboardCustomizeIcon sx={{ fontSize: 40, color: "#2D9CDB" }} />}
              label="RECURSOS"
              onClick={goToRecursos}
            />
          </Grid>
        </Grid>
      </Container>
    </motion.div>
  );
}