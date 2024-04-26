import React from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import {
  useGetSubscriptionsQuery,
  useSendMessageMutation,
} from '~api/telegramApi';
import PageSpinner from '~shared/PageSpinner/PageSpinner';

function App() {
  const { control, handleSubmit, reset } = useForm();
  const { data: subscriptions, isLoading: isSubscriptionsLoading } =
    useGetSubscriptionsQuery();
  const [sendMessage, { isLoading }] = useSendMessageMutation();
  //const selectedChats = watch("chats");

  const onSubmit = async (data) => {
    const selectedChats = subscriptions
      .filter((chat, index) => data.chats[index])
      .map((chat) => chat.chat_id);
    await sendMessage({
      chatId: selectedChats,
      text: data.message,
    });

    reset({ message: '' }); // Reset only message field
  };

  if (isSubscriptionsLoading) return <PageSpinner />;

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Send Telegram Message
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          {subscriptions?.map((subscription, index) => (
            <Controller
              key={subscription.chat_id}
              name={`chats.${index}`}
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label={`${subscription.name} (${subscription.type})`}
                />
              )}
            />
          ))}
        </FormGroup>
        <Controller
          name="message"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Message"
              variant="outlined"
              multiline
              rows={4}
              {...field}
              margin="normal"
              error={!field.value}
              helperText={!field.value ? 'Message is required' : ''}
            />
          )}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          disabled={isLoading}
        >
          Send Message
        </Button>
      </form>
    </Container>
  );
}

export default App;
