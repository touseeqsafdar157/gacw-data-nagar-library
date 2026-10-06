import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Chip,
  IconButton,
  Tooltip,
  InputAdornment
} from '@mui/material';
import {
  PersonAdd as AddIcon,
  Search as SearchIcon,
  Badge as CardIcon,
  Block as BlockIcon,
  CheckCircle as ActiveIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';
import { Member, BorrowTransaction } from '../../types/library';
import { COLLEGE_CLASSES, COLLEGE_SECTIONS } from '../../data/mockData';

interface ManageMembersProps {
  members: Member[];
  transactions: BorrowTransaction[];
  onAddMember: (newMember: Member) => void;
  onBlockToggle: (memberId: string) => void;
  onDeleteMember: (memberId: string) => void;
  onSelectMember: (member: Member) => void;
}

export const ManageMembers: React.FC<ManageMembersProps> = ({
  members,
  transactions,
  onAddMember,
  onBlockToggle,
  onDeleteMember,
  onSelectMember
}) => {
  const [search, setSearch] = useState<string>('');
  const [selectedClass, setSelectedClass] = useState<string>('All');
  const [selectedSection, setSelectedSection] = useState<string>('All');
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  // New member form
  const [name, setName] = useState<string>('');
  const [fatherName, setFatherName] = useState<string>('');
  const [rollNo, setRollNo] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [classGrade, setClassGrade] = useState<string>(COLLEGE_CLASSES[0]);
  const [section, setSection] = useState<string>(COLLEGE_SECTIONS[0]);
  const [shift, setShift] = useState<'Morning' | 'Evening'>('Morning');
  const [department, setDepartment] = useState<string>('Computer Science');
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [maxAllowed, setMaxAllowed] = useState<number>(2);

  const openAddDialog = () => {
    setName('');
    setFatherName('');
    setRollNo(`2024-ICS-${Math.floor(100 + Math.random() * 900)}`);
    setEmail('');
    setPhone('0300-');
    setClassGrade(COLLEGE_CLASSES[0]);
    setSection(COLLEGE_SECTIONS[0]);
    setShift('Morning');
    setDepartment('Computer Science');
    setRole('student');
    setMaxAllowed(2);
    setDialogOpen(true);
  };

  const handleSaveMember = () => {
    const newM: Member = {
      id: `m-${Date.now()}`,
      rollNo: rollNo.toUpperCase(),
      name,
      fatherName,
      role,
      email: email || `${rollNo.toLowerCase()}@gacdn.edu.pk`,
      phone,
      classGrade,
      section,
      shift,
      department,
      status: 'Active',
      issuedBooksCount: 0,
      maxAllowedBooks: maxAllowed,
      joinedDate: new Date().toISOString().split('T')[0],
      libraryCardNo: `LIB-DN-${Math.floor(1000 + Math.random() * 9000)}`
    };
    onAddMember(newM);
    setDialogOpen(false);
  };

  const filteredMembers = members.filter((m) => {
    const q = search.toLowerCase().trim();
    const matchSearch =
      !q ||
      m.name.toLowerCase().includes(q) ||
      m.rollNo.toLowerCase().includes(q) ||
      m.libraryCardNo.toLowerCase().includes(q) ||
      m.phone.includes(q);

    const matchClass = selectedClass === 'All' || m.classGrade.includes(selectedClass);
    const matchSec = selectedSection === 'All' || m.section.includes(selectedSection);

    return matchSearch && matchClass && matchSec;
  });

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3.5, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f2942', mb: 0.5 }}>
            Student & Faculty Membership Registry
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage library card issuance, class and section enrollments, borrowing quotas, and card suspension.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openAddDialog}
          sx={{ bgcolor: '#0f2942', fontWeight: 700, px: 3, py: 1 }}
        >
          Register New Member
        </Button>
      </Box>

      {/* Filter Bar */}
      <Paper elevation={0} sx={{ p: 2.5, mb: 3, borderRadius: 3, border: '1px solid #cbd5e1', bgcolor: '#fff' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search by Roll No, Name, or Card #..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              select
              fullWidth
              size="small"
              label="Filter Class / Degree"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <MenuItem value="All">All College Classes</MenuItem>
              <MenuItem value="1st Year">1st Year Intermediate</MenuItem>
              <MenuItem value="2nd Year">2nd Year Intermediate</MenuItem>
              <MenuItem value="BS">BS Degree Programs</MenuItem>
              <MenuItem value="Faculty">Faculty & Staff</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              select
              fullWidth
              size="small"
              label="Filter Section"
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
            >
              <MenuItem value="All">All Sections</MenuItem>
              <MenuItem value="Section A">Section A</MenuItem>
              <MenuItem value="Section B">Section B</MenuItem>
              <MenuItem value="Section C">Section C</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      {/* Members Table */}
      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #cbd5e1', borderRadius: 3 }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f1f5f9' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 800 }}>Roll Number</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>Student / Member Name</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>Class & Section</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>Department</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>Library Card #</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>Active Books</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 800, textAlign: 'center' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMembers.map((m) => (
              <TableRow key={m.id} hover>
                <TableCell sx={{ fontWeight: 800, color: '#800020', fontFamily: 'monospace' }}>
                  {m.rollNo}
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#0f2942' }}>
                    {m.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {m.phone}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{m.classGrade}</Typography>
                  <Typography variant="caption" color="text.secondary">{m.section} ({m.shift})</Typography>
                </TableCell>
                <TableCell>{m.department}</TableCell>
                <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600 }}>{m.libraryCardNo}</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>
                  {m.issuedBooksCount} / {m.maxAllowedBooks}
                </TableCell>
                <TableCell>
                  <Chip
                    label={m.status}
                    size="small"
                    color={m.status === 'Active' ? 'success' : 'error'}
                    sx={{ fontWeight: 700 }}
                  />
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <Tooltip title="View Profile & Print Library Card">
                    <IconButton size="small" color="primary" onClick={() => onSelectMember(m)}>
                      <ViewIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={m.status === 'Active' ? 'Block Card' : 'Unblock Card'}>
                    <IconButton
                      size="small"
                      color={m.status === 'Active' ? 'error' : 'success'}
                      onClick={() => onBlockToggle(m.id)}
                    >
                      {m.status === 'Active' ? <BlockIcon fontSize="small" /> : <ActiveIcon fontSize="small" />}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Member">
                    <IconButton
                      size="small"
                      color="default"
                      onClick={() => {
                        if (window.confirm(`Delete member ${m.name}?`)) {
                          onDeleteMember(m.id);
                        }
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Member Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: '#0f2942', color: '#fff', fontWeight: 700 }}>
          Register New Student / Faculty Member
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          <Grid container spacing={2}>
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
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Role Category"
                value={role}
                onChange={(e) => {
                  const r = e.target.value as 'student' | 'teacher';
                  setRole(r);
                  setMaxAllowed(r === 'teacher' ? 5 : 2);
                }}
                size="small"
              >
                <MenuItem value="student">Student (2 Books Limit)</MenuItem>
                <MenuItem value="teacher">Faculty / Teacher (5 Books Limit)</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                size="small"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Father's Name"
                value={fatherName}
                onChange={(e) => setFatherName(e.target.value)}
                size="small"
              />
            </Grid>

            {/* Class & Section */}
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Academic Class / Degree"
                value={classGrade}
                onChange={(e) => setClassGrade(e.target.value)}
                size="small"
                required
              >
                {COLLEGE_CLASSES.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Section & Shift"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                size="small"
                required
              >
                {COLLEGE_SECTIONS.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                size="small"
                placeholder="0300-1234567"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="small"
                placeholder="student@gacdn.edu.pk"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                size="small"
              >
                <MenuItem value="Computer Science">Computer Science</MenuItem>
                <MenuItem value="Physics">Physics</MenuItem>
                <MenuItem value="Chemistry">Chemistry</MenuItem>
                <MenuItem value="Mathematics">Mathematics</MenuItem>
                <MenuItem value="Urdu">Urdu</MenuItem>
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Commerce">Commerce</MenuItem>
                <MenuItem value="Islamic Studies">Islamic Studies</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Max Books Quota"
                type="number"
                value={maxAllowed}
                onChange={(e) => setMaxAllowed(Number(e.target.value))}
                size="small"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, bgcolor: '#f8fafc' }}>
          <Button onClick={() => setDialogOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSaveMember} variant="contained" sx={{ bgcolor: '#0f2942', fontWeight: 700 }}>
            Register Member & Generate Card
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
