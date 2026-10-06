import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
  Typography,
  Alert,
  Box
} from '@mui/material';
import { Feedback as FeedbackIcon, Send as SendIcon } from '@mui/icons-material';

interface FeedbackModalProps {
  open: boolean;
  onClose: () => void;
  onSubmitFeedback: (feedback: any) => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ open, onClose, onSubmitFeedback }) => {
  const [name, setName] = useState<string>('');
  const [rollNo, setRollNo] = useState<string>('');
  const [category, setCategory] = useState<string>('Suggestion');
  const [message, setMessage] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitFeedback({ name, rollNo, category, message, date: new Date().toLocaleDateString() });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setRollNo('');
      setMessage('');
      onClose();
    }, 1500);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ bgcolor: '#0f2942', color: '#fff', display: 'flex', alignItems: 'center', gap: 1 }}>
        <FeedbackIcon sx={{ color: '#f59e0b' }} />
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Library Feedback & Suggestion Box
        </Typography>
      </DialogTitle>

      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent sx={{ p: 3 }}>
          {submitted ? (
            <Alert severity="success" sx={{ mb: 2 }}>
              Thank you! Your feedback has been submitted to Chief Librarian Rashid Mahmood and the Principal's office.
            </Alert>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  size="small"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Roll Number / ID"
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                  size="small"
                  required
                  placeholder="e.g. 2024-ICS-042"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Feedback Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  size="small"
                >
                  <MenuItem value="Book Request">Request New Book / Edition</MenuItem>
                  <MenuItem value="Reading Room Facility">Reading Room / AC / Seating Issue</MenuItem>
                  <MenuItem value="Suggestion">General Improvement Suggestion</MenuItem>
                  <MenuItem value="Complaint">Staff / Service Complaint</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Your Message or Book Title Details"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please write your detailed comments or requested book title with author..."
                  required
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2.5, bgcolor: '#f8fafc' }}>
          <Button onClick={onClose} variant="outlined" disabled={submitted}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            startIcon={<SendIcon />}
            disabled={submitted}
            sx={{ bgcolor: '#0f2942', fontWeight: 700 }}
          >
            Submit Feedback
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
