import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Chip,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Tooltip,
  Paper,
  Divider
} from '@mui/material';

import {
  LocalLibrary as LibraryIcon,
  Notifications as BellIcon,
  Search as SearchIcon,
  AccountCircle as UserIcon,
  Chair as ChairIcon,
  School as StudentIcon,
  PersonPin as FacultyIcon,
  Badge as LibrarianIcon,
  AdminPanelSettings as AdminIcon,
  Menu as MenuIcon,
  Lock as LockIcon,
  Logout as LogoutIcon,
  Login as LoginIcon
} from '@mui/icons-material';
import { UserRole } from '../../types/library';

interface NavbarProps {
  currentRole: UserRole;
  isAuthenticated: boolean;
  authenticatedRole: 'librarian' | 'admin' | null;
  onRoleChange: (role: UserRole) => void;
  onOpenLogin: (role?: UserRole) => void;
  onLogout: () => void;
  onOpenNotifications: () => void;
  unreadCount: number;
  availableSeatsCount: number;
  onQuickSearchClick: () => void;
  onOpenMobileMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  isAuthenticated,
  authenticatedRole,
  onRoleChange,
  onOpenLogin,
  onLogout,
  onOpenNotifications,
  unreadCount,
  availableSeatsCount,
  onQuickSearchClick,
  onOpenMobileMenu
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleRoleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRoleSelect = (role: UserRole) => {
    if ((role === 'librarian' || role === 'admin') && authenticatedRole !== role) {
      onOpenLogin(role);
      setAnchorEl(null);
      return;
    }
    onRoleChange(role);
    setAnchorEl(null);
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'student':
      case 'teacher':
        return { label: 'Student & Faculty (Public)', icon: <StudentIcon fontSize="small" />, color: 'info' as const };
      case 'librarian':
        return { label: 'Librarian Desk', icon: <LibrarianIcon fontSize="small" />, color: 'warning' as const };
      case 'admin':
        return { label: 'Principal / Admin', icon: <AdminIcon fontSize="small" />, color: 'error' as const };
    }
  };



  const roleInfo = getRoleLabel(currentRole);

  return (
    <AppBar position="sticky" sx={{ bgcolor: '#0f2942', borderBottom: '3px solid #800020' }} elevation={2}>
      <Toolbar sx={{ justifyContent: 'space-between', py: 0.5 }}>
        {/* Left: College Crest & Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {isMobile && (
            <IconButton color="inherit" edge="start" onClick={onOpenMobileMenu} sx={{ mr: 0.5 }}>
              <MenuIcon />
            </IconButton>
          )}

          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: '10px',
              bgcolor: '#800020',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              border: '2px solid #f59e0b'
            }}
          >
            <LibraryIcon sx={{ color: '#fff', fontSize: 28 }} />
          </Box>

          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 800,
                color: '#fff',
                lineHeight: 1.15,
                fontSize: { xs: '0.95rem', sm: '1.05rem', md: '1.15rem' },
                letterSpacing: '-0.01em'
              }}
            >
              Govt Associate College Data Nagar Lahore
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: '#f59e0b',
                fontWeight: 600,
                display: 'block',
                letterSpacing: '0.04em',
                fontSize: { xs: '0.7rem', sm: '0.75rem' }
              }}
            >
              مرکزی لائبریری — Central Library Management System
            </Typography>
          </Box>
        </Box>

        {/* Right: Quick actions and Role Switcher */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1.5 } }}>
          {/* Seat count badge */}
          <Tooltip title="Reading Room Available Seats">
            <Chip
              icon={<ChairIcon sx={{ color: '#10b981 !important', fontSize: 18 }} />}
              label={`${availableSeatsCount}/60 Seats`}
              size="small"
              sx={{
                bgcolor: 'rgba(16, 185, 129, 0.15)',
                color: '#34d399',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                fontWeight: 700,
                display: { xs: 'none', sm: 'flex' }
              }}
            />
          </Tooltip>

          {/* Quick Search trigger button */}
          <Button
            variant="outlined"
            size="small"
            onClick={onQuickSearchClick}
            startIcon={<SearchIcon />}
            sx={{
              borderColor: 'rgba(255,255,255,0.2)',
              color: '#e2e8f0',
              bgcolor: 'rgba(255,255,255,0.06)',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.12)',
                borderColor: 'rgba(255,255,255,0.4)'
              },
              display: { xs: 'none', md: 'flex' },
              fontSize: '0.8rem',
              py: 0.6
            }}
          >
            Search Almari / Book...
          </Button>

          {/* Notifications button */}
          <IconButton color="inherit" onClick={onOpenNotifications} sx={{ ml: 0.5 }}>
            <Badge badgeContent={unreadCount} color="error">
              <BellIcon />
            </Badge>
          </IconButton>

          {/* Authentication & Role Switcher Buttons */}
          {isAuthenticated ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip
                icon={roleInfo.icon}
                label={currentRole === 'librarian' ? 'Librarian (Logged In)' : 'Principal (Logged In)'}
                size="small"
                sx={{
                  bgcolor: currentRole === 'librarian' ? '#b45309' : '#800020',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  border: '1px solid rgba(255,255,255,0.3)',
                  display: { xs: 'none', sm: 'inline-flex' }
                }}
              />
              <Tooltip title="Log out and return to Student/Public portal">
                <Button
                  variant="outlined"
                  size="small"
                  onClick={onLogout}
                  startIcon={<LogoutIcon />}
                  sx={{
                    borderColor: 'rgba(239, 68, 68, 0.6)',
                    color: '#fca5a5',
                    bgcolor: 'rgba(239, 68, 68, 0.1)',
                    fontWeight: 700,
                    fontSize: { xs: '0.7rem', sm: '0.78rem' },
                    py: 0.5,
                    px: 1.2,
                    '&:hover': {
                      bgcolor: 'rgba(239, 68, 68, 0.25)',
                      borderColor: '#ef4444'
                    }
                  }}
                >
                  Logout
                </Button>
              </Tooltip>
            </Box>
          ) : (
            <Button
              variant="contained"
              size="small"
              onClick={() => onOpenLogin('librarian')}
              startIcon={<LockIcon sx={{ fontSize: 16 }} />}
              sx={{
                bgcolor: '#800020',
                color: '#fff',
                fontWeight: 700,
                fontSize: { xs: '0.72rem', sm: '0.8rem' },
                py: 0.6,
                px: { xs: 1, sm: 1.5 },
                border: '1px solid #f59e0b',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                '&:hover': { bgcolor: '#5c0017' }
              }}
            >
              Staff Login
            </Button>
          )}

          {/* Role selection dropdown button */}
          <Tooltip title="Switch View Mode (Public or Login for Staff)">
            <Button
              variant="outlined"
              onClick={handleRoleMenuOpen}
              startIcon={roleInfo.icon}
              size="small"
              sx={{
                borderColor: 'rgba(255,255,255,0.3)',
                color: '#fff',
                fontSize: { xs: '0.75rem', sm: '0.82rem' },
                fontWeight: 700,
                py: 0.5,
                px: { xs: 1, sm: 1.5 },
                bgcolor: 'rgba(255,255,255,0.08)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.16)' }
              }}
            >
              {isMobile ? currentRole.toUpperCase() : roleInfo.label}
            </Button>
          </Tooltip>

          {/* Role selection dropdown */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            PaperProps={{
              sx: {
                borderRadius: 3,
                mt: 1,
                minWidth: 260,
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
              }
            }}
          >
            <Box sx={{ px: 2, py: 1, bgcolor: '#f1f5f9', borderBottom: '1px solid #e2e8f0' }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                Select Active View / Role
              </Typography>
            </Box>

            <MenuItem onClick={() => handleRoleSelect('student')} selected={currentRole === 'student' || currentRole === 'teacher'}>
              <StudentIcon sx={{ mr: 1.5, color: '#0284c7' }} />
              <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Student & Faculty Portal</Typography>
                  <Chip label="Public OPAC" size="small" sx={{ height: 18, fontSize: '0.65rem', bgcolor: '#e0f2fe', color: '#0284c7', fontWeight: 700 }} />
                </Box>
                <Typography variant="caption" color="text.secondary">Catalog search, Almari locator & issued tracker</Typography>
              </Box>
            </MenuItem>

            <Divider sx={{ my: 0.5 }} />


            <MenuItem onClick={() => handleRoleSelect('librarian')} selected={currentRole === 'librarian'}>
              <LibrarianIcon sx={{ mr: 1.5, color: '#d97706' }} />
              <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Librarian Desk</Typography>
                  {authenticatedRole === 'librarian' ? (
                    <Chip label="Active" size="small" color="warning" sx={{ height: 18, fontSize: '0.65rem', fontWeight: 700 }} />
                  ) : (
                    <Chip icon={<LockIcon sx={{ fontSize: '10px !important' }} />} label="Login" size="small" sx={{ height: 18, fontSize: '0.65rem', bgcolor: '#fef3c7', color: '#b45309', fontWeight: 700 }} />
                  )}
                </Box>
                <Typography variant="caption" color="text.secondary">Manage books, shelves, issue/returns</Typography>
              </Box>
            </MenuItem>

            <MenuItem onClick={() => handleRoleSelect('admin')} selected={currentRole === 'admin'}>
              <AdminIcon sx={{ mr: 1.5, color: '#dc2626' }} />
              <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Principal / Admin</Typography>
                  {authenticatedRole === 'admin' ? (
                    <Chip label="Active" size="small" color="error" sx={{ height: 18, fontSize: '0.65rem', fontWeight: 700 }} />
                  ) : (
                    <Chip icon={<LockIcon sx={{ fontSize: '10px !important' }} />} label="Login" size="small" sx={{ height: 18, fontSize: '0.65rem', bgcolor: '#fee2e2', color: '#dc2626', fontWeight: 700 }} />
                  )}
                </Box>
                <Typography variant="caption" color="text.secondary">Full college library oversight & reports</Typography>
              </Box>
            </MenuItem>
          </Menu>

        </Box>
      </Toolbar>
    </AppBar>
  );
};
