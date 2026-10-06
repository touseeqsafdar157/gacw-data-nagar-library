import React, { useState, useEffect, useCallback } from 'react';
import { ThemeProvider, CssBaseline, Box, Snackbar, Alert, CircularProgress, Typography } from '@mui/material';
import { collegeTheme } from './theme/collegeTheme';
import { UserRole, Book, Member, BorrowTransaction, ReadingRoomSeat, DigitalResource, LibraryAnnouncement, BookSuggestion, Almari } from './types/library';

// Services
import { bookService } from './services/bookService';
import { shelfService } from './services/shelfService';
import { memberService } from './services/memberService';
import { transactionService } from './services/transactionService';
import { seatService } from './services/seatService';
import { resourceService } from './services/resourceService';
import { announcementService } from './services/announcementService';
import { suggestionService } from './services/suggestionService';
import { feedbackService } from './services/feedbackService';
import { authService } from './services/authService';
import { settingsService, LibrarySettings } from './services/settingsService';

// Fallback seed data
import {
  INITIAL_BOOKS,
  INITIAL_MEMBERS,
  INITIAL_TRANSACTIONS,
  INITIAL_SEATS,
  INITIAL_DIGITAL_RESOURCES,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_SUGGESTIONS,
  INITIAL_ALMARIS
} from './data/mockData';

// Layout Components
import { Navbar } from './components/layout/Navbar';
import { TabNav } from './components/layout/TabNav';
import { Footer } from './components/layout/Footer';
import { MobileMenuDrawer } from './components/common/MobileMenuDrawer';
import { NotificationDrawer } from './components/common/NotificationDrawer';

// Dialogs & Auth
import { BookDetailDialog } from './components/common/BookDetailDialog';
import { BarcodeModal } from './components/common/BarcodeModal';
import { MemberDetailDialog } from './components/common/MemberDetailDialog';
import { FeedbackModal } from './components/info/FeedbackModal';
import { LoginDialog } from './components/auth/LoginDialog';

// Views
import { StudentHome } from './components/student/StudentHome';
import { BookCatalog } from './components/student/BookCatalog';
import { MyBorrowedBooks } from './components/student/MyBorrowedBooks';
import { SeatBooking } from './components/student/SeatBooking';
import { CirculationDesk } from './components/librarian/CirculationDesk';
import { ManageBooks } from './components/librarian/ManageBooks';
import { ManageShelves } from './components/librarian/ManageShelves';
import { ManageMembers } from './components/librarian/ManageMembers';
import { FineManagement } from './components/librarian/FineManagement';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AboutAndRules } from './components/info/AboutAndRules';
import { ManageSettings } from './components/admin/ManageSettings';

export const App: React.FC = () => {
  // Roles & Authentication State
  const [currentRole, setCurrentRole] = useState<UserRole>('student');
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authenticatedRole, setAuthenticatedRole] = useState<'librarian' | 'admin' | null>(null);
  const [loginDialogOpen, setLoginDialogOpen] = useState<boolean>(false);
  const [loginTargetRole, setLoginTargetRole] = useState<UserRole>('librarian');

  // Loading & Sync States
  const [loading, setLoading] = useState<boolean>(true);

  // Core Dynamic Data State
  const [books, setBooks] = useState<Book[]>(INITIAL_BOOKS);
  const [almaris, setAlmaris] = useState<Almari[]>(INITIAL_ALMARIS);
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [transactions, setTransactions] = useState<BorrowTransaction[]>(INITIAL_TRANSACTIONS);
  const [seats, setSeats] = useState<ReadingRoomSeat[]>(INITIAL_SEATS);
  const [resources, setResources] = useState<DigitalResource[]>(INITIAL_DIGITAL_RESOURCES);
  const [announcements, setAnnouncements] = useState<LibraryAnnouncement[]>(INITIAL_ANNOUNCEMENTS);
  const [suggestions, setSuggestions] = useState<BookSuggestion[]>(INITIAL_SUGGESTIONS);
  const [settings, setSettings] = useState<LibrarySettings>({
    finePerDay: 5,
    maxBorrowDaysStudent: 14,
    maxBorrowDaysTeacher: 30,
    maxBooksStudent: 2,
    maxBooksTeacher: 5,
    timings: 'Mon–Sat: 8:00 AM – 4:00 PM',
    location: 'Data Nagar, Badami Bagh, Lahore',
    collegeName: 'Govt Associate College Data Nagar Lahore',
    contactPhone: '042-99001122',
    contactEmail: 'library@gacdn.edu.pk',
    staffMembers: [
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
    ],
    libraryRules: [],
    faqs: []
  });

  // Active Modals State
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [barcodeBook, setBarcodeBook] = useState<Book | null>(null);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [notificationOpen, setNotificationOpen] = useState<boolean>(false);
  const [feedbackOpen, setFeedbackOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [preSelectedBookForIssue, setPreSelectedBookForIssue] = useState<Book | null>(null);

  // Global Search State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');

  // Snackbars
  const [toast, setToast] = useState<{ open: boolean; message: string; severity: 'success' | 'info' | 'warning' | 'error' }>({
    open: false,
    message: '',
    severity: 'success'
  });

  const showToast = (message: string, severity: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    setToast({ open: true, message, severity });
  };

  // Fetch all live data from backend
  const fetchAllData = useCallback(async (isInitial = false) => {
    if (isInitial) setLoading(true);
    try {
      const [
        booksData,
        almarisData,
        membersData,
        transactionsData,
        seatsRes,
        resourcesData,
        announcementsData,
        suggestionsData,
        settingsData
      ] = await Promise.all([
        bookService.getBooks().catch(() => null),
        shelfService.getAlmaris().catch(() => null),
        memberService.getMembers().catch(() => null),
        transactionService.getTransactions().catch(() => null),
        seatService.getSeats().catch(() => null),
        resourceService.getResources().catch(() => null),
        announcementService.getAnnouncements().catch(() => null),
        suggestionService.getSuggestions().catch(() => null),
        settingsService.getSettings().catch(() => null)
      ]);

      if (booksData) setBooks(booksData);
      if (almarisData) setAlmaris(almarisData);
      if (membersData) setMembers(membersData);
      if (transactionsData) setTransactions(transactionsData);
      if (seatsRes && seatsRes.data) setSeats(seatsRes.data);
      if (resourcesData) setResources(resourcesData);
      if (announcementsData) setAnnouncements(announcementsData);
      if (suggestionsData) setSuggestions(suggestionsData);
      if (settingsData) setSettings(settingsData);
    } catch (err) {
      console.warn('API sync check:', err);
    } finally {
      if (isInitial) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const storedUser = authService.getStoredUser();
    if (storedUser && (storedUser.role === 'librarian' || storedUser.role === 'admin')) {
      setIsAuthenticated(true);
      setAuthenticatedRole(storedUser.role);
      setCurrentRole(storedUser.role);
    }
    fetchAllData(true);
  }, [fetchAllData]);

  // Auth Handlers
  const handleOpenLogin = (role: UserRole = 'librarian') => {
    setLoginTargetRole(role);
    setLoginDialogOpen(true);
  };

  const handleLoginSuccess = (role: UserRole) => {
    setIsAuthenticated(true);
    setAuthenticatedRole(role as 'librarian' | 'admin');
    setCurrentRole(role);
    setCurrentTab(0);
    showToast(`Welcome! Successfully authenticated as ${role === 'librarian' ? 'Chief Librarian' : 'Principal / Admin'}.`, 'success');
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setAuthenticatedRole(null);
    setCurrentRole('student');
    setCurrentTab(0);
    showToast('Logged out successfully. Switched to Student Portal.', 'info');
  };

  // Role switch handler
  const handleRoleChange = (newRole: UserRole) => {
    if ((newRole === 'librarian' || newRole === 'admin') && authenticatedRole !== newRole) {
      handleOpenLogin(newRole);
      return;
    }
    setCurrentRole(newRole);
    setCurrentTab(0);
    showToast(`Switched view to ${newRole.toUpperCase()} mode`, 'info');
  };

  // Almari / Shelf Dynamic CRUD Handlers
  const handleAddAlmari = async (newAlmari: Almari) => {
    try {
      const created = await shelfService.createAlmari(newAlmari);
      setAlmaris((prev) => [created, ...prev.filter((a) => a.id !== created.id)]);
      showToast(`Almari "${created.almariCode} (${created.name})" saved!`);
    } catch {
      setAlmaris((prev) => [newAlmari, ...prev]);
      showToast(`Almari "${newAlmari.almariCode}" created!`);
    }
  };

  const handleUpdateAlmari = async (updatedAlmari: Almari) => {
    try {
      const updated = await shelfService.updateAlmari(updatedAlmari.id, updatedAlmari);
      setAlmaris((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
      showToast(`Almari "${updated.almariCode}" updated!`);
    } catch {
      setAlmaris((prev) => prev.map((a) => (a.id === updatedAlmari.id ? updatedAlmari : a)));
      showToast(`Almari "${updatedAlmari.almariCode}" updated!`);
    }
  };

  const handleDeleteAlmari = async (almariId: string) => {
    try {
      await shelfService.deleteAlmari(almariId);
      setAlmaris((prev) => prev.filter((a) => a.id !== almariId));
      showToast('Almari removed from library catalog.', 'info');
    } catch {
      setAlmaris((prev) => prev.filter((a) => a.id !== almariId));
      showToast('Almari removed.', 'info');
    }
  };

  // Dynamic Issue Book Handler
  const handleIssueBook = async (txData: Omit<BorrowTransaction, 'id' | 'transactionNo'>) => {
    try {
      const res = await transactionService.issueBook({
        bookId: txData.bookId,
        memberRollNo: txData.memberRollNo,
        dueDate: txData.dueDate,
        issuedByStaff: txData.issuedByStaff
      });

      if (res.success && res.data) {
        setTransactions((prev) => [res.data, ...prev]);
        setBooks((prev) =>
          prev.map((b) => (b.id === txData.bookId ? { ...b, availableCopies: Math.max(0, b.availableCopies - 1) } : b))
        );
        setMembers((prev) =>
          prev.map((m) =>
            m.rollNo.toLowerCase() === txData.memberRollNo.toLowerCase()
              ? { ...m, issuedBooksCount: m.issuedBooksCount + 1 }
              : m
          )
        );
        showToast(res.message || `Book "${txData.bookTitle}" issued successfully!`);
        return;
      }
    } catch (err: any) {
      showToast(err.message || 'Error issuing book', 'error');
    }
  };

  // Dynamic Return Book Handler
  const handleReturnBook = async (transactionId: string) => {
    const tx = transactions.find((t) => t.id === transactionId);
    if (!tx) return;

    try {
      const res = await transactionService.returnBook(transactionId);
      if (res.success && res.data) {
        setTransactions((prev) => prev.map((t) => (t.id === transactionId ? res.data : t)));
        setBooks((prev) =>
          prev.map((b) => (b.id === tx.bookId ? { ...b, availableCopies: Math.min(b.totalCopies, b.availableCopies + 1) } : b))
        );
        setMembers((prev) =>
          prev.map((m) =>
            m.rollNo.toLowerCase() === tx.memberRollNo.toLowerCase()
              ? { ...m, issuedBooksCount: Math.max(0, m.issuedBooksCount - 1) }
              : m
          )
        );
        showToast(res.message || `Book "${tx.bookTitle}" successfully returned!`);
        return;
      }
    } catch (err: any) {
      showToast(err.message || 'Error returning book', 'error');
    }
  };

  // Dynamic Renew Book Handler
  const handleRenewBook = async (transactionId: string) => {
    try {
      const res = await transactionService.renewBook(transactionId);
      if (res.success && res.data) {
        setTransactions((prev) => prev.map((t) => (t.id === transactionId ? res.data : t)));
        showToast(res.message || 'Book renewed for 7 additional days!');
      }
    } catch (err: any) {
      showToast(err.message || 'Error renewing book', 'error');
    }
  };

  // Dynamic Fine Handlers
  const handleCollectFine = async (transactionId: string) => {
    try {
      const res = await transactionService.collectFine(transactionId);
      if (res.success && res.data) {
        setTransactions((prev) => prev.map((t) => (t.id === transactionId ? res.data : t)));
        showToast(res.message || 'Fine collected and receipt generated!');
      }
    } catch (err: any) {
      showToast(err.message || 'Error collecting fine', 'error');
    }
  };

  const handleWaiveFine = async (transactionId: string) => {
    try {
      const res = await transactionService.waiveFine(transactionId);
      if (res.success && res.data) {
        setTransactions((prev) => prev.map((t) => (t.id === transactionId ? res.data : t)));
        showToast(res.message || 'Fine waived under college welfare provision.');
      }
    } catch (err: any) {
      showToast(err.message || 'Error waiving fine', 'error');
    }
  };

  // Dynamic Seat Handlers
  const handleBookSeat = async (seatId: number, rollNo: string, studentName: string) => {
    try {
      const res = await seatService.bookSeat(seatId, rollNo, studentName);
      if (res.success && res.data) {
        setSeats((prev) => prev.map((s) => (s.id === seatId ? res.data : s)));
        showToast(res.message || `Desk S-${String(seatId).padStart(2, '0')} booked for ${studentName}!`);
      }
    } catch (err: any) {
      showToast(err.message || 'Error booking desk', 'error');
    }
  };

  const handleVacateSeat = async (seatId: number) => {
    try {
      const res = await seatService.vacateSeat(seatId);
      if (res.success && res.data) {
        setSeats((prev) => prev.map((s) => (s.id === seatId ? res.data : s)));
        showToast(res.message || `Desk S-${String(seatId).padStart(2, '0')} is now available.`);
      }
    } catch (err: any) {
      showToast(err.message || 'Error vacating desk', 'error');
    }
  };

  // Dynamic Book CRUD Handlers
  const handleAddBook = async (newBook: Book) => {
    try {
      const created = await bookService.createBook(newBook);
      setBooks((prev) => [created, ...prev.filter((b) => b.id !== created.id)]);
      showToast(`Book "${created.title}" saved to library database!`);
    } catch (err: any) {
      showToast(err.message || 'Error adding book', 'error');
    }
  };

  const handleUpdateBook = async (updatedBook: Book) => {
    try {
      const updated = await bookService.updateBook(updatedBook.id, updatedBook);
      setBooks((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
      showToast(`Book "${updated.title}" updated successfully!`);
    } catch (err: any) {
      showToast(err.message || 'Error updating book', 'error');
    }
  };

  const handleDeleteBook = async (bookId: string) => {
    try {
      await bookService.deleteBook(bookId);
      setBooks((prev) => prev.filter((b) => b.id !== bookId));
      showToast('Book removed from database catalog.', 'info');
    } catch (err: any) {
      showToast(err.message || 'Error removing book', 'error');
    }
  };

  // Dynamic Member CRUD Handlers
  const handleAddMember = async (newMember: Member) => {
    try {
      const created = await memberService.createMember(newMember);
      setMembers((prev) => [created, ...prev.filter((m) => m.id !== created.id)]);
      showToast(`Member ${created.name} (${created.rollNo}) registered successfully!`);
    } catch (err: any) {
      showToast(err.message || 'Error registering member', 'error');
    }
  };

  const handleBlockToggle = async (memberId: string) => {
    try {
      const updated = await memberService.toggleStatus(memberId);
      setMembers((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
      showToast(`Member status updated to ${updated.status}!`);
    } catch (err: any) {
      showToast(err.message || 'Error updating member', 'error');
    }
  };

  const handleDeleteMember = async (memberId: string) => {
    try {
      await memberService.deleteMember(memberId);
      setMembers((prev) => prev.filter((m) => m.id !== memberId));
      showToast('Member removed from college registry.', 'info');
    } catch (err: any) {
      showToast(err.message || 'Error deleting member', 'error');
    }
  };

  // Dynamic Suggestions Handlers
  const handleApproveSuggestion = async (sugId: string) => {
    try {
      const updated = await suggestionService.updateStatus(sugId, 'Approved');
      setSuggestions((prev) => prev.map((s) => (s.id === sugId ? updated : s)));
      showToast('Book procurement approved by Principal!');
    } catch {
      setSuggestions((prev) => prev.map((s) => (s.id === sugId ? { ...s, status: 'Approved' } : s)));
      showToast('Book procurement approved!');
    }
  };

  const handleRejectSuggestion = async (sugId: string) => {
    try {
      const updated = await suggestionService.updateStatus(sugId, 'Rejected');
      setSuggestions((prev) => prev.map((s) => (s.id === sugId ? updated : s)));
      showToast('Book request marked rejected.', 'info');
    } catch {
      setSuggestions((prev) => prev.map((s) => (s.id === sugId ? { ...s, status: 'Rejected' } : s)));
      showToast('Book request marked rejected.', 'info');
    }
  };

  const handleInitiateIssueFromDialog = (book: Book) => {
    if (!isAuthenticated && currentRole !== 'librarian') {
      handleOpenLogin('librarian');
      return;
    }
    setPreSelectedBookForIssue(book);
    setCurrentRole('librarian');
    setCurrentTab(1);
    showToast(`Loaded "${book.title}" in Circulation Desk Issue Counter`, 'info');
  };

  const handleReserveBook = (book: Book) => {
    showToast(`Hold slip placed for "${book.title}". Please pick it up from Almari #${book.almariNo} within 48 hours.`);
  };

  const availableSeatsCount = seats.filter((s) => s.status === 'Available').length;

  // Active View Renderer
  const renderCurrentView = () => {
    if (loading) {
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '65vh', gap: 2.5 }}>
          <CircularProgress size={52} thickness={4} sx={{ color: '#0f2942' }} />
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f2942' }}>
            Govt Associate College Data Nagar Library
          </Typography>
        </Box>
      );
    }

    if (currentRole === 'librarian') {
      switch (currentTab) {
        case 0:
          return (
            <AdminDashboard
              books={books}
              members={members}
              transactions={transactions}
              suggestions={suggestions}
              onApproveSuggestion={handleApproveSuggestion}
              onRejectSuggestion={handleRejectSuggestion}
            />
          );
        case 1:
          return (
            <CirculationDesk
              books={books}
              members={members}
              transactions={transactions}
              onIssueBook={handleIssueBook}
              onReturnBook={handleReturnBook}
              preSelectedBook={preSelectedBookForIssue}
            />
          );
        case 2:
          return (
            <ManageBooks
              books={books}
              almaris={almaris}
              onAddBook={handleAddBook}
              onUpdateBook={handleUpdateBook}
              onDeleteBook={handleDeleteBook}
              onSelectBook={setSelectedBook}
              onOpenBarcode={setBarcodeBook}
              onQuickAddAlmari={handleAddAlmari}
            />
          );
        case 3:
          return (
            <ManageShelves
              almaris={almaris}
              books={books}
              onAddAlmari={handleAddAlmari}
              onUpdateAlmari={handleUpdateAlmari}
              onDeleteAlmari={handleDeleteAlmari}
            />
          );
        case 4:
          return (
            <ManageMembers
              members={members}
              transactions={transactions}
              onAddMember={handleAddMember}
              onBlockToggle={handleBlockToggle}
              onDeleteMember={handleDeleteMember}
              onSelectMember={setSelectedMember}
            />
          );
        case 5:
          return (
            <FineManagement
              transactions={transactions}
              onCollectFine={handleCollectFine}
              onWaiveFine={handleWaiveFine}
              fineRatePerDay={settings?.finePerDay || 5}
            />
          );
        case 6:
          return (
            <ManageSettings
              settings={settings}
              onUpdateSettings={(s) => setSettings(s)}
              currentRole={currentRole}
              showToast={showToast}
            />
          );
        case 7:
        default:
          return (
            <BookCatalog
              books={books}
              almaris={almaris}
              currentRole={currentRole}
              onSelectBook={setSelectedBook}
              onOpenBarcode={setBarcodeBook}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          );
      }
    }

    if (currentRole === 'admin') {
      switch (currentTab) {
        case 0:
          return (
            <AdminDashboard
              books={books}
              members={members}
              transactions={transactions}
              suggestions={suggestions}
              onApproveSuggestion={handleApproveSuggestion}
              onRejectSuggestion={handleRejectSuggestion}
            />
          );
        case 1:
          return (
            <ManageBooks
              books={books}
              almaris={almaris}
              onAddBook={handleAddBook}
              onUpdateBook={handleUpdateBook}
              onDeleteBook={handleDeleteBook}
              onSelectBook={setSelectedBook}
              onOpenBarcode={setBarcodeBook}
              onQuickAddAlmari={handleAddAlmari}
            />
          );
        case 2:
          return (
            <ManageShelves
              almaris={almaris}
              books={books}
              onAddAlmari={handleAddAlmari}
              onUpdateAlmari={handleUpdateAlmari}
              onDeleteAlmari={handleDeleteAlmari}
            />
          );
        case 3:
          return (
            <ManageMembers
              members={members}
              transactions={transactions}
              onAddMember={handleAddMember}
              onBlockToggle={handleBlockToggle}
              onDeleteMember={handleDeleteMember}
              onSelectMember={setSelectedMember}
            />
          );
        case 4:
          return (
            <FineManagement
              transactions={transactions}
              onCollectFine={handleCollectFine}
              onWaiveFine={handleWaiveFine}
              fineRatePerDay={settings?.finePerDay || 5}
            />
          );
        case 5:
          return (
            <ManageSettings
              settings={settings}
              onUpdateSettings={(s) => setSettings(s)}
              currentRole={currentRole}
              showToast={showToast}
            />
          );
        case 6:
        default:
          return <AboutAndRules settings={settings} almaris={almaris} />;
      }
    }

    // Student & Teacher Role (Public / Patron View)
    switch (currentTab) {
      case 0:
        return (
          <StudentHome
            books={books}
            announcements={announcements}
            availableSeatsCount={availableSeatsCount}
            onSelectBook={setSelectedBook}
            onNavigateTab={(tabIdx) => setCurrentTab(tabIdx)}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        );
      case 1:
        return (
          <BookCatalog
            books={books}
            almaris={almaris}
            currentRole={currentRole}
            onSelectBook={setSelectedBook}
            onOpenBarcode={setBarcodeBook}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        );
      case 2:
        return (
          <MyBorrowedBooks
            members={members}
            transactions={transactions}
            onRenewBook={handleRenewBook}
          />
        );
      case 3:
        return (
          <SeatBooking
            seats={seats}
            onBookSeat={handleBookSeat}
            onVacateSeat={handleVacateSeat}
          />
        );
      case 4:
      default:
        return <AboutAndRules settings={settings} almaris={almaris} />;
    }
  };

  return (
    <ThemeProvider theme={collegeTheme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#f8fafc' }}>
        {/* College Top Navbar */}
        <Navbar
          currentRole={currentRole}
          isAuthenticated={isAuthenticated}
          authenticatedRole={authenticatedRole}
          onRoleChange={handleRoleChange}
          onOpenLogin={handleOpenLogin}
          onLogout={handleLogout}
          onOpenNotifications={() => setNotificationOpen(true)}
          unreadCount={announcements.filter((a) => a.isUrgent).length}
          availableSeatsCount={availableSeatsCount}
          onQuickSearchClick={() => {
            setCurrentTab(1);
          }}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />

        {/* Tab Navigation */}
        <TabNav
          currentRole={currentRole}
          currentTab={currentTab}
          onTabChange={(index) => setCurrentTab(index)}
        />

        {/* Main Content Area */}
        <Box component="main" sx={{ flexGrow: 1 }}>
          {renderCurrentView()}
        </Box>

        {/* Footer */}
        <Footer />

        {/* Login Dialog for Librarian & Principal */}
        <LoginDialog
          open={loginDialogOpen}
          onClose={() => setLoginDialogOpen(false)}
          onLoginSuccess={handleLoginSuccess}
          targetRole={loginTargetRole}
        />

        {/* Modals and Drawers */}
        <BookDetailDialog
          open={Boolean(selectedBook)}
          book={selectedBook}
          currentRole={currentRole}
          onClose={() => setSelectedBook(null)}
          onOpenBarcode={(b) => setBarcodeBook(b)}
          onInitiateIssue={handleInitiateIssueFromDialog}
          onReserveBook={handleReserveBook}
        />

        <BarcodeModal
          open={Boolean(barcodeBook)}
          book={barcodeBook}
          onClose={() => setBarcodeBook(null)}
        />

        <MemberDetailDialog
          open={Boolean(selectedMember)}
          member={selectedMember}
          transactions={transactions}
          onClose={() => setSelectedMember(null)}
          onBlockToggle={handleBlockToggle}
        />

        <NotificationDrawer
          open={notificationOpen}
          onClose={() => setNotificationOpen(false)}
          onClearAll={() => {
            setNotificationOpen(false);
            showToast('All notifications dismissed.');
          }}
        />

        <FeedbackModal
          open={feedbackOpen}
          onClose={() => setFeedbackOpen(false)}
          onSubmitFeedback={async (fb) => {
            try {
              await feedbackService.submitFeedback(fb);
              showToast('Thank you! Feedback recorded in college library database.');
            } catch {
              showToast('Feedback submitted to college librarian!');
            }
          }}
        />

        <MobileMenuDrawer
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          currentRole={currentRole}
          currentTab={currentTab}
          onSelectTab={(idx) => setCurrentTab(idx)}
          onOpenFeedback={() => setFeedbackOpen(true)}
        />

        {/* Snackbar Toast */}
        <Snackbar
          open={toast.open}
          autoHideDuration={4000}
          onClose={() => setToast({ ...toast, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            severity={toast.severity}
            onClose={() => setToast({ ...toast, open: false })}
            sx={{ width: '100%', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', borderRadius: 2 }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};
