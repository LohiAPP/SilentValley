"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, UploadCloud, Loader2 } from 'lucide-react';

export function AdminGalleryForm() {
  const [images, setImages] = useState<any[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [category, setCategory] = useState('Retreats');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await axios.get(`${apiUrl}/gallery`);
      setImages(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) return alert('Please select at least one image');
    
    setLoading(true);
    const token = localStorage.getItem('admin_token');
    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file);
    });
    formData.append('category', category);
    formData.append('title', title);

    try {
      await axios.post(`${apiUrl}/gallery`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert(`${files.length} image(s) uploaded successfully!`);
      setFiles([]);
      setTitle('');
      fetchGallery();
    } catch (err) {
      alert('Upload failed. Ensure backend Cloudinary config is set.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this image?')) return;
    const token = localStorage.getItem('admin_token');
    try {
      await axios.delete(`${apiUrl}/gallery/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchGallery();
    } catch (err) {
      alert('Failed to delete.');
    }
  };

  return (
    <div className="space-y-12">
      {/* Upload Form */}
      <div className="bg-nature-light/5 border border-nature-light/20 rounded-2xl p-8 backdrop-blur-sm">
        <h3 className="text-2xl font-serif text-white mb-6">Upload New Image</h3>
        <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs uppercase text-nature-light mb-2">Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-nature-deep/50 border border-nature-light/20 p-3 rounded-lg text-white outline-none">
              <option value="Retreats">Retreats</option>
              <option value="Nature">Nature</option>
              <option value="Pyramid">Pyramid</option>
              <option value="People">People</option>
            </select>
          </div>
          <div>
            <label className="block text-xs uppercase text-nature-light mb-2">Title (Optional)</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-nature-deep/50 border border-nature-light/20 p-3 rounded-lg text-white outline-none" placeholder="e.g. Morning Meditation" />
          </div>
          <div>
            <label className="block text-xs uppercase text-nature-light mb-2">Image File</label>
            <input type="file" multiple accept="image/*" onChange={e => setFiles(Array.from(e.target.files || []))} className="w-full text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-nature-accent file:text-nature-deep file:font-bold hover:file:bg-white cursor-pointer" />
          </div>
          <div className="md:col-span-3">
            <button type="submit" disabled={loading} className="px-8 py-3 bg-nature-accent text-nature-deep font-bold rounded-full hover:bg-white transition-colors flex items-center w-max">
              {loading ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> : <UploadCloud className="w-5 h-5 mr-2" />}
              {loading ? 'Uploading...' : files.length > 0 ? `Upload ${files.length} Image${files.length > 1 ? 's' : ''}` : 'Upload to Gallery'}
            </button>
          </div>
        </form>
      </div>

      {/* Gallery Grid */}
      <div>
        <h3 className="text-2xl font-serif text-white mb-6">Manage Existing Images</h3>
        {fetching ? <Loader2 className="animate-spin text-nature-accent w-8 h-8" /> : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {images.map(img => (
              <div key={img.id} className="relative group rounded-xl overflow-hidden aspect-square border border-nature-light/10">
                <img src={img.image_url} alt={img.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
                  <div>
                    <span className="bg-nature-accent text-nature-deep text-xs font-bold px-2 py-1 rounded">{img.category}</span>
                  </div>
                  <button onClick={() => handleDelete(img.id)} className="bg-red-500 text-white p-2 rounded-full self-end hover:bg-red-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
