'use client'

import { useQuery } from '@apollo/client'
import { GET_PRODUCTOS_FILTRADOS } from '@/graphql/queries/productosFiltrados'
import { Typography, Box, Grid, Button } from '@mui/material'
import CategoryIcon from '@mui/icons-material/Category'
import Link from 'next/link'
import ProductCard from '../ProductCard'

export default function ProductosRelacionados({ categoria }: { categoria?: string | null }) {
    if (!categoria) return null

    const { loading, error, data } = useQuery(GET_PRODUCTOS_FILTRADOS, {
        variables: { categoria, ordenar_por: "-id" },
    })

    if (loading || error || !data?.productosFiltrados) return null

    const productosRelacionados = data.productosFiltrados.slice(0, 8)

    if (productosRelacionados.length === 0) return null

    const hoy = new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })

    return (
        <Box sx={{ mt: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <CategoryIcon sx={{ color: '#FF9900', fontSize: 22 }} />
                <Typography variant="h6" component="h2" fontWeight={700} sx={{ fontSize: '1.1rem' }}>
                    Más ofertas en {categoria}
                </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Descubre los mejores descuentos en productos de {categoria} en Amazon México, actualizados al {hoy}.
            </Typography>

            <Grid container spacing={2}>
                {productosRelacionados.map((p: any) => (
                    <Grid size={{ xs: 6, sm: 6, md: 3 }} key={p.id}>
                        <ProductCard
                            id={p.id}
                            titulo={p.titulo ?? ''}
                            urlImagen={p.urlImagen ?? ''}
                            precioOferta={p.precioOferta ?? 0}
                            precioOriginal={p.precioOriginal ?? 0}
                            descuento={p.descuento ?? 0}
                            esReciente={p.esReciente ?? false}
                        />
                    </Grid>
                ))}
            </Grid>

            <Box textAlign="center" mt={3}>
                <Link href={`/?categoria=${encodeURIComponent(categoria)}`}>
                    <Button
                        variant="outlined"
                        sx={{
                            borderColor: '#FF9900',
                            color: '#FF9900',
                            fontWeight: 600,
                            borderRadius: 2,
                            textTransform: 'none',
                            '&:hover': { borderColor: '#E68A00', bgcolor: 'rgba(255, 153, 0, 0.08)' },
                        }}
                    >
                        Ver todas las ofertas de {categoria}
                    </Button>
                </Link>
            </Box>
        </Box>
    )
}
