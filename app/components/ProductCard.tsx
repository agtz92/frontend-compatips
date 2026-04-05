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

export default function ProductCard({ id, titulo, urlImagen, precioOferta, precioOriginal, descuento }: Props) {
    const ahorro = precioOriginal - precioOferta

    return (
        <Link href={`/producto/${id}`} style={{ textDecoration: 'none' }}>
            <Card
                variant="outlined"
                sx={{
                    position: 'relative',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    overflow: 'hidden',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                    },
                }}
            >
                {/* Discount badge */}
                {descuento > 0 && (
                    <Box sx={{ position: 'absolute', top: 8, left: 8, zIndex: 1 }}>
                        <Chip
                            label={`-${descuento}%`}
                            sx={{
                                bgcolor: '#E53935',
                                color: 'white',
                                fontWeight: 700,
                                fontSize: '0.8rem',
                            }}
                            size="small"
                        />
                    </Box>
                )}

                {/* Image with white background */}
                <Box sx={{ bgcolor: 'white', p: 1 }}>
                    <CardMedia
                        component="img"
                        image={urlImagen}
                        alt={titulo}
                        sx={{
                            height: { xs: 140, md: 180 },
                            objectFit: 'contain',
                        }}
                    />
                </Box>

                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 1.5, '&:last-child': { pb: 1.5 } }}>
                    <Typography
                        variant="body2"
                        fontWeight={500}
                        sx={{
                            mb: 1,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            lineHeight: 1.3,
                            minHeight: '2.6em',
                        }}
                    >
                        {titulo}
                    </Typography>

                    <Box>
                        <Typography variant="h6" fontWeight={800} sx={{ lineHeight: 1.2, fontSize: { xs: '1rem', md: '1.15rem' } }}>
                            ${precioOferta?.toFixed(2)}
                        </Typography>
                        {descuento > 0 && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.3 }}>
                                <Typography variant="caption" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                                    ${precioOriginal?.toFixed(2)}
                                </Typography>
                                {ahorro > 0 && (
                                    <Typography variant="caption" sx={{ color: '#FF9900', fontWeight: 600 }}>
                                        Ahorras ${ahorro.toFixed(0)}
                                    </Typography>
                                )}
                            </Box>
                        )}
                    </Box>
                </CardContent>
            </Card>
        </Link>
    )
}
