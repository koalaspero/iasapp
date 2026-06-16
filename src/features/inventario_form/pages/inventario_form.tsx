"use client";

import { useEffect, useState } from "react";
import {
    Autocomplete,
  Button,
  Container,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import 'dayjs/locale/es'; 
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { InventarioFormData, InventarioFormErrors } from "@/src/types/forms/InventarioFormData";
import { getModelos } from "@/src/services/modelosService";
import { themePalette } from "@/src/theme/theme.config";
import { PAISES } from "@/src/lib/countryList";
import { createInventario } from "@/src/services/inventarioService";
import { ApiStatusDialog } from "@/src/componentes/feedback/ApiStatusDialog";
import { Modelo } from "@/src/generated/prisma/client";

export default function InventarioFormSection() {
  const [formData, setFormData] = useState(
    new InventarioFormData()
  );

  const [modelos, setModelos] = useState<Modelo[]>([]);

  const [loadingModelos, setLoadingModelos] = useState(true);
  const [statusDialog, setStatusDialog] = useState({
    open: false,
    loading: false,
    success: false,
    error: null as string | null,
    messages: [] as string[],
  });
  const [errors, setErrors] = useState<InventarioFormErrors>({});

  const ESTADOS_INVENTARIO = [
    "Disponible",
    "No Disponible",
  ];
  

  useEffect(() => {
    const loadModelos = async () => {
      try {
        setLoadingModelos(true);

        const data = await getModelos();

        setModelos(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingModelos(false);
      }
    };

    loadModelos();
  }, []);

  const handleChange = (
    field: keyof InventarioFormData,
    value: any
  ) => {
    setFormData((prev) => new InventarioFormData({ ...prev, [field]: value,}))
    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  };

  const handleSubmit = async () => {
    const validationErrors = formData.validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setStatusDialog({
        open: true,
        loading: true,
        success: false,
        error: null,
        messages: [],
      });

      await createInventario(formData.toModel());

      setStatusDialog({
        open: true,
        loading: false,
        success: true,
        error: null,
        messages: ["Inventario creado correctamente"],
      });

    } catch (error) {
      setStatusDialog({
        open: true,
        loading: false,
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
        messages: [],
      });
    }
  };

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Stack spacing={3}>
          <Typography variant="h5" sx={{ color: themePalette.NIGHT_BLUE}}>
            Nuevo Inventario
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Serie"
                error={!!errors.serie}
                helperText={errors.serie}
                value={formData.serie}
                onChange={(e) =>
                  handleChange("serie", e.target.value)
                }
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Autocomplete
                options={PAISES}
                value={formData.pais}
                onChange={(_, value) =>
                  handleChange("pais", value ?? "")
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="País"
                    error={!!errors.pais}
                    helperText={errors.pais}
                    required
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                select
                fullWidth
                label="Estado"
                value={formData.estado}
                error={!!errors.estado}
                helperText={errors.estado}
                onChange={(e) =>
                  handleChange("estado", e.target.value)
                }
              >
                {ESTADOS_INVENTARIO.map((estado) => (
                  <MenuItem
                    key={estado}
                    value={estado}
                  >
                    {estado}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Ubicación"
                error={!!errors.ubicacion}
                helperText={errors.ubicacion}
                value={formData.ubicacion}
                onChange={(e) =>
                  handleChange("ubicacion", e.target.value)
                }
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="Cantidad"
                error={!!errors.cantidad}
                helperText={errors.cantidad}
                value={formData.cantidad}
                onChange={(e) =>
                  handleChange(
                    "cantidad",
                    Number(e.target.value)
                  )
                }
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                <DatePicker
                    minDate= {dayjs()}
                    format="DD/MM/YYYY" 
                    label="Fecha de Corte"
                    value={formData.fechaCorte}
                    onChange={(value) =>
                    handleChange("fechaCorte", value)
                    }
                    slotProps={{
                      textField: {
                          fullWidth: true,
                          error: !!errors.fechaCorte,
                          helperText: errors.fechaCorte,
                      },
                    }}
                />
              </LocalizationProvider>
              
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Autocomplete<Modelo>
                options={modelos}
                loading={loadingModelos}
                value={
                    modelos.find(
                    (modelo) => modelo.id === formData.idModelo
                    ) ?? null
                }
                onChange={(_, value) =>
                    handleChange(
                    "idModelo",
                    value?.id ?? null
                    )
                }
                getOptionLabel={(option) =>
                    `${option.nombre} - ${option.familia}`
                }
                isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                }
                renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Modelo"
                      error={!!errors.idModelo}
                      helperText={errors.idModelo}
                      required
                    />
                )}
                />
            </Grid>
          </Grid>

          <Stack
            direction="row"
            sx={{justifyContent: "center"}}
          >
            <Button
              variant="contained"
              onClick={handleSubmit}
              // sx={{width: "30vw"}}
            >
              Guardar
            </Button>
          </Stack>
        </Stack>
      </Paper>
      <ApiStatusDialog
        open={statusDialog.open}
        loading={statusDialog.loading}
        success={statusDialog.success}
        error={statusDialog.error}
        messages={statusDialog.messages}
        onClose={() => {
            setStatusDialog((prev) => ({
              ...prev,
              open: false,
            }));
            window.location.reload();
          }
        }
      />
    </Container>
  );
}
