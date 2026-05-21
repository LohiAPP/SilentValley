"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircle, AlertCircle, Plus, Trash2, Calendar, Clock, Loader2, Image as ImageIcon, Edit2 } from 'lucide-react';

export function AdminEventForm() {
  const [events, setEvents] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [fetching, setFetching] = useState(true);
  
  const [filterTab, setFilterTab] = useState<'all' | 'online' | 'offline'>('all');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  
  const initialFormState = {
    title: '',
    theme: 'simple',
    date: '',
    time: '',
    description: '',
    zoom_id: '',
    passcode: '',
    speaker: '',
    join_link: '',
    highlights: '',
  };
  
  const [formData, setFormData] = useState(initialFormState);
  const [file, setFile] = useState<File | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${apiUrl}/events`);
      setEvents(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    if (!formData.title || !formData.date || !formData.time) {
      setMessage({ type: 'error', text: 'Title, Date, and Time are required.' });
      setLoading(false);
      return;
    }

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'highlights' && value) {
          payload.append(key, value.toString().split(',').map(h => h.trim()).join(','));
        } else {
          payload.append(key, value as string);
        }
      });
      
      if (file) {
        payload.append('image', file);
      }

      const token = localStorage.getItem('admin_token');
      
      if (editMode && editId) {
        await axios.put(`${apiUrl}/events/${editId}`, payload, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        setMessage({ type: 'success', text: 'Event updated successfully!' });
      } else {
        await axios.post(`${apiUrl}/events`, payload, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        setMessage({ type: 'success', text: 'Event created successfully!' });
      }
      
      handleCancel();
      fetchEvents();
      setTimeout(() => setShowForm(false), 2000);
    } catch (err) {
      setMessage({ type: 'error', text: `Failed to ${editMode ? 'update' : 'create'} event. Check backend configuration.` });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event: any) => {
    setFormData({
      title: event.title || '',
      theme: event.theme || 'simple',
      date: event.date || '',
      time: event.time || '',
      description: event.description || '',
      zoom_id: event.zoom_id || '',
      passcode: event.passcode || '',
      speaker: event.speaker || '',
      join_link: event.join_link || '',
      highlights: event.highlights ? (Array.isArray(event.highlights) ? event.highlights.join(', ') : event.highlights) : '',
    });
    setEditMode(true);
    setEditId(event.id);
    setFile(null);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setFormData(initialFormState);
    setFile(null);
    setEditMode(false);
    setEditId(null);
    setShowForm(false);
    setMessage({ type: '', text: '' });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    try {
      const token = localStorage.getItem('admin_token');
      await axios.delete(`${apiUrl}/events/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchEvents();
    } catch (err) {
      alert("Failed to delete event");
    }
  };

  const filteredEvents = events.filter(e => {
    if (filterTab === 'all') return true;
    if (filterTab === 'online') return e.theme === 'zoom';
    if (filterTab === 'offline') return e.theme === 'simple';
    return true;
  });

  if (!showForm) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-serif text-white font-bold">Manage Events</h2>
          <button 
            onClick={() => setShowForm(true)}
            className="flex items-center px-6 py-2.5 bg-nature-accent text-nature-deep font-bold rounded-full hover:bg-white transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" /> Create Event
          </button>
        </div>

        <div className="flex space-x-2 mb-6">
          {['all', 'online', 'offline'].map(tab => (
            <button 
              key={tab}
              onClick={() => setFilterTab(tab as any)}
              className={`px-6 py-2 text-sm font-bold uppercase tracking-wider rounded-full transition-all ${filterTab === tab ? 'bg-nature-accent text-nature-deep shadow-lg' : 'bg-nature-light/10 text-nature-light hover:bg-nature-light/20 hover:text-white'}`}
            >
              {tab === 'all' ? 'All Events' : tab === 'online' ? 'Online Sessions' : 'Offline Retreats'}
            </button>
          ))}
        </div>

        {fetching ? (
          <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-nature-accent" /></div>
        ) : filteredEvents.length === 0 ? (
          <div className="bg-nature-light/5 border border-nature-light/10 rounded-2xl p-12 text-center">
            <p className="text-nature-light">No {filterTab !== 'all' ? filterTab : ''} events found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredEvents.map(event => (
              <div key={event.id} className="bg-nature-light/5 border border-nature-light/10 rounded-2xl overflow-hidden flex flex-col md:flex-row backdrop-blur-sm group hover:border-nature-accent/30 transition-colors">
                <div className="md:w-1/3 bg-nature-deep/50 relative">
                  {event.image_url ? (
                    <img src={event.image_url} alt={event.title} className="w-full h-full object-cover min-h-[160px]" />
                  ) : (
                    <div className="w-full h-full min-h-[160px] flex items-center justify-center bg-nature-deep text-nature-light">
                      <ImageIcon className="w-8 h-8 opacity-20" />
                    </div>
                  )}
                  <div className="absolute top-2 left-2 px-2 py-1 bg-nature-accent text-nature-deep text-xs font-bold uppercase rounded shadow-md">
                    {event.theme === 'zoom' ? 'Online' : 'Offline'}
                  </div>
                </div>
                <div className="p-6 md:w-2/3 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{event.title}</h3>
                    <div className="flex space-x-4 text-sm text-nature-light mb-4">
                      <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> {event.date}</span>
                      <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {event.time}</span>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4 space-x-3">
                    <button 
                      onClick={() => handleEdit(event)}
                      className="text-nature-accent hover:text-white hover:bg-nature-accent/20 px-3 py-1.5 rounded transition-colors flex items-center text-sm"
                    >
                      <Edit2 className="w-4 h-4 mr-1" /> Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(event.id)}
                      className="text-red-400 hover:text-white hover:bg-red-500/20 px-3 py-1.5 rounded transition-colors flex items-center text-sm"
                    >
                      <Trash2 className="w-4 h-4 mr-1" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-nature-light/5 border border-nature-light/20 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm relative">
      <div className="p-8 md:p-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-serif text-white font-bold flex items-center">
            {editMode ? 'Edit Event' : 'Create New Event'}
            <span className="ml-4 w-12 h-1 bg-nature-accent/60 rounded-full"></span>
          </h2>
          <button onClick={handleCancel} className="text-nature-light hover:text-white transition-colors">
            Cancel
          </button>
        </div>
        
        {message.text && (
          <div className={`p-4 mb-8 rounded-lg flex items-center ${message.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'}`}>
            {message.type === 'error' ? <AlertCircle className="w-5 h-5 mr-3" /> : <CheckCircle className="w-5 h-5 mr-3" />}
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 text-nature-text/90">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-nature-light mb-2 uppercase tracking-wider">Event Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full bg-nature-deep/50 border border-nature-light/20 rounded-lg p-3 text-white focus:outline-none focus:border-nature-accent transition-colors" placeholder="e.g. Full Moon Meditation" />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-nature-light mb-2 uppercase tracking-wider">Theme</label>
              <select name="theme" value={formData.theme} onChange={handleChange} className="w-full bg-nature-deep/50 border border-nature-light/20 rounded-lg p-3 text-white focus:outline-none focus:border-nature-accent transition-colors">
                <option value="simple">Offline Retreat (In-person)</option>
                <option value="zoom">Online Session (Virtual)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-nature-light mb-2 uppercase tracking-wider">Date</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full bg-nature-deep/50 border border-nature-light/20 rounded-lg p-3 text-white focus:outline-none focus:border-nature-accent transition-colors scheme-dark" />
            </div>

            <div>
              <label className="block text-sm font-medium text-nature-light mb-2 uppercase tracking-wider">Time</label>
              <input type="time" name="time" value={formData.time} onChange={handleChange} className="w-full bg-nature-deep/50 border border-nature-light/20 rounded-lg p-3 text-white focus:outline-none focus:border-nature-accent transition-colors scheme-dark" />
            </div>
            
            <div className="col-span-2 bg-nature-deep/30 p-6 rounded-xl border border-nature-light/10">
              <label className="block text-sm font-medium text-nature-light mb-2 uppercase tracking-wider">Event Cover Image {editMode ? '(Leave blank to keep existing)' : '(Optional)'}</label>
              <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} className="w-full text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-nature-accent file:text-nature-deep file:font-bold hover:file:bg-white cursor-pointer" />
              <p className="text-xs text-nature-light/60 mt-2">Recommended ratio: 16:9 or Square. This image will be uploaded to Cloudinary.</p>
            </div>

            {/* Conditional Fields based on theme */}
            {formData.theme === 'simple' && (
              <>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-nature-light mb-2 uppercase tracking-wider">Description</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full bg-nature-deep/50 border border-nature-light/20 rounded-lg p-3 text-white focus:outline-none focus:border-nature-accent transition-colors" placeholder="Join us for a silent retreat..."></textarea>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-nature-light mb-2 uppercase tracking-wider">Location / Map Link</label>
                  <input type="text" name="join_link" value={formData.join_link} onChange={handleChange} className="w-full bg-nature-deep/50 border border-nature-light/20 rounded-lg p-3 text-white focus:outline-none focus:border-nature-accent transition-colors" placeholder="https://maps.google.com/..." />
                </div>
              </>
            )}

            {formData.theme === 'zoom' && (
              <>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-nature-light mb-2 uppercase tracking-wider">Speaker Name</label>
                  <input type="text" name="speaker" value={formData.speaker} onChange={handleChange} className="w-full bg-nature-deep/50 border border-nature-light/20 rounded-lg p-3 text-white focus:outline-none focus:border-nature-accent transition-colors" placeholder="e.g. Prakruthi Uma Mahesh" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-nature-light mb-2 uppercase tracking-wider">Zoom ID</label>
                  <input type="text" name="zoom_id" value={formData.zoom_id} onChange={handleChange} className="w-full bg-nature-deep/50 border border-nature-light/20 rounded-lg p-3 text-white focus:outline-none focus:border-nature-accent transition-colors" placeholder="123 456 7890" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-nature-light mb-2 uppercase tracking-wider">Passcode</label>
                  <input type="text" name="passcode" value={formData.passcode} onChange={handleChange} className="w-full bg-nature-deep/50 border border-nature-light/20 rounded-lg p-3 text-white focus:outline-none focus:border-nature-accent transition-colors" placeholder="123456" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-nature-light mb-2 uppercase tracking-wider">Highlights (comma separated)</label>
                  <textarea name="highlights" value={formData.highlights} onChange={handleChange} rows={2} className="w-full bg-nature-deep/50 border border-nature-light/20 rounded-lg p-3 text-white focus:outline-none focus:border-nature-accent transition-colors" placeholder="Meditation, Q&A, Experience Sharing..."></textarea>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-nature-light mb-2 uppercase tracking-wider">Direct Join Link</label>
                  <input type="url" name="join_link" value={formData.join_link} onChange={handleChange} className="w-full bg-nature-deep/50 border border-nature-light/20 rounded-lg p-3 text-white focus:outline-none focus:border-nature-accent transition-colors" placeholder="https://zoom.us/j/..." />
                </div>
              </>
            )}
          </div>

          <div className="pt-8 flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-8 py-3 bg-nature-accent text-nature-deep font-bold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex justify-center items-center disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {loading && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
              {loading ? (editMode ? 'Updating...' : 'Creating...') : (editMode ? 'Update Event' : 'Publish Event')}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-8 py-3 bg-transparent border border-nature-light/30 text-nature-light font-bold rounded-full hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
