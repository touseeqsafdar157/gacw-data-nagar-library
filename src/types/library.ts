export type UserRole = 'student' | 'teacher' | 'librarian' | 'admin';

export interface Almari {
  id: string;
  almariCode: string; // e.g. "Almari #04"
  name: string; // e.g. "CS & IT Cabinet"
  department: string; // e.g. "Computer Science"
  locationDesc: string; // e.g. "IT & Digital Corner"
  shelves: string[]; // e.g. ["Shelf 1 (Top Rack)", "Shelf 2 (Middle Rack)", "Shelf 3 (Bottom Rack)"]
}

export interface Book {
  id: string;
  accessionNo: string; // e.g. "ACC-2024-0104"
  title: string;
  author: string;
  isbn: string;
  category: string; // e.g. "Computer Science", "Urdu Literature", "Physics", "Islamiat"
  department: string;
  almariNo: string; // e.g. "Almari #04 (CS & IT Cabinet)"
  shelfNo: string; // e.g. "Shelf 3 (Top Rack)"
  publisher: string;
  edition: string;
  year: number;
  totalCopies: number;
  availableCopies: number;
  language: 'English' | 'Urdu' | 'Arabic' | 'Other';
  condition: 'Brand New' | 'Good' | 'Fair' | 'Under Repair';
  isReferenceOnly: boolean; // Not issuable for students
  coverUrl: string;
  description: string;
  priceRs: number;
  callNumber: string; // DDC Classification e.g. "005.133 COR"
}

export interface Member {
  id: string;
  rollNo: string; // e.g. "2024-ICS-042" or "FAC-ENG-08"
  name: string;
  fatherName?: string;
  role: 'student' | 'teacher';
  email: string;
  phone: string;
  classGrade: string; // e.g. "1st Year (ICS)", "2nd Year (FSc Pre-Med)", "BS Computer Science (4th Sem)"
  section: string; // e.g. "Section A", "Section B", "Section C"
  shift: 'Morning' | 'Evening';
  department: string; // e.g. "Computer Science", "Urdu", "Physics", "Commerce"
  status: 'Active' | 'Blocked' | 'Graduated';
  issuedBooksCount: number;
  maxAllowedBooks: number;
  joinedDate: string;
  libraryCardNo: string;
}

export interface BorrowTransaction {
  id: string;
  transactionNo: string;
  bookId: string;
  bookTitle: string;
  bookAccessionNo: string;
  almariLocation: string;
  memberId: string;
  memberRollNo: string;
  memberName: string;
  memberClass: string;
  memberSection: string;
  memberRole: 'student' | 'teacher';
  issueDate: string; // YYYY-MM-DD
  dueDate: string;   // YYYY-MM-DD
  returnDate?: string; // YYYY-MM-DD
  status: 'Active' | 'Returned' | 'Overdue';
  fineAmount: number;
  fineStatus: 'None' | 'Pending' | 'Paid' | 'Waived';
  issuedByStaff: string;
  renewCount: number;
}

export interface ReadingRoomSeat {
  id: number;
  seatNumber: string; // e.g. "S-01" to "S-60"
  zone: 'Window Side' | 'Quiet Study Zone' | 'Discussion Corner' | 'Digital Research';
  status: 'Available' | 'Occupied' | 'Reserved';
  currentOccupantRollNo?: string;
  currentOccupantName?: string;
  bookedUntil?: string;
}

export interface DigitalResource {
  id: string;
  title: string;
  type: 'Past Paper' | 'E-Book' | 'Lecture Notes' | 'Syllabus' | 'Model Paper';
  subject: string;
  classGrade: string;
  boardOrUniversity: string; // e.g. "BISE Lahore", "Punjab University"
  year: string;
  pages: number;
  fileSizeMb: number;
  downloadUrl: string;
  viewsCount: number;
}

export interface LibraryAnnouncement {
  id: string;
  title: string;
  date: string;
  category: 'Notice' | 'Timing' | 'New Arrivals' | 'Exam Preparation' | 'Holiday';
  content: string;
  isUrgent: boolean;
}

export interface BookSuggestion {
  id: string;
  title: string;
  author: string;
  suggestedByRollNo: string;
  suggestedByName: string;
  studentClass: string;
  department: string;
  reason: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Procured' | 'Rejected';
}
