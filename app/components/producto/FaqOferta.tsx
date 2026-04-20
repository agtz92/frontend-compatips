'use client'

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

type Props = {
  titulo?: string | null
  precioOferta?: number | null
  precioOriginal?: number | null
  descuento?: number | null
  fecha?: string | null
}

export default function FaqOferta({ titulo, precioOferta, precioOriginal, descuento, fecha }: Props) {
  if (!titulo) return null

  const ahorro = precioOriginal && precioOferta ? precioOriginal - precioOferta : null
  const fechaExpiracion = fecha
    ? new Date(new Date(fecha).getTime() + 14 * 86400000).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })
    : null

  const faqs: { question: string; answer: string }[] = []

  if (precioOferta != null) {
    faqs.push({
      question: `¿Cuánto cuesta ${titulo} en oferta?`,
      answer: `El precio de oferta actual es de $${precioOferta.toFixed(2)} MXN${descuento != null && descuento > 0 ? `, con un descuento del ${descuento}%` : ''}${precioOriginal != null ? ` sobre el precio original de $${precioOriginal.toFixed(2)} MXN` : ''}.`,
    })
  }

  if (ahorro != null && ahorro > 0) {
    faqs.push({
      question: '¿Cuánto ahorro con este descuento?',
      answer: `Con esta oferta ahorras $${ahorro.toFixed(2)} MXN${descuento != null && descuento > 0 ? `, lo que equivale a un ${descuento}% de descuento` : ''}.`,
    })
  }

  if (fechaExpiracion) {
    faqs.push({
      question: '¿Hasta cuándo está disponible esta oferta?',
      answer: `La disponibilidad estimada es hasta el ${fechaExpiracion}, aunque las ofertas en Amazon pueden agotarse antes dependiendo del stock disponible.`,
    })
  }

  faqs.push({
    question: '¿Dónde puedo comprar este producto?',
    answer: 'Puedes comprar este producto directamente en Amazon México haciendo clic en el botón "Ver en Amazon" que aparece en la parte superior de esta página.',
  })

  if (faqs.length === 0) return null

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <HelpOutlineIcon sx={{ color: '#FF9900', fontSize: 22 }} />
        <Typography variant="h6" component="h2" fontWeight={700} sx={{ fontSize: '1.1rem' }}>
          Preguntas frecuentes
        </Typography>
      </Box>

      {faqs.map((faq, i) => (
        <Accordion
          key={i}
          disableGutters
          elevation={0}
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '8px !important',
            mb: 1,
            '&:before': { display: 'none' },
            '&.Mui-expanded': { mb: 1 },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="body1" fontWeight={600}>
              {faq.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
              {faq.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  )
}
