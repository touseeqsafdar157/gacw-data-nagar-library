import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Grid,
  Chip,
  Paper,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import {
  Person as PersonIcon,
  Badge as CardIcon,
  Print as PrintIcon,
  Warning as OverdueIcon,
  CheckCircle as ActiveIcon,
  Block as BlockedIcon
} from '@mui/icons-material';
import { Member, BorrowTransaction } from '../../types/library';

interface MemberDetailDialogProps {
  open: boolean;
  member: Member | null;
  transactions: BorrowTransaction[];
  onClose: () => void;
  onBlockToggle?: (memberId: string) => void;
}

export const MemberDetailDialog: React.FC<MemberDetailDialogProps> = ({
  open,
  member,
  transactions,
  onClose,
  onBlockToggle
}) => {
  if (!member) return null;

  const memberTransactions = transactions.filter((t) => t.memberId === member.id || t.memberRollNo === member.rollNo);
  const activeIssues = memberTransactions.filter((t) => t.status === 'Active' || t.status === 'Overdue');
  const totalFines = memberTransactions.reduce((sum, t) => sum + (t.fineStatus === 'Pending' ? t.fineAmount : 0), 0);


  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#0f2942', color: '#fff' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <PersonIcon sx={{ color: '#f59e0b' }} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Student / Member Profile
          </Typography>
        </Box>
        <Chip
          label={member.status}
          color={member.status === 'Active' ? 'success' : 'error'}
          size="small"
          sx={{ fontWeight: 700 }}
        />
      </DialogTitle>

      <DialogContent dividers sx={{ p: 3 }}>
        {/* Printable Library Card Preview Card */}
        <Paper
          elevation={2}
          sx={{
            p: 2.5,
            mb: 3,
            bgcolor: '#ffffff',
            border: '2px solid #800020',
            borderRadius: 3,
            background: 'linear-gradient(135deg, #ffffff 0%, #fdf2f2 100%)',
            position: 'relative'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#800020', textTransform: 'uppercase' }}>
                Govt Associate College Data Nagar Lahore
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                STUDENT CENTRAL LIBRARY CARD (BORROWER PASS)
              </Typography>
            </Box>
            <Chip
              label={member.libraryCardNo}
              size="small"
              sx={{ bgcolor: '#0f2942', color: '#fff', fontWeight: 800, fontFamily: 'monospace' }}
            />
          </Box>

          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={12} sm={8}>
              <Grid container spacing={1.5}>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">Student Name</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#0f2942' }}>{member.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">College Roll No</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 800, color: '#800020', fontFamily: 'monospace' }}>
                    {member.rollNo}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">Class / Degree</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>{member.classGrade}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">Section & Shift</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {member.section} ({member.shift})
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">Phone Contact</Typography>
                  <Typography variant="body2">{member.phone}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">Max Books Allowed</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>{member.maxAllowedBooks} Books</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={4} sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Box
                sx={{
                  width: 90,
                  height: 100,
                  borderRadius: 2,
                  bgcolor: '#f1f5f9',
                  border: '1px dashed #cbd5e1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#94a3b8',
                  mb: 1
                }}
              >
                <PersonIcon sx={{ fontSize: 40 }} />
              </Box>
              <Typography variant="caption" sx={{ fontSize: '0.65rem', color: '#94a3b8' }}>
                Authorized College Seal
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Current Issued Books & Fine Alerts */}
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f2942' }}>
            Current Borrowed Books ({activeIssues.length} / {member.maxAllowedBooks})
          </Typography>
          {totalFines > 0 && (
            <Chip
              icon={<OverdueIcon />}
              label={`Pending Fine: Rs. ${totalFines}`}
              color="error"
              size="small"
              sx={{ fontWeight: 700 }}
            />
          )}
        </Box>

        {activeIssues.length === 0 ? (
          <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', bgcolor: '#f8fafc', borderRadius: 2 }}>
            <Typography variant="body2" color="text.secondary">
              No books are currently issued to this member. Member is eligible to borrow up to {member.maxAllowedBooks} books.
            </Typography>
          </Paper>
        ) : (
          <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
            <Table size="small">
              <TableHead sx={{ bgcolor: '#f1f5f9' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Book Title</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Almari / Location</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Issue Date</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Due Date</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activeIssues.map((issue) => (
                  <TableRow key={issue.id}>
                    <TableCell sx={{ fontWeight: 600 }}>{issue.bookTitle}</TableCell>
                    <TableCell sx={{ fontSize: '0.8rem', color: '#64748b' }}>{issue.almariLocation}</TableCell>
                    <TableCell>{issue.issueDate}</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: issue.status === 'Overdue' ? '#dc2626' : 'inherit' }}>
                      {issue.dueDate}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={issue.status}
                        size="small"
                        color={issue.status === 'Overdue' ? 'error' : 'info'}
                        sx={{ fontWeight: 700, height: 22 }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

      </DialogContent>

      <DialogActions sx={{ p: 2.5, bgcolor: '#f8fafc', justifyContent: 'space-between' }}>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          {onBlockToggle && (
            <Button
              variant="outlined"
              color={member.status === 'Active' ? 'error' : 'success'}
              startIcon={member.status === 'Active' ? <BlockedIcon /> : <ActiveIcon />}
              onClick={() => onBlockToggle(member.id)}
            >
              {member.status === 'Active' ? 'Block Card' : 'Unblock Card'}
            </Button>
          )}
          <Button variant="contained" startIcon={<PrintIcon />} onClick={() => window.print()} sx={{ bgcolor: '#800020' }}>
            Print Library Card
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
