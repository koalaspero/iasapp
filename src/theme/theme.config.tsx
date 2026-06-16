import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { JSX } from "react/jsx-runtime";

type ThemeProp = {
    children: JSX.Element
}

export enum InstitucionalPalette {
    PRIMARY = '#223265',
    HOVER = '#172346',
    SECONDARY = '#29abe2',
}

export enum MedidasLayOut {
    WIDTH_SIDEBAR = "7vw",
    WIDTH_SIDEBAR_PHONE = "12vw",
    TOP_SIDEBAR = "10vh",
    LEFT_SIDEBAR = "0.5vw",
}

export enum themePalette {
    PRIMARY = '#1976d2',
    PRIMARY_HOVER = '#115293',
    BG = "#12181b",
    BGWHITE = "#FFFFFF",
    BGTRANSPARENT = "transparent",
    BG_SIDEBAR = "#EAEBF0",
    COLOR_SIDEBAR_ICON = "#002755",
    NAVCOLOR = "#223265",
    FOOTERCOLOR = "#A3A3A3",
    BUTTONOK = "#6CC427",
    BUTTONYELLOW = "#EEC427",
    YELLOW_DARK = "#E5B000",
    BONDIBLUE = "#009EB7",
    LIGHTBLUE = "#35B5E5",
    CHAMBRAY = "#114B8A",
    GAINSBORO = "#DCDCDC",
    WHITESMOKE = "F5F5F5",
    FONT_GLOBAL = "'Roboto', sans-serif",
    FONT_TITLE = "'Roboto', sans-serif",
    FONT_COLOR_LIGHTBLUE = '#2BC1FF',
    COLOR_INSCRIPCION = '#EEC427',
    COLOR_POSTULACION = '#6CC427',
    COLOR_ACEPTACION = '#28BED1',
    COLOR_CONSULTA = '#FF938C',
    COLOR_FONT_FOOTER = '#7C9EDE',
    MARIAN_BLUE = '#2B4593',
    VERY_DARK_BLUE = '#243165',
    NIGHT_BLUE = "#1b2a4e",
    VIVIDCERULEAN = "#00A6E0",
    PLATINUM = "#E8E8E8",
    CADETGREY = "#929EB7",
    QUEENBLUE = "#415E93",
    INDIGO = "#20396B",
}

export enum themePaletteEstados {
    APROBADO = '#2329A4',
    RECHAZADO = '#C91616',
    ENVIADO = '#FF0000',
    PUBLICADO = '#1E9A92',
}

export const theme = createTheme({
    palette: {
        mode: "light",
        background: {
            default: themePalette.BGWHITE,
        },
        primary: {
            main: InstitucionalPalette.PRIMARY,
        },
        secondary: {
            main: InstitucionalPalette.SECONDARY,
        },
    },
    typography: {
        fontFamily: themePalette.FONT_GLOBAL,
    },
    components: {
        MuiButton: {
            defaultProps: {
                variant: "contained",
                color: "primary",
                style: {
                    textTransform: "none",
                    boxShadow: "none",
                    borderRadius: "2em",
                    color: themePalette.BGWHITE,
                }
            }
        },
         MuiTextField: {
            defaultProps: {
                slotProps: {
                    inputLabel: {
                        sx: {
                            color: InstitucionalPalette.PRIMARY,
                            fontWeight: 'bold',
                        },
                    },
                },
            },
        },
        MuiInputLabel: {
            defaultProps: {
                style: {
                    color: InstitucionalPalette.PRIMARY, // Color específico para el texto del label
                    fontWeight: 'bold', // Negrita
                },
            }
        },
        MuiFormControlLabel: {
            defaultProps: {
                style: {
                    color: InstitucionalPalette.PRIMARY, // Color específico para el texto del label
                    fontWeight: 'bold', // Negrita
                },
            }
        },
        MuiTypography: {
            defaultProps: {
                style: {
                    fontWeight: 'bold',
                }
            }
        }
    }
})

export const ThemeConfig: React.FC<ThemeProp> = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}