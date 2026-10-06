import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Chip,
  IconButton,
  Tooltip,
  FormControlLabel,
  Switch,
  InputAdornment
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  QrCode as QrIcon,
  MeetingRoom as AlmariIcon,
  TableRows as ShelfIcon,
  Visibility as ViewIcon
} from '@mui/icons-material';
import { Book, Almari } from '../../types/library';
import { ALMARI_LIST, CATEGORIES_LIST } from '../../data/mockData';


interface ManageBooksProps {
  books: Book[];
  almaris?: Almari[];
  onAddBook: (newBook: Book) => void;
  onUpdateBook: (updatedBook: Book) => void;
  onDeleteBook: (bookId: string) => void;
  onSelectBook: (book: Book) => void;
  onOpenBarcode: (book: Book) => void;
  onQuickAddAlmari?: (almari: Almari) => void;
}

export const ManageBooks: React.FC<ManageBooksProps> = ({
  books,
  almaris = [],
  onAddBook,
  onUpdateBook,
  onDeleteBook,
  onSelectBook,
  onOpenBarcode,
  onQuickAddAlmari
}) => {
  const [search, setSearch] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  // Quick Add Almari sub-dialog
  const [quickAlmariOpen, setQuickAlmariOpen] = useState<boolean>(false);
  const [newAlmCode, setNewAlmCode] = useState<string>('');
  const [newAlmName, setNewAlmName] = useState<string>('');
  const [newAlmDept, setNewAlmDept] = useState<string>('');


  // Form State for Add / Edit
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [accessionNo, setAccessionNo] = useState<string>('');
  const [isbn, setIsbn] = useState<string>('');
  const [category, setCategory] = useState<string>('Computer Science');
  const [almariNo, setAlmariNo] = useState<string>(ALMARI_LIST[3]);
  const [shelfNo, setShelfNo] = useState<string>('Shelf 1 (Top Rack)');
  const [publisher, setPublisher] = useState<string>('Punjab Textbook Board');
  const [edition, setEdition] = useState<string>('2024 Revised');
  const [year, setYear] = useState<number>(2024);
  const [totalCopies, setTotalCopies] = useState<number>(5);
  const [availableCopies, setAvailableCopies] = useState<number>(5);
  const [language, setLanguage] = useState<'English' | 'Urdu' | 'Arabic' | 'Other'>('English');
  const [condition, setCondition] = useState<'Brand New' | 'Good' | 'Fair' | 'Under Repair'>('Brand New');
  const [isReferenceOnly, setIsReferenceOnly] = useState<boolean>(false);
  const [priceRs, setPriceRs] = useState<number>(850);
  const [callNumber, setCallNumber] = useState<string>('004 CS');
  const [description, setDescription] = useState<string>('');

  const almariOptions = almaris.length > 0
    ? almaris.map((a) => `${a.almariCode} (${a.name})`)
    : [
        'Almari #01 (Islamiat & Quranic Studies)',
        'Almari #02 (Urdu Adab & Iqbaliat)',
        'Almari #03 (English Literature & Novels)',
        'Almari #04 (CS & IT Cabinet)',
        'Almari #05 (Physics & Mechanics)',
        'Almari #06 (Chemistry & Organic Studies)',
        'Almari #07 (Mathematics & Calculus)',
        'Almari #08 (Commerce & Accounting)',
        'Almari #09 (CSS/PMS & Competitive Exams)',
        'Almari #10 (Reference Section - Non Issuable)',
        'Almari #11 (College Archive & Periodicals)'
      ];

  const currentAlmariObj = almaris.find(
    (a) =>
      almariNo.toLowerCase().includes(a.almariCode.toLowerCase()) ||
      almariNo.toLowerCase().includes(a.name.toLowerCase())
  );

  const availableShelves = currentAlmariObj && currentAlmariObj.shelves.length > 0
    ? currentAlmariObj.shelves
    : ['Shelf 1 (Top Rack)', 'Shelf 2 (Middle Rack)', 'Shelf 3 (Bottom Rack)'];

  const openAddDialog = () => {
    setEditingBook(null);
    setTitle('');
    setAuthor('');
    setAccessionNo(`ACC-2025-${Math.floor(1000 + Math.random() * 9000)}`);
    setIsbn('978-969412' + Math.floor(1000 + Math.random() * 9000));
    setCategory('Computer Science');
    const defaultAlmari = almariOptions[3] || almariOptions[0] || 'Almari #04 (CS & IT Cabinet)';
    setAlmariNo(defaultAlmari);
    setShelfNo('Shelf 1 (Top Rack - Inter Section)');
    setPublisher('Punjab Textbook Board Lahore');
    setEdition('2025 Edition');
    setYear(2025);
    setTotalCopies(6);
    setAvailableCopies(6);
    setLanguage('English');
    setCondition('Brand New');
    setIsReferenceOnly(false);
    setPriceRs(750);
    setCallNumber('005.13 COR');
    setDescription('Textbook added to Govt Associate College Data Nagar Lahore Central Library catalog.');
    setDialogOpen(true);
  };


  const openEditDialog = (b: Book) => {
    setEditingBook(b);
    setTitle(b.title);
    setAuthor(b.author);
    setAccessionNo(b.accessionNo);
    setIsbn(b.isbn);
    setCategory(b.category);
    setAlmariNo(b.almariNo);
    setShelfNo(b.shelfNo);
    setPublisher(b.publisher);
    setEdition(b.edition);
    setYear(b.year);
    setTotalCopies(b.totalCopies);
    setAvailableCopies(b.availableCopies);
    setLanguage(b.language);
    setCondition(b.condition);
    setIsReferenceOnly(b.isReferenceOnly);
    setPriceRs(b.priceRs);
    setCallNumber(b.callNumber);
    setDescription(b.description);
    setDialogOpen(true);
  };

  const handleSaveBook = () => {
    const bookData: Book = {
      id: editingBook ? editingBook.id : `b-${Date.now()}`,
      accessionNo,
      title,
      author,
      isbn,
      category,
      department: category,
      almariNo,
      shelfNo,
      publisher,
      edition,
      year,
      totalCopies,
      availableCopies,
      language,
      condition,
      isReferenceOnly,
      coverUrl: editingBook?.coverUrl || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop&q=60',
      description,
      priceRs,
      callNumber
    };

    if (editingBook) {
      onUpdateBook(bookData);
    } else {
      onAddBook(bookData);
    }
    setDialogOpen(false);
  };

  const filteredBooks = books.filter((b) => {
    const q = search.toLowerCase().trim();
    return (
      !q ||
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.accessionNo.toLowerCase().includes(q) ||
      b.almariNo.toLowerCase().includes(q)
    );
  });

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3.5, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f2942', mb: 0.5 }}>
            Book Inventory & Almari Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage catalog records, designate physical Almari and Shelf racks, and print barcode stickers.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openAddDialog}
          sx={{ bgcolor: '#0f2942', fontWeight: 700, px: 3, py: 1 }}
        >
          Add New Book Record
        </Button>
      </Box>

      {/* Search & Actions Bar */}
      <Paper elevation={0} sx={{ p: 2, mb: 3, borderRadius: 3, border: '1px solid #cbd5e1', bgcolor: '#fff' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={5}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search by Title, Author, Accession No, or Almari..."
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
          <Grid item xs={12} md={7} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b' }}>
              Total Titles: <strong>{books.length}</strong> | Physical Stock: <strong>{books.reduce((sum, b) => sum + b.totalCopies, 0)} Copies</strong>
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Books Table */}
      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #cbd5e1', borderRadius: 3 }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f1f5f9' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 800 }}>Accession #</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>Book Title & Author</TableCell>
              <TableCell sx={{ fontWeight: 800, bgcolor: '#f0f9ff' }}>Almari / Cabinet</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>Shelf Rack</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>Subject</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>Copies</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 800, textAlign: 'center' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBooks.map((b) => (
              <TableRow key={b.id} hover>
                <TableCell sx={{ fontFamily: 'monospace', fontWeight: 700 }}>{b.accessionNo}</TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#0f2942' }}>
                    {b.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {b.author}
                  </Typography>
                </TableCell>
                <TableCell sx={{ bgcolor: '#f8fafc' }}>
                  <Typography variant="body2" sx={{ fontWeight: 800, color: '#0369a1' }}>
                    {b.almariNo}
                  </Typography>
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>{b.shelfNo}</TableCell>
                <TableCell>
                  <Chip label={b.category} size="small" sx={{ fontWeight: 600, fontSize: '0.72rem' }} />
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }}>
                  {b.availableCopies} / {b.totalCopies}
                </TableCell>
                <TableCell>
                  <Chip
                    label={b.isReferenceOnly ? 'Reference' : b.availableCopies > 0 ? 'In Stock' : 'Out'}
                    size="small"
                    color={b.isReferenceOnly ? 'secondary' : b.availableCopies > 0 ? 'success' : 'error'}
                    sx={{ fontWeight: 700 }}
                  />
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <Tooltip title="View Record Details">
                    <IconButton size="small" onClick={() => onSelectBook(b)}>
                      <ViewIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Print Barcode Sticker">
                    <IconButton size="small" onClick={() => onOpenBarcode(b)}>
                      <QrIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit Book & Location">
                    <IconButton size="small" color="primary" onClick={() => openEditDialog(b)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Record">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => {
                        if (window.confirm(`Delete book "${b.title}" from catalog?`)) {
                          onDeleteBook(b.id);
                        }
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add / Edit Book Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: '#0f2942', color: '#fff', fontWeight: 700 }}>
          {editingBook ? 'Edit Book Record & Shelf Location' : 'Add New Book to College Catalog'}
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                label="Book Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                size="small"
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Accession No"
                value={accessionNo}
                onChange={(e) => setAccessionNo(e.target.value)}
                size="small"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Author / Writer"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                size="small"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="ISBN Number"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                size="small"
              />
            </Grid>

            {/* Almari & Shelf Inputs - Strongly Emphasized */}
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <TextField
                  select
                  fullWidth
                  label="Almari / Cabinet Location"
                  value={almariNo}
                  onChange={(e) => {
                    const selected = e.target.value;
                    setAlmariNo(selected);
                    const matching = almaris.find(
                      (a) =>
                        selected.toLowerCase().includes(a.almariCode.toLowerCase()) ||
                        selected.toLowerCase().includes(a.name.toLowerCase())
                    );
                    if (matching && matching.shelves.length > 0) {
                      setShelfNo(matching.shelves[0]);
                    }
                  }}
                  size="small"
                  helperText="Physical storage cabinet in the library"
                >
                  {almariOptions.map((a) => (
                    <MenuItem key={a} value={a}>
                      {a}
                    </MenuItem>
                  ))}
                </TextField>
                {onQuickAddAlmari && (
                  <Button
                    size="small"
                    onClick={() => {
                      setNewAlmCode(`Almari #${String(almaris.length + 1).padStart(2, '0')}`);
                      setNewAlmName('');
                      setNewAlmDept(category);
                      setQuickAlmariOpen(true);
                    }}
                    sx={{ alignSelf: 'flex-start', fontSize: '0.75rem', p: 0, minWidth: 0, textTransform: 'none', color: '#800020', fontWeight: 700 }}
                  >
                    + Create New Almari / Cabinet
                  </Button>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Shelf / Rack Level"
                value={shelfNo}
                onChange={(e) => setShelfNo(e.target.value)}
                size="small"
                helperText="Specific rack shelf inside the selected Almari"
              >
                {availableShelves.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>


            <Grid item xs={12} sm={4}>
              <TextField
                select
                fullWidth
                label="Category / Subject"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                size="small"
              >
                {CATEGORIES_LIST.filter((c) => c !== 'All Categories').map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                select
                fullWidth
                label="Language"
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                size="small"
              >
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Urdu">Urdu</MenuItem>
                <MenuItem value="Arabic">Arabic</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                select
                fullWidth
                label="Physical Condition"
                value={condition}
                onChange={(e) => setCondition(e.target.value as any)}
                size="small"
              >
                <MenuItem value="Brand New">Brand New</MenuItem>
                <MenuItem value="Good">Good</MenuItem>
                <MenuItem value="Fair">Fair</MenuItem>
                <MenuItem value="Under Repair">Under Repair</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Total Copies"
                type="number"
                value={totalCopies}
                onChange={(e) => setTotalCopies(Number(e.target.value))}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Available Copies"
                type="number"
                value={availableCopies}
                onChange={(e) => setAvailableCopies(Number(e.target.value))}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Replacement Value (Rs.)"
                type="number"
                value={priceRs}
                onChange={(e) => setPriceRs(Number(e.target.value))}
                size="small"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Publisher"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="DDC Call Number"
                value={callNumber}
                onChange={(e) => setCallNumber(e.target.value)}
                size="small"
                placeholder="e.g. 005.13 COR"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Description / Abstract"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                size="small"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={isReferenceOnly}
                    onChange={(e) => setIsReferenceOnly(e.target.checked)}
                    color="secondary"
                  />
                }
                label="Mark as Reference Only (Reading room only — Cannot be issued to students for home)"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, bgcolor: '#f8fafc' }}>
          <Button onClick={() => setDialogOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSaveBook} variant="contained" sx={{ bgcolor: '#0f2942', fontWeight: 700 }}>
            {editingBook ? 'Save Changes' : 'Add Book to Catalog'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Quick Add Almari Modal */}
      <Dialog
        open={quickAlmariOpen}
        onClose={() => setQuickAlmariOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ bgcolor: '#0f2942', color: '#fff', fontWeight: 800 }}>
          Create New Almari / Cabinet
        </DialogTitle>
        <DialogContent sx={{ p: 3, pt: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              fullWidth
              size="small"
              label="Almari Code"
              placeholder="e.g. Almari #12"
              value={newAlmCode}
              onChange={(e) => setNewAlmCode(e.target.value)}
            />
            <TextField
              fullWidth
              size="small"
              label="Almari Title / Topic"
              placeholder="e.g. Bio-Technology Cabinet"
              value={newAlmName}
              onChange={(e) => setNewAlmName(e.target.value)}
              autoFocus
            />
            <TextField
              fullWidth
              size="small"
              label="Department"
              placeholder="e.g. Biology"
              value={newAlmDept}
              onChange={(e) => setNewAlmDept(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setQuickAlmariOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              if (!newAlmCode.trim() || !newAlmName.trim()) {
                alert('Please enter both Almari Code and Title');
                return;
              }
              const createdAlmari: Almari = {
                id: `alm-${Date.now()}`,
                almariCode: newAlmCode.trim(),
                name: newAlmName.trim(),
                department: newAlmDept.trim() || 'General',
                locationDesc: 'Main Library Hall',
                shelves: ['Shelf 1 (Top Rack)', 'Shelf 2 (Middle Rack)', 'Shelf 3 (Bottom Rack)']
              };
              if (onQuickAddAlmari) {
                onQuickAddAlmari(createdAlmari);
              }
              const label = `${createdAlmari.almariCode} (${createdAlmari.name})`;
              setAlmariNo(label);
              setShelfNo(createdAlmari.shelves[0]);
              setQuickAlmariOpen(false);
            }}
            sx={{ bgcolor: '#800020', fontWeight: 700 }}
          >
            Create & Select
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

