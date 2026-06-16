import {
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    CircularProgress,
    Alert,
  } from "@mui/material";
import { useEffect } from "react";
  
  interface ApiStatusDialogProps {
    open: boolean;
    loading?: boolean;
    error?: string | null;
    success?: boolean;
    messages?: string[];
    onClose: () => void;
  
    // textos opcionales
    loadingText?: string;
    successFallback?: string;
    errorFallback?: string;
  }
  
  export const ApiStatusDialog = ({
    open,
    loading = true,
    error,
    success,
    messages,
    onClose,
    loadingText = "Procesando...",
    successFallback = "Operación exitosa",
    errorFallback = "Ocurrió un error",
  }: ApiStatusDialogProps) => {

    useEffect(() => {
      if(open ){
        console.log(`Exito? ${success} y ${messages?.length}`);
      }
      
    }, [loading]);

    const message = messages && messages.length > 0
    ? messages[0]
    : success
      ? successFallback
      : error
        ? errorFallback
        : "";
      
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
        <DialogTitle sx={{textAlign: "center"}} >
          {loading ? loadingText : "Resultado"}
        </DialogTitle>
  
        <DialogContent>
          {(loading || loading == undefined)  ? (
            <Box
              sx={{ justifyContent: "center", alignItems: "center", height: 100, display: "flex"}}
            >
              <CircularProgress />
            </Box>
          ) : !success ? (
            <Alert severity="error" onClose={onClose}>
              {message}
            </Alert>
          ) : success ? (
            <Alert severity="success" onClose={onClose}>
              {message}
            </Alert>
          ) : null}
        </DialogContent>
      </Dialog>
    );
  };