'use client'

import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, Box, Button, ListItemButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import Link from 'next/link'
import { useState } from 'react'

const navItems = [
  { text: 'Inicio', href: '/' },
  { text: 'Grupos Telegram', href: '/telegram' },
]

export default function ResponsiveNavbar() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open)
  }

  const drawerContent = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {navItems.map((item) => (
          <ListItemButton key={item.text} component={Link} href={item.href}>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  )

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#B4E50D' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)} sx={{ display: { sm: 'none' }, mr: 2, color:"black" }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 , color:"#000"}}>
            Compatips
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item.text} color="inherit" component={Link} href={item.href} sx={{ color: 'black' }}>
                {item.text}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </>
  )
}
