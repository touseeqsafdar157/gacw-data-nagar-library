import React from 'react';
import { Box, Container, Grid, Typography, Link, Chip, Divider } from '@mui/material';
import {
  LocationOn as LocationIcon,
  Schedule as ClockIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  AutoStories as BookIcon,
  Shield as RuleIcon
} from '@mui/icons-material';

export const Footer: React.FC = () => {
  return (
    <Box sx={{ bgcolor: '#081726', color: '#cbd5e1', pt: 6, pb: 4, mt: 8, borderTop: '4px solid #800020' }}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Col 1: College & Library Identity */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '8px',
                  bgcolor: '#800020',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff'
                }}
              >
                <BookIcon />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ color: '#fff', fontWeight: 800, fontSize: '1.05rem', lineHeight: 1.2 }}>
                  Govt Associate College Data Nagar Lahore
                </Typography>
                <Typography variant="caption" sx={{ color: '#f59e0b', fontWeight: 600 }}>
                  Central College Library & E-Resource Center
                </Typography>
              </Box>
            </Box>

            <Typography variant="body2" sx={{ color: '#94a3b8', mb: 2, lineHeight: 1.6 }}>
              Established to provide comprehensive academic textbook access, Almari shelf locator, and reading room facilities for Intermediate and Undergraduate students of Govt Associate College Data Nagar Lahore.
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Chip label="12,500+ Books" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.08)', color: '#e2e8f0' }} />
              <Chip label="60 Reading Seats" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.08)', color: '#e2e8f0' }} />
              <Chip label="Almari Shelf Locator" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.08)', color: '#e2e8f0' }} />
            </Box>

          </Grid>

          {/* Col 2: Library Rules Quick Summary */}
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <RuleIcon sx={{ color: '#f59e0b', fontSize: 20 }} />
              <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 700 }}>
                Library Policy At A Glance
              </Typography>
            </Box>
            <Box component="ul" sx={{ pl: 2, m: 0, '& li': { mb: 1, color: '#94a3b8', fontSize: '0.85rem' } }}>
              <li><strong>Student Quota:</strong> Maximum 2 books can be issued concurrently.</li>
              <li><strong>Issuance Duration:</strong> 14 days for students (30 days for teaching faculty).</li>
              <li><strong>Overdue Fine:</strong> Rs. 5 per day per book after the due date.</li>

              <li><strong>Reference Books & Newspapers:</strong> In-library reading only; strictly non-issuable.</li>
              <li><strong>Silence:</strong> Complete silence & mobile on silent mode inside the Reading Hall.</li>
            </Box>
          </Grid>

          {/* Col 3: Timings & Location */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 700, mb: 2 }}>
              Working Hours & Location
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 1.5 }}>
              <ClockIcon sx={{ color: '#38bdf8', fontSize: 20, mt: 0.2 }} />
              <Box>
                <Typography variant="body2" sx={{ color: '#f1f5f9', fontWeight: 600 }}>
                  Monday – Saturday: 8:00 AM – 4:00 PM
                </Typography>
                <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                  Friday Prayer Break: 12:30 PM – 2:00 PM | Sunday: Closed
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 1.5 }}>
              <LocationIcon sx={{ color: '#ef4444', fontSize: 20, mt: 0.2 }} />
              <Typography variant="body2" sx={{ color: '#cbd5e1' }}>
                Main Campus, Data Nagar, Badami Bagh, Lahore, Punjab, Pakistan
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <EmailIcon sx={{ color: '#f59e0b', fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: '#cbd5e1' }}>
                library@gacdn.edu.pk | info@gacdn.edu.pk
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Typography variant="caption" sx={{ color: '#64748b' }}>
            © {new Date().getFullYear()} Govt Associate College Data Nagar Lahore. All Rights Reserved.
          </Typography>
          <Typography variant="caption" sx={{ color: '#94a3b8' }}>
            Built for Academic Excellence & Digital Transformation
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
