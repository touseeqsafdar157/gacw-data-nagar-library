import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  InputAdornment
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Save as SaveIcon,
  PersonAdd as AddStaffIcon,
  Delete as DeleteIcon,
  Lock as LockIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Schedule as ScheduleIcon,
  AttachMoney as FineIcon,
  Badge as BadgeIcon
} from '@mui/icons-material';
import { LibrarySettings, StaffMember, settingsService } from '../../services/settingsService';
import { UserRole } from '../../types/library';

interface ManageSettingsProps {
  settings: LibrarySettings;
  onUpdateSettings: (newSettings: LibrarySettings) => void;
  currentRole: UserRole;
  showToast: (msg: string, sev?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const ManageSettings: React.FC<ManageSettingsProps> = ({
  settings,
  onUpdateSettings,
  currentRole,
  showToast
}) => {
  // Config state
  const [finePerDay, setFinePerDay] = useState<number>(settings.finePerDay || 5);
  const [timings, setTimings] = useState<string>(settings.timings || 'Mon–Sat: 8:00 AM – 4:00 PM');
  const [studentDays, setStudentDays] = useState<number>(settings.maxBorrowDaysStudent || 14);
  const [facultyDays, setFacultyDays] = useState<number>(settings.maxBorrowDaysTeacher || 30);
  const [savingConfig, setSavingConfig] = useState<boolean>(false);

  // Profile / Password State
  const [profileName, setProfileName] = useState<string>(
    currentRole === 'admin' ? 'Prof. Dr. Tariq Bashir (Principal)' : 'Rashid Mahmood (Chief Librarian)'
  );
  const [profileEmail, setProfileEmail] = useState<string>(
    currentRole === 'admin' ? 'principal@gacdn.edu.pk' : 'library@gacdn.edu.pk'
  );
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [savingPassword, setSavingPassword] = useState<boolean>(false);

  // Staff Dialog
  const [staffModalOpen, setStaffModalOpen] = useState<boolean>(false);
  const [staffName, setStaffName] = useState<string>('');
  const [staffDesignation, setStaffDesignation] = useState<string>('');
  const [staffShift, setStaffShift] = useState<string>('Morning (8:00 AM – 3:30 PM)');
  const [staffDesk, setStaffDesk] = useState<string>('');
  const [staffPhone, setStaffPhone] = useState<string>('');
  const [staffEmail, setStaffEmail] = useState<string>('');

  const handleSaveConfig = async () => {
    setSavingConfig(true);
    try {
      const updated = await settingsService.updateSettings({
        finePerDay: Number(finePerDay),
        timings,
        maxBorrowDaysStudent: Number(studentDays),
        maxBorrowDaysTeacher: Number(facultyDays)
      });
      onUpdateSettings(updated);
      showToast('Library rules & fine rate saved successfully!', 'success');
    } catch (err: any) {
      showToast(err.message || 'Error updating settings', 'error');
    } finally {
      setSavingConfig(false);
    }
  };

  const handleUpdateProfilePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword && newPassword !== confirmPassword) {
      showToast('New password and confirm password do not match!', 'error');
      return;
    }

    setSavingPassword(true);
    try {
      const username = currentRole === 'admin' ? 'admin2025' : 'lib2025';
      const res = await settingsService.updateProfile({
        username,
        name: profileName,
        email: profileEmail,
        currentPassword: currentPassword || undefined,
        newPassword: newPassword || undefined,
        role: currentRole
      });

      showToast(res.message || 'Profile & Password updated successfully in MongoDB!', 'success');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      showToast(err.message || 'Failed to update password', 'error');
    } finally {
      setSavingPassword(false);
    }
  };

  const handleAddStaff = async () => {
    if (!staffName || !staffDesignation) {
      showToast('Name and designation are required.', 'warning');
      return;
    }

    try {
      const updated = await settingsService.addStaff({
        name: staffName,
        designation: staffDesignation,
        shift: staffShift,
        desk: staffDesk || 'General Desk',
        phone: staffPhone,
        email: staffEmail
      });
      onUpdateSettings(updated);
      showToast(`Staff member "${staffName}" added to library directory!`, 'success');
      setStaffModalOpen(false);
      setStaffName('');
      setStaffDesignation('');
      setStaffDesk('');
      setStaffPhone('');
      setStaffEmail('');
    } catch (err: any) {
      showToast(err.message || 'Error adding staff', 'error');
    }
  };

  const handleDeleteStaff = async (idx: number) => {
    try {
      const updated = await settingsService.deleteStaff(idx);
      onUpdateSettings(updated);
      showToast('Staff member removed from directory.', 'info');
    } catch (err: any) {
      showToast(err.message || 'Error deleting staff', 'error');
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f2942', mb: 0.5 }}>
          College Library System Settings & Oversight
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Configure overdue fine rates, staff directory, operating hours, and admin credentials dynamically.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Fine & Borrowing Rules */}
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 3.5, borderRadius: 3, border: '1px solid #cbd5e1', bgcolor: '#fff', height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <FineIcon sx={{ color: '#059669', fontSize: 28 }} />
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f2942' }}>
                Fines & Borrowing Rules Configuration
              </Typography>
            </Box>

            <Grid container spacing={2.5}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.8, color: '#0f2942' }}>
                  Overdue Fine Rate (Rs. / Day):
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  value={finePerDay}
                  onChange={(e) => setFinePerDay(Number(e.target.value))}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">Rs.</InputAdornment>
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.8, color: '#0f2942' }}>
                  Operating Hours / Timings:
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={timings}
                  onChange={(e) => setTimings(e.target.value)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><ScheduleIcon fontSize="small" /></InputAdornment>
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.8, color: '#0f2942' }}>
                  Student Issue Period (Days):
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  value={studentDays}
                  onChange={(e) => setStudentDays(Number(e.target.value))}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.8, color: '#0f2942' }}>
                  Faculty Issue Period (Days):
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  value={facultyDays}
                  onChange={(e) => setFacultyDays(Number(e.target.value))}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleSaveConfig}
                  disabled={savingConfig}
                  sx={{ bgcolor: '#0f2942', fontWeight: 700, px: 3, py: 1, borderRadius: 2 }}
                >
                  {savingConfig ? 'Saving Changes...' : 'Save Policy Changes'}
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Change Username, Email & Password */}
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 3.5, borderRadius: 3, border: '1px solid #cbd5e1', bgcolor: '#fff', height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <LockIcon sx={{ color: '#800020', fontSize: 28 }} />
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f2942' }}>
                Account Credentials & Password
              </Typography>
            </Box>

            <form onSubmit={handleUpdateProfilePassword}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.8, color: '#0f2942' }}>
                    Officer Name:
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><PersonIcon fontSize="small" /></InputAdornment>
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.8, color: '#0f2942' }}>
                    Official Email:
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    type="email"
                    value={profileEmail}
                    onChange={(e) => setProfileEmail(e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><EmailIcon fontSize="small" /></InputAdornment>
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.8, color: '#0f2942' }}>
                    Current Password:
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    type="password"
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.8, color: '#0f2942' }}>
                    New Password:
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.8, color: '#0f2942' }}>
                    Confirm New Password:
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    type="password"
                    placeholder="Re-type new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={savingPassword}
                    sx={{ bgcolor: '#800020', fontWeight: 700, px: 3, py: 1, borderRadius: 2 }}
                  >
                    {savingPassword ? 'Updating Password...' : 'Update Credentials'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>

        {/* Dynamic Staff Directory Management */}
        <Grid item xs={12}>
          <Paper elevation={0} sx={{ p: 3.5, borderRadius: 3, border: '1px solid #cbd5e1', bgcolor: '#fff' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <BadgeIcon sx={{ color: '#0284c7', fontSize: 28 }} />
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f2942' }}>
                  Library Staff Directory ({settings.staffMembers?.length || 0} Officers & Attendants)
                </Typography>
              </Box>

              <Button
                variant="contained"
                startIcon={<AddStaffIcon />}
                onClick={() => setStaffModalOpen(true)}
                sx={{ bgcolor: '#0284c7', fontWeight: 700, borderRadius: 2 }}
              >
                Add Staff Member
              </Button>
            </Box>

            <Grid container spacing={2}>
              {settings.staffMembers?.map((staff, idx) => (
                <Grid item xs={12} md={4} key={idx}>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 2.5,
                      borderRadius: 3,
                      bgcolor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      position: 'relative'
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0f2942' }}>
                          {staff.name}
                        </Typography>
                        <Chip
                          label={staff.designation}
                          size="small"
                          sx={{ bgcolor: '#dbeafe', color: '#1e40af', fontWeight: 700, my: 0.5 }}
                        />
                      </Box>
                      <IconButton size="small" color="error" onClick={() => handleDeleteStaff(idx)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>

                    <Typography variant="body2" sx={{ color: '#475569', mb: 0.5 }}>
                      <strong>Shift:</strong> {staff.shift}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#475569', mb: 0.5 }}>
                      <strong>Desk:</strong> {staff.desk}
                    </Typography>
                    {staff.phone && (
                      <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>
                        📞 {staff.phone}
                      </Typography>
                    )}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Add Staff Dialog */}
      <Dialog open={staffModalOpen} onClose={() => setStaffModalOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ bgcolor: '#0f2942', color: '#fff', fontWeight: 700 }}>
          Add Library Staff Member
        </DialogTitle>
        <DialogContent sx={{ p: 3, pt: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              fullWidth
              size="small"
              label="Full Name"
              placeholder="e.g. Mr. Muhammad Imran"
              value={staffName}
              onChange={(e) => setStaffName(e.target.value)}
              autoFocus
            />
            <TextField
              fullWidth
              size="small"
              label="Designation / Rank"
              placeholder="e.g. Assistant Librarian (BS-16)"
              value={staffDesignation}
              onChange={(e) => setStaffDesignation(e.target.value)}
            />
            <TextField
              fullWidth
              size="small"
              label="Duty Shift"
              placeholder="e.g. Morning (8:00 AM – 3:30 PM)"
              value={staffShift}
              onChange={(e) => setStaffShift(e.target.value)}
            />
            <TextField
              fullWidth
              size="small"
              label="Assigned Counter / Desk"
              placeholder="e.g. Circulation & E-Library"
              value={staffDesk}
              onChange={(e) => setStaffDesk(e.target.value)}
            />
            <TextField
              fullWidth
              size="small"
              label="Phone Number"
              placeholder="e.g. 0300-1234567"
              value={staffPhone}
              onChange={(e) => setStaffPhone(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, bgcolor: '#f8fafc' }}>
          <Button onClick={() => setStaffModalOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleAddStaff} variant="contained" sx={{ bgcolor: '#0284c7', fontWeight: 700 }}>
            Save Staff Member
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
