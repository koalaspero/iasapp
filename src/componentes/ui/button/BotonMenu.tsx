import { Box, Typography } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";
import Image from 'next/image';
import { StaticImageData, StaticImport } from "next/dist/shared/lib/get-img-props";
import { ReactNode } from "react";

type BotonMenuProps = {
  icon: ReactNode;
  label: string;
  color?: string;
  onClick: () => void;
};

export const BotonMenu = ({
  icon,
  label,
  color = "#FF6C37",
  onClick,
}: BotonMenuProps) => {
  const isMaterialIcon = typeof icon === "function";

  return (
    <Box
      onClick={onClick}
      sx={{
        width: 140,
        height: 160,
        borderRadius: 3,
        border: "1px solid #eee",
        boxShadow: "0px 1px 4px rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "0.3s",
        "&:hover": {
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        },
      }}
    >
      {icon}

      <Typography
        variant="subtitle2"
        sx={{
          mt: 1,
          fontWeight: 500,
          color: "#9e9e9e",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};