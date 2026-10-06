import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Divider
} from '@mui/material';
import {
  Payment as FineIcon,
  Receipt as ReceiptIcon,
  CheckCircle as PaidIcon,
  MoneyOff as WaiveIcon,
  Print as PrintIcon
} from '@mui/icons-material';
import { BorrowTransaction } from '../../types/library';

interface FineManagementProps {
  transactions: BorrowTransaction[];
  onCollectFine: (transactionId: string) => void;
  onWaiveFine: (transactionId: string) => void;
  fineRatePerDay?: number;
}

export const FineManagement: React.FC<FineManagementProps> = ({
  transactions,
  onCollectFine,
  onWaiveFine,
  fineRatePerDay = 5
}) => {
  const [receiptTx, setReceiptTx] = useState<BorrowTransaction | null>(null);

  const pendingFines = transactions.filter((t) => t.fineStatus === 'Pending' && t.fineAmount > 0);
  const totalPendingAmount = pendingFines.reduce((sum, t) => sum + t.fineAmount, 0);

  const paidFines = transactions.filter((t) => t.fineStatus === 'Paid' && t.fineAmount > 0);
  const totalCollectedAmount = paidFines.reduce((sum, t) => sum + t.fineAmount, 0);

  const handleCollectWithReceipt = (tx: BorrowTransaction) => {
    onCollectFine(tx.id);
    setReceiptTx(tx);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 3.5 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f2942', mb: 0.5 }}>
          Fine Management & Clearance Counter
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Monitor overdue library book penalties, collect charges, issue computerized receipts, or apply authorized fee waivers.
        </Typography>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ borderRadius: 3, border: '1px solid #cbd5e1' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#dc2626', textTransform: 'uppercase' }}>
                Pending Overdue Penalties
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#dc2626', my: 1 }}>
                Rs. {totalPendingAmount}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Across {pendingFines.length} overdue issued book returns
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ borderRadius: 3, border: '1px solid #cbd5e1' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#059669', textTransform: 'uppercase' }}>
                Total Fines Deposited (Collected)
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#059669', my: 1 }}>
                Rs. {totalCollectedAmount}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Logged & verified in college treasury accounts
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ borderRadius: 3, border: '1px solid #cbd5e1' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#0284c7', textTransform: 'uppercase' }}>
                Configured Daily Overdue Rate
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#0284c7', my: 1 }}>
                Rs. {fineRatePerDay} / day
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Levied automatically past 14-day due date
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Pending Fines Table */}
      <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #cbd5e1', bgcolor: '#fff' }}>
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f2942', mb: 2 }}>
          Pending Overdue Books & Fine Dues
        </Typography>

        {pendingFines.length === 0 ? (
          <Alert severity="success" sx={{ borderRadius: 2 }}>
            No pending overdue fines in library records! All issued books are within due date limits.
          </Alert>
        ) : (
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: '#f8fafc' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Roll No</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Student Name</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Book Title</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Due Date</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Fine Amount</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pendingFines.map((tx) => (
                  <TableRow key={tx.id} hover>
                    <TableCell sx={{ fontWeight: 700 }}>{tx.memberRollNo}</TableCell>
                    <TableCell>{tx.memberName}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{tx.bookTitle}</TableCell>
                    <TableCell sx={{ color: '#dc2626', fontWeight: 600 }}>{tx.dueDate}</TableCell>
                    <TableCell sx={{ fontWeight: 800, color: '#dc2626' }}>Rs. {tx.fineAmount}</TableCell>
                    <TableCell>
                      <Chip label="Pending Payment" color="error" size="small" sx={{ fontWeight: 700 }} />
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<PaidIcon />}
                          onClick={() => handleCollectWithReceipt(tx)}
                          sx={{ bgcolor: '#059669', fontWeight: 700 }}
                        >
                          Collect Fine
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          color="warning"
                          startIcon={<WaiveIcon />}
                          onClick={() => onWaiveFine(tx.id)}
                          sx={{ fontWeight: 700 }}
                        >
                          Waive Fine
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Official Receipt Dialog */}
      <Dialog open={Boolean(receiptTx)} onClose={() => setReceiptTx(null)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ bgcolor: '#0f2942', color: '#fff', fontWeight: 800 }}>
          Official Fine Deposit Receipt
        </DialogTitle>
        <DialogContent sx={{ p: 3, pt: 3 }}>
          {receiptTx && (
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#800020' }}>
                Govt Associate College Data Nagar Lahore
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Central Library Department — Computerized Fine Clearance
              </Typography>
              <Divider sx={{ my: 2 }} />

              <Box sx={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="body2">
                  <strong>Transaction No:</strong> {receiptTx.transactionNo}
                </Typography>
                <Typography variant="body2">
                  <strong>Student Name:</strong> {receiptTx.memberName} ({receiptTx.memberRollNo})
                </Typography>
                <Typography variant="body2">
                  <strong>Book:</strong> {receiptTx.bookTitle}
                </Typography>
                <Typography variant="body2">
                  <strong>Amount Paid:</strong> Rs. {receiptTx.fineAmount}
                </Typography>
                <Typography variant="body2">
                  <strong>Date:</strong> {new Date().toLocaleDateString('en-PK')}
                </Typography>
                <Typography variant="body2">
                  <strong>Received By:</strong> {receiptTx.issuedByStaff || 'Chief Librarian'}
                </Typography>
              </Box>

              <Alert severity="success" sx={{ mt: 2.5, borderRadius: 2, textAlign: 'left' }}>
                Payment verified. Dues cleared for roll number slip issuance.
              </Alert>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2.5, bgcolor: '#f8fafc' }}>
          <Button onClick={() => setReceiptTx(null)} variant="outlined">
            Close
          </Button>
          <Button
            variant="contained"
            startIcon={<PrintIcon />}
            onClick={() => {
              window.print();
              setReceiptTx(null);
            }}
            sx={{ bgcolor: '#0f2942', fontWeight: 700 }}
          >
            Print Receipt
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
