import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  InputAdornment,
  Alert
} from '@mui/material';
import {
  MeetingRoom as AlmariIcon,
  TableRows as ShelfIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  AutoStories as BookIcon,
  LocationOn as LocationIcon,
  Category as DepartmentIcon
} from '@mui/icons-material';
import { Almari, Book } from '../../types/library';

interface ManageShelvesProps {
  almaris: Almari[];
  books: Book[];
  onAddAlmari: (newAlmari: Almari) => void;
  onUpdateAlmari: (updatedAlmari: Almari) => void;
  onDeleteAlmari: (almariId: string) => void;
}

export const ManageShelves: React.FC<ManageShelvesProps> = ({
  almaris,
  books,
  onAddAlmari,
  onUpdateAlmari,
  onDeleteAlmari
}) => {
  const [search, setSearch] = useState<string>('');

  // Almari Dialog State
  const [almariDialogOpen, setAlmariDialogOpen] = useState<boolean>(false);
  const [editingAlmari, setEditingAlmari] = useState<Almari | null>(null);
  const [almariCode, setAlmariCode] = useState<string>('');
  const [almariName, setAlmariName] = useState<string>('');
  const [department, setDepartment] = useState<string>('');
  const [locationDesc, setLocationDesc] = useState<string>('');
  const [shelvesText, setShelvesText] = useState<string>('');

  // Quick Add Shelf Dialog
  const [addShelfDialogOpen, setAddShelfDialogOpen] = useState<boolean>(false);
  const [targetAlmariForShelf, setTargetAlmariForShelf] = useState<Almari | null>(null);
  const [newShelfName, setNewShelfName] = useState<string>('');

  // Open Add Almari
  const handleOpenAddAlmari = () => {
    setEditingAlmari(null);
    const nextNum = almaris.length + 1;
    setAlmariCode(`Almari #${String(nextNum).padStart(2, '0')}`);
    setAlmariName('');
    setDepartment('General');
    setLocationDesc('Main Library Hall');
    setShelvesText('Shelf 1 (Top Rack)\nShelf 2 (Middle Rack)\nShelf 3 (Bottom Rack)');
    setAlmariDialogOpen(true);
  };

  // Open Edit Almari
  const handleOpenEditAlmari = (alm: Almari) => {
    setEditingAlmari(alm);
    setAlmariCode(alm.almariCode);
    setAlmariName(alm.name);
    setDepartment(alm.department);
    setLocationDesc(alm.locationDesc);
    setShelvesText(alm.shelves.join('\n'));
    setAlmariDialogOpen(true);
  };

  // Save Almari
  const handleSaveAlmari = () => {
    if (!almariCode.trim() || !almariName.trim()) {
      alert('Please provide both Almari Code and Almari Name.');
      return;
    }

    const shelvesArray = shelvesText
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const fallbackShelves = shelvesArray.length > 0 ? shelvesArray : ['Shelf 1 (Default Rack)'];

    if (editingAlmari) {
      onUpdateAlmari({
        ...editingAlmari,
        almariCode: almariCode.trim(),
        name: almariName.trim(),
        department: department.trim() || 'General',
        locationDesc: locationDesc.trim() || 'Main Library Hall',
        shelves: fallbackShelves
      });
    } else {
      const newAlm: Almari = {
        id: `alm-${Date.now()}`,
        almariCode: almariCode.trim(),
        name: almariName.trim(),
        department: department.trim() || 'General',
        locationDesc: locationDesc.trim() || 'Main Library Hall',
        shelves: fallbackShelves
      };
      onAddAlmari(newAlm);
    }

    setAlmariDialogOpen(false);
  };

  // Open Add Shelf Dialog for a specific Almari
  const handleOpenAddShelf = (alm: Almari) => {
    setTargetAlmariForShelf(alm);
    const nextShelfNum = alm.shelves.length + 1;
    setNewShelfName(`Shelf ${nextShelfNum} (Rack ${nextShelfNum})`);
    setAddShelfDialogOpen(true);
  };

  // Save New Shelf
  const handleSaveNewShelf = () => {
    if (!targetAlmariForShelf || !newShelfName.trim()) return;

    const updated = {
      ...targetAlmariForShelf,
      shelves: [...targetAlmariForShelf.shelves, newShelfName.trim()]
    };
    onUpdateAlmari(updated);
    setAddShelfDialogOpen(false);
    setNewShelfName('');
  };

  // Delete Shelf from Almari
  const handleDeleteShelf = (alm: Almari, shelfToDelete: string) => {
    if (alm.shelves.length <= 1) {
      alert('An Almari must have at least one shelf.');
      return;
    }
    const updated = {
      ...alm,
      shelves: alm.shelves.filter((s) => s !== shelfToDelete)
    };
    onUpdateAlmari(updated);
  };

  // Filter Almaris
  const filteredAlmaris = almaris.filter((alm) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      alm.almariCode.toLowerCase().includes(q) ||
      alm.name.toLowerCase().includes(q) ||
      alm.department.toLowerCase().includes(q) ||
      alm.locationDesc.toLowerCase().includes(q) ||
      alm.shelves.some((s) => s.toLowerCase().includes(q))
    );
  });

  // Calculate stats
  const totalShelvesCount = almaris.reduce((sum, a) => sum + a.shelves.length, 0);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Bar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3.5, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <AlmariIcon sx={{ color: '#800020', fontSize: 32 }} />
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f2942' }}>
              College Almaris & Shelves Management
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
            Define, customize, and add physical Almaris and Shelf racks in the Central Library catalog.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenAddAlmari}
          sx={{
            bgcolor: '#800020',
            fontWeight: 700,
            px: 3,
            py: 1.2,
            borderRadius: 2,
            '&:hover': { bgcolor: '#5c0017' }
          }}
        >
          + Add New Almari
        </Button>
      </Box>

      {/* KPI Stats & Search Bar */}
      <Paper elevation={0} sx={{ p: 2.5, mb: 4, borderRadius: 3, border: '1px solid #cbd5e1', bgcolor: '#fff' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ p: 1.5, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b' }}>TOTAL ALMARIS</Typography>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f2942' }}>{almaris.length} Cabinets</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ p: 1.5, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b' }}>TOTAL SHELF RACKS</Typography>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#0284c7' }}>{totalShelvesCount} Shelves</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search Almari by Code, Subject, Department or Shelf..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#0f2942' }} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Almaris Grid */}
      <Grid container spacing={3}>
        {filteredAlmaris.map((alm) => {
          // Count books located in this Almari
          const booksInThisAlmari = books.filter(
            (b) =>
              b.almariNo.toLowerCase().includes(alm.almariCode.toLowerCase()) ||
              b.almariNo.toLowerCase().includes(alm.name.toLowerCase())
          );

          return (
            <Grid item xs={12} sm={6} lg={4} key={alm.id}>
              <Card
                sx={{
                  borderRadius: 3,
                  border: '1px solid #cbd5e1',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                    borderColor: '#800020'
                  }
                }}
              >
                {/* Almari Card Header */}
                <Box
                  sx={{
                    p: 2,
                    bgcolor: '#0f2942',
                    color: '#fff',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: 1.5,
                        bgcolor: '#800020',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid #f59e0b'
                      }}
                    >
                      <AlmariIcon sx={{ color: '#fff', fontSize: 20 }} />
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
                        {alm.almariCode}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#f59e0b', fontWeight: 700 }}>
                        {alm.department} Department
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <Tooltip title="Edit Almari Details">
                      <IconButton
                        size="small"
                        onClick={() => handleOpenEditAlmari(alm)}
                        sx={{ color: '#e2e8f0', '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.1)' } }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Almari">
                      <IconButton
                        size="small"
                        onClick={() => {
                          if (booksInThisAlmari.length > 0) {
                            alert(
                              `Cannot delete "${alm.almariCode}" because it contains ${booksInThisAlmari.length} cataloged books. Please move the books first.`
                            );
                            return;
                          }
                          if (confirm(`Are you sure you want to delete ${alm.almariCode} (${alm.name})?`)) {
                            onDeleteAlmari(alm.id);
                          }
                        }}
                        sx={{ color: '#f87171', '&:hover': { color: '#ef4444', bgcolor: 'rgba(255,255,255,0.1)' } }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>

                <CardContent sx={{ p: 2.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f2942', mb: 1 }}>
                    {alm.name}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, color: '#64748b' }}>
                    <LocationIcon sx={{ fontSize: 16, color: '#800020' }} />
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      {alm.locationDesc}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                    <Chip
                      icon={<BookIcon sx={{ fontSize: 16 }} />}
                      label={`${booksInThisAlmari.length} Books Stored`}
                      size="small"
                      sx={{ bgcolor: '#eff6ff', color: '#0284c7', fontWeight: 700 }}
                    />
                    <Chip
                      icon={<ShelfIcon sx={{ fontSize: 16 }} />}
                      label={`${alm.shelves.length} Shelves`}
                      size="small"
                      sx={{ bgcolor: '#ecfdf5', color: '#059669', fontWeight: 700 }}
                    />
                  </Box>

                  <Divider sx={{ my: 1.5 }} />

                  {/* Shelves List */}
                  <Typography variant="caption" sx={{ fontWeight: 800, color: '#475569', textTransform: 'uppercase', mb: 1, display: 'block' }}>
                    Shelves in this Almari:
                  </Typography>

                  <List dense sx={{ py: 0, mb: 1.5, flexGrow: 1 }}>
                    {alm.shelves.map((shelf, idx) => {
                      const shelfBooksCount = booksInThisAlmari.filter((b) =>
                        b.shelfNo.toLowerCase().includes(shelf.toLowerCase())
                      ).length;

                      return (
                        <ListItem
                          key={idx}
                          sx={{
                            px: 1.5,
                            py: 0.5,
                            mb: 0.5,
                            bgcolor: '#f8fafc',
                            borderRadius: 1.5,
                            border: '1px solid #e2e8f0'
                          }}
                        >
                          <ShelfIcon sx={{ fontSize: 16, color: '#d97706', mr: 1 }} />
                          <ListItemText
                            primary={
                              <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8rem', color: '#0f2942' }}>
                                {shelf}
                              </Typography>
                            }
                            secondary={
                              <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.7rem' }}>
                                {shelfBooksCount} titles on this rack
                              </Typography>
                            }
                          />
                          <ListItemSecondaryAction>
                            <Tooltip title="Remove this shelf rack">
                              <IconButton
                                edge="end"
                                size="small"
                                onClick={() => handleDeleteShelf(alm, shelf)}
                                sx={{ color: '#94a3b8', '&:hover': { color: '#dc2626' } }}
                              >
                                <DeleteIcon sx={{ fontSize: 16 }} />
                              </IconButton>
                            </Tooltip>
                          </ListItemSecondaryAction>
                        </ListItem>
                      );
                    })}
                  </List>

                  <Button
                    fullWidth
                    variant="outlined"
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenAddShelf(alm)}
                    sx={{
                      mt: 'auto',
                      borderColor: '#cbd5e1',
                      color: '#0f2942',
                      fontWeight: 700,
                      '&:hover': { borderColor: '#800020', bgcolor: 'rgba(128,0,32,0.04)' }
                    }}
                  >
                    + Add Shelf Rack
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Add / Edit Almari Modal */}
      <Dialog
        open={almariDialogOpen}
        onClose={() => setAlmariDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ bgcolor: '#0f2942', color: '#fff', fontWeight: 800 }}>
          {editingAlmari ? `Edit Almari: ${editingAlmari.almariCode}` : 'Add New Library Almari / Cabinet'}
        </DialogTitle>
        <DialogContent sx={{ p: 3, pt: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  size="small"
                  label="Almari Code"
                  placeholder="e.g. Almari #12"
                  value={almariCode}
                  onChange={(e) => setAlmariCode(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  fullWidth
                  size="small"
                  label="Almari Name / Topic"
                  placeholder="e.g. Zoology & Botany Cabinet"
                  value={almariName}
                  onChange={(e) => setAlmariName(e.target.value)}
                  required
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="Department / Subject"
                  placeholder="e.g. Biology / Science"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="Physical Location in Hall"
                  placeholder="e.g. Science Wing - Row 4 (North)"
                  value={locationDesc}
                  onChange={(e) => setLocationDesc(e.target.value)}
                />
              </Grid>
            </Grid>

            <Box>
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#0f2942', mb: 0.5 }}>
                Shelf Racks (One per line):
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder={"Shelf 1 (Top Rack)\nShelf 2 (Middle Rack)\nShelf 3 (Bottom Rack)"}
                value={shelvesText}
                onChange={(e) => setShelvesText(e.target.value)}
                helperText="Enter each shelf rack name on a new line."
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setAlmariDialogOpen(false)} sx={{ fontWeight: 600 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveAlmari}
            sx={{ bgcolor: '#800020', fontWeight: 700, px: 3 }}
          >
            {editingAlmari ? 'Save Changes' : 'Create Almari'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Single Shelf Modal */}
      <Dialog
        open={addShelfDialogOpen}
        onClose={() => setAddShelfDialogOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ bgcolor: '#0f2942', color: '#fff', fontWeight: 800 }}>
          Add Shelf to {targetAlmariForShelf?.almariCode}
        </DialogTitle>
        <DialogContent sx={{ p: 3, pt: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, mt: 1 }}>
            Adding a new rack to <strong>{targetAlmariForShelf?.name}</strong>.
          </Typography>
          <TextField
            fullWidth
            size="small"
            label="Shelf Name / Rack Title"
            placeholder="e.g. Shelf 4 (Bottom Rack - Research)"
            value={newShelfName}
            onChange={(e) => setNewShelfName(e.target.value)}
            autoFocus
          />
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setAddShelfDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSaveNewShelf}
            sx={{ bgcolor: '#800020', fontWeight: 700 }}
          >
            Add Shelf
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
