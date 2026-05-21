import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, Plus, Trash2, Book, AlertCircle, FileText, Image as ImageIcon } from 'lucide-react';

interface BookData {
  id: number;
  title: string;
  description: string | null;
  cover_image_url: string | null;
  book_file_url: string | null;
  created_at: string;
}

export function AdminBookForm() {
  const [books, setBooks] = useState<BookData[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [bookFile, setBookFile] = useState<File | null>(null);
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await axios.get(`${apiUrl}/books`);
      setBooks(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    if (!bookFile) {
      setError('Book file (PDF) is required');
      setSaving(false);
      return;
    }

    try {
      const token = localStorage.getItem('admin_token');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      if (coverFile) formData.append('cover', coverFile);
      formData.append('file', bookFile);

      await axios.post(
        `${apiUrl}/books`,
        formData,
        { 
          headers: { 
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}` 
          } 
        }
      );
      
      setSuccess('Book added successfully!');
      setTitle('');
      setDescription('');
      setCoverFile(null);
      setBookFile(null);
      
      // Reset file inputs
      const fileInputs = document.querySelectorAll('input[type="file"]');
      fileInputs.forEach((input: any) => { input.value = ''; });
      
      fetchBooks();
    } catch (err) {
      console.error(err);
      setError('Failed to add book. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;
    
    try {
      const token = localStorage.getItem('admin_token');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      
      await axios.delete(`${apiUrl}/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBooks();
    } catch (err) {
      console.error(err);
      setError('Failed to delete book');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Upload Form */}
      <div className="lg:col-span-1">
        <form onSubmit={handleSubmit} className="bg-nature-deep/50 border border-nature-light/10 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
          <h2 className="text-2xl font-serif font-bold text-white mb-6 flex items-center gap-2">
            <Book className="text-nature-accent" /> Add New Book
          </h2>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 flex items-center gap-3">
              <AlertCircle size={20} />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-nature-accent/10 border border-nature-accent/20 rounded-xl text-nature-accent flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-nature-accent animate-pulse" />
              <p className="text-sm font-medium">{success}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-nature-light mb-1">Book Title <span className="text-red-400">*</span></label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. The Path to Silence"
                className="w-full bg-black/20 border border-nature-light/20 rounded-xl px-4 py-3 text-white placeholder-nature-light/30 focus:outline-none focus:border-nature-accent transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-nature-light mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the book..."
                rows={3}
                className="w-full bg-black/20 border border-nature-light/20 rounded-xl px-4 py-3 text-white placeholder-nature-light/30 focus:outline-none focus:border-nature-accent transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-nature-light mb-1">Cover Image (Optional)</label>
              <div className="relative group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
                  className="w-full bg-black/20 border border-nature-light/20 rounded-xl px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-nature-light/10 file:text-nature-light hover:file:bg-nature-light/20 cursor-pointer"
                />
                <ImageIcon className="absolute right-4 top-1/2 -translate-y-1/2 text-nature-light/30 pointer-events-none" size={20} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-nature-light mb-1">Book File (PDF) <span className="text-red-400">*</span></label>
              <div className="relative group">
                <input
                  type="file"
                  required
                  accept=".pdf"
                  onChange={(e) => setBookFile(e.target.files?.[0] || null)}
                  className="w-full bg-black/20 border border-nature-light/20 rounded-xl px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-nature-accent/10 file:text-nature-accent hover:file:bg-nature-accent/20 cursor-pointer"
                />
                <FileText className="absolute right-4 top-1/2 -translate-y-1/2 text-nature-accent/30 pointer-events-none" size={20} />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-nature-accent text-nature-deep font-bold py-3 px-4 rounded-xl hover:bg-white transition-colors duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {saving ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
              {saving ? 'Adding...' : 'Add Book'}
            </button>
          </div>
        </form>
      </div>

      {/* Books List */}
      <div className="lg:col-span-2">
        <div className="bg-nature-deep/50 border border-nature-light/10 rounded-2xl p-6 shadow-xl backdrop-blur-sm min-h-[500px]">
          <h2 className="text-2xl font-serif font-bold text-white mb-6">Book Library</h2>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-nature-accent" />
            </div>
          ) : books.length === 0 ? (
            <div className="text-center py-12 bg-black/20 rounded-xl border border-white/5">
              <Book className="w-12 h-12 text-nature-light/30 mx-auto mb-4" />
              <p className="text-nature-light">No books uploaded yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {books.map((book) => (
                <div key={book.id} className="group relative rounded-xl overflow-hidden bg-black/40 border border-nature-light/10 flex gap-4 p-4">
                  <div className="w-24 h-32 relative shrink-0 rounded-lg overflow-hidden bg-nature-deep border border-nature-light/10">
                    {book.cover_image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img 
                        src={book.cover_image_url} 
                        alt={book.title} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Book className="w-8 h-8 text-nature-light/30" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => handleDelete(book.id)}
                        className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-xl"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                    <div>
                      <h3 className="text-white text-lg font-serif font-medium truncate group-hover:text-nature-accent transition-colors">
                        {book.title}
                      </h3>
                      {book.description && (
                        <p className="text-nature-light/60 text-sm mt-1 line-clamp-2">{book.description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-nature-accent text-xs font-mono">
                      <FileText size={14} />
                      <span className="truncate max-w-[150px]">
                        {book.book_file_url?.split('/').pop()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
