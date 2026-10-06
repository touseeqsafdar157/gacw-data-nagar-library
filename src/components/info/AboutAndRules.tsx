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
  ListItemText,
  Avatar
} from '@mui/material';
import {
  Gavel as RuleIcon,
  ExpandMore as ExpandMoreIcon,
  School as CollegeIcon,
  CheckCircleOutline as CheckIcon,
  Schedule as ClockIcon,
  MeetingRoom as AlmariIcon,
  LocationOn as LocationIcon,
  Badge as BadgeIcon,
  Phone as PhoneIcon,
  Email as EmailIcon
} from '@mui/icons-material';
import { Almari } from '../../types/library';
import { LibrarySettings } from '../../services/settingsService';

interface AboutAndRulesProps {
  settings?: LibrarySettings;
  almaris?: Almari[];
}

export const AboutAndRules: React.FC<AboutAndRulesProps> = ({ settings, almaris = [] }) => {
  const staff = settings?.staffMembers || [
    {
      name: 'Mr. Rashid Mahmood',
      designation: 'Chief College Librarian (BS-17)',
      shift: 'Morning (8:00 AM – 3:30 PM)',
      desk: 'Circulation & Acquisition Desk',
      phone: '0300-8484123',
      email: 'rashid.librarian@gacdn.edu.pk'
    },
    {
      name: 'Mr. Muhammad Imran',
      designation: 'Assistant Librarian (Cataloging & IT)',
      shift: 'Morning (8:30 AM – 4:00 PM)',
      desk: 'E-Library & Classification',
      phone: '0321-7788990',
      email: 'imran.library@gacdn.edu.pk'
    },
    {
      name: 'Mr. Asif Ali',
      designation: 'Library Attendant / Book Binder',
      shift: 'Morning (8:00 AM – 3:30 PM)',
      desk: 'Almari Shelf Maintenance & Reading Room Discipline',
      phone: '0313-4455667',
      email: 'asif.library@gacdn.edu.pk'
    }
  ];

  const rules = settings?.libraryRules || [
    {
      title: '1. Strict Silence & Decorum',
      desc: 'Complete silence must be observed inside the library reading hall. Discussions, group chatter, and loud activities are strictly restricted to the outdoor corridor.'
    },
    {
      title: '2. Library Card Mandatory',
      desc: 'No book shall be issued without a valid College Library Card. Borrowing on another student’s card or roll number is strictly forbidden and subject to card confiscation.'
    },
    {
      title: `3. Student Borrowing Quota (${settings?.maxBooksStudent || 2} Books)`,
      desc: `Regular enrolled students (ICS, FSc, FA, I.Com, BS) are entitled to borrow a maximum of ${settings?.maxBooksStudent || 2} books simultaneously. Teaching faculty may borrow up to ${settings?.maxBooksTeacher || 5} books.`
    },
    {
      title: `4. ${settings?.maxBorrowDaysStudent || 14}-Day Issuance & Reading Period`,
      desc: `Books are issued for ${settings?.maxBorrowDaysStudent || 14} calendar days. A book may be renewed once for an additional 7 days provided no other student has placed a reservation on it.`
    },
    {
      title: `5. Overdue Fine Rate (Rs. ${settings?.finePerDay || 5} / Day)`,
      desc: `A fine of Rs. ${settings?.finePerDay || 5} per day per book is levied after the due date. Examination roll number slips and clearance certificates will not be issued until all library dues are settled.`
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

  const faqs = settings?.faqs || [
    {
      question: 'How do I get my College Library Card?',
      answer: 'Library cards are issued free of charge to all enrolled 1st Year, 2nd Year, and BS students upon showing their college admission fee challan and one passport-size photograph at the Librarian Circulation Desk.'
    },
    {
      question: 'What happens if my book is overdue?',
      answer: `A standard fine of Rs. ${settings?.finePerDay || 5} per day accumulates on each overdue book. You can view your current pending fine on the "My Borrowed Books" page by entering your Roll Number. Fines can be paid directly to the circulation desk.`
    },
    {
      question: 'Can I read Reference books at home?',
      answer: 'No. Encyclopedias, rare historical manuscripts, and dictionaries in Almari #10 are non-issuable. They must be read exclusively in the 60-seat air-conditioned reading room.'
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
          {settings?.collegeName || 'Govt Associate College Data Nagar Lahore'} — Serving students, scholars, and faculty with academic distinction.
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
              The Central Library of {settings?.collegeName || 'Govt Associate College Data Nagar Lahore'} is the intellectual hub of the institution. Housing an extensive catalog of textbooks, reference works, classical literature, and Punjab Board archives, the library caters to intermediate cohorts in Pre-Medical, Pre-Engineering, Computer Science (ICS), Commerce, and Humanities, as well as BS degree scholars.
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
              <Chip icon={<ClockIcon />} label={settings?.timings || 'Mon–Sat: 8:00 AM – 4:00 PM'} sx={{ bgcolor: '#fff', fontWeight: 700 }} />
              <Chip icon={<LocationIcon />} label={settings?.location || 'Data Nagar, Lahore'} sx={{ bgcolor: '#fff', fontWeight: 700 }} />
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
                {almaris.length || 11}
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

      {/* Library Staff Directory */}
      <Box sx={{ mb: 5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
          <BadgeIcon sx={{ color: '#0284c7', fontSize: 28 }} />
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f2942' }}>
            Library Officers & Staff Directory
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {staff.map((member, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: '1px solid #cbd5e1',
                  bgcolor: '#fff',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.2s',
                  '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: i === 0 ? '#800020' : i === 1 ? '#0f2942' : '#0284c7',
                      width: 52,
                      height: 52,
                      fontWeight: 800,
                      fontSize: '1.2rem'
                    }}
                  >
                    {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0f2942', lineHeight: 1.2 }}>
                      {member.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#0284c7', fontWeight: 700 }}>
                      {member.designation}
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 1.5 }} />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flexGrow: 1 }}>
                  <Typography variant="body2" sx={{ color: '#475569' }}>
                    <strong>Duty Shift:</strong> {member.shift}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#475569' }}>
                    <strong>Assigned Desk:</strong> {member.desk}
                  </Typography>
                  {member.phone && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                      <PhoneIcon sx={{ fontSize: 16, color: '#059669' }} />
                      <Typography variant="caption" sx={{ color: '#334155', fontWeight: 600 }}>
                        {member.phone}
                      </Typography>
                    </Box>
                  )}
                  {member.email && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EmailIcon sx={{ fontSize: 16, color: '#0284c7' }} />
                      <Typography variant="caption" sx={{ color: '#334155', fontWeight: 600 }}>
                        {member.email}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Two columns: Rules & Almari Directory */}
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
              {rules.map((rule, idx) => (
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
                  {idx < rules.length - 1 && <Divider />}
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

          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #cbd5e1', bgcolor: '#fff', maxHeight: 520, overflowY: 'auto' }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Every book in the college is stored in a numbered cabinet. Find your subject below:
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {almaris.map((almari, i) => (
                <Box
                  key={almari.id || i}
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
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#0f2942' }}>
                      {almari.almariCode} ({almari.name})
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748b' }}>
                      {almari.locationDesc}
                    </Typography>
                  </Box>
                  <Chip
                    label={almari.department}
                    size="small"
                    sx={{ fontSize: '0.65rem', height: 20, bgcolor: '#e2e8f0', fontWeight: 600 }}
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

        {faqs.map((faq, i) => (
          <Accordion
            key={i}
            defaultExpanded={i === 0}
            sx={{ borderRadius: '12px !important', mb: 1, border: '1px solid #e2e8f0', '&:before': { display: 'none' } }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f2942' }}>
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
};
