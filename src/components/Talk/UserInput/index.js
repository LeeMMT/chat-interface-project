import { Box, Paper, TextField, InputAdornment, IconButton } from '@mui/material'
//import { WandIcon } from './WandIcon'
import SendIcon from '@mui/icons-material/Send'

export default ({ inputValue, userMessageBoxRef, handleInputChange, handleSend }) => {
  return (
    <Paper elevation={4} sx={{ zIndex: 1 }}>
      <Box sx={{ p: 2, position: 'relative', margin: '0 auto', maxWidth: '900px', width: '100%' }} ref={userMessageBoxRef}>
        <TextField
          autoComplete="off"
          fullWidth
          variant="outlined"
          placeholder="Cast a spell"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSend()
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleSend}
                  edge="end"
                  disabled={inputValue.trim() === ''} // disable the button if input is empty
                >
                  {/* <WandIcon disabled={inputValue.trim() === ''} />
                  < */}
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Paper>
  )
}
