import React, { useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Stack,
  Snackbar,
  Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const OrdCardBox = ({ title, description, imageUrl, productId, status, orderId, setProducts }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  
  const isDisabled = status === 1 || status === 2;

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/orders/${orderId}`);

      // Remove deleted order from products state
      setProducts((prev) => prev.filter(order => order._id !== orderId));

      setSnackbarMessage('Order cancelled successfully');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error deleting order:', error);
      setSnackbarMessage('Failed to cancel order');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <Box sx={{ position: 'relative', width: '100%' }}>
        {/* Overlay */}
        {isDisabled && (
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '87%',
              bgcolor: 'rgba(0, 0, 0, 0.4)',
              zIndex: 1,
              borderRadius: 1
            }}
          />
        )}

        {/* Card Content */}
        <Card sx={{ display: 'flex', width: '100%', mb: 2, position: 'relative', zIndex: 0 }}>
          {imageUrl && (
            <CardMedia
              component="img"
              sx={{ width: 150 }}
              image={imageUrl}
              alt={title}
            />
          )}

          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%' }}>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 2,
                  alignItems: 'stretch',
                  height: '100%'
                }}
              >
                {/* Info col 1 */}
                <Box
                  sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box>
                    <Typography color="#1A1A1A" fontFamily="PoppinsR" fontSize={15} variant="h6">
                      {title}
                    </Typography>
                    <Typography
                      fontFamily="PoppinsR"
                      fontSize={12}
                      variant="body2"
                      color="text.secondary"
                    >
                      {description}
                    </Typography>
                  </Box>
                </Box>

                {/* Info col 2 */}
                <Stack
                  spacing={2}
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ width: 'auto' }}
                >
                  {status === 0 && (
                    <Button
                      onClick={handleDelete}
                      sx={{
                        backgroundColor: 'red',
                        color: 'white',
                        fontFamily: 'Poppins',
                        textTransform: 'none',
                        '&:hover': {
                          backgroundColor: '#cc0000'
                        }
                      }}
                    >
                      Cancel
                    </Button>
                  )}

                  {status === 1 && (
                    <Button
                      disabled
                      sx={{
                        backgroundColor: 'green',
                        color: 'white',
                        fontFamily: 'Poppins',
                        textTransform: 'none'
                      }}
                    >
                      Completed
                    </Button>
                  )}

                  {status === 2 && (
                    <Button
                      disabled
                      sx={{
                        backgroundColor: 'red',
                        color: 'white',
                        fontFamily: 'Poppins',
                        textTransform: 'none'
                      }}
                    >
                      Cancelled
                    </Button>
                  )}
                </Stack>
              </Box>
            </CardContent>
          </Box>
        </Card>
      </Box>

      {/* Snackbar for feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setOpenSnackbar(false)} 
          severity={snackbarSeverity} 
          sx={{ width: '100%' }}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default OrdCardBox;
