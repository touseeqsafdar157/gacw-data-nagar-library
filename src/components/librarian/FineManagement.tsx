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
  TextField,
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
  Settings as SettingIcon,
  Print as PrintIcon
} from '@mui/icons-material';
import { BorrowTransaction } from '../../types/library';

interface FineManagementProps {
  transactions: BorrowTransaction[];
  onCollectFine: (transactionId: string) => void;
  onWaiveFine: (transactionId: string) => void;
}

export const FineManagement: React.FC<FineManagementProps> = ({
  transactions,
  onCollectFine,
  onWaiveFine
}) => {
  const [fineRatePerDay, setFineRatePerDay] = useState<number>(5);
  const [receiptTx, setReceiptTx] = useState<BorrowTransaction | null>(null);

  const pendingFines = transactions.filter((t) => t.fineStatus === 'Pending' && t.fineAmount > 0);
  const totalPendingAmount = pendingFines.reduce((sum, t) => sum + t.fineAmount, 0);

  // Mock collected history
  const totalCollectedAmount = 4320;

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
                Total Fines Deposited (This Session)
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#059669', my: 1 }}>
                Rs. {totalCollectedAmount}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Deposited in Govt College Library Development Fund
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ borderRadius: 3, border: '1px solid #cbd5e1' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#d97706', textTransform: 'uppercase' }}>
                Current College Fine Rate
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 1 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f2942' }}>
                  Rs. {fineRatePerDay}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  / Day per book
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">
                Standard Punjab Higher Education Department rule
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Pending Fines Register */}
      <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #cbd5e1', bgcolor: '#fff' }}>
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f2942', mb: 2 }}>
          Unresolved Overdue Fines Register ({pendingFines.length})
        </Typography>

        {pendingFines.length === 0 ? (
          <Alert severity="success" sx={{ borderRadius: 2 }}>
            All library dues are currently cleared! No students have unpaid overdue penalties.
          </Alert>
        ) : (
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: '#f1f5f9' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 800 }}>Roll Number</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>Student Name</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>Class & Section</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>Overdue Book</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>Due Date</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>Accumulated Fine</TableCell>
                  <TableCell sx={{ fontWeight: 800, textAlign: 'center' }}>Clearance Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pendingFines.map((t) => (
                  <TableRow key={t.id} hover>
                    <TableCell sx={{ fontWeight: 800, color: '#800020', fontFamily: 'monospace' }}>
                      {t.memberRollNo}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#0f2942' }}>{t.memberName}</TableCell>
                    <TableCell>
                      <Typography variant="body2">{t.memberClass}</Typography>
                      <Typography variant="caption" color="text.secondary">{t.memberSection}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{t.bookTitle}</Typography>
                      <Typography variant="caption" color="text.secondary">{t.bookAccessionNo}</Typography>
                    </TableCell>
                    <TableCell sx={{ color: '#dc2626', fontWeight: 700 }}>{t.dueDate}</TableCell>
                    <TableCell>
                      <Chip
                        label={`Rs. ${t.fineAmount}`}
                        color="error"
                        size="small"
                        sx={{ fontWeight: 800, fontSize: '0.8rem' }}
                      />
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Button
                        size="small"
                        variant="contained"
                        startIcon={<PaidIcon />}
                        onClick={() => handleCollectWithReceipt(t)}
                        sx={{ mr: 1, bgcolor: '#059669', fontSize: '0.75rem' }}
                      >
                        Collect & Receipt
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="secondary"
                        startIcon={<WaiveIcon />}
                        onClick={() => {
                          if (window.confirm(`Waive fine of Rs. ${t.fineAmount} for ${t.memberName}?`)) {
                            onWaiveFine(t.id);
                          }
                        }}
                        sx={{ fontSize: '0.75rem' }}
                      >
                        Waive
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Payment Receipt Dialog */}
      <Dialog open={Boolean(receiptTx)} onClose={() => setReceiptTx(null)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ bgcolor: '#0f2942', color: '#fff', fontWeight: 700 }}>
          Official Fine Payment Receipt
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          {receiptTx && (
            <Paper elevation={0} sx={{ p: 2.5, border: '2px dashed #cbd5e1', borderRadius: 2, textAlign: 'center' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#800020' }}>
                GOVT ASSOCIATE COLLEGE DATA NAGAR LAHORE
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748b', display: 'block', mb: 2 }}>
                CENTRAL LIBRARY FINE CLEARANCE VOUCHER
              </Typography>

              <Divider sx={{ my: 1.5 }} />

              <Box sx={{ textAlign: 'left', mb: 2 }}>
                <Typography variant="caption" color="text.secondary">Receipt No: <strong>RCP-{Date.now().toString().slice(-6)}</strong></Typography><br />
                <Typography variant="caption" color="text.secondary">Student Name: <strong>{receiptTx.memberName}</strong></Typography><br />
                <Typography variant="caption" color="text.secondary">Roll Number: <strong>{receiptTx.memberRollNo}</strong></Typography><br />
                <Typography variant="caption" color="text.secondary">Class: <strong>{receiptTx.memberClass}</strong></Typography><br />
                <Typography variant="caption" color="text.secondary">Book: <strong>{receiptTx.bookTitle}</strong></Typography>
              </Box>

              <Box sx={{ bgcolor: '#ecfdf5', p: 1.5, borderRadius: 2, border: '1px solid #a7f3d0', my: 2 }}>
                <Typography variant="caption" sx={{ color: '#047857', fontWeight: 700 }}>
                  PAID AMOUNT
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#059669' }}>
                  Rs. {receiptTx.fineAmount} (CASH)
                </Typography>
              </Box>

              <Typography variant="caption" color="text.secondary">
                Issued by: Librarian Rashid Mahmood | Date: {new Date().toLocaleDateString()}
              </Typography>
            </Paper>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2.5, bgcolor: '#f8fafc' }}>
          <Button onClick={() => setReceiptTx(null)} variant="outlined">
            Done
          </Button>
          <Button onClick={() => window.print()} variant="contained" startIcon={<PrintIcon />} sx={{ bgcolor: '#0f2942' }}>
            Print Receipt
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
