import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  TextField,
  InputAdornment,
  MenuItem,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert
} from '@mui/material';
import {
  CloudDownload as DownloadIcon,
  Search as SearchIcon,
  PictureAsPdf as PdfIcon,
  School as BoardIcon,
  MenuBook as EBookIcon,
  Description as NotesIcon,
  Visibility as ViewIcon
} from '@mui/icons-material';
import { DigitalResource } from '../../types/library';

interface DigitalLibraryProps {
  resources: DigitalResource[];
}

export const DigitalLibrary: React.FC<DigitalLibraryProps> = ({ resources }) => {
  const [search, setSearch] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedClass, setSelectedClass] = useState<string>('All');
  const [previewItem, setPreviewItem] = useState<DigitalResource | null>(null);

  const filteredResources = resources.filter((res) => {
    const matchesSearch =
      !search ||
      res.title.toLowerCase().includes(search.toLowerCase()) ||
      res.subject.toLowerCase().includes(search.toLowerCase()) ||
      res.boardOrUniversity.toLowerCase().includes(search.toLowerCase());

    const matchesType = selectedType === 'All' || res.type === selectedType;
    const matchesClass = selectedClass === 'All' || res.classGrade.includes(selectedClass);

    return matchesSearch && matchesType && matchesClass;
  });

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 3.5 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f2942', mb: 0.5 }}>
          Digital Library & BISE Lahore Archives
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Download past 5-year board papers, faculty lecture notes, solved MCQs, and syllabus guidelines in PDF.
        </Typography>
      </Box>

      {/* Filter Bar */}
      <Paper elevation={0} sx={{ p: 2.5, mb: 4, borderRadius: 3, border: '1px solid #cbd5e1', bgcolor: '#fff' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={5}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search past papers, subjects, syllabus..."
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
          <Grid item xs={12} sm={6} md={3.5}>
            <TextField
              select
              fullWidth
              size="small"
              label="Resource Type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <MenuItem value="All">All Resource Types</MenuItem>
              <MenuItem value="Past Paper">BISE Past Papers</MenuItem>
              <MenuItem value="Lecture Notes">College Lecture Notes</MenuItem>
              <MenuItem value="E-Book">E-Books & Textbooks</MenuItem>
              <MenuItem value="Syllabus">Syllabus & Schemes</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={3.5}>
            <TextField
              select
              fullWidth
              size="small"
              label="Filter by Class"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <MenuItem value="All">All Intermediate & BS Classes</MenuItem>
              <MenuItem value="1st Year">1st Year (ICS, FSc, FA, I.Com)</MenuItem>
              <MenuItem value="2nd Year">2nd Year (ICS, FSc, FA, I.Com)</MenuItem>
              <MenuItem value="BS">BS Degree Programs</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      {/* Resource Cards Grid */}
      <Grid container spacing={3}>
        {filteredResources.map((res) => (
          <Grid item xs={12} sm={6} md={4} key={res.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                border: '1px solid #e2e8f0',
                transition: 'all 0.2s ease',
                '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }
              }}
            >
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                  <Chip
                    icon={<PdfIcon sx={{ color: '#dc2626 !important' }} />}
                    label={res.type}
                    size="small"
                    sx={{ bgcolor: '#fee2e2', color: '#991b1b', fontWeight: 700 }}
                  />
                  <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                    {res.fileSizeMb} MB • {res.pages} Pages
                  </Typography>
                </Box>

                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0f2942', mb: 1, lineHeight: 1.3 }}>
                  {res.title}
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  <Chip label={res.subject} size="small" sx={{ bgcolor: '#f1f5f9' }} />
                  <Chip label={res.classGrade} size="small" variant="outlined" />
                  <Chip label={res.boardOrUniversity} size="small" sx={{ bgcolor: '#fef3c7', color: '#92400e' }} />
                </Box>

                <Box sx={{ mt: 'auto', display: 'flex', gap: 1 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    size="small"
                    startIcon={<ViewIcon />}
                    onClick={() => setPreviewItem(res)}
                  >
                    Preview
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    size="small"
                    startIcon={<DownloadIcon />}
                    onClick={() => alert(`Downloading: ${res.title} (${res.fileSizeMb} MB PDF)...`)}
                    sx={{ bgcolor: '#0f2942' }}
                  >
                    PDF
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* PDF Preview Dialog */}
      <Dialog open={Boolean(previewItem)} onClose={() => setPreviewItem(null)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: '#0f2942', color: '#fff', fontWeight: 700 }}>
          Digital Document Preview
        </DialogTitle>
        <DialogContent sx={{ p: 3, pt: 3 }}>
          {previewItem && (
            <Box sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: 3,
                  bgcolor: '#fee2e2',
                  color: '#dc2626',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2
                }}
              >
                <PdfIcon sx={{ fontSize: 44 }} />
              </Box>

              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f2942', mb: 1 }}>
                {previewItem.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Published by {previewItem.boardOrUniversity} • Academic Year {previewItem.year}
              </Typography>

              <Alert severity="success" sx={{ textAlign: 'left', mb: 2, borderRadius: 2 }}>
                Verified academic resource available for free download by Govt Associate College Data Nagar Lahore library patrons.
              </Alert>

              <Typography variant="caption" color="text.secondary">
                Total Pages: {previewItem.pages} | Format: Adobe Acrobat Portable Document Format (PDF)
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2.5, bgcolor: '#f8fafc' }}>
          <Button onClick={() => setPreviewItem(null)} variant="outlined">
            Close
          </Button>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={() => {
              alert(`Download started for ${previewItem?.title}`);
              setPreviewItem(null);
            }}
            sx={{ bgcolor: '#800020' }}
          >
            Download Official PDF
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
