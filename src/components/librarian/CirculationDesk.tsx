import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  MenuItem,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Divider,
  Tabs,
  Tab,
  InputAdornment,
  Card,
  CardContent
} from '@mui/material';
import {
  LibraryAddCheck as IssueIcon,
  AssignmentReturn as ReturnIcon,
  Search as SearchIcon,
  QrCodeScanner as ScanIcon,
  Calculate as CalcIcon,
  Warning as WarningIcon,
  Person as PersonIcon,
  MenuBook as BookIcon,
  CheckCircle as SuccessIcon,
  Payment as FineIcon
} from '@mui/icons-material';
import { Book, Member, BorrowTransaction } from '../../types/library';
import { COLLEGE_CLASSES, COLLEGE_SECTIONS } from '../../data/mockData';
import confetti from 'canvas-confetti';

interface CirculationDeskProps {
  books: Book[];
  members: Member[];
  transactions: BorrowTransaction[];
  onIssueBook: (transactionData: Omit<BorrowTransaction, 'id' | 'transactionNo'>) => void;
  onReturnBook: (transactionId: string) => void;
  preSelectedBook?: Book | null;
}

export const CirculationDesk: React.FC<CirculationDeskProps> = ({
  books,
  members,
  transactions,
  onIssueBook,
  onReturnBook,
  preSelectedBook
}) => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  // Issue Form State - Highly customizable with Class & Section
  const [selectedBookId, setSelectedBookId] = useState<string>(preSelectedBook ? preSelectedBook.id : 'b-1');
  const [rollNoInput, setRollNoInput] = useState<string>('2024-ICS-042');
  const [studentName, setStudentName] = useState<string>('Muhammad Ahmad Khan');
  const [selectedClass, setSelectedClass] = useState<string>('1st Year (ICS - Comp Sci, Math, Phys/Stats)');
  const [selectedSection, setSelectedSection] = useState<string>('Section A (Morning)');
  const [memberRole, setMemberRole] = useState<'student' | 'teacher'>('student');
  const [loanDays, setLoanDays] = useState<number>(14);

  // Return Desk State
  const [returnSearchQuery, setReturnSearchQuery] = useState<string>('');
  const [issueAlert, setIssueAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Auto populate member details if roll number is typed
  const handleRollNoChange = (val: string) => {
    setRollNoInput(val);
    const found = members.find((m) => m.rollNo.toLowerCase() === val.toLowerCase().trim());
    if (found) {
      setStudentName(found.name);
      setMemberRole(found.role);
      const matchClass = COLLEGE_CLASSES.find((c) => c.toLowerCase().includes(found.classGrade.toLowerCase()));
      if (matchClass) setSelectedClass(matchClass);
      const matchSec = COLLEGE_SECTIONS.find((s) => s.toLowerCase().includes(found.section.toLowerCase()));
      if (matchSec) setSelectedSection(matchSec);
      setLoanDays(found.role === 'teacher' ? 30 : 14);
    }
  };

  const selectedBook = books.find((b) => b.id === selectedBookId);

  // Calculate Dates
  const todayStr = new Date().toISOString().split('T')[0];
  const dueDateObj = new Date();
  dueDateObj.setDate(dueDateObj.getDate() + loanDays);
  const dueDateStr = dueDateObj.toISOString().split('T')[0];

  const handleExecuteIssue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBook) {
      setIssueAlert({ type: 'error', message: 'Please select a valid book.' });
      return;
    }
    if (selectedBook.availableCopies <= 0) {
      setIssueAlert({ type: 'error', message: `Book "${selectedBook.title}" currently has 0 available copies on shelves.` });
      return;
    }
    if (selectedBook.isReferenceOnly && memberRole === 'student') {
      setIssueAlert({ type: 'error', message: 'Reference section books cannot be issued to students for home use.' });
      return;
    }

    onIssueBook({
      bookId: selectedBook.id,
      bookTitle: selectedBook.title,
      bookAccessionNo: selectedBook.accessionNo,
      almariLocation: `${selectedBook.almariNo} - ${selectedBook.shelfNo}`,
      memberId: 'm-temp',
      memberRollNo: rollNoInput.toUpperCase(),
      memberName: studentName,
      memberClass: selectedClass,
      memberSection: selectedSection,
      memberRole,
      issueDate: todayStr,
      dueDate: dueDateStr,
      status: 'Active',
      fineAmount: 0,
      fineStatus: 'None',
      issuedByStaff: 'Rashid Mahmood (Librarian)',
      renewCount: 0
    });

    setIssueAlert({
      type: 'success',
      message: `Book "${selectedBook.title}" successfully issued to ${studentName} (${rollNoInput}, ${selectedClass}, ${selectedSection}). Due Date: ${dueDateStr}`
    });

    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch (e) {}
  };

  // Filter Active issues for the return desk
  const activeTransactions = transactions.filter((t) => t.status === 'Active' || t.status === 'Overdue');
  const filteredActiveTransactions = activeTransactions.filter((t) => {
    const q = returnSearchQuery.toLowerCase().trim();
    return (
      !q ||
      t.memberRollNo.toLowerCase().includes(q) ||
      t.memberName.toLowerCase().includes(q) ||
      t.bookTitle.toLowerCase().includes(q) ||
      t.bookAccessionNo.toLowerCase().includes(q)
    );
  });

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 3.5 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f2942', mb: 0.5 }}>
          Librarian Circulation Desk (Issue & Return Counter)
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Official staff portal for issuing books with <strong>Class, Section, and Shift</strong> management, auto due-date calculations, and return check-in.
        </Typography>
      </Box>

      {/* Navigation Tabs */}
      <Paper elevation={0} sx={{ mb: 4, borderRadius: 3, border: '1px solid #cbd5e1', bgcolor: '#fff' }}>
        <Tabs
          value={tabIndex}
          onChange={(_, val) => setTabIndex(val)}
          sx={{
            '& .MuiTab-root': { fontWeight: 700, py: 2, fontSize: '0.95rem' },
            '& .Mui-selected': { color: '#0f2942' },
            '& .MuiTabs-indicator': { bgcolor: '#800020', height: 3 }
          }}
        >
          <Tab icon={<IssueIcon />} iconPosition="start" label="Issue Book to Student / Faculty" />
          <Tab icon={<ReturnIcon />} iconPosition="start" label={`Return / Due Check-In (${activeTransactions.length} Issued Books)`} />
        </Tabs>
      </Paper>

      {issueAlert && (
        <Alert
          severity={issueAlert.type}
          onClose={() => setIssueAlert(null)}
          sx={{ mb: 3, borderRadius: 2 }}
        >
          {issueAlert.message}
        </Alert>
      )}

      {/* Tab 0: Issue Form */}
      {tabIndex === 0 && (
        <Grid container spacing={3}>
          {/* Main Issue Form */}
          <Grid item xs={12} md={8}>
            <Paper
              elevation={0}
              sx={{
                p: 3.5,
                borderRadius: 3,
                border: '1px solid #cbd5e1',
                bgcolor: '#ffffff'
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f2942', mb: 0.5 }}>
                Issue New Book Slip
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 3 }}>
                Enter student details, verify academic class/section, and review issuance duration.
              </Typography>


              <Box component="form" onSubmit={handleExecuteIssue}>
                {/* Book Selection */}
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f2942', mb: 1 }}>
                  1. Select Book to Issue:
                </Typography>
                <TextField
                  select
                  fullWidth
                  value={selectedBookId}
                  onChange={(e) => setSelectedBookId(e.target.value)}
                  size="small"
                  sx={{ mb: 3 }}
                >
                  {books.map((b) => (
                    <MenuItem key={b.id} value={b.id} disabled={b.availableCopies <= 0}>
                      {b.accessionNo} — {b.title} ({b.availableCopies} available in {b.almariNo})
                    </MenuItem>
                  ))}
                </TextField>

                <Divider sx={{ my: 2.5 }} />

                {/* Student / Faculty Details */}
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f2942', mb: 1.5 }}>
                  2. Student / Borrower Details:
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Roll Number / ID"
                      value={rollNoInput}
                      onChange={(e) => handleRollNoChange(e.target.value)}
                      size="small"
                      placeholder="e.g. 2024-ICS-042"
                      required
                      helperText="Type roll number or scan library card barcode"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <ScanIcon color="action" />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Student / Teacher Full Name"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      size="small"
                      required
                    />
                  </Grid>

                  {/* Class Selection - Highly requested */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      fullWidth
                      label="Academic Class / Degree"
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                      size="small"
                      required
                    >
                      {COLLEGE_CLASSES.map((cls) => (
                        <MenuItem key={cls} value={cls}>
                          {cls}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  {/* Section Selection - Highly requested */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      fullWidth
                      label="College Section & Shift"
                      value={selectedSection}
                      onChange={(e) => setSelectedSection(e.target.value)}
                      size="small"
                      required
                    >
                      {COLLEGE_SECTIONS.map((sec) => (
                        <MenuItem key={sec} value={sec}>
                          {sec}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      fullWidth
                      label="Borrower Category"
                      value={memberRole}
                      onChange={(e) => {
                        const r = e.target.value as 'student' | 'teacher';
                        setMemberRole(r);
                        setLoanDays(r === 'teacher' ? 30 : 14);
                      }}
                      size="small"
                    >
                      <MenuItem value="student">Student (14 Days Reading Period)</MenuItem>
                      <MenuItem value="teacher">Faculty / Teacher (30 Days Reading Period)</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Issuance Duration (Days)"
                      type="number"
                      value={loanDays}
                      onChange={(e) => setLoanDays(Number(e.target.value))}
                      size="small"
                      helperText={`Due date will automatically be: ${dueDateStr}`}
                    />
                  </Grid>

                </Grid>

                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    startIcon={<IssueIcon />}
                    sx={{ bgcolor: '#0f2942', px: 4, py: 1.2, fontWeight: 700 }}
                  >
                    Confirm & Issue Book
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Right: Selected Book & Almari Location Summary */}
          <Grid item xs={12} md={4}>
            {selectedBook ? (
              <Card sx={{ borderRadius: 3, border: '1px solid #cbd5e1' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#800020', textTransform: 'uppercase', mb: 1 }}>
                    Book Issue Inspection
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Box
                      component="img"
                      src={selectedBook.coverUrl}
                      alt={selectedBook.title}
                      sx={{ width: 70, height: 95, objectFit: 'cover', borderRadius: 2, border: '1px solid #e2e8f0' }}
                    />
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0f2942', lineHeight: 1.2, mb: 0.5 }}>
                        {selectedBook.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                        By {selectedBook.author}
                      </Typography>
                      <Chip label={selectedBook.accessionNo} size="small" sx={{ mt: 1, fontWeight: 700, height: 20 }} />
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  {/* Physical Shelf Tag */}
                  <Box sx={{ bgcolor: '#f0f9ff', p: 1.5, borderRadius: 2, border: '1px solid #bae6fd', mb: 2 }}>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: '#0369a1', display: 'block' }}>
                      Physical Location:
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: '#0f2942' }}>
                      {selectedBook.almariNo}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#0284c7', fontWeight: 600 }}>
                      {selectedBook.shelfNo}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="caption" color="text.secondary">Available Copies:</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: 'green' }}>
                      {selectedBook.availableCopies} of {selectedBook.totalCopies}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="caption" color="text.secondary">Today's Issue Date:</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 700 }}>{todayStr}</Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="caption" color="text.secondary">Auto Return Due Date:</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: '#800020' }}>{dueDateStr}</Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" color="text.secondary">Late Fine Rule:</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 700 }}>Rs. 5 / Day</Typography>
                  </Box>
                </CardContent>
              </Card>
            ) : null}
          </Grid>
        </Grid>
      )}

      {/* Tab 1: Return & Due Check-In */}
      {tabIndex === 1 && (
        <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #cbd5e1', bgcolor: '#fff' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f2942' }}>
                Active Borrowed Books Register
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Search student roll number or book accession number to check-in returns or collect fines.
              </Typography>
            </Box>

            <TextField
              size="small"
              placeholder="Search Roll No or Book..."
              value={returnSearchQuery}
              onChange={(e) => setReturnSearchQuery(e.target.value)}
              sx={{ width: 280 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                )
              }}
            />
          </Box>

          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: '#f1f5f9' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 800 }}>Slip / TRX</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>Student / Member</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>Class & Section</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>Book Title & Acc #</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>Almari / Return Shelf</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>Due Date</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>Status / Fine</TableCell>
                  <TableCell sx={{ fontWeight: 800, textAlign: 'center' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredActiveTransactions.map((tx) => (
                  <TableRow key={tx.id} hover>
                    <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600 }}>{tx.transactionNo}</TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#0f2942' }}>
                        {tx.memberName}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#800020', fontWeight: 700, fontFamily: 'monospace' }}>
                        {tx.memberRollNo}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{tx.memberClass}</Typography>
                      <Typography variant="caption" color="text.secondary">{tx.memberSection}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{tx.bookTitle}</Typography>
                      <Typography variant="caption" sx={{ fontFamily: 'monospace', color: '#64748b' }}>{tx.bookAccessionNo}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#0369a1' }}>
                        {tx.almariLocation}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, color: tx.status === 'Overdue' ? '#dc2626' : 'inherit' }}>
                      {tx.dueDate}
                    </TableCell>
                    <TableCell>
                      {tx.status === 'Overdue' ? (
                        <Chip
                          label={`Overdue (Fine: Rs. ${tx.fineAmount})`}
                          color="error"
                          size="small"
                          sx={{ fontWeight: 800 }}
                        />
                      ) : (
                        <Chip label="On Time" color="success" size="small" sx={{ fontWeight: 700 }} />
                      )}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Button
                        variant="contained"
                        size="small"
                        color={tx.status === 'Overdue' ? 'secondary' : 'primary'}
                        startIcon={<ReturnIcon />}
                        onClick={() => onReturnBook(tx.id)}
                        sx={{ fontSize: '0.75rem', bgcolor: tx.status === 'Overdue' ? '#800020' : '#0f2942' }}
                      >
                        {tx.status === 'Overdue' ? 'Clear Fine & Return' : 'Return Book'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Container>
  );
};
