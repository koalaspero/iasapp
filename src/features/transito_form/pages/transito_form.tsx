"use client";

import { ApiStatusDialog } from "@/src/componentes/feedback/ApiStatusDialog";
import { Modelo } from "@/src/generated/prisma/client";
import { PAISES } from "@/src/lib/countryList";
import { getModelos } from "@/src/services/modelosService";
import { createTransito } from "@/src/services/transitoService";
import { themePalette } from "@/src/theme/theme.config";
import { ESTADOS_EMBARQUE, TransitoFormData, TransitoFormErrors } from "@/src/types/forms/TransitoFormData";
import { Autocomplete, Button, Container, Grid, MenuItem, Paper, Stack, TextField, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useEffect, useState } from "react";
import 'dayjs/locale/es'; 
import dayjs from "dayjs";

export default function TransitoFormSection(){
    const [formData, setFormData] = useState(
        new TransitoFormData()
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
    
    const [errors, setErrors] = useState<TransitoFormErrors>({});

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
        field: keyof TransitoFormData,
        value: any
    ) => {
        setFormData((prev) => new TransitoFormData({ ...prev, [field]: value,}))
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
    
        await createTransito(formData.toModel());
    
        setStatusDialog({
            open: true,
            loading: false,
            success: true,
            error: null,
            messages: ["Registro de tránsito creado correctamente"],
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
                        Registro de Tránsito
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Autocomplete
                                options={PAISES}
                                value={formData.paisDestino}
                                onChange={(_, value) =>
                                handleChange("paisDestino", value ?? "")
                                }
                                renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="País de Destino"
                                    error={!!errors.paisDestino}
                                    helperText={errors.paisDestino}
                                    required
                                />
                                )}
                            />
                        </Grid>   

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label="Puerto de Origen"
                                error={!!errors.puertoOrigen}
                                helperText={errors.puertoOrigen}
                                value={formData.puertoOrigen}
                                onChange={(e) =>
                                    handleChange("puertoOrigen" as keyof TransitoFormData, e.target.value)
                                }
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label="Puerto de destino"
                                error={!!errors.puertoDestino}
                                helperText={errors.puertoDestino}
                                value={formData.puertoDestino}
                                onChange={(e) =>
                                    handleChange("puertoDestino" as keyof TransitoFormData, e.target.value)
                                }
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                                <DatePicker
                                    minDate= {dayjs()}
                                    label="Fecha de Corte"
                                    format = "DD/MM/YYYY"
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

                        <Grid size={{ xs: 12, md: 6 }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="ETA"
                                    value={formData.eta}
                                    onChange={(value) =>
                                    handleChange("eta", value)
                                    }
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            error: !!errors.eta,
                                            helperText: errors.eta,
                                        },
                                    }}
                                />
                            </LocalizationProvider>    
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

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                select
                                fullWidth
                                label="Estado"
                                value={formData.estadoEmbarque}
                                error={!!errors.estadoEmbarque}
                                helperText={errors.estadoEmbarque}
                                onChange={(e) =>
                                handleChange("estadoEmbarque", e.target.value)
                                }
                            >
                                {ESTADOS_EMBARQUE.map((estado) => (
                                    <MenuItem
                                        key={estado}
                                        value={estado}
                                    >
                                        {estado}
                                    </MenuItem>
                                ))}
                            </TextField>
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