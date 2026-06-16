"use client";

import { ApiStatusDialog } from "@/src/componentes/feedback/ApiStatusDialog";
import { PAISES } from "@/src/lib/countryList";
import { getModelos } from "@/src/services/modelosService";
import { createOportunidad } from "@/src/services/oportunidadService";
import { themePalette } from "@/src/theme/theme.config";
import { ESTADOS_OPORTUNIDAD, OportunidadFormData, OportunidadFormErrors } from "@/src/types/forms/OportunidadFormData";
import { Autocomplete, Button, Container, Grid, InputAdornment, MenuItem, Paper, Slider, Stack, TextField, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Modelo } from "@prisma/client";
import { useEffect, useState } from "react";

export default function OportunidadFormSection(){

    const [formData, setFormData] = useState(
        new OportunidadFormData()
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

    const [errors, setErrors] = useState<OportunidadFormErrors>({});

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
        field: keyof OportunidadFormData,
        value: any
    ) => {
        setFormData((prev) => new OportunidadFormData({ ...prev, [field]: value,}))
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
    
        await createOportunidad(formData.toModel());
    
        setStatusDialog({
            open: true,
            loading: false,
            success: true,
            error: null,
            messages: ["Oportunidad creada correctamente"],
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
            <Paper sx={{ p: 4}}>
                <Stack spacing={3}>
                    <Typography variant="h5" sx={{ color: themePalette.NIGHT_BLUE}}>
                        Registro de Oportunidad
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label="ID"
                                error={!!errors.idOportunidad}
                                helperText={errors.idOportunidad}
                                value={formData.idOportunidad}
                                onChange={(e) =>
                                    handleChange("idOportunidad" as keyof OportunidadFormData, e.target.value)
                                }
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label="Cliente"
                                error={!!errors.nombreCliente}
                                helperText={errors.nombreCliente}
                                value={formData.nombreCliente}
                                onChange={(e) =>
                                    handleChange("nombreCliente" as keyof OportunidadFormData, e.target.value)
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
                                fullWidth
                                label="Nombre de Ejecutivo"
                                error={!!errors.ejecutivo}
                                helperText={errors.ejecutivo}
                                value={formData.ejecutivo}
                                onChange={(e) =>
                                    handleChange("ejecutivo" as keyof OportunidadFormData, e.target.value)
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

                        <Grid size={{ xs: 12, md: 6 }} sx={{display: "flex", flexDirection: "column"}}>
                            <Typography sx={{ color: themePalette.NIGHT_BLUE}}>
                                Probabilidad de éxito
                            </Typography>
                            <Slider
                                value={formData.probabilidadCierre}
                                min={0}
                                max={100}
                                step={5}
                                valueLabelDisplay="auto"
                                onChange={(_, value) =>
                                    handleChange(
                                    "probabilidadCierre",
                                    value as number
                                    )
                                }
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Fecha de Cierre"
                                    value={formData.fechaCierre}
                                    onChange={(value) =>
                                    handleChange("fechaCierre", value)
                                    }
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            error: !!errors.fechaCierre,
                                            helperText: errors.fechaCierre,
                                        },
                                    }}
                                />
                            </LocalizationProvider>    
                        </Grid>
                          <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label="Valor USD"
                                type="number"
                                value={formData.valorUSD}
                                error={!!errors.valorUSD}
                                helperText={errors.valorUSD}
                                onChange={(e) =>
                                    handleChange(
                                    "valorUSD",
                                    Number(e.target.value)
                                    )
                                }
                                slotProps={{
                                    input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                        $
                                        </InputAdornment>
                                    ),
                                    },
                                }}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                select
                                fullWidth
                                label="Estado"
                                value={formData.estadoOportunidad}
                                error={!!errors.estadoOportunidad}
                                helperText={errors.estadoOportunidad}
                                onChange={(e) =>
                                handleChange("estadoOportunidad", e.target.value)
                                }
                            >
                                {ESTADOS_OPORTUNIDAD.map((estado) => (
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

