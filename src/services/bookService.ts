import { api } from './api';
import { Book } from '../types/library';

export const bookService = {
  async getBooks(params?: { search?: string; category?: string; department?: string; availableOnly?: boolean }) {
    const res = await api.get<{ success: boolean; count: number; data: Book[] }>('/books', params);
    return res.data;
  },

  async getBookById(id: string) {
    const res = await api.get<{ success: boolean; data: Book }>(`/books/${id}`);
    return res.data;
  },

  async getCategories() {
    const res = await api.get<{ success: boolean; data: string[] }>('/books/categories');
    return res.data;
  },

  async createBook(book: Partial<Book>) {
    const res = await api.post<{ success: boolean; message: string; data: Book }>('/books', book);
    return res.data;
  },

  async updateBook(id: string, book: Partial<Book>) {
    const res = await api.put<{ success: boolean; message: string; data: Book }>(`/books/${id}`, book);
    return res.data;
  },

  async deleteBook(id: string) {
    const res = await api.delete<{ success: boolean; message: string }>(`/books/${id}`);
    return res;
  }
};
