import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip
} from '@mui/material';
import {
  Home as HomeIcon,
  Search as SearchIcon,
  AutoStories as BookIcon,
  Chair as ChairIcon,
  HelpOutline as RulesIcon,
  Badge as LibrarianIcon,
  AdminPanelSettings as AdminIcon,
  Payment as FineIcon,
  People as MemberIcon,
  AssignmentTurnedIn as IssueIcon,
  MeetingRoom as AlmariIcon,
  Assessment as ReportIcon
} from '@mui/icons-material';
import { UserRole } from '../../types/library';

interface MobileMenuDrawerProps {
  open: boolean;
  onClose: () => void;
  currentRole: UserRole;
  currentTab: number;
  onSelectTab: (index: number) => void;
  onOpenFeedback: () => void;
}

export const MobileMenuDrawer: React.FC<MobileMenuDrawerProps> = ({
  open,
  onClose,
  currentRole,
  currentTab,
  onSelectTab,
  onOpenFeedback
}) => {
  const getNavItems = () => {
    if (currentRole === 'librarian') {
      return [
        { label: 'Oversight & Analytics', icon: <ReportIcon />, index: 0 },
        { label: 'Issue / Return Counter', icon: <IssueIcon />, index: 1 },
        { label: 'Manage Books', icon: <BookIcon />, index: 2 },
        { label: 'Manage Shelves & Almaris', icon: <AlmariIcon />, index: 3 },
        { label: 'Students & Faculty', icon: <MemberIcon />, index: 4 },
        { label: 'Fine Collection & Waivers', icon: <FineIcon />, index: 5 },
        { label: 'Public Book Catalog', icon: <SearchIcon />, index: 6 }
      ];
    } else if (currentRole === 'admin') {
      return [
        { label: 'Principal Oversight & KPIs', icon: <AdminIcon />, index: 0 },
        { label: 'Book Catalog & Stock', icon: <BookIcon />, index: 1 },
        { label: 'Shelves & Almaris', icon: <AlmariIcon />, index: 2 },
        { label: 'Student Directory', icon: <MemberIcon />, index: 3 },
        { label: 'Fine Reports & Revenue', icon: <FineIcon />, index: 4 },
        { label: 'About & College Rules', icon: <RulesIcon />, index: 5 }
      ];
    } else {
      // Student & Teacher (Public)
      return [
        { label: 'Library Home', icon: <HomeIcon />, index: 0 },
        { label: 'Book Catalog (OPAC)', icon: <SearchIcon />, index: 1 },
        { label: 'Issued Books & Dues', icon: <BookIcon />, index: 2 },
        { label: 'Reading Room (60 Seats)', icon: <ChairIcon />, index: 3 },
        { label: 'About & Rules', icon: <RulesIcon />, index: 4 }
      ];
    }
  };



  const navItems = getNavItems();

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 280, p: 2 }}>
        {/* Header */}
        <Box sx={{ mb: 2, p: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0f2942', lineHeight: 1.2 }}>
            Govt Associate College Data Nagar Lahore
          </Typography>
          <Typography variant="caption" sx={{ color: '#800020', fontWeight: 700, display: 'block' }}>
            Central Library System
          </Typography>
          <Chip
            label={`Role: ${currentRole.toUpperCase()}`}
            size="small"
            color="primary"
            sx={{ mt: 1, fontWeight: 700, fontSize: '0.7rem' }}
          />
        </Box>

        <Divider sx={{ mb: 1.5 }} />

        <List>
          {navItems.map((item) => (
            <ListItem key={item.label} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                selected={currentTab === item.index}
                onClick={() => {
                  onSelectTab(item.index);
                  onClose();
                }}
                sx={{
                  borderRadius: 2,
                  '&.Mui-selected': { bgcolor: '#0f2942', color: '#fff', '& .MuiListItemIcon-root': { color: '#f59e0b' } }
                }}
              >
                <ListItemIcon sx={{ color: '#64748b', minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={<Typography variant="body2" sx={{ fontWeight: 600 }}>{item.label}</Typography>} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        <ListItem disablePadding>
          <ListItemButton onClick={() => { onOpenFeedback(); onClose(); }} sx={{ borderRadius: 2 }}>
            <ListItemText primary={<Typography variant="body2" sx={{ fontWeight: 700, color: '#800020' }}>Feedback / Suggest a Book</Typography>} />
          </ListItemButton>
        </ListItem>
      </Box>
    </Drawer>
  );
};
