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
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import Alert from '@mui/material/Alert';
import { useRouter } from 'src/routes/hooks';
import { bgGradient } from 'src/theme/css';
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

export default function LoginView() {
  const theme = useTheme();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response = await axios.post('http://localhost:5001/api/login', formData, {
        withCredentials: true,
      });

      console.log(response.data);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed', error);

      if (error.response) {
        const errorMessage = error.response.data.error || 'An unexpected error occurred.';
        setError(errorMessage);
      } else if (error.request) {
        setError('No response received from the server. Please try again.');
      } else {
        setError('An error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          onChange={handleInputChange}
          value={formData.email}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={handleInputChange}
          value={formData.password}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="button" // Change type to "button" to prevent default form submission
        variant="contained"
        color="inherit"
        onClick={handleLogin}
        loading={loading}
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </LoadingButton>
    </>
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
        <Card sx={{ p: 5, width: 1, maxWidth: 420 }}>
          <Typography variant="h4">Agency - Login</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 3 }}>
            Don’t have an account?
            <Link
              variant="subtitle2"
              sx={{ ml: 0.5, cursor: 'pointer' }}
              onClick={() => router.push('/signup')}
            >
              Get started
            </Link>
          </Typography>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider>

          {renderForm}

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