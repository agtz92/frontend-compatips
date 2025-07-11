'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useQuery } from '@apollo/client'
import { GET_PRODUCTO_POR_ID } from '../../../graphql/queries/productoPorId'
import {
  Box,
  Container,
  Typography,
  CircularProgress,
} from '@mui/material'
import RedirectBackdrop from '@/app/components/RedirectBackdrop'
import ProductoCard from '@/app/components/producto/ProductoCard'
import OfertaExpirada from '@/app/components/producto/OfertaExpirada'
import ProductosRelacionados from '@/app/components/producto/ProductosRelacionados'
import MetaProducto from '@/app/components/seo/MetaProducto'

export default function ProductoDetalle() {
  const { id } = useParams()
  const { loading, error, data } = useQuery(GET_PRODUCTO_POR_ID, {
    variables: { id },
  })

  const [showRedirect, setShowRedirect] = useState(false)
  const [cancelled, setCancelled] = useState(false)

  useEffect(() => {
    if (!loading && data?.productoPorId?.esReciente && !cancelled) {
      setShowRedirect(true)
      const timeout = setTimeout(() => {
        window.location.href = data.productoPorId.linkReferidos
        setShowRedirect(false)
      }, 3000)
      return () => clearTimeout(timeout)
    }
  }, [loading, data, cancelled])

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    )
  }

  if (error || !data?.productoPorId) {
    return <Typography color="error">Producto no encontrado.</Typography>
  }

  const p = data.productoPorId



  return (
    <>
      <MetaProducto
        titulo={p.titulo}
        descripcion={`Aprovecha ${p.descuento}% de descuento por tiempo limitado.`}
        imagen={p.urlImagen}
        precio={p.precioOferta}
      />
      <Container maxWidth="md" sx={{ mt: 5 }}>
        {p.esReciente ? (
          <>
            <RedirectBackdrop
              open={showRedirect && !cancelled}
              message="Redirigiendo a producto en Amazon... Si no te redirige automáticamente, presiona el botón 'Comprar ahora'."
              onCancel={() => setCancelled(true)}
            />
            <ProductoCard producto={p} />
          </>
        ) : (
          <><OfertaExpirada
            titulo={p.titulo}
            urlImagen={p.urlImagen}
            linkReferidos={p.linkReferidos}
            precioOferta={p.precioOferta}
          />
            <ProductosRelacionados categoria={p.categoria} />
          </>



        )}
      </Container>
    </>

  )
}
