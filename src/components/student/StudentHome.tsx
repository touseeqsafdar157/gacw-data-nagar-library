import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Paper,
  Stack,
  Alert,
  IconButton
} from '@mui/material';
import {
  Search as SearchIcon,
  AutoStories as BookIcon,
  Chair as ChairIcon,
  People as PeopleIcon,
  CloudDownload as DownloadIcon,
  MenuBook as ReadingIcon,
  MeetingRoom as AlmariIcon,
  ArrowForward as ArrowForwardIcon,
  Campaign as AnnouncementIcon,
  Verified as VerifiedIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';
import { Book, ReadingRoomSeat, LibraryAnnouncement } from '../../types/library';

interface StudentHomeProps {
  books: Book[];
  announcements: LibraryAnnouncement[];
  availableSeatsCount: number;
  onSelectBook: (book: Book) => void;
  onNavigateTab: (tabIndex: number) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const StudentHome: React.FC<StudentHomeProps> = ({
  books,
  announcements,
  availableSeatsCount,
  onSelectBook,
  onNavigateTab,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory
}) => {
  const categories = [
    'All',
    'Computer Science',
    'Urdu Literature',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Islamiat',
    'Commerce',
    'Competitive Exams'
  ];

  const featuredBooks = books.slice(0, 4);
  const newArrivals = books.filter((b) => b.condition === 'Brand New' || b.year >= 2023).slice(0, 4);

  return (
    <Box>
      {/* Hero Banner with Academic Styling */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #081726 0%, #0f2942 50%, #1e3a8a 100%)',
          color: '#fff',
          py: { xs: 5, md: 7 },
          px: 2,
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '4px solid #f59e0b'
        }}
      >
        {/* Subtle decorative background pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: -40,
            right: -40,
            width: 320,
            height: 320,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, rgba(255,255,255,0) 70%)',
            pointerEvents: 'none'
          }}
        />

        <Container maxWidth="xl">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Chip
                icon={<VerifiedIcon sx={{ color: '#f59e0b !important', fontSize: 18 }} />}
                label="Govt Associate College Data Nagar Lahore — Central Library"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.1)',
                  color: '#e2e8f0',
                  border: '1px solid rgba(245,158,11,0.4)',
                  fontWeight: 700,
                  mb: 2,
                  fontSize: '0.8rem'
                }}
              />
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  lineHeight: 1.15,
                  mb: 2,
                  fontSize: { xs: '1.8rem', sm: '2.4rem', md: '2.9rem' }
                }}
              >
                Discover Books, Almaris, and <br />
                <Box component="span" sx={{ color: '#f59e0b' }}>Academic Collections</Box>
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: '#cbd5e1', mb: 3.5, maxWidth: 620, fontSize: { xs: '0.95rem', md: '1.05rem' } }}
              >
                Access over 12,500 cataloged books, reference cabinets, and real-time reading hall seats for Intermediate (ICS, FSc, FA, I.Com) and Degree students.
              </Typography>


              {/* Central Search Box */}
              <Paper
                elevation={6}
                sx={{
                  p: 0.8,
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: 3,
                  bgcolor: '#ffffff',
                  maxWidth: 620,
                  boxShadow: '0 12px 36px rgba(0,0,0,0.35)'
                }}
              >
                <TextField
                  fullWidth
                  placeholder="Search by book title, author, or Almari (e.g. Almari 4, Python, Iqbal)..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                    startAdornment: (
                      <InputAdornment position="start" sx={{ pl: 1.5, color: '#0f2942' }}>
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    sx: { fontSize: '0.95rem' }
                  }}
                />
                <Button
                  variant="contained"
                  onClick={() => onNavigateTab(1)}
                  sx={{
                    bgcolor: '#800020',
                    px: 3,
                    py: 1.2,
                    fontWeight: 700,
                    borderRadius: 2.5,
                    flexShrink: 0
                  }}
                >
                  Search Catalog
                </Button>
              </Paper>
            </Grid>

            {/* Quick Stats Grid */}
            <Grid item xs={12} md={5}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Card
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.08)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      color: '#fff',
                      p: 2.5,
                      textAlign: 'center',
                      borderRadius: 3
                    }}
                  >
                    <BookIcon sx={{ color: '#f59e0b', fontSize: 36, mb: 0.5 }} />
                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#fff' }}>
                      12,540
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#cbd5e1', fontWeight: 600 }}>
                      Total Cataloged Books
                    </Typography>
                  </Card>
                </Grid>

                <Grid item xs={6}>
                  <Card
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.08)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      color: '#fff',
                      p: 2.5,
                      textAlign: 'center',
                      borderRadius: 3
                    }}
                  >
                    <AlmariIcon sx={{ color: '#38bdf8', fontSize: 36, mb: 0.5 }} />
                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#fff' }}>
                      8,320
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#cbd5e1', fontWeight: 600 }}>
                      Available on Shelves
                    </Typography>
                  </Card>
                </Grid>

                <Grid item xs={6}>
                  <Card
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.08)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      color: '#fff',
                      p: 2.5,
                      textAlign: 'center',
                      borderRadius: 3
                    }}
                  >
                    <ChairIcon sx={{ color: '#34d399', fontSize: 36, mb: 0.5 }} />
                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#34d399' }}>
                      {availableSeatsCount} / 60
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#cbd5e1', fontWeight: 600 }}>
                      Reading Hall Seats Free
                    </Typography>
                  </Card>
                </Grid>

                <Grid item xs={6}>
                  <Card
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.08)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      color: '#fff',
                      p: 2.5,
                      textAlign: 'center',
                      borderRadius: 3
                    }}
                  >
                    <PeopleIcon sx={{ color: '#f472b6', fontSize: 36, mb: 0.5 }} />
                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#fff' }}>
                      3,200+
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#cbd5e1', fontWeight: 600 }}>
                      Registered Members
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* College Notice / Urgent Announcements Ticker */}
      {announcements.length > 0 && (
        <Box sx={{ bgcolor: '#fffbeb', borderBottom: '1px solid #fef3c7', py: 1.5, px: 2 }}>
          <Container maxWidth="xl">
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems={{ sm: 'center' }}>
              <Chip
                icon={<AnnouncementIcon />}
                label="College Notice"
                size="small"
                color="warning"
                sx={{ fontWeight: 800, flexShrink: 0 }}
              />
              <Typography variant="body2" sx={{ color: '#92400e', fontWeight: 600 }}>
                <strong>{announcements[0].title}:</strong> {announcements[0].content}
              </Typography>
            </Stack>
          </Container>
        </Box>
      )}

      {/* Quick Action Cards Bar */}
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              onClick={() => onNavigateTab(2)}
              sx={{
                p: 2.5,
                borderRadius: 3,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                border: '1px solid #e2e8f0',
                transition: 'all 0.2s ease',
                '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', borderColor: '#0f2942' }
              }}
            >
              <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: '#eff6ff', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ReadingIcon />
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0f2942' }}>Issued Books & Dues</Typography>
                <Typography variant="caption" color="text.secondary">Enter Roll No or Faculty ID</Typography>
              </Box>

            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Paper
              onClick={() => onNavigateTab(3)}
              sx={{
                p: 2.5,
                borderRadius: 3,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                border: '1px solid #e2e8f0',
                transition: 'all 0.2s ease',
                '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', borderColor: '#059669' }
              }}
            >
              <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ChairIcon />
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0f2942' }}>Reading Room Seats</Typography>
                <Typography variant="caption" color="text.secondary">Book a desk in the 60-seat hall</Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Paper
              onClick={() => onNavigateTab(1)}
              sx={{
                p: 2.5,
                borderRadius: 3,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                border: '1px solid #e2e8f0',
                transition: 'all 0.2s ease',
                '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', borderColor: '#800020' }
              }}
            >
              <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: '#fdf2f2', color: '#800020', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <SearchIcon />
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0f2942' }}>Book Catalog (OPAC)</Typography>
                <Typography variant="caption" color="text.secondary">Search by Almari & Shelf</Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Paper
              onClick={() => onNavigateTab(4)}
              sx={{
                p: 2.5,
                borderRadius: 3,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                border: '1px solid #e2e8f0',
                transition: 'all 0.2s ease',
                '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', borderColor: '#d97706' }
              }}
            >
              <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: '#fffbeb', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AlmariIcon />
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0f2942' }}>Library Rules & Timing</Typography>
                <Typography variant="caption" color="text.secondary">14-day quota, fines & policies</Typography>
              </Box>
            </Paper>
          </Grid>

        </Grid>

        {/* Category Pills Bar */}
        <Box sx={{ mt: 5, mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f2942', mb: 1.5 }}>
            Browse Library Collections by Subject
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {categories.map((cat) => {
              const isSelected = selectedCategory === (cat === 'All' ? 'All Categories' : cat);
              return (
                <Chip
                  key={cat}
                  label={cat}
                  clickable
                  onClick={() => {
                    onSelectCategory(cat === 'All' ? 'All Categories' : cat);
                    onNavigateTab(1); // Jump to Catalog
                  }}
                  color={isSelected ? 'primary' : 'default'}
                  sx={{
                    fontWeight: 700,
                    px: 1.5,
                    py: 2.2,
                    fontSize: '0.85rem',
                    bgcolor: isSelected ? '#0f2942' : '#ffffff',
                    border: '1px solid #cbd5e1',
                    '&:hover': { bgcolor: isSelected ? '#1e456d' : '#f1f5f9' }
                  }}
                />
              );
            })}
          </Box>
        </Box>

        {/* Featured Popular Books Section */}
        <Box sx={{ mt: 5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 3 }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f2942' }}>
                Popular Academic Titles
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Most requested textbooks and reference works across ICS, FSc, and Arts
              </Typography>
            </Box>
            <Button
              endIcon={<ArrowForwardIcon />}
              onClick={() => onNavigateTab(1)}
              sx={{ fontWeight: 700, color: '#800020' }}
            >
              View Full Catalog
            </Button>
          </Box>

          <Grid container spacing={3}>
            {featuredBooks.map((book) => (
              <Grid item xs={12} sm={6} md={3} key={book.id}>
                <Card
                  onClick={() => onSelectBook(book)}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    borderRadius: 3,
                    transition: 'all 0.25s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 30px rgba(0,0,0,0.12)'
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={book.coverUrl}
                    alt={book.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Chip
                        label={book.category}
                        size="small"
                        sx={{ bgcolor: '#f1f5f9', fontWeight: 700, fontSize: '0.7rem' }}
                      />
                      <Chip
                        label={book.availableCopies > 0 ? `${book.availableCopies} Available` : 'Issued'}
                        size="small"
                        color={book.availableCopies > 0 ? 'success' : 'error'}
                        sx={{ fontWeight: 700, height: 20, fontSize: '0.68rem' }}
                      />
                    </Box>

                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 700,
                        lineHeight: 1.3,
                        mb: 0.5,
                        color: '#0f2942',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}
                    >
                      {book.title}
                    </Typography>

                    <Typography variant="caption" color="text.secondary" sx={{ mb: 1.5, display: 'block' }}>
                      {book.author}
                    </Typography>

                    {/* Prominent Almari location tag */}
                    <Box
                      sx={{
                        mt: 'auto',
                        p: 1,
                        bgcolor: '#f8fafc',
                        borderRadius: 2,
                        border: '1px dashed #cbd5e1',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}
                    >
                      <LocationIcon sx={{ fontSize: 16, color: '#800020' }} />
                      <Box>
                        <Typography variant="caption" sx={{ fontWeight: 800, color: '#0f2942', display: 'block', lineHeight: 1.1 }}>
                          {book.almariNo.split('(')[0]}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.7rem' }}>
                          {book.shelfNo}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* New Arrivals Section */}
        <Box sx={{ mt: 6, mb: 6 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 3 }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f2942' }}>
                New Stock & Curriculum Additions
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Recently added 2024–2025 books in college cabinets
              </Typography>
            </Box>
            <Button
              endIcon={<ArrowForwardIcon />}
              onClick={() => onNavigateTab(1)}
              sx={{ fontWeight: 700, color: '#800020' }}
            >
              Browse All
            </Button>
          </Box>

          <Grid container spacing={3}>
            {newArrivals.map((book) => (
              <Grid item xs={12} sm={6} md={3} key={`new-${book.id}`}>
                <Card
                  onClick={() => onSelectBook(book)}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    borderRadius: 3,
                    transition: 'all 0.25s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 30px rgba(0,0,0,0.12)'
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={book.coverUrl}
                    alt={book.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Chip
                        label="New Arrival"
                        size="small"
                        sx={{ bgcolor: '#fef3c7', color: '#b45309', fontWeight: 800, fontSize: '0.7rem' }}
                      />
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b' }}>
                        Acc: {book.accessionNo}
                      </Typography>
                    </Box>

                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 700,
                        lineHeight: 1.3,
                        mb: 0.5,
                        color: '#0f2942',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}
                    >
                      {book.title}
                    </Typography>

                    <Typography variant="caption" color="text.secondary" sx={{ mb: 1.5, display: 'block' }}>
                      {book.author}
                    </Typography>

                    <Box
                      sx={{
                        mt: 'auto',
                        p: 1,
                        bgcolor: '#eff6ff',
                        borderRadius: 2,
                        border: '1px solid #bfdbfe',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}
                    >
                      <AlmariIcon sx={{ fontSize: 18, color: '#0284c7' }} />
                      <Box>
                        <Typography variant="caption" sx={{ fontWeight: 800, color: '#0369a1', display: 'block', lineHeight: 1.1 }}>
                          {book.almariNo}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#0284c7', fontSize: '0.7rem' }}>
                          {book.shelfNo}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};
