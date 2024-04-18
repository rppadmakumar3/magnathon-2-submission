import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import { useRouter } from 'src/routes/hooks';
import { bgGradient } from 'src/theme/css';
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

export default function SignupView() {
  const theme = useTheme();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null); // Clear previous error when input changes
  };

  const handleClick = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/signup', formData);

      if (response.status === 201) {
        router.push('/dashboard');
      } else {
        setError(response.data.error || 'An unexpected error occurred. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          setError(error.response.data.error);
        } else {
          setError('An error occurred. Please try again later.');
        }
      } else {
        setError('An error occurred. Please check your network connection and try again.');
      }
    }
  };

  const renderForm = (
    <Stack spacing={3}>
      <TextField
        name="email"
        label="Email address"
        value={formData.email}
        onChange={handleInputChange}
      />
      <TextField
        name="username"
        label="Username"
        value={formData.username}
        onChange={handleInputChange}
      />
      <TextField
        name="password"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        value={formData.password}
        onChange={handleInputChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Register as a Industry</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 2 }}>
            Already have an account?
            <Link 
            variant="subtitle2" 
            sx={{ ml: 0.5, cursor: 'pointer' }}
            onClick={() => router.push('/login')}>
              Log in
            </Link>
          </Typography>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider>

          {renderForm}
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="inherit"
            onClick={handleClick}
            sx={{ mt: 5 }}
          >
            Sign Up
          </LoadingButton>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }} onClose={() => setError(null)}>
              {error}
            </Alert>
          )}
        </Card>
      </Stack>
    </Box>
  );
}