'use client'

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItemText,
  Box,
  Button,
  ListItemButton,
  ListItemIcon,
  Divider,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from '@mui/icons-material/Home'
import TelegramIcon from '@mui/icons-material/Telegram'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import CloseIcon from '@mui/icons-material/Close'
import Link from 'next/link'
import { useState } from 'react'

const navItems = [
  { text: 'Inicio', href: '/', icon: <HomeIcon /> },
  { text: 'Telegram', href: '/telegram', icon: <TelegramIcon /> },
]

export default function ResponsiveNavbar() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open)
  }

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: 'rgba(15, 15, 20, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <Toolbar sx={{ px: { xs: 2, md: 4 } }}>
          {/* Mobile menu */}
          <IconButton
            edge="start"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ display: { sm: 'none' }, mr: 1, color: 'white' }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Box
            component={Link}
            href="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              textDecoration: 'none',
              flexGrow: 1,
            }}
          >
            <LocalOfferIcon sx={{ color: '#FF9900', fontSize: 28 }} />
            <Typography
              variant="h6"
              fontWeight={800}
              sx={{
                color: 'white',
                letterSpacing: '-0.02em',
              }}
            >
              Compatips
            </Typography>
          </Box>

          {/* Desktop nav */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.text}
                component={Link}
                href={item.href}
                startIcon={item.icon}
                sx={{
                  color: 'rgba(255,255,255,0.8)',
                  textTransform: 'none',
                  fontWeight: 500,
                  borderRadius: 2,
                  px: 2,
                  '&:hover': {
                    color: '#FF9900',
                    bgcolor: 'rgba(255, 153, 0, 0.08)',
                  },
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 280, height: '100%', bgcolor: '#0f0f14' }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocalOfferIcon sx={{ color: '#FF9900' }} />
              <Typography variant="h6" fontWeight={800} sx={{ color: 'white' }}>
                Compatips
              </Typography>
            </Box>
            <IconButton onClick={toggleDrawer(false)} sx={{ color: 'rgba(255,255,255,0.5)' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />
          <List sx={{ pt: 1 }}>
            {navItems.map((item) => (
              <ListItemButton
                key={item.text}
                component={Link}
                href={item.href}
                sx={{
                  py: 1.5,
                  mx: 1,
                  borderRadius: 2,
                  '&:hover': { bgcolor: 'rgba(255, 153, 0, 0.08)' },
                }}
              >
                <ListItemIcon sx={{ color: '#FF9900', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ '& .MuiListItemText-primary': { color: 'white', fontWeight: 500 } }}
                />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  )
}
