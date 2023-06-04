import { useState } from 'react'
import { Avatar, Button, Typography, MenuItem, Divider } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Popover from '@mui/material/Popover'
import { useRouter } from 'next/router'
import { signUserOut } from '@/utils/auth'
import { useTheme } from '@mui/material/styles'
import { useUser } from '@/contexts/userContext'

export const UserMenu = () => {
  const { user } = useUser()
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState(null)
  const theme = useTheme()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <>
      {user && (
        <>
          <Divider sx={{ width: '100%', borderColor: 'hsl(256,24%,37%)', mb: 1 }} />
          <Button
            variant="outline"
            disableRipple
            onClick={handleClick}
            sx={{
              py: 1,
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'flex-start',
              gap: '8px',
              color: '#fff',
              '&:hover': {
                backgroundColor: 'hsl(255, 42%, 25%)',
              },
            }}
          >
            <Avatar alt={user.displayName} src={user.photoURL} />
            <Typography variant="body2" sx={{ textTransform: 'none' }}>
              {user.email}
            </Typography>

            <MoreHorizIcon sx={{ marginLeft: 'auto' }} />
          </Button>{' '}
        </>
      )}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        PaperProps={{
          sx: {
            marginLeft: '-8px',
            marginTop: '-8px',
            width: '284px',
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.contrastText,
          },
        }}
      >
        <MenuItem onClick={handleClose} sx={{ py: 1 }}>
          Settings
        </MenuItem>
        <Divider style={{ margin: 0 }} />
        <MenuItem onClick={handleClose} sx={{ py: 1 }}>
          My Plan
        </MenuItem>
        <Divider style={{ margin: 0 }} />
        <MenuItem onClick={() => signUserOut(router)} sx={{ py: 1 }}>
          Sign Out
        </MenuItem>
      </Popover>
    </>
  )
}
