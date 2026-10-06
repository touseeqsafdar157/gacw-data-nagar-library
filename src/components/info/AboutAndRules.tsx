import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Chip,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Gavel as RuleIcon,
  ExpandMore as ExpandMoreIcon,
  School as CollegeIcon,
  CheckCircleOutline as CheckIcon,
  Schedule as ClockIcon,
  MeetingRoom as AlmariIcon,
  LocationOn as LocationIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import { ALMARI_LIST } from '../../data/mockData';

export const AboutAndRules: React.FC = () => {
  const libraryRules = [
    {
      title: '1. Strict Silence & Decorum',
      desc: 'Complete silence must be observed inside the library reading hall. Discussions, group chatter, and loud activities are strictly restricted to the outdoor corridor.'
    },
    {
      title: '2. Library Card Mandatory',
      desc: 'No book shall be issued without a valid College Library Card. Borrowing on another student’s card or roll number is strictly forbidden and subject to card confiscation.'
    },
    {
      title: '3. Student Borrowing Quota (2 Books)',
      desc: 'Regular enrolled students (ICS, FSc, FA, I.Com, BS) are entitled to borrow a maximum of 2 books simultaneously. Teaching faculty may borrow up to 5 books.'
    },
    {
      title: '4. 14-Day Issuance & Reading Period',
      desc: 'Books are issued for 14 calendar days. A book may be renewed once for an additional 7 days provided no other student has placed a reservation on it.'
    },

    {
      title: '5. Overdue Fine Rate (Rs. 5 / Day)',
      desc: 'A fine of Rs. 5 per day per book is levied after the due date. Examination roll number slips and clearance certificates will not be issued until all library dues are settled.'
    },
    {
      title: '6. Damage, Marking & Loss Policy',
      desc: 'Underlining with pen, dog-earing pages, tearing, or water damage is considered destruction of college property. Lost or damaged books must be replaced with the current edition or paid for at market replacement cost.'
    },
    {
      title: '7. Reference Section & Newspapers',
      desc: 'Encyclopedias, dictionaries, atlases, current newspapers, and uncataloged journals are strictly for in-library reading and cannot be taken outside the library hall.'
    },
    {
      title: '8. Mobile Phone Policy',
      desc: 'Cellular phones must be switched to silent mode before entering the library. Answering calls inside the reading hall will lead to immediate ejection.'
    }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f2942', mb: 0.5 }}>
          About Central Library & Official Regulations
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Govt Associate College Data Nagar Lahore — Serving students, scholars, and faculty with academic distinction.
        </Typography>
      </Box>

      {/* College Vision Banner */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 4,
          bgcolor: '#ffffff',
          border: '1px solid #cbd5e1',
          background: 'linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%)'
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
              <CollegeIcon sx={{ color: '#800020', fontSize: 32 }} />
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f2942' }}>
                Central Library Vision & Academic Mission
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ color: '#334155', lineHeight: 1.7, mb: 2 }}>
              The Central Library of Govt Associate College Data Nagar Lahore is the intellectual hub of the institution. Housing an extensive catalog of textbooks, reference works, classical literature, and Punjab Board archives, the library caters to intermediate cohorts in Pre-Medical, Pre-Engineering, Computer Science (ICS), Commerce, and Humanities, as well as BS degree scholars.
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
              <Chip icon={<ClockIcon />} label="Mon–Sat: 8:00 AM – 4:00 PM" sx={{ bgcolor: '#fff', fontWeight: 700 }} />
              <Chip icon={<LocationIcon />} label="Badami Bagh, Lahore" sx={{ bgcolor: '#fff', fontWeight: 700 }} />
              <Chip label="Free Membership for Students" sx={{ bgcolor: '#0f2942', color: '#fff', fontWeight: 700 }} />
            </Box>
          </Grid>

          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <Box
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: '#0f2942',
                color: '#fff',
                boxShadow: '0 10px 25px rgba(15, 41, 66, 0.2)'
              }}
            >
              <Typography variant="h3" sx={{ fontWeight: 800, color: '#f59e0b' }}>
                11
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Dedicated Physical Cabinets (Almaris)
              </Typography>
              <Typography variant="caption" sx={{ color: '#cbd5e1' }}>
                Arranged systematically according to Dewey Decimal Classification (DDC)
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Two columns: 8 Rules & Almari Directory */}
      <Grid container spacing={4} sx={{ mb: 5 }}>
        {/* Rules */}
        <Grid item xs={12} md={7}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
            <RuleIcon sx={{ color: '#800020' }} />
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f2942' }}>
              Official Library Rules & Borrowing Policy
            </Typography>
          </Box>

          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #cbd5e1', bgcolor: '#fff' }}>
            <List disablePadding>
              {libraryRules.map((rule, idx) => (
                <React.Fragment key={idx}>
                  <ListItem alignItems="flex-start" sx={{ px: 0, py: 1.5 }}>
                    <ListItemIcon sx={{ minWidth: 36, mt: 0.5 }}>
                      <CheckIcon sx={{ color: '#059669' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0f2942' }}>
                          {rule.title}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body2" sx={{ color: '#475569', mt: 0.5, lineHeight: 1.6 }}>
                          {rule.desc}
                        </Typography>
                      }
                    />
                  </ListItem>
                  {idx < libraryRules.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Almari / Cabinet Directory Guide */}
        <Grid item xs={12} md={5}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
            <AlmariIcon sx={{ color: '#0284c7' }} />
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f2942' }}>
              Physical Almari / Cabinet Directory
            </Typography>
          </Box>

          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #cbd5e1', bgcolor: '#fff' }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Every book in the college is stored in a numbered cabinet. Find your subject below:
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {ALMARI_LIST.map((almari, i) => (
                <Box
                  key={i}
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#0f2942' }}>
                    {almari}
                  </Typography>
                  <Chip
                    label={`Hall Wing ${i < 6 ? 'North' : 'South'}`}
                    size="small"
                    sx={{ fontSize: '0.65rem', height: 20 }}
                  />
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Frequently Asked Questions */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f2942', mb: 2 }}>
          Frequently Asked Questions (FAQ)
        </Typography>

        <Accordion defaultExpanded sx={{ borderRadius: '12px !important', mb: 1, border: '1px solid #e2e8f0', '&:before': { display: 'none' } }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f2942' }}>
              How do I get my College Library Card?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
              Library cards are issued free of charge to all enrolled 1st Year, 2nd Year, and BS students upon showing their college admission fee challan and one passport-size photograph at the Librarian Circulation Desk.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ borderRadius: '12px !important', mb: 1, border: '1px solid #e2e8f0', '&:before': { display: 'none' } }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f2942' }}>
              What happens if my book is overdue?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
              A standard fine of Rs. 5 per day accumulates on each overdue book. You can view your current pending fine on the "My Borrowed Books" page by entering your Roll Number. Fines can be paid directly to Librarian Rashid Mahmood.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ borderRadius: '12px !important', mb: 1, border: '1px solid #e2e8f0', '&:before': { display: 'none' } }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f2942' }}>
              Can I read Reference books at home?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
              No. Encyclopedias, rare historical manuscripts, and dictionaries in Almari #10 are non-issuable. They must be read exclusively in the 60-seat air-conditioned reading room.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
};
