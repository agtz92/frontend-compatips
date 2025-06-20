'use client'

import { useQuery } from '@apollo/client'
import { GET_PRODUCTOS_FILTRADOS } from '@/graphql/queries/productosFiltrados'
import {
    Typography,
    Box,
    Card,
    CardContent,
    CardMedia,
    Button,
    Grid,
} from '@mui/material'
import Link from 'next/link'

export default function ProductosRelacionados({ categoria }: { categoria: string }) {
    const { loading, error, data } = useQuery(GET_PRODUCTOS_FILTRADOS, {
        variables: { categoria },
    })

    if (loading || error || !data?.productosFiltrados) return null

    const productosRelacionados = data.productosFiltrados.slice(0, 8)

    if (productosRelacionados.length === 0) return null

    return (
        <Box sx={{ mt: 6 }}>
            <Typography variant="h6" gutterBottom>
                Puedes ver si hay un producto similar en la categoría de {categoria}
                
            </Typography>
            <Typography variant="h6" gutterBottom>O pulsa el botón para ver todas las ofertas en la categoría de {categoria}</Typography>
            <Box textAlign="center" mt={4} mb={3}>
                <Link href="/">
                    <Button variant="outlined" color="primary">
                        Ver todas las ofertas
                    </Button>
                </Link>
            </Box>

            <Grid container spacing={2}>
                {productosRelacionados.map((p: any) => (
                    <Grid size={{ xs: 12, md: 3 }} key={p.id}>
                        <Link href={`/producto/${p.id}`} style={{ textDecoration: 'none' }}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardMedia
                                    component="img"
                                    height="160"
                                    image={p.urlImagen}
                                    alt={p.titulo}
                                />
                                <CardContent>
                                    <Typography variant="subtitle1" fontWeight={500} noWrap>
                                        {p.titulo}
                                    </Typography>
                                    <Typography variant="body2" color="primary">
                                        ${p.precioOferta.toFixed(2)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>


        </Box>
    )
}
