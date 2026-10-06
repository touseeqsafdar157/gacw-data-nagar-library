import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  InputAdornment,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  AlertTitle,
  Card,
  CardContent,
  Divider,
  Stack
} from '@mui/material';
import {
  Search as SearchIcon,
  Person as PersonIcon,
  Autorenew as RenewIcon,
  Warning as WarningIcon,
  CheckCircle as SuccessIcon,
  Payment as PaymentIcon,
  MeetingRoom as AlmariIcon,
  HelpOutline as HelpIcon
} from '@mui/icons-material';
import { Member, BorrowTransaction } from '../../types/library';

interface MyBorrowedBooksProps {
  members: Member[];
  transactions: BorrowTransaction[];
  onRenewBook: (transactionId: string) => void;
}

export const MyBorrowedBooks: React.FC<MyBorrowedBooksProps> = ({
  members,
  transactions,
  onRenewBook
}) => {
  const [rollNoInput, setRollNoInput] = useState<string>('2024-ICS-042');
  const [activeMember, setActiveMember] = useState<Member | null>(
    members.find((m) => m.rollNo === '2024-ICS-042') || null
  );

  const handleSearch = (roll: string) => {
    const cleanRoll = roll.trim().toUpperCase();
    setRollNoInput(cleanRoll);
    const found = members.find(
      (m) => m.rollNo.toUpperCase() === cleanRoll || m.libraryCardNo.toUpperCase() === cleanRoll
    );
    setActiveMember(found || null);
  };

  // Get active and past transactions for this member
  const memberTransactions = activeMember
    ? transactions.filter(
        (t) => t.memberRollNo.toUpperCase() === activeMember.rollNo.toUpperCase()
      )
    : [];

  const activeIssues = memberTransactions.filter(
    (t) => t.status === 'Active' || t.status === 'Overdue'
  );
  const returnedRecords = memberTransactions.filter((t) => t.status === 'Returned');
  const totalFinePending = memberTransactions.reduce(
    (sum, t) => sum + (t.fineStatus === 'Pending' ? t.fineAmount : 0),
    0
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f2942', mb: 0.5 }}>
          Issued Books & Dues Tracker
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Public Look-Up — Enter any <strong>Student Roll Number</strong> or <strong>Faculty Member ID</strong> to view currently issued books, return deadlines, and fine clearance status.
        </Typography>
      </Box>

      {/* Roll Number Search Card */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          border: '1px solid #cbd5e1',
          bgcolor: '#ffffff'
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f2942', mb: 1 }}>
          Enter Student Roll Number or Faculty Member ID:
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={8} md={6}>
            <TextField
              fullWidth
              size="medium"
              placeholder="e.g. 2024-ICS-042, 2024-FSC-108, or FAC-ENG-08"
              value={rollNoInput}
              onChange={(e) => setRollNoInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(rollNoInput)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: '#0f2942' }} />
                  </InputAdornment>
                ),
                sx: { fontWeight: 700, fontFamily: 'monospace', letterSpacing: '0.05em' }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={() => handleSearch(rollNoInput)}
              startIcon={<SearchIcon />}
              sx={{ bgcolor: '#0f2942', py: 1.4, fontWeight: 700 }}
            >
              Check Status
            </Button>
          </Grid>
        </Grid>

        {/* Quick Demo Test Buttons */}
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b', mr: 1 }}>
            Quick Roll No / Faculty Demos:
          </Typography>
          <Chip
            label="2024-ICS-042 (2 Issued Books, Overdue Fine)"
            size="small"
            clickable
            onClick={() => handleSearch('2024-ICS-042')}
            color="primary"
            variant={rollNoInput === '2024-ICS-042' ? 'filled' : 'outlined'}
          />
          <Chip
            label="2024-FSC-108 (1 Issued Book, On-Time)"
            size="small"
            clickable
            onClick={() => handleSearch('2024-FSC-108')}
            color="success"
            variant={rollNoInput === '2024-FSC-108' ? 'filled' : 'outlined'}
          />
          <Chip
            label="2024-ICOM-031 (Blocked Member)"
            size="small"
            clickable
            onClick={() => handleSearch('2024-ICOM-031')}
            color="error"
            variant={rollNoInput === '2024-ICOM-031' ? 'filled' : 'outlined'}
          />
          <Chip
            label="2024-FA-077 (0 Books Issued)"
            size="small"
            clickable
            onClick={() => handleSearch('2024-FA-077')}
            color="default"
            variant={rollNoInput === '2024-FA-077' ? 'filled' : 'outlined'}
          />
        </Box>
      </Paper>


      {/* Member Profile Banner */}
      {activeMember ? (
        <Box>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 3,
              bgcolor: '#0f2942',
              color: '#ffffff',
              boxShadow: '0 10px 25px rgba(15, 41, 66, 0.18)'
            }}
          >
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={7}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 3,
                      bgcolor: '#800020',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid #f59e0b'
                    }}
                  >
                    <PersonIcon sx={{ fontSize: 32, color: '#fff' }} />
                  </Box>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 800 }}>
                      {activeMember.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#cbd5e1' }}>
                      Roll No: <span style={{ color: '#f59e0b', fontWeight: 700 }}>{activeMember.rollNo}</span> | Card: {activeMember.libraryCardNo}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                      {activeMember.classGrade} — {activeMember.section} ({activeMember.shift} Shift)
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} md={5}>
                <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, gap: 2, flexWrap: 'wrap' }}>
                  <Box sx={{ textAlign: 'center', px: 2, py: 1, bgcolor: 'rgba(255,255,255,0.08)', borderRadius: 2 }}>
                    <Typography variant="caption" sx={{ color: '#cbd5e1', display: 'block' }}>
                      Active Issued Books
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                      {activeIssues.length} / {activeMember.maxAllowedBooks}
                    </Typography>
                  </Box>

                  <Box sx={{ textAlign: 'center', px: 2, py: 1, bgcolor: totalFinePending > 0 ? '#dc2626' : 'rgba(255,255,255,0.08)', borderRadius: 2 }}>
                    <Typography variant="caption" sx={{ color: '#cbd5e1', display: 'block' }}>
                      Pending Fine
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                      Rs. {totalFinePending}
                    </Typography>
                  </Box>

                  <Box sx={{ textAlign: 'center', px: 2, py: 1, bgcolor: activeMember.status === 'Active' ? 'rgba(16, 185, 129, 0.2)' : '#dc2626', borderRadius: 2 }}>
                    <Typography variant="caption" sx={{ color: '#cbd5e1', display: 'block' }}>
                      Account Status
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: activeMember.status === 'Active' ? '#34d399' : '#fecaca' }}>
                      {activeMember.status}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* Pending fine alert if any */}
          {totalFinePending > 0 && (
            <Alert
              severity="error"
              icon={<PaymentIcon />}
              sx={{ mb: 3, borderRadius: 2 }}
            >
              <AlertTitle sx={{ fontWeight: 700 }}>Fine Payment Required (Rs. {totalFinePending})</AlertTitle>
              Late return fine of Rs. 5 per day has accumulated. Please clear this fine at the Central Circulation Desk with Librarian Rashid Mahmood to avoid blockage of your library privileges and exam roll slip clearance.
            </Alert>
          )}

          {/* Active Issued Books Table */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f2942', mb: 2 }}>
              Currently Issued Books ({activeIssues.length})
            </Typography>

            {activeIssues.length === 0 ? (
              <Paper variant="outlined" sx={{ p: 3, textAlign: 'center', borderRadius: 3, bgcolor: '#f8fafc' }}>
                <SuccessIcon sx={{ color: '#10b981', fontSize: 40, mb: 1 }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  No Books Currently Issued
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  This member currently has 0 issued books. Eligible for borrowing up to {activeMember.maxAllowedBooks} books from the Central Library.
                </Typography>
              </Paper>
            ) : (
              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #cbd5e1', borderRadius: 3 }}>
                <Table>
                  <TableHead sx={{ bgcolor: '#f1f5f9' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 800 }}>Book Title</TableCell>
                      <TableCell sx={{ fontWeight: 800 }}>Accession No</TableCell>
                      <TableCell sx={{ fontWeight: 800 }}>Almari / Return Shelf</TableCell>
                      <TableCell sx={{ fontWeight: 800 }}>Issued Date</TableCell>
                      <TableCell sx={{ fontWeight: 800 }}>Due Date</TableCell>
                      <TableCell sx={{ fontWeight: 800 }}>Fine / Status</TableCell>
                      <TableCell sx={{ fontWeight: 800, textAlign: 'center' }}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {activeIssues.map((issue) => (
                      <TableRow key={issue.id} hover>
                        <TableCell sx={{ fontWeight: 700, color: '#0f2942' }}>
                          {issue.bookTitle}
                        </TableCell>
                        <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600 }}>
                          {issue.bookAccessionNo}
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <AlmariIcon sx={{ fontSize: 16, color: '#0284c7' }} />
                            <Typography variant="caption" sx={{ fontWeight: 700, color: '#0369a1' }}>
                              {issue.almariLocation}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{issue.issueDate}</TableCell>
                        <TableCell sx={{ fontWeight: 800, color: issue.status === 'Overdue' ? '#dc2626' : '#0f2942' }}>
                          {issue.dueDate}
                        </TableCell>
                        <TableCell>
                          {issue.status === 'Overdue' ? (
                            <Chip
                              label={`Overdue (Fine: Rs. ${issue.fineAmount})`}
                              color="error"
                              size="small"
                              sx={{ fontWeight: 700 }}
                            />
                          ) : (
                            <Chip
                              label="On Time"
                              color="success"
                              size="small"
                              sx={{ fontWeight: 700 }}
                            />
                          )}
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<RenewIcon />}
                            onClick={() => onRenewBook(issue.id)}
                            disabled={issue.renewCount >= 2 || issue.status === 'Overdue'}
                            sx={{ fontSize: '0.75rem' }}
                          >
                            {issue.renewCount >= 2 ? 'Max Renewed' : 'Renew (+7 Days)'}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>

          {/* Past Returned Books History */}
          {returnedRecords.length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f2942', mb: 2 }}>
                Past Reading History & Returned Books
              </Typography>
              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #cbd5e1', borderRadius: 3 }}>
                <Table size="small">
                  <TableHead sx={{ bgcolor: '#f8fafc' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Book Title</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Accession No</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Issued On</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Returned On</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {returnedRecords.map((rec) => (
                      <TableRow key={rec.id}>
                        <TableCell sx={{ fontWeight: 600 }}>{rec.bookTitle}</TableCell>
                        <TableCell sx={{ fontFamily: 'monospace' }}>{rec.bookAccessionNo}</TableCell>
                        <TableCell>{rec.issueDate}</TableCell>
                        <TableCell>{rec.returnDate}</TableCell>
                        <TableCell>
                          <Chip label="Returned" size="small" color="default" sx={{ fontWeight: 600 }} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

        </Box>
      ) : (
        <Alert severity="warning" sx={{ borderRadius: 2 }}>
          No member found with Roll Number <strong>{rollNoInput}</strong>. Please verify your roll number or visit the Circulation Desk to register your library card.
        </Alert>
      )}
    </Container>
  );
};
