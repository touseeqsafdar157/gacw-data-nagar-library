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
  MenuItem,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ToggleButtonGroup,
  ToggleButton,
  Pagination,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Search as SearchIcon,
  ViewModule as GridViewIcon,
  ViewList as ListViewIcon,
  MeetingRoom as AlmariIcon,
  TableRows as ShelfIcon,
  FilterList as FilterIcon,
  QrCode as QrIcon,
  CheckCircle as AvailableIcon,
  Cancel as IssuedIcon,
  Clear as ClearIcon
} from '@mui/icons-material';
import { Book, UserRole, Almari } from '../../types/library';
import { ALMARI_LIST, CATEGORIES_LIST } from '../../data/mockData';

interface BookCatalogProps {
  books: Book[];
  almaris?: Almari[];
  currentRole: UserRole;
  onSelectBook: (book: Book) => void;
  onOpenBarcode: (book: Book) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const BookCatalog: React.FC<BookCatalogProps> = ({
  books,
  almaris = [],
  currentRole,
  onSelectBook,
  onOpenBarcode,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory
}) => {

  const [selectedAlmari, setSelectedAlmari] = useState<string>('All');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  // Filter books
  const filteredBooks = books.filter((book) => {
    // Search query matches title, author, isbn, accessionNo, almariNo, shelfNo, category
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q) ||
      book.accessionNo.toLowerCase().includes(q) ||
      book.isbn.toLowerCase().includes(q) ||
      book.almariNo.toLowerCase().includes(q) ||
      book.shelfNo.toLowerCase().includes(q) ||
      book.category.toLowerCase().includes(q) ||
      book.callNumber.toLowerCase().includes(q);

    // Category filter
    const matchesCategory =
      selectedCategory === 'All Categories' ||
      selectedCategory === 'All' ||
      book.category === selectedCategory;

    // Almari filter
    const matchesAlmari =
      selectedAlmari === 'All' || book.almariNo.includes(selectedAlmari);

    // Availability filter
    const matchesAvailability =
      selectedAvailability === 'All' ||
      (selectedAvailability === 'Available' && book.availableCopies > 0) ||
      (selectedAvailability === 'Issued' && book.availableCopies === 0) ||
      (selectedAvailability === 'Reference' && book.isReferenceOnly);

    return matchesQuery && matchesCategory && matchesAlmari && matchesAvailability;
  });

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleResetFilters = () => {
    onSearchChange('');
    onSelectCategory('All Categories');
    setSelectedAlmari('All');
    setSelectedAvailability('All');
    setCurrentPage(1);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Page Header */}
      <Box sx={{ mb: 3.5 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f2942', mb: 0.5 }}>
          College Central Library Catalog (OPAC)
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Browse, filter and find exact <strong>Almari & Shelf numbers</strong> for books in Govt Associate College Data Nagar Lahore.
        </Typography>
      </Box>

      {/* Filter Control Bar */}
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          mb: 4,
          borderRadius: 3,
          border: '1px solid #cbd5e1',
          bgcolor: '#ffffff'
        }}
      >
        <Grid container spacing={2} alignItems="center">
          {/* Main Search Input */}
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search title, author, Almari, ISBN..."
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                setCurrentPage(1);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: searchQuery && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => onSearchChange('')}>
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          {/* Almari / Cabinet Selector */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              select
              fullWidth
              size="small"
              label="Filter by Almari / Cabinet"
              value={selectedAlmari}
              onChange={(e) => {
                setSelectedAlmari(e.target.value);
                setCurrentPage(1);
              }}
            >
              <MenuItem value="All">All Almaris & Cabinets</MenuItem>
              {(almaris.length > 0 ? almaris.map(a => `${a.almariCode} (${a.name})`) : ALMARI_LIST).map((almari) => (
                <MenuItem key={almari} value={almari.split(' ')[0]}>
                  {almari}
                </MenuItem>
              ))}
            </TextField>

          </Grid>

          {/* Category Selector */}
          <Grid item xs={12} sm={6} md={2.5}>
            <TextField
              select
              fullWidth
              size="small"
              label="Subject / Category"
              value={selectedCategory}
              onChange={(e) => {
                onSelectCategory(e.target.value);
                setCurrentPage(1);
              }}
            >
              {CATEGORIES_LIST.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Availability Status */}
          <Grid item xs={12} sm={6} md={1.5}>
            <TextField
              select
              fullWidth
              size="small"
              label="Status"
              value={selectedAvailability}
              onChange={(e) => {
                setSelectedAvailability(e.target.value);
                setCurrentPage(1);
              }}
            >
              <MenuItem value="All">All Status</MenuItem>
              <MenuItem value="Available">Available Only</MenuItem>
              <MenuItem value="Issued">Issued</MenuItem>
              <MenuItem value="Reference">Reference Only</MenuItem>
            </TextField>
          </Grid>

          {/* Reset button */}
          <Grid item xs={12} sm={6} md={1} sx={{ textAlign: 'right' }}>
            <Button
              variant="text"
              size="small"
              onClick={handleResetFilters}
              sx={{ color: '#64748b', textDecoration: 'underline' }}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Results Header: Count and View Switcher */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#334155' }}>
          Showing <strong>{filteredBooks.length}</strong> books matching criteria
        </Typography>

        <ToggleButtonGroup
          size="small"
          value={viewMode}
          exclusive
          onChange={(_, next) => next && setViewMode(next)}
          sx={{ bgcolor: '#fff' }}
        >
          <ToggleButton value="grid">
            <GridViewIcon fontSize="small" sx={{ mr: 0.5 }} /> Grid
          </ToggleButton>
          <ToggleButton value="table">
            <ListViewIcon fontSize="small" sx={{ mr: 0.5 }} /> Table
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <Grid container spacing={3}>
          {paginatedBooks.map((book) => {
            const isAvail = book.availableCopies > 0;
            return (
              <Grid item xs={12} sm={6} md={3} key={book.id}>
                <Card
                  onClick={() => onSelectBook(book)}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    borderRadius: 3,
                    border: '1px solid #cbd5e1',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 28px rgba(15, 41, 66, 0.12)',
                      borderColor: '#0f2942'
                    }
                  }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="190"
                      image={book.coverUrl}
                      alt={book.title}
                      sx={{ objectFit: 'cover' }}
                    />
                    <Chip
                      label={book.accessionNo}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        bgcolor: 'rgba(15, 41, 66, 0.9)',
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: '0.7rem'
                      }}
                    />
                    <Chip
                      label={book.isReferenceOnly ? 'Reference' : isAvail ? 'Available' : 'Issued'}
                      size="small"
                      color={book.isReferenceOnly ? 'secondary' : isAvail ? 'success' : 'error'}
                      sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        fontWeight: 800,
                        fontSize: '0.7rem'
                      }}
                    />
                  </Box>

                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
                    <Chip
                      label={book.category}
                      size="small"
                      sx={{ bgcolor: '#f1f5f9', fontWeight: 600, width: 'fit-content', mb: 1, fontSize: '0.72rem' }}
                    />

                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 700,
                        lineHeight: 1.25,
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

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {book.author}
                    </Typography>

                    {/* Highly Requested Physical Almari Location Box */}
                    <Paper
                      elevation={0}
                      sx={{
                        mt: 'auto',
                        p: 1.2,
                        bgcolor: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: 2
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AlmariIcon sx={{ fontSize: 18, color: '#0284c7' }} />
                        <Typography variant="caption" sx={{ fontWeight: 800, color: '#0f2942', display: 'block' }}>
                          {book.almariNo}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                        <ShelfIcon sx={{ fontSize: 16, color: '#64748b' }} />
                        <Typography variant="caption" sx={{ color: '#475569', fontWeight: 600 }}>
                          {book.shelfNo}
                        </Typography>
                      </Box>
                    </Paper>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1.5 }}>
                      <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                        Copies: {book.availableCopies}/{book.totalCopies}
                      </Typography>
                      <Tooltip title="View Barcode Label">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenBarcode(book);
                          }}
                        >
                          <QrIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #cbd5e1', borderRadius: 3 }}>
          <Table>
            <TableHead sx={{ bgcolor: '#f1f5f9' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 800 }}>Accession No</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Book Title & Author</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Subject</TableCell>
                <TableCell sx={{ fontWeight: 800, bgcolor: '#e0f2fe' }}>Physical Almari Location</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Shelf / Rack</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Copies</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 800, textAlign: 'center' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedBooks.map((book) => (
                <TableRow
                  key={book.id}
                  hover
                  onClick={() => onSelectBook(book)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell sx={{ fontWeight: 700, fontFamily: 'monospace' }}>{book.accessionNo}</TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#0f2942' }}>
                      {book.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {book.author}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip label={book.category} size="small" sx={{ fontWeight: 600, fontSize: '0.72rem' }} />
                  </TableCell>
                  <TableCell sx={{ bgcolor: '#f0f9ff' }}>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: '#0369a1' }}>
                      {book.almariNo}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#475569' }}>{book.shelfNo}</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>
                    {book.availableCopies} / {book.totalCopies}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={book.isReferenceOnly ? 'Reference' : book.availableCopies > 0 ? 'Available' : 'Issued'}
                      size="small"
                      color={book.isReferenceOnly ? 'secondary' : book.availableCopies > 0 ? 'success' : 'error'}
                      sx={{ fontWeight: 700 }}
                    />
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectBook(book);
                      }}
                      sx={{ fontSize: '0.75rem' }}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, page) => setCurrentPage(page)}
            color="primary"
            shape="rounded"
          />
        </Box>
      )}
    </Container>
  );
};
