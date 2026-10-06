import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Divider,
  Button
} from '@mui/material';
import {
  Close as CloseIcon,
  NotificationsActive as BellIcon,
  Warning as WarningIcon,
  NewReleases as NewIcon,
  AssignmentTurnedIn as ReadyIcon,
  EventBusy as HolidayIcon,
  Payment as FineIcon
} from '@mui/icons-material';

interface NotificationDrawerProps {
  open: boolean;
  onClose: () => void;
  onClearAll: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ open, onClose, onClearAll }) => {
  const notifications = [
    {
      id: 'n-1',
      title: 'Due Date Reminder: CLRS Algorithms',
      time: '1 hour ago',
      category: 'Due Alert',
      content: 'Your issued book "Introduction to Algorithms" is overdue by 5 days. Late fine is accumulating at Rs. 5/day.',
      icon: <WarningIcon sx={{ color: '#dc2626' }} />,
      urgent: true
    },
    {
      id: 'n-2',
      title: 'New Books in Almari #04 (Computer Science)',
      time: 'Today, 10:30 AM',
      category: 'New Arrival',
      content: '150 new programming & AI textbooks have been unpacked and shelved on Rack 3.',
      icon: <NewIcon sx={{ color: '#0284c7' }} />,
      urgent: false
    },
    {
      id: 'n-3',
      title: 'Reserved Book Ready: Kulliyat-e-Iqbal',
      time: 'Yesterday',
      category: 'Reservation',
      content: 'Your reserved copy of Kulliyat-e-Iqbal has been checked in and held at Circulation Desk for 48 hours.',
      icon: <ReadyIcon sx={{ color: '#059669' }} />,
      urgent: false
    },
    {
      id: 'n-4',
      title: 'Friday Prayer Timing Adjustment',
      time: '2 days ago',
      category: 'Library Notice',
      content: 'Library circulation counter will remain closed between 12:30 PM and 2:00 PM for Jummah prayers.',
      icon: <HolidayIcon sx={{ color: '#f59e0b' }} />,
      urgent: false
    }
  ];

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: { xs: 320, sm: 380 }, p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <BellIcon sx={{ color: '#800020' }} />
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f2942' }}>
              Library Notices & Alerts
            </Typography>
          </Box>
          <IconButton size="small" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Typography variant="caption" color="text.secondary" sx={{ mb: 2 }}>
          Govt Associate College Data Nagar Lahore Central Library automated notification feed.
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {/* List of items */}
        <List sx={{ flexGrow: 1, overflowY: 'auto', p: 0 }}>
          {notifications.map((n) => (
            <ListItem
              key={n.id}
              alignItems="flex-start"
              sx={{
                p: 1.8,
                mb: 1.5,
                borderRadius: 2.5,
                bgcolor: n.urgent ? '#fef2f2' : '#f8fafc',
                border: '1px solid',
                borderColor: n.urgent ? '#fecaca' : '#e2e8f0',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 0.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {n.icon}
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f2942' }}>
                    {n.title}
                  </Typography>
                </Box>
              </Box>

              <Typography variant="body2" sx={{ color: '#475569', fontSize: '0.85rem', my: 0.5, lineHeight: 1.5 }}>
                {n.content}
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 0.5 }}>
                <Chip label={n.category} size="small" sx={{ fontSize: '0.65rem', height: 18, fontWeight: 700 }} />
                <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.7rem' }}>
                  {n.time}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>

        <Box sx={{ pt: 2, borderTop: '1px solid #e2e8f0' }}>
          <Button fullWidth variant="outlined" size="small" onClick={onClearAll} sx={{ color: '#64748b' }}>
            Dismiss All Notifications
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};
