import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, Plus, Trash2, Video, AlertCircle } from 'lucide-react';

interface VideoData {
  id: number;
  youtube_url: string;
  title: string | null;
  created_at: string;
}

export function AdminVideoForm() {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [title, setTitle] = useState('');
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await axios.get(`${apiUrl}/videos`);
      setVideos(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch videos');
    } finally {
      setLoading(false);
    }
  };

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    const videoId = getYoutubeId(youtubeUrl);
    if (!videoId) {
      setError('Invalid YouTube URL');
      setSaving(false);
      return;
    }

    try {
      const token = localStorage.getItem('admin_token');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      
      await axios.post(
        `${apiUrl}/videos`,
        { youtube_url: youtubeUrl, title },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setSuccess('Video added successfully!');
      setYoutubeUrl('');
      setTitle('');
      fetchVideos();
    } catch (err) {
      console.error(err);
      setError('Failed to add video. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this video?')) return;
    
    try {
      const token = localStorage.getItem('admin_token');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      
      await axios.delete(`${apiUrl}/videos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchVideos();
    } catch (err) {
      console.error(err);
      setError('Failed to delete video');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Upload Form */}
      <div className="lg:col-span-1">
        <form onSubmit={handleSubmit} className="bg-nature-deep/50 border border-nature-light/10 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
          <h2 className="text-2xl font-serif font-bold text-white mb-6 flex items-center gap-2">
            <Video className="text-nature-accent" /> Add New Video
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
              <label className="block text-sm font-medium text-nature-light mb-1">YouTube URL <span className="text-red-400">*</span></label>
              <input
                type="text"
                required
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full bg-black/20 border border-nature-light/20 rounded-xl px-4 py-3 text-white placeholder-nature-light/30 focus:outline-none focus:border-nature-accent transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-nature-light mb-1">Title (Optional)</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Meditation Guide"
                className="w-full bg-black/20 border border-nature-light/20 rounded-xl px-4 py-3 text-white placeholder-nature-light/30 focus:outline-none focus:border-nature-accent transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-nature-accent text-nature-deep font-bold py-3 px-4 rounded-xl hover:bg-white transition-colors duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {saving ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
              {saving ? 'Adding...' : 'Add Video'}
            </button>
          </div>
        </form>
      </div>

      {/* Videos List */}
      <div className="lg:col-span-2">
        <div className="bg-nature-deep/50 border border-nature-light/10 rounded-2xl p-6 shadow-xl backdrop-blur-sm min-h-[500px]">
          <h2 className="text-2xl font-serif font-bold text-white mb-6">Video Library</h2>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-nature-accent" />
            </div>
          ) : videos.length === 0 ? (
            <div className="text-center py-12 bg-black/20 rounded-xl border border-white/5">
              <Video className="w-12 h-12 text-nature-light/30 mx-auto mb-4" />
              <p className="text-nature-light">No videos uploaded yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {videos.map((video) => {
                const videoId = getYoutubeId(video.youtube_url);
                const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '';

                return (
                  <div key={video.id} className="group relative rounded-xl overflow-hidden bg-black/40 border border-nature-light/10">
                    <div className="aspect-video relative overflow-hidden">
                      {thumbnailUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img 
                          src={thumbnailUrl} 
                          alt={video.title || "Video"} 
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-black/60">
                          <Video className="w-8 h-8 text-nature-light/50" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          onClick={() => handleDelete(video.id)}
                          className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-xl transform scale-90 group-hover:scale-100 duration-300"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-white text-sm font-medium truncate">{video.title || "Untitled Video"}</p>
                      <p className="text-nature-light/60 text-xs mt-1 truncate">{video.youtube_url}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
