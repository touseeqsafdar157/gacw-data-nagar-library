import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  LinearProgress,
  Divider,
  Alert
} from '@mui/material';
import {
  AdminPanelSettings as AdminIcon,
  Assessment as ReportIcon,
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
  AutoStories as BookIcon,

  People as MemberIcon,
  AssignmentTurnedIn as IssueIcon,
  Warning as OverdueIcon,
  Badge as StaffIcon
} from '@mui/icons-material';
import { Book, Member, BorrowTransaction, BookSuggestion } from '../../types/library';

interface AdminDashboardProps {
  books: Book[];
  members: Member[];
  transactions: BorrowTransaction[];
  suggestions: BookSuggestion[];
  onApproveSuggestion: (sugId: string) => void;
  onRejectSuggestion: (sugId: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  books,
  members,
  transactions,
  suggestions,
  onApproveSuggestion,
  onRejectSuggestion
}) => {
  const activeIssues = transactions.filter((t) => t.status === 'Active' || t.status === 'Overdue');
  const overdueIssues = transactions.filter((t) => t.status === 'Overdue');
  const totalStock = books.reduce((sum, b) => sum + b.totalCopies, 0);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 3.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <AdminIcon sx={{ color: '#800020', fontSize: 32 }} />
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f2942' }}>
            Library Oversight & Executive Reports
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
          College-wide institutional reports, department circulation statistics, procurement requests, and staff roster.
        </Typography>
      </Box>

      {/* High Level KPI Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 3, border: '1px solid #cbd5e1' }}>
            <CardContent sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                  Total Catalog Inventory
                </Typography>
                <BookIcon sx={{ color: '#0f2942' }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f2942' }}>
                {totalStock} Copies
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {books.length} Unique Titles across 11 Almaris
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 3, border: '1px solid #cbd5e1' }}>
            <CardContent sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                  Enrolled Members
                </Typography>
                <MemberIcon sx={{ color: '#0284c7' }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#0284c7' }}>
                {members.length} Registered
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Intermediate, BS & Faculty
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 3, border: '1px solid #cbd5e1' }}>
            <CardContent sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                  Currently Issued
                </Typography>
                <IssueIcon sx={{ color: '#059669' }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#059669' }}>
                {activeIssues.length} Books
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Currently with students & faculty
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 3, border: '1px solid #cbd5e1' }}>
            <CardContent sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                  Overdue Returns
                </Typography>
                <OverdueIcon sx={{ color: '#dc2626' }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#dc2626' }}>
                {overdueIssues.length} Overdue
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Return clearance required
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>


      {/* Two Columns: Department Circulation & Staff Roster */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Department Usage Breakdown */}
        <Grid item xs={12} md={7}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #cbd5e1', bgcolor: '#fff', height: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f2942', mb: 2 }}>
              Department-Wise Library Utilization
            </Typography>

            <Box sx={{ mb: 2.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>Computer Science & IT (Almari #04)</Typography>
                <Typography variant="caption" sx={{ fontWeight: 700 }}>88% Circulation</Typography>
              </Box>
              <LinearProgress variant="determinate" value={88} sx={{ height: 8, borderRadius: 2, bgcolor: '#e2e8f0', '& .MuiLinearProgress-bar': { bgcolor: '#0284c7' } }} />
            </Box>

            <Box sx={{ mb: 2.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>Urdu Literature & Iqbaliat (Almari #02)</Typography>
                <Typography variant="caption" sx={{ fontWeight: 700 }}>74% Circulation</Typography>
              </Box>
              <LinearProgress variant="determinate" value={74} sx={{ height: 8, borderRadius: 2, bgcolor: '#e2e8f0', '& .MuiLinearProgress-bar': { bgcolor: '#800020' } }} />
            </Box>

            <Box sx={{ mb: 2.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>Mathematics & Calculus (Almari #07)</Typography>
                <Typography variant="caption" sx={{ fontWeight: 700 }}>65% Circulation</Typography>
              </Box>
              <LinearProgress variant="determinate" value={65} sx={{ height: 8, borderRadius: 2, bgcolor: '#e2e8f0', '& .MuiLinearProgress-bar': { bgcolor: '#f59e0b' } }} />
            </Box>

            <Box sx={{ mb: 2.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>Physics & Mechanics (Almari #05)</Typography>
                <Typography variant="caption" sx={{ fontWeight: 700 }}>58% Circulation</Typography>
              </Box>
              <LinearProgress variant="determinate" value={58} sx={{ height: 8, borderRadius: 2, bgcolor: '#e2e8f0', '& .MuiLinearProgress-bar': { bgcolor: '#059669' } }} />
            </Box>

            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>Commerce & Accounting (Almari #08)</Typography>
                <Typography variant="caption" sx={{ fontWeight: 700 }}>52% Circulation</Typography>
              </Box>
              <LinearProgress variant="determinate" value={52} sx={{ height: 8, borderRadius: 2, bgcolor: '#e2e8f0', '& .MuiLinearProgress-bar': { bgcolor: '#6366f1' } }} />
            </Box>
          </Paper>
        </Grid>

        {/* Staff Duty Roster */}
        <Grid item xs={12} md={5}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #cbd5e1', bgcolor: '#fff', height: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f2942', mb: 2 }}>
              Library Staff & Duty Roster
            </Typography>

            <Box sx={{ p: 2, mb: 2, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0f2942' }}>
                Mr. Rashid Mahmood
              </Typography>
              <Typography variant="caption" sx={{ color: '#800020', fontWeight: 700, display: 'block' }}>
                Chief College Librarian (BS-17)
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Shift: Morning (8:00 AM – 3:30 PM) • Desk: Circulation & Acquisition
              </Typography>
            </Box>

            <Box sx={{ p: 2, mb: 2, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0f2942' }}>
                Mr. Muhammad Imran
              </Typography>
              <Typography variant="caption" sx={{ color: '#0284c7', fontWeight: 700, display: 'block' }}>
                Assistant Librarian (Cataloging & IT)
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Shift: Morning (8:30 AM – 4:00 PM) • Desk: E-Library & Classification
              </Typography>
            </Box>

            <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0f2942' }}>
                Mr. Asif Ali
              </Typography>
              <Typography variant="caption" sx={{ color: '#059669', fontWeight: 700, display: 'block' }}>
                Library Attendant / Book Binder
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Almari Shelf Maintenance & Reading Room Discipline
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Book Purchase Requests / Student Suggestions Approval */}
      <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #cbd5e1', bgcolor: '#fff' }}>
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f2942', mb: 2 }}>
          Student & Faculty Book Procurement Requests ({suggestions.length})
        </Typography>

        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: '#f1f5f9' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 800 }}>Requested Title</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Author</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Student Name & Roll No</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Class / Department</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Justification</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 800, textAlign: 'center' }}>Principal Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {suggestions.map((sug) => (
                <TableRow key={sug.id} hover>
                  <TableCell sx={{ fontWeight: 700, color: '#0f2942' }}>{sug.title}</TableCell>
                  <TableCell>{sug.author}</TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{sug.suggestedByName}</Typography>
                    <Typography variant="caption" sx={{ fontFamily: 'monospace', color: '#800020' }}>{sug.suggestedByRollNo}</Typography>
                  </TableCell>
                  <TableCell>{sug.studentClass}</TableCell>
                  <TableCell sx={{ maxWidth: 260, fontSize: '0.85rem' }}>{sug.reason}</TableCell>
                  <TableCell>
                    <Chip
                      label={sug.status}
                      size="small"
                      color={sug.status === 'Approved' ? 'success' : sug.status === 'Rejected' ? 'error' : 'warning'}
                      sx={{ fontWeight: 700 }}
                    />
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {sug.status === 'Pending' ? (
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                        <Button
                          size="small"
                          variant="contained"
                          color="success"
                          startIcon={<ApproveIcon />}
                          onClick={() => onApproveSuggestion(sug.id)}
                          sx={{ fontSize: '0.75rem' }}
                        >
                          Approve
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          color="error"
                          startIcon={<RejectIcon />}
                          onClick={() => onRejectSuggestion(sug.id)}
                          sx={{ fontSize: '0.75rem' }}
                        >
                          Reject
                        </Button>
                      </Box>
                    ) : (
                      <Typography variant="caption" color="text.secondary">Action Completed</Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};
