'use client'

import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Chip,
    Box,
} from '@mui/material'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import BoltIcon from '@mui/icons-material/Bolt'
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
    const ahorro = precioOriginal - precioOferta
    const isHotDeal = descuento >= 25

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
                    borderColor: isHotDeal ? 'rgba(255, 153, 0, 0.4)' : undefined,
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: isHotDeal
                            ? '0 8px 24px rgba(255, 153, 0, 0.2)'
                            : '0 8px 24px rgba(0,0,0,0.15)',
                    },
                }}
            >
                {/* Top badges */}
                <Box sx={{ position: 'absolute', top: 8, left: 8, zIndex: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    {descuento > 0 && (
                        <Chip
                            label={`-${descuento}%`}
                            icon={isHotDeal ? <WhatshotIcon sx={{ fontSize: 16 }} /> : undefined}
                            sx={{
                                bgcolor: isHotDeal ? '#FF9900' : '#E53935',
                                color: isHotDeal ? '#111' : 'white',
                                fontWeight: 700,
                                fontSize: '0.8rem',
                            }}
                            size="small"
                        />
                    )}
                    {esReciente && (
                        <Chip
                            label="Nuevo"
                            icon={<BoltIcon sx={{ fontSize: 14 }} />}
                            sx={{
                                bgcolor: 'rgba(255, 153, 0, 0.15)',
                                color: '#FF9900',
                                fontWeight: 600,
                                fontSize: '0.7rem',
                            }}
                            size="small"
                        />
                    )}
                </Box>

                {/* Image with white background */}
                <Box sx={{ bgcolor: 'white', p: 1, position: 'relative' }}>
                    <CardMedia
                        component="img"
                        image={urlImagen}
                        alt={titulo}
                        sx={{
                            height: { xs: 140, md: 180 },
                            objectFit: 'contain',
                        }}
                    />
                    {/* Urgency ribbon for hot deals */}
                    {isHotDeal && (
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                bgcolor: 'rgba(255, 153, 0, 0.9)',
                                py: 0.3,
                                textAlign: 'center',
                            }}
                        >
                            <Typography variant="caption" sx={{ color: '#111', fontWeight: 700, fontSize: '0.65rem', letterSpacing: 1, textTransform: 'uppercase' }}>
                                Oferta por tiempo limitado
                            </Typography>
                        </Box>
                    )}
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
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.3, flexWrap: 'wrap' }}>
                                <Typography variant="caption" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                                    ${precioOriginal?.toFixed(2)}
                                </Typography>
                                {ahorro > 0 && (
                                    <Typography variant="caption" sx={{ color: '#FF9900', fontWeight: 700 }}>
                                        -${ahorro.toFixed(0)} MXN
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
