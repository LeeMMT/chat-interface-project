import { Drawer, List, ListItem, IconButton, ListItemButton, ListItemText, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import ChatIcon from '@mui/icons-material/Chat'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { styled } from '@mui/system'
import { UserMenu } from './UserMenu'

const CustomListItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== 'isSelected',
})(({ theme, isSelected }) => ({
  borderRadius: '8px',
  backgroundColor: isSelected ? theme.palette.primary.main : 'transparent',
  color: isSelected ? theme.palette.primary.contrastText : 'inherit',
  '&:hover': {
    backgroundColor: isSelected ? theme.palette.primary.main : 'hsl(255, 42%, 25%)',
  },
  '&:hover .delete-button': {
    visibility: 'visible',
  },
}))

const CustomListItemButton = styled(ListItemButton)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  '&:hover': {
    backgroundColor: 'transparent',
  },
}))

const CustomIconButton = styled(IconButton)(({ theme }) => ({
  visibility: 'hidden',
  position: 'relative',
  '&:hover': {
    visibility: 'visible',
  },
}))

const StyledIcon = styled((props) => <props.icon {...props} />)(({ theme }) => ({
  color: 'hsl(0, 0%, 80%)',
  '&:hover': {
    color: '#fff',
  },
}))

export default ({ open, setOpen, isSmallScreen, chats, selectedChat, setSelectedChat, createNewChat, deleteChat, loading }) => {
  const chatList = chats.map((chat, index) => (
    <CustomListItem key={index} sx={{ py: 0 }} isSelected={selectedChat && selectedChat.id === chat.id}>
      <CustomListItemButton
        disableRipple
        onClick={() => {
          if (loading) return
          setSelectedChat(chat)
        }}
        sx={{ px: 0 }}
      >
        <ChatIcon color="contrastText" fontSize="small" />
        <ListItemText primary={chat.name} />
      </CustomListItemButton>
      <CustomIconButton
        edge="end"
        aria-label="delete"
        onClick={(event) => {
          event.stopPropagation()
          deleteChat(chat.id)
        }}
        className="delete-button"
      >
        <StyledIcon icon={DeleteOutlineIcon} />
      </CustomIconButton>
    </CustomListItem>
  ))

  return (
    <Drawer
      open={open}
      onClose={() => setOpen(false)}
      variant={isSmallScreen ? 'temporary' : 'permanent'}
      anchor="left"
      PaperProps={{
        sx: {
          width: isSmallScreen ? 'calc(100% - 64px)' : '300px',
          padding: 1,
          bgcolor: 'primary.dark',
          display: 'flex',
          flexDirection: 'column',
          color: 'primary.contrastText',
        },
      }}
    >
      <Button
        onClick={(e) => {
          e.stopPropagation()
          createNewChat()
        }}
        variant="outlined"
        fullWidth={true}
        sx={{
          py: 1,
          justifyContent: 'flex-start',
          borderRadius: '8px',
          borderColor: 'hsl(0, 0%, 80%)',
          color: 'hsl(0, 0%, 80%)',
          '&:hover': {
            borderColor: '#fff',
            color: '#fff',
          },
        }}
        startIcon={<AddIcon />}
      >
        New chat
      </Button>

      <List sx={{ flexGrow: 1 }}>{chatList}</List>

      <UserMenu isSmallScreen={isSmallScreen} />
    </Drawer>
  )
}
