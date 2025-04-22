import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Grid,
  Paper,
  Box
} from '@mui/material';
import { format, addHours, parseISO } from 'date-fns';

function App() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [bookings, setBookings] = useState([]);

  const timeSlots = [];
  const startTime = new Date().setHours(8, 0, 0);
  const endTime = new Date().setHours(22, 0, 0);

  for (let time = startTime; time < endTime; time = addHours(time, 1).getTime()) {
    timeSlots.push(format(time, 'HH:mm'));
  }

  const handleBooking = () => {
    if (!name || !phone || !selectedTime) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }

    const newBooking = {
      id: Date.now(),
      name,
      phone,
      date: format(selectedDate, 'yyyy-MM-dd'),
      time: selectedTime
    };

    setBookings([...bookings, newBooking]);
    setName('');
    setPhone('');
    setSelectedTime('');
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Đặt lịch cắt tóc
        </Typography>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Họ và tên"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="date"
                value={format(selectedDate, 'yyyy-MM-dd')}
                onChange={(e) => setSelectedDate(parseISO(e.target.value))}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Chọn khung giờ:
              </Typography>
              <Grid container spacing={1}>
                {timeSlots.map((time) => (
                  <Grid item key={time}>
                    <Button
                      variant={selectedTime === time ? 'contained' : 'outlined'}
                      onClick={() => setSelectedTime(time)}
                      disabled={bookings.some(
                        (b) => b.date === format(selectedDate, 'yyyy-MM-dd') && b.time === time
                      )}
                    >
                      {time}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleBooking}
                fullWidth
              >
                Đặt lịch
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Lịch hẹn
          </Typography>
          {bookings.map((booking) => (
            <Paper key={booking.id} sx={{ p: 2, mb: 1 }}>
              <Typography>
                {booking.name} - {booking.phone}
              </Typography>
              <Typography>
                {booking.date} - {booking.time}
              </Typography>
            </Paper>
          ))}
        </Paper>
      </Box>
    </Container>
  );
}

export default App; 