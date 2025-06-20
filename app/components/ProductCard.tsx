'use client'

import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Chip,
    Box,
} from '@mui/material'
import Link from 'next/link'

type Props = {
    id: string
    titulo: string
    urlImagen: string
    precioOferta: number
    precioOriginal: number
    descuento: number
    esReciente: boolean
}

export default function ProductCard({ id, titulo, urlImagen, precioOferta, precioOriginal, descuento, esReciente }: Props) {
    return (
        <Link href={`/producto/${id}`} style={{ textDecoration: 'none' }}>
            <Card
                sx={{
                    position: 'relative',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.02)' },
                }}
            >
                {/* Descuento */}
                {descuento > 0 && (
                    <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
                        <Chip
                            label={`-${descuento}%`}
                            sx={{ backgroundColor: 'red', color: 'white', fontWeight: '400' }}
                            size="small"
                        />
                    </Box>
                )}

                <CardMedia
                    component="img"
                    height="180"
                    image={urlImagen}
                    alt={titulo}
                />
                <CardContent>
                    <Typography gutterBottom variant="subtitle1" component="div" noWrap>
                        {titulo}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body1" color="text.primary" fontWeight="bold">
                            ${precioOferta?.toFixed(2)}
                        </Typography>
                        {descuento > 0 && (
                            <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                                ${precioOriginal?.toFixed(2)}
                            </Typography>
                        )}
                    </Box>

                </CardContent>
            </Card>
        </Link>
    )
}
