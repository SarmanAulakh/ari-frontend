import type { NextPage } from 'next';
import { CircularProgress, Container, Grid, Stack, Typography } from '@mui/material';
import Head from 'src/components/Head';
import { Button, Colors } from '@icari-io/ui-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useState } from 'react';
import apiClient from 'src/util/apiClient';
import { FiCheckCircle } from 'react-icons/fi';
import { MdOutlineErrorOutline } from 'react-icons/md';
import { GradientInput, GradientOutline, GradientTextArea } from 'src/components/Form/FormGradientText';
import ErrorMessage from 'src/components/Form/ErrorMessage';

interface IFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

const validationSchema = Yup.object({
  firstName: Yup.string().min(2, '❌ Too Short!').max(50, '❌ Too Long!').required('❌ Required'),
  lastName: Yup.string().min(2, '❌ Too Short!').max(50, '❌ Too Long!').required('❌ Required'),
  email: Yup.string().email('❌ Invalid email').required('❌ Required'),
  message: Yup.string().min(2, '❌ Too Short!').max(1000, '❌ Too Long!').required('❌ Required'),
});

const Support: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState<string>(Colors.PRIMARY_GRADIENT);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(validationSchema),
    mode: 'all',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      message: '',
    },
  });

  // Only runs when no errors
  const onSubmit = (data: IFormInputs) => {
    apiClient
      .post('/support', { data })
      .then((res) => {
        setLoading(false);
        setColor(Colors.SUCCESS_GRADIENT);
        setTimeout(() => {
          reset();
          setColor(Colors.PRIMARY_GRADIENT);
        }, 1500);
      })
      .catch((err) => {
        setLoading(false);
        setColor(Colors.ERROR_GRADIENT);
        setTimeout(() => {
          setColor(Colors.PRIMARY_GRADIENT);
        }, 2000);
      });
  };

  return (
    <Container maxWidth="xl">
      <Head title="Support | icari" description="Coming Soon!" />

      <div id="blue-ellipse" />
      <div id="purple-ellipse" />

      <main>
        <Stack justifyContent="center" alignItems="center" mt={{ xs: 12, sm: 18 }} mb={2}>
          <Typography textAlign="center" variant="h2" mb={2}>
            How Can We Help You?
          </Typography>
          <Typography textAlign="center" variant="h6" width={{ sm: 500 }}>
            Feel free to let us know how we can help you or the platform and we’ll get back to you in a few business
            days!
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <Grid container spacing={3} width={{ sm: 600 }} mt={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">First Name</Typography>
                <GradientOutline>
                  <GradientInput placeholder="First" {...register('firstName')} />
                </GradientOutline>
                <ErrorMessage>{errors.firstName?.message}</ErrorMessage>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Last Name</Typography>
                <GradientOutline>
                  <GradientInput placeholder="Last" {...register('lastName')} />
                </GradientOutline>
                <ErrorMessage>{errors.lastName?.message}</ErrorMessage>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Email</Typography>
                <GradientOutline>
                  <GradientInput placeholder="user@example.com" {...register('email')} />
                </GradientOutline>
                <ErrorMessage>{errors.email?.message}</ErrorMessage>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Message</Typography>
                <GradientOutline>
                  <GradientTextArea height={300} {...register('message')} />
                </GradientOutline>
                <ErrorMessage>{errors.message?.message}</ErrorMessage>
              </Grid>
              <Grid item xs={12} textAlign="center">
                <Button backgroundColor={color} textColor="white" width={200} type="submit">
                  {color === Colors.PRIMARY_GRADIENT && 'Send Message'}
                  {color === Colors.SUCCESS_GRADIENT && <FiCheckCircle style={ButtonIconSx as Object} />}
                  {color === Colors.ERROR_GRADIENT && <MdOutlineErrorOutline style={ButtonIconSx as Object} />}
                  {loading && <CircularProgress sx={{ position: 'absolute', fontSize: 40, color: 'white' }} />}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Stack>
      </main>
    </Container>
  );
};

export default Support;

const ButtonIconSx = {
  fontSize: 30,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: 'white',
};
