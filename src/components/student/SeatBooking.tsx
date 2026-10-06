import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tooltip,
  Alert,
  Divider,
  Stack
} from '@mui/material';
import {
  Chair as ChairIcon,
  CheckCircle as AvailableIcon,
  Cancel as OccupiedIcon,
  Bookmark as ReservedIcon,
  Schedule as ClockIcon,
  MeetingRoom as RoomIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { ReadingRoomSeat } from '../../types/library';
import confetti from 'canvas-confetti';

interface SeatBookingProps {
  seats: ReadingRoomSeat[];
  onBookSeat: (seatId: number, rollNo: string, studentName: string) => void;
  onVacateSeat: (seatId: number) => void;
}

export const SeatBooking: React.FC<SeatBookingProps> = ({
  seats,
  onBookSeat,
  onVacateSeat
}) => {
  const [selectedSeat, setSelectedSeat] = useState<ReadingRoomSeat | null>(null);
  const [bookingDialogOpen, setBookingDialogOpen] = useState<boolean>(false);
  const [rollNo, setRollNo] = useState<string>('2024-ICS-042');
  const [studentName, setStudentName] = useState<string>('Muhammad Ahmad Khan');
  const [selectedZone, setSelectedZone] = useState<string>('All');

  const availableCount = seats.filter((s) => s.status === 'Available').length;
  const occupiedCount = seats.filter((s) => s.status === 'Occupied').length;
  const reservedCount = seats.filter((s) => s.status === 'Reserved').length;

  const handleSeatClick = (seat: ReadingRoomSeat) => {
    setSelectedSeat(seat);
    if (seat.status === 'Available') {
      setBookingDialogOpen(true);
    }
  };

  const handleConfirmBooking = () => {
    if (selectedSeat && rollNo && studentName) {
      onBookSeat(selectedSeat.id, rollNo, studentName);
      setBookingDialogOpen(false);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // fallback
      }
    }
  };

  const filteredSeats = selectedZone === 'All'
    ? seats
    : seats.filter((s) => s.zone === selectedZone);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 3.5 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f2942', mb: 0.5 }}>
          Central Reading Hall & Study Seating
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Live seating layout of the 60-seat air-conditioned study hall with high-speed research Wi-Fi.
        </Typography>
      </Box>

      {/* Hall Overview Summary */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          bgcolor: '#ffffff',
          border: '1px solid #cbd5e1'
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: 2.5,
                  bgcolor: '#ecfdf5',
                  color: '#059669',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <RoomIcon sx={{ fontSize: 32 }} />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f2942' }}>
                  Hall Capacity: 60 Study Desks
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.2 }}>
                  <ClockIcon sx={{ fontSize: 16, color: '#64748b' }} />
                  <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                    Operating Hours: 8:00 AM – 4:00 PM (Mon – Sat)
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Counts */}
          <Grid item xs={12} md={7}>
            <Stack direction="row" spacing={2} justifyContent={{ xs: 'flex-start', md: 'flex-end' }} flexWrap="wrap">
              <Box sx={{ px: 2, py: 1, bgcolor: '#ecfdf5', borderRadius: 2, border: '1px solid #a7f3d0' }}>
                <Typography variant="caption" sx={{ color: '#047857', fontWeight: 700, display: 'block' }}>
                  AVAILABLE SEATS
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#059669' }}>
                  {availableCount} Desks
                </Typography>
              </Box>

              <Box sx={{ px: 2, py: 1, bgcolor: '#fef2f2', borderRadius: 2, border: '1px solid #fecaca' }}>
                <Typography variant="caption" sx={{ color: '#b91c1c', fontWeight: 700, display: 'block' }}>
                  CURRENTLY OCCUPIED
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#dc2626' }}>
                  {occupiedCount} Desks
                </Typography>
              </Box>

              <Box sx={{ px: 2, py: 1, bgcolor: '#fffbeb', borderRadius: 2, border: '1px solid #fef3c7' }}>
                <Typography variant="caption" sx={{ color: '#b45309', fontWeight: 700, display: 'block' }}>
                  RESERVED / FACULTY
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#d97706' }}>
                  {reservedCount} Desks
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {/* Zone Filters */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f2942', mr: 1 }}>
          Filter Study Zones:
        </Typography>
        {['All', 'Window Side', 'Quiet Study Zone', 'Discussion Corner', 'Digital Research'].map((zone) => (
          <Chip
            key={zone}
            label={zone}
            clickable
            onClick={() => setSelectedZone(zone)}
            color={selectedZone === zone ? 'primary' : 'default'}
            sx={{ fontWeight: 700 }}
          />
        ))}
      </Box>

      {/* Reading Hall Floor Plan Layout */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 4 },
          borderRadius: 4,
          bgcolor: '#ffffff',
          border: '2px solid #e2e8f0',
          position: 'relative'
        }}
      >
        {/* Librarian Podium / Circulation Counter Marker at the front */}
        <Box
          sx={{
            py: 1,
            px: 3,
            mb: 4,
            bgcolor: '#0f2942',
            color: '#fff',
            borderRadius: 2,
            textAlign: 'center',
            maxWidth: 400,
            mx: 'auto',
            border: '2px dashed #f59e0b'
          }}
        >
          <Typography variant="caption" sx={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            FRONT ENTRANCE & LIBRARIAN SUPERVISION DESK
          </Typography>
        </Box>

        {/* 60 Seats Grid */}
        <Grid container spacing={2}>
          {filteredSeats.map((seat) => {
            const isAvail = seat.status === 'Available';
            const isOcc = seat.status === 'Occupied';
            const isRes = seat.status === 'Reserved';

            return (
              <Grid item xs={4} sm={3} md={2} lg={1.5} key={seat.id}>
                <Tooltip
                  title={
                    isAvail
                      ? `Desk ${seat.seatNumber} (${seat.zone}) - Click to Book for today`
                      : isOcc
                      ? `Occupied by: ${seat.currentOccupantRollNo} (${seat.currentOccupantName || 'Student'}) until ${seat.bookedUntil || '04:00 PM'}`
                      : `Reserved Desk for Faculty / Examination Prep`
                  }
                  arrow
                >
                  <Paper
                    onClick={() => handleSeatClick(seat)}
                    sx={{
                      p: 1.5,
                      borderRadius: 2.5,
                      textAlign: 'center',
                      cursor: isAvail || isOcc ? 'pointer' : 'default',
                      border: '2px solid',
                      borderColor: isAvail ? '#10b981' : isOcc ? '#ef4444' : '#f59e0b',
                      bgcolor: isAvail ? '#f0fdf4' : isOcc ? '#fef2f2' : '#fffbeb',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.08)'
                      }
                    }}
                  >
                    <ChairIcon
                      sx={{
                        fontSize: 28,
                        color: isAvail ? '#10b981' : isOcc ? '#ef4444' : '#f59e0b',
                        mb: 0.5
                      }}
                    />
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0f2942' }}>
                      {seat.seatNumber}
                    </Typography>
                    <Typography variant="caption" sx={{ fontSize: '0.68rem', color: '#64748b', display: 'block' }}>
                      {seat.zone.split(' ')[0]}
                    </Typography>
                    <Chip
                      label={seat.status}
                      size="small"
                      sx={{
                        mt: 0.5,
                        height: 18,
                        fontSize: '0.62rem',
                        fontWeight: 700,
                        bgcolor: isAvail ? '#dcfce7' : isOcc ? '#fee2e2' : '#fef3c7',
                        color: isAvail ? '#166534' : isOcc ? '#991b1b' : '#92400e'
                      }}
                    />
                  </Paper>
                </Tooltip>
              </Grid>
            );
          })}
        </Grid>
      </Paper>

      {/* Seat Booking Modal */}
      <Dialog open={bookingDialogOpen} onClose={() => setBookingDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ bgcolor: '#0f2942', color: '#fff', fontWeight: 700 }}>
          Book Study Desk {selectedSeat?.seatNumber}
        </DialogTitle>
        <DialogContent sx={{ p: 3, pt: 3 }}>
          <Alert severity="info" sx={{ mb: 2.5, borderRadius: 2 }}>
            Booking is valid today from <strong>8:00 AM until 4:00 PM</strong>. Please vacate before leaving campus.
          </Alert>

          <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b' }}>
            Desk Zone:
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0f2942', mb: 2 }}>
            {selectedSeat?.zone}
          </Typography>

          <TextField
            fullWidth
            label="College Roll Number"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            size="small"
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Student Full Name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            size="small"
          />
        </DialogContent>
        <DialogActions sx={{ p: 2.5, bgcolor: '#f8fafc' }}>
          <Button onClick={() => setBookingDialogOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleConfirmBooking} variant="contained" color="success" sx={{ bgcolor: '#059669' }}>
            Confirm Desk Booking
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
