import { themePalette } from "@/src/theme/theme.config"

export const Footer: React.FC<{}> = () =>{

    return (
        <div style={{
            minHeight: '10vh', // Mínimo 100% del alto de la ventana
            display: 'flex',
            flexDirection: 'column',
            marginTop: 'auto'
        }}>
      <div>
        {/* Contenido principal de tu página */}
      </div>
      <div style={{
        flex: 1, // Hace que el pie de página ocupe el espacio disponible
        backgroundColor: themePalette.NIGHT_BLUE,
        color: themePalette.BGWHITE,
        textAlign: 'center',
        fontSize: '0.65em',
        paddingTop:2,
      }}>
        <p>
          IASA - Guayaquil - Ecuador
          <br />
          &copy; El contenido de esta obra es de propiedad de IASA. Todos los derechos reservados.
          <br />
          Prohibida su reproducción total o parcial, comunicación pública o distribución sin autorización previa del titular de los derechos.
        </p> 
      </div>
    </div>
    )
}