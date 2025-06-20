'use client'

import { Typography, Box, Paper, Button } from '@mui/material'

type Props = {
    titulo: string
    urlImagen: string
    linkReferidos: string
    precioOferta: number
}

export default function OfertaExpirada({
    titulo,
    urlImagen,
    linkReferidos,
    precioOferta,
}: Props) {
    return (
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center', mt: 5, mb:3 }}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
                {titulo}
            </Typography>

            <Box
                component="img"
                src={urlImagen}
                alt={titulo}
                sx={{
                    maxWidth: 300,
                    width: '100%',
                    height: 'auto',
                    my: 2,
                    borderRadius: 2,
                    marginX: 'auto',
                }}
            />

            <Typography variant="body1" color="primary" fontWeight={600} gutterBottom>
                Precio de la oferta: ${precioOferta.toFixed(2)}
            </Typography>

            <Typography variant="body1" color="text.secondary" gutterBottom>
                Esta oferta tiene más de 2 semanas, por lo que ya no se encuentra disponible.
            </Typography>

            <Typography variant="body2" sx={{ mb: 3 }}>
                Si aún así quieres ver el producto, presiona el botón de abajo.
            </Typography>

            <Button
                variant="contained"
                color="primary"
                href={linkReferidos}
                target="_blank"
                rel="noopener noreferrer"
            >
                Ver en Amazon
            </Button>
        </Paper>
    )
}
