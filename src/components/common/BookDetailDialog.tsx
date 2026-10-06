import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  Chip,
  Divider,
  Paper,
  Alert
} from '@mui/material';
import {
  MeetingRoom as AlmariIcon,
  TableRows as ShelfIcon,
  QrCode as QrIcon,
  CheckCircle as AvailableIcon,
  Cancel as UnavailableIcon,
  BookmarkBorder as BookmarkIcon,
  LibraryAddCheck as IssueIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { Book, UserRole } from '../../types/library';

interface BookDetailDialogProps {
  open: boolean;
  book: Book | null;
  currentRole: UserRole;
  onClose: () => void;
  onOpenBarcode: (book: Book) => void;
  onInitiateIssue?: (book: Book) => void;
  onReserveBook?: (book: Book) => void;
}

export const BookDetailDialog: React.FC<BookDetailDialogProps> = ({
  open,
  book,
  currentRole,
  onClose,
  onOpenBarcode,
  onInitiateIssue,
  onReserveBook
}) => {
  if (!book) return null;

  const isAvailable = book.availableCopies > 0;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2.5, bgcolor: '#0f2942', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Chip
            label={book.accessionNo}
            size="small"
            sx={{ bgcolor: '#f59e0b', color: '#000', fontWeight: 800, fontSize: '0.75rem' }}
          />
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#fff', fontSize: '1.1rem' }}>
            Book Record Details
          </Typography>
        </Box>
        <Chip
          label={book.isReferenceOnly ? 'Reference Only (Non-Issuable)' : isAvailable ? `Available (${book.availableCopies} Copies)` : 'Currently All Issued'}
          color={book.isReferenceOnly ? 'secondary' : isAvailable ? 'success' : 'error'}
          size="small"
          sx={{ fontWeight: 700 }}
        />
      </DialogTitle>

      <DialogContent dividers sx={{ p: { xs: 2, sm: 3 } }}>
        {/* Physical Library Location Callout Banner - Highly Requested by User! */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 3,
            bgcolor: '#eff6ff',
            border: '2px dashed #0284c7',
            borderRadius: 3,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: '#0284c7',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <AlmariIcon sx={{ fontSize: 30 }} />
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: '#0369a1', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Physical Location in Library Hall
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0f2942' }}>
                {book.almariNo}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.2 }}>
                <ShelfIcon sx={{ fontSize: 16, color: '#64748b' }} />
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569' }}>
                  {book.shelfNo}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
            <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700, display: 'block' }}>
              DDC Call / Shelf Tag:
            </Typography>
            <Chip
              label={book.callNumber}
              size="small"
              sx={{ bgcolor: '#0f2942', color: '#fff', fontWeight: 800, fontFamily: 'monospace' }}
            />
          </Box>
        </Paper>

        <Grid container spacing={3}>
          {/* Cover & Quick Meta */}
          <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
            <Box
              component="img"
              src={book.coverUrl}
              alt={book.title}
              sx={{
                width: '100%',
                maxHeight: 260,
                objectFit: 'cover',
                borderRadius: 3,
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                border: '1px solid #e2e8f0'
              }}
            />

            <Button
              variant="outlined"
              fullWidth
              startIcon={<QrIcon />}
              onClick={() => onOpenBarcode(book)}
              sx={{ mt: 2, borderColor: '#cbd5e1', color: '#334155' }}
            >
              View Barcode Label
            </Button>
          </Grid>

          {/* Book Details */}
          <Grid item xs={12} sm={8}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f2942', mb: 0.5, lineHeight: 1.3 }}>
              {book.title}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#800020', fontWeight: 700, mb: 1.5 }}>
              By {book.author}
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              <Chip label={book.category} size="small" sx={{ bgcolor: '#f1f5f9', fontWeight: 600 }} />
              <Chip label={`Language: ${book.language}`} size="small" variant="outlined" />
              <Chip label={`Condition: ${book.condition}`} size="small" color="primary" variant="outlined" />
              <Chip label={`Edition: ${book.edition}`} size="small" />
            </Box>

            <Typography variant="body2" sx={{ color: '#475569', mb: 3, lineHeight: 1.6 }}>
              {book.description}
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* Spec grid */}
            <Grid container spacing={2}>
              <Grid item xs={6} sm={4}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>ISBN Number</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: 'monospace' }}>{book.isbn}</Typography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>Publisher</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>{book.publisher}</Typography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>Publish Year</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>{book.year}</Typography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>Total Inventory</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>{book.totalCopies} Copies</Typography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>Available on Shelf</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: isAvailable ? 'green' : 'red' }}>
                  {book.availableCopies} Copies Available
                </Typography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>Book Replacement Value</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>Rs. {book.priceRs}</Typography>
              </Grid>
            </Grid>

            {book.isReferenceOnly && (
              <Alert severity="warning" sx={{ mt: 2.5, borderRadius: 2 }}>
                <strong>Reference Section Book:</strong> This volume cannot be borrowed for home. It is available only for study within the Reading Room.
              </Alert>
            )}
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 2.5, bgcolor: '#f8fafc', justifyContent: 'space-between' }}>
        <Button onClick={onClose} variant="outlined" sx={{ color: '#64748b', borderColor: '#cbd5e1' }}>
          Close
        </Button>

        <Box sx={{ display: 'flex', gap: 1.5 }}>
          {/* Action based on role */}
          {(currentRole === 'librarian' || currentRole === 'admin') && onInitiateIssue && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<IssueIcon />}
              disabled={!isAvailable}
              onClick={() => {
                onClose();
                onInitiateIssue(book);
              }}
              sx={{ bgcolor: '#0f2942' }}
            >
              Issue Book to Student
            </Button>
          )}

          {(currentRole === 'student' || currentRole === 'teacher') && onReserveBook && !book.isReferenceOnly && (
            <Button
              variant="contained"
              color="secondary"
              startIcon={<BookmarkIcon />}
              onClick={() => {
                onReserveBook(book);
              }}
              sx={{ bgcolor: '#800020' }}
            >
              {isAvailable ? 'Request Borrow Slip' : 'Reserve Next Copy'}
            </Button>
          )}
        </Box>
      </DialogActions>
    </Dialog>
  );
};
