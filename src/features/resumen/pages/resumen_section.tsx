"use client";

import { getResumen } from "@/src/services/resumenService";
import { theme, themePalette } from "@/src/theme/theme.config";
import { Resumen } from "@/src/types/models/Resumen";
import { ResetTv } from "@mui/icons-material";
import { Box, Button, CircularProgress, Container, FormControl, FormLabel, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';

export default function ResumenSection() {

    const [resumen, setResumen] = useState<Resumen[]>([]);
    const [resumenFiltrado, setResumenFiltrado] = useState<Resumen[]>([]);
    
    const [loadingResumen, setLoadingResumen] = useState(true);
    const [statusDialog, setStatusDialog] = useState({
        open: false,
        loading: false,
        success: false,
        error: null as string | null,
        messages: [] as string[],
    });

    const limpiarFiltros = () => {
        setModeloFilter("");
        setFamiliaFilter("");
        setLineaProductoFilter("");
    };

    const [modeloFilter, setModeloFilter] = useState("");
    const [familiaFilter, setFamiliaFilter] = useState("");
    const [lineaProductoFilter, setLineaProductoFilter] = useState("");

    const columns = [
        { id: "modelo", label: "Modelo" },
        { id: "inventario", label: "Inventario" },
        { id: "enTransito", label: "Tránsito" },
        { id: "totalDisponible", label: "Disponible" },
        { id: "oportunidades", label: "Oportunidades" },
        { id: "porcentajeCierrePromedio", label: "% Cierre Prom." },
        { id: "demandaEsperada", label: "Demanda Esperada" },
        { id: "gap", label: "Gap" },
    ];

    const familias = [...new Set(resumen.map(r => r.modeloFamilia))].sort();

    const lineasProducto = [
    ...new Set(resumen.map(r => r.modeloLineaProducto)),
    ].sort();

    useEffect(() => {
        const loadModelos = async () => {
          try {
            setLoadingResumen(true);

            const data = await getResumen();
            console.log(data);
            const total : Resumen = {
                inventario: data.reduce((sum, r) => sum + r.inventario, 0),
                enTransito: data.reduce((sum, r) => sum + r.enTransito, 0),
                totalDisponible: data.reduce((sum, r) => sum + r.totalDisponible, 0),
                oportunidades: data.reduce((sum, r) => sum + r.oportunidades, 0),
                porcentajeCierrePromedio: data.length > 0
                    ? data.reduce(
                        (sum, r) => sum + r.porcentajeCierrePromedio,
                        0
                    ) / data.length
                    : 0,
                demandaEsperada: data.reduce((sum, r) => sum + r.demandaEsperada, 0),
                gap: data.reduce((sum, r) => sum + r.gap, 0),
                modelo: "TOTAL",
                modeloFamilia: "",
                modeloLineaProducto: ""
            };

            const resumenConTotal = data.concat([total]);
    
            setResumen(resumenConTotal);
          } catch (error) {
            console.error(error);
          } finally {
            setLoadingResumen(false);
          }
        };
    
        loadModelos();
    }, []);

    useEffect(() => {
        const filtered = resumen.filter((item) => {

            const matchesModelo = !modeloFilter || item.modelo.toLowerCase().includes(modeloFilter.toLowerCase());
            const matchesFamilia = !familiaFilter || item.modeloFamilia === familiaFilter;
            const matchesLineaProducto = !lineaProductoFilter || item.modeloLineaProducto === lineaProductoFilter;

            return (
                matchesModelo &&
                matchesFamilia &&
                matchesLineaProducto
            );
        });

        const total : Resumen = {
            inventario: filtered.reduce((sum, r) => sum + r.inventario, 0),
            enTransito: filtered.reduce((sum, r) => sum + r.enTransito, 0),
            totalDisponible: filtered.reduce((sum, r) => sum + r.totalDisponible, 0),
            oportunidades: filtered.reduce((sum, r) => sum + r.oportunidades, 0),
            porcentajeCierrePromedio: filtered.length > 0
                ? filtered.reduce(
                    (sum, r) => sum + r.porcentajeCierrePromedio,
                    0
                ) / filtered.length
                : 0,
            demandaEsperada: filtered.reduce((sum, r) => sum + r.demandaEsperada, 0),
            gap: filtered.reduce((sum, r) => sum + r.gap, 0),
            modelo: "TOTAL",
            modeloFamilia: "",
            modeloLineaProducto: ""
         };

        const resumenConTotal = filtered.concat([total]);

        setResumenFiltrado(resumenConTotal);

    }, [
        resumen,
        modeloFilter,
        familiaFilter,
        lineaProductoFilter,
    ]);

    return (
        <Container maxWidth="lg" sx={{ pt: "80px" }}>
            <Box sx={{ width: "100%" }}>
                <Box sx={{display: "flex", alignItems: "center", gap: 2}}>
                    <Typography variant="h6" sx={{ color: themePalette.NIGHT_BLUE}} gutterBottom>
                        RESUMEN
                    </Typography>
                </Box>

                <Grid
                    container
                    sx={{
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                    }}
                >
                    <Grid size={{ xs: 12, md: 7 }}>
                        <Grid container spacing={2}>
                        {/* Modelo */}
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <FormControl fullWidth margin="dense">
                                <TextField
                                    label="Modelo"
                                    value={modeloFilter}
                                    onChange={(e) => setModeloFilter(e.target.value)}
                                />
                            </FormControl>
                        </Grid>

                        {/* Familia */}
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <FormControl fullWidth margin="dense">
                                <InputLabel>Familia</InputLabel>
                                <Select
                                    value={familiaFilter}
                                    label="Familia"
                                    onChange={(e) => setFamiliaFilter(e.target.value)}
                                >
                                    {familias.map((familia) => (
                                        <MenuItem key={familia} value={familia}>
                                            {familia}
                                        </MenuItem>
                                    ))}
                                    <MenuItem value="">Todas</MenuItem>

                                    
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Línea de Producto */}
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <FormControl fullWidth margin="dense">
                            <InputLabel>Línea</InputLabel>
                            <Select
                                value={lineaProductoFilter}
                                label="Línea"
                                onChange={(e) => setLineaProductoFilter(e.target.value)}
                            >
                                <MenuItem value="">Todas</MenuItem>

                                {lineasProducto.map((linea) => (
                                    <MenuItem key={linea} value={linea}>
                                        {linea}
                                    </MenuItem>
                                ))}
                            </Select>
                            </FormControl>
                        </Grid>
                        </Grid>
                    </Grid>

                    <Grid size={{ xs: 12, md: 5 }}>
                        <Grid container sx={{ justifyContent: "flex-end"}}>
                            <Grid sx={{ mt: 2 }}>
                                <Grid container>
                                    {/* <Button
                                        sx={{
                                        color: themePalette.VIVIDCERULEAN,
                                        height: 40,
                                        width: 100,
                                        fontSize: 12,
                                        fontWeight: "bold",
                                        }}
                                        onClick={() => {}}
                                    >
                                        BUSCAR
                                    </Button> */}

                                    <Box
                                        sx={{
                                        ml: 1,
                                        border: `2px solid ${themePalette.MARIAN_BLUE}`,
                                        borderRadius: 2,
                                        width: 80,
                                        height: 40,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        "&:hover": {
                                            backgroundColor: `${themePalette.MARIAN_BLUE}20`,
                                        },
                                        }}
                                    >
                                        <IconButton onClick={limpiarFiltros}>
                                            <CleaningServicesIcon
                                                sx={{ color: themePalette.MARIAN_BLUE }}
                                            />
                                        </IconButton>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Box sx={{ mt: 4, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                sx={{
                                                    fontWeight: 600,
                                                    backgroundColor: themePalette.NIGHT_BLUE,
                                                    color: "white",
                                                }}
                                            >
                                            {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {loadingResumen ? (
                                        <TableRow>
                                            <TableCell colSpan={columns.length} align="center">
                                                <CircularProgress size={24} />
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        resumenFiltrado.slice(0, resumen.length - 1).map((row) => (
                                            <TableRow hover key={row.modelo}>
                                                <TableCell align="center">{row.modelo}</TableCell>
                                                <TableCell align="center">{row.inventario}</TableCell>
                                                <TableCell align="center">{row.enTransito}</TableCell>
                                                <TableCell align="center">{row.totalDisponible}</TableCell>
                                                <TableCell align="center">{row.oportunidades}</TableCell>
                                                <TableCell align="center">
                                                    {row.porcentajeCierrePromedio.toFixed(1)}%
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row.demandaEsperada.toFixed(1)}
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        color:
                                                            row.gap < 0
                                                            ? "error.main"
                                                            : row.gap === 0
                                                            ? "warning.main"
                                                            : themePalette.BUTTONOK,
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    {row.gap.toFixed(1)}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}

                                    {loadingResumen ? (
                                        <></>
                                    ) : (
                                        resumenFiltrado.slice(-1).map((row) => (
                                            <TableRow hover key={row.modelo}>
                                                <TableCell sx={{ fontWeight: 600, backgroundColor: themePalette.NIGHT_BLUE, color: "white",}} align="center">{row.modelo}</TableCell>
                                                <TableCell sx={{ fontWeight: 600, backgroundColor: themePalette.NIGHT_BLUE, color: "white",}} align="center">{row.inventario}</TableCell>
                                                <TableCell sx={{ fontWeight: 600, backgroundColor: themePalette.NIGHT_BLUE, color: "white",}} align="center">{row.enTransito}</TableCell>
                                                <TableCell sx={{ fontWeight: 600, backgroundColor: themePalette.NIGHT_BLUE, color: "white",}} align="center">{row.totalDisponible}</TableCell>
                                                <TableCell sx={{ fontWeight: 600, backgroundColor: themePalette.NIGHT_BLUE, color: "white",}} align="center">{row.oportunidades}</TableCell>
                                                <TableCell sx={{ fontWeight: 600, backgroundColor: themePalette.NIGHT_BLUE, color: "white",}} align="center">
                                                    {row.porcentajeCierrePromedio.toFixed(1)}%
                                                </TableCell>
                                                <TableCell sx={{ fontWeight: 600, backgroundColor: themePalette.NIGHT_BLUE, color: "white",}} align="center">
                                                    {row.demandaEsperada.toFixed(1)}
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        color:
                                                            row.gap < 0
                                                            ? "error.main"
                                                            : row.gap === 0
                                                            ? "warning.main"
                                                            : themePalette.BUTTONOK,
                                                        fontWeight: 600,
                                                        backgroundColor: themePalette.NIGHT_BLUE
                                                    }}
                                                >
                                                    {row.gap.toFixed(1)}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>  
                    </Paper>
                </Box>
            </Box>

        </Container>
    );
}