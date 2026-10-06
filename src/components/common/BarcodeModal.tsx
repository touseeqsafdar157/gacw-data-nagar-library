import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Paper,
  Divider,
  Chip
} from '@mui/material';
import { Print as PrintIcon, Close as CloseIcon, QrCode2 as QrCodeIcon } from '@mui/icons-material';
import { Book } from '../../types/library';

interface BarcodeModalProps {
  open: boolean;
  book: Book | null;
  onClose: () => void;
}

export const BarcodeModal: React.FC<BarcodeModalProps> = ({ open, book, onClose }) => {
  if (!book) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#0f2942', color: '#fff' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <QrCodeIcon />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Library Barcode & Shelf Label
          </Typography>
        </Box>
        <Chip label={book.accessionNo} size="small" sx={{ bgcolor: '#f59e0b', color: '#000', fontWeight: 800 }} />
      </DialogTitle>

      <DialogContent sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Printable barcode and spine label to affix on physical book and catalog card.
        </Typography>

        {/* The Printable Label Card */}
        <Paper
          elevation={3}
          sx={{
            p: 3,
            mx: 'auto',
            maxWidth: 380,
            border: '2px solid #0f2942',
            borderRadius: 2,
            bgcolor: '#ffffff',
            textAlign: 'center'
          }}
        >
          {/* Header */}
          <Typography variant="caption" sx={{ fontWeight: 800, color: '#800020', display: 'block', textTransform: 'uppercase' }}>
            Govt Associate College Data Nagar Lahore
          </Typography>
          <Typography variant="caption" sx={{ color: '#64748b', display: 'block', mb: 1, fontSize: '0.68rem' }}>
            CENTRAL LIBRARY — BOOK SPINE STICKER
          </Typography>

          <Divider sx={{ mb: 1.5 }} />

          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0f2942', lineHeight: 1.2, mb: 0.5 }}>
            {book.title}
          </Typography>
          <Typography variant="caption" sx={{ color: '#475569', display: 'block', mb: 1.5 }}>
            {book.author}
          </Typography>

          {/* Simulated Barcode */}
          <Box sx={{ my: 2, py: 1, px: 2, bgcolor: '#f8fafc', borderRadius: 1, border: '1px solid #e2e8f0' }}>
            <svg width="240" height="55" viewBox="0 0 240 55" style={{ display: 'inline-block' }}>
              <rect x="0" y="0" width="4" height="40" fill="#000" />
              <rect x="6" y="0" width="2" height="40" fill="#000" />
              <rect x="10" y="0" width="6" height="40" fill="#000" />
              <rect x="18" y="0" width="2" height="40" fill="#000" />
              <rect x="22" y="0" width="4" height="40" fill="#000" />
              <rect x="28" y="0" width="8" height="40" fill="#000" />
              <rect x="38" y="0" width="2" height="40" fill="#000" />
              <rect x="42" y="0" width="4" height="40" fill="#000" />
              <rect x="48" y="0" width="6" height="40" fill="#000" />
              <rect x="56" y="0" width="2" height="40" fill="#000" />
              <rect x="60" y="0" width="8" height="40" fill="#000" />
              <rect x="70" y="0" width="4" height="40" fill="#000" />
              <rect x="76" y="0" width="2" height="40" fill="#000" />
              <rect x="80" y="0" width="6" height="40" fill="#000" />
              <rect x="88" y="0" width="4" height="40" fill="#000" />
              <rect x="94" y="0" width="2" height="40" fill="#000" />
              <rect x="98" y="0" width="8" height="40" fill="#000" />
              <rect x="108" y="0" width="4" height="40" fill="#000" />
              <rect x="114" y="0" width="6" height="40" fill="#000" />
              <rect x="122" y="0" width="2" height="40" fill="#000" />
              <rect x="126" y="0" width="4" height="40" fill="#000" />
              <rect x="132" y="0" width="8" height="40" fill="#000" />
              <rect x="142" y="0" width="2" height="40" fill="#000" />
              <rect x="146" y="0" width="6" height="40" fill="#000" />
              <rect x="154" y="0" width="4" height="40" fill="#000" />
              <rect x="160" y="0" width="2" height="40" fill="#000" />
              <rect x="164" y="0" width="8" height="40" fill="#000" />
              <rect x="174" y="0" width="4" height="40" fill="#000" />
              <rect x="180" y="0" width="6" height="40" fill="#000" />
              <rect x="188" y="0" width="2" height="40" fill="#000" />
              <rect x="192" y="0" width="4" height="40" fill="#000" />
              <rect x="198" y="0" width="8" height="40" fill="#000" />
              <rect x="208" y="0" width="2" height="40" fill="#000" />
              <rect x="212" y="0" width="4" height="40" fill="#000" />
              <rect x="218" y="0" width="6" height="40" fill="#000" />
              <rect x="226" y="0" width="4" height="40" fill="#000" />
              <rect x="232" y="0" width="4" height="40" fill="#000" />
              <text x="120" y="52" textAnchor="middle" fontSize="11" fontFamily="monospace" fontWeight="bold">
                {book.accessionNo}
              </text>
            </svg>
          </Box>

          {/* Physical Location Details on the sticker */}
          <Box sx={{ bgcolor: '#fef3c7', border: '1px solid #f59e0b', p: 1, borderRadius: 1.5, my: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 800, color: '#92400e', fontSize: '0.85rem' }}>
              📍 {book.almariNo}
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 700, color: '#b45309' }}>
              {book.shelfNo} | Call: {book.callNumber}
            </Typography>
          </Box>

          <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.7rem' }}>
            Property of Govt Associate College Data Nagar Lahore
          </Typography>
        </Paper>
      </DialogContent>

      <DialogActions sx={{ p: 2.5, bgcolor: '#f8fafc' }}>
        <Button onClick={onClose} variant="outlined" sx={{ color: '#64748b' }}>
          Close
        </Button>
        <Button onClick={handlePrint} variant="contained" startIcon={<PrintIcon />} sx={{ bgcolor: '#0f2942' }}>
          Print Label Sticker
        </Button>
      </DialogActions>
    </Dialog>
  );
};
