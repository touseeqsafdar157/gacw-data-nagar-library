import React from 'react';
import { Box, Tabs, Tab, Container, useTheme, useMediaQuery } from '@mui/material';
import {
  Home as HomeIcon,
  Search as SearchIcon,
  AutoStories as BookIcon,
  Chair as ChairIcon,
  HelpOutline as RulesIcon,
  Payment as FineIcon,
  People as MemberIcon,
  AssignmentTurnedIn as IssueIcon,
  MeetingRoom as AlmariIcon,
  Assessment as ReportIcon,
  Settings as SettingsIcon,
  AdminPanelSettings as AdminIcon
} from '@mui/icons-material';
import { UserRole } from '../../types/library';

interface TabNavProps {
  currentRole: UserRole;
  currentTab: number;
  onTabChange: (index: number) => void;
}

export const TabNav: React.FC<TabNavProps> = ({ currentRole, currentTab, onTabChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (isMobile) return null;

  const renderTabs = () => {
    if (currentRole === 'librarian') {
      return [
        <Tab key="reports" icon={<ReportIcon />} iconPosition="start" label="Oversight Reports & Analytics" />,
        <Tab key="issue" icon={<IssueIcon />} iconPosition="start" label="Issue / Return Counter" />,
        <Tab key="books" icon={<BookIcon />} iconPosition="start" label="Manage Books" />,
        <Tab key="shelves" icon={<AlmariIcon />} iconPosition="start" label="Manage Shelves & Almaris" />,
        <Tab key="members" icon={<MemberIcon />} iconPosition="start" label="Students & Faculty Directory" />,
        <Tab key="fines" icon={<FineIcon />} iconPosition="start" label="Fine Collection & Waivers" />,
        <Tab key="settings" icon={<SettingsIcon />} iconPosition="start" label="Settings & Password" />,
        <Tab key="catalog" icon={<SearchIcon />} iconPosition="start" label="Public OPAC Catalog" />
      ];
    }

    if (currentRole === 'admin') {
      return [
        <Tab key="oversight" icon={<AdminIcon />} iconPosition="start" label="Principal Oversight & Reports" />,
        <Tab key="books" icon={<BookIcon />} iconPosition="start" label="Book Inventory" />,
        <Tab key="shelves" icon={<AlmariIcon />} iconPosition="start" label="Shelves & Cabinets" />,
        <Tab key="members" icon={<MemberIcon />} iconPosition="start" label="Student Directory" />,
        <Tab key="fines" icon={<FineIcon />} iconPosition="start" label="Fine Collection Reports" />,
        <Tab key="settings" icon={<SettingsIcon />} iconPosition="start" label="System Settings & Password" />,
        <Tab key="rules" icon={<RulesIcon />} iconPosition="start" label="About & Regulations" />
      ];
    }

    // Student & Teacher (Public)
    return [
      <Tab key="home" icon={<HomeIcon />} iconPosition="start" label="Library Home" />,
      <Tab key="catalog" icon={<SearchIcon />} iconPosition="start" label="Book Catalog (OPAC)" />,
      <Tab key="issued" icon={<BookIcon />} iconPosition="start" label="Issued Books & Dues Tracker" />,
      <Tab key="seats" icon={<ChairIcon />} iconPosition="start" label="Reading Hall (60 Seats)" />,
      <Tab key="rules" icon={<RulesIcon />} iconPosition="start" label="About & Regulations" />
    ];
  };

  return (
    <Box sx={{ bgcolor: '#ffffff', borderBottom: '1px solid #e2e8f0', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
      <Container maxWidth="xl">
        <Tabs
          value={currentTab}
          onChange={(_, val) => onTabChange(val)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            minHeight: 52,
            '& .MuiTab-root': {
              fontWeight: 700,
              minHeight: 52,
              py: 1,
              px: 2.5,
              fontSize: '0.88rem',
              color: '#475569',
              transition: 'color 0.2s ease',
              '&.Mui-selected': {
                color: currentRole === 'librarian' ? '#b45309' : currentRole === 'admin' ? '#800020' : '#0f2942'
              }
            },
            '& .MuiTabs-indicator': {
              bgcolor: currentRole === 'librarian' ? '#b45309' : currentRole === 'admin' ? '#800020' : '#0f2942',
              height: 3,
              borderRadius: '3px 3px 0 0'
            }
          }}
        >
          {renderTabs()}
        </Tabs>
      </Container>
    </Box>
  );
};
