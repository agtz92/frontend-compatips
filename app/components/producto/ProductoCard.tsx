'use client'

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from '@mui/material'

type Props = {
  producto: {
    titulo: string
    precioOriginal: number
    descuento: number
    precioOferta: number
    urlImagen: string
    linkReferidos: string
    fecha: string
    categoria: string
    esReciente: boolean
  }
}

export default function ProductoCard({ producto }: Props) {
  return (
    <Card>
      <CardMedia
        component="img"
        image={producto.urlImagen}
        alt={producto.titulo}
        height="400"
      />
      <CardContent>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          {producto.titulo}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Categoría: <strong>{producto.categoria}</strong>
        </Typography>
        <Typography variant="body1">
          Precio original: <s>${producto.precioOriginal.toFixed(2)} MXN</s>
        </Typography>
        <Typography variant="body1">
          Descuento: {producto.descuento}%
        </Typography>
        <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
          Precio de oferta: ${producto.precioOferta.toFixed(2)} MXN
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Fecha: {producto.fecha}
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          {producto.esReciente
            ? 'Publicado recientemente'
            : 'Publicado hace más de 2 semanas'}
        </Typography>
        <Button
          href={producto.linkReferidos}
          target="_blank"
          variant="contained"
          color="secondary"
          sx={{ mt: 3 }}
        >
          Ver en la tienda
        </Button>
      </CardContent>
    </Card>
  )
}
