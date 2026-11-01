import { useEffect, useState } from 'react';
import useAuthStore from '../stores/authStore';
import useContentStore from '../stores/contentStore';

const emptyReview = { author: '', position: '', quote: '', rating: '5' };

export default function Reviews() {
  const user = useAuthStore((state) => state.user);
  const canManageReviews = ['super_admin', 'admin'].includes(user?.role);
  const { fetchContent, saveContent, error: contentError } = useContentStore();
  const [reviews, setReviews] = useState([]);
  const [draft, setDraft] = useState(emptyReview);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [reviewToRemove, setReviewToRemove] = useState(null);

  useEffect(() => {
    fetchContent('reviews')
      .then((data) => setReviews(Array.isArray(data?.reviews) ? data.reviews : []))
      .catch(() => setError('Unable to load reviews. Please try again.'))
      .finally(() => setLoading(false));
  }, [fetchContent]);

  const saveReviews = async (updatedReviews) => {
    setSaving(true);
    setError('');
    setStatus('');
    try {
      await saveContent('reviews', { reviews: updatedReviews });
      setReviews(updatedReviews);
      setStatus('Reviews saved and published.');
      return true;
    } catch (saveError) {
      setError(saveError?.response?.data?.message || 'Unable to save reviews. Please try again.');
      return false;
    } finally {
      setSaving(false);
    }
  };

  const saveReview = async (event) => {
    event.preventDefault();
    const review = {
      author: draft.author.trim(),
      position: draft.position.trim(),
      quote: draft.quote.trim(),
      rating: Number(draft.rating),
    };
    if (!review.author || !review.quote) {
      setError('Reviewer name and review text are required.');
      return;
    }
    const updatedReviews = editingIndex === null
      ? [...reviews, review]
      : reviews.map((item, index) => index === editingIndex ? review : item);
    if (await saveReviews(updatedReviews)) {
      setDraft(emptyReview);
      setEditingIndex(null);
    }
  };

  const editReview = (index) => {
    const review = reviews[index];
    setDraft({
      author: review.author || '',
      position: review.position || '',
      quote: review.quote || '',
      rating: String(Number(review.rating) || 5),
    });
    setEditingIndex(index);
    setError('');
    setStatus('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setDraft(emptyReview);
    setEditingIndex(null);
    setError('');
  };

  const confirmRemoveReview = async () => {
    if (reviewToRemove === null) return;
    const updatedReviews = reviews.filter((_, index) => index !== reviewToRemove);
    if (await saveReviews(updatedReviews)) {
      if (editingIndex === reviewToRemove) cancelEdit();
      else if (editingIndex !== null && editingIndex > reviewToRemove) setEditingIndex(editingIndex - 1);
      setReviewToRemove(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-5 font-sans sm:p-8">
      <header className="mb-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-indigo-700">Website content</p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Client Reviews</h1>
        <p className="mt-2 text-sm text-slate-500">Manage reviews displayed in the home page testimonial carousel.</p>
      </header>

      {(error || contentError) && <p role="alert" className="mb-5 rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">{error || contentError}</p>}
      {status && <p role="status" className="mb-5 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{status}</p>}

      {canManageReviews && (
        <form onSubmit={saveReview} className="mb-8 space-y-4 rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
          <h2 className="text-base font-semibold text-slate-900">{editingIndex === null ? 'Add a review' : 'Edit review'}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700">
              Reviewer name
              <input required maxLength={100} value={draft.author} onChange={(event) => setDraft({ ...draft, author: event.target.value })} className="mt-1.5 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100" />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Role or organization
              <input maxLength={120} value={draft.position} onChange={(event) => setDraft({ ...draft, position: event.target.value })} className="mt-1.5 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100" />
            </label>
          </div>
          <label className="block text-sm font-medium text-slate-700">
            Review
            <textarea required maxLength={1200} rows="4" value={draft.quote} onChange={(event) => setDraft({ ...draft, quote: event.target.value })} className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100" />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Rating
            <select value={draft.rating} onChange={(event) => setDraft({ ...draft, rating: event.target.value })} className="mt-1.5 block h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100">
              {[5, 4, 3, 2, 1].map((rating) => <option key={rating} value={rating}>{rating} {rating === 1 ? 'star' : 'stars'}</option>)}
            </select>
          </label>
          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="rounded-lg bg-indigo-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-60">
              {saving ? 'Saving…' : editingIndex === null ? 'Add review' : 'Save changes'}
            </button>
            {editingIndex !== null && <button type="button" disabled={saving} onClick={cancelEdit} className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60">Cancel edit</button>}
          </div>
        </form>
      )}

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
          <h2 className="text-base font-semibold text-slate-900">Published reviews</h2>
        </div>
        {loading ? (
          <p className="p-8 text-center text-sm text-slate-500">Loading reviews…</p>
        ) : reviews.length === 0 ? (
          <p className="p-8 text-center text-sm text-slate-500">No reviews have been added.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {reviews.map((review, index) => (
              <li key={`${review.author}-${index}`} className="flex items-start justify-between gap-5 p-5 sm:px-6">
                <div>
                  <p className="mb-1 text-sm tracking-wider text-amber-500">{'★'.repeat(Number(review.rating) || 5)}</p>
                  <blockquote className="text-sm leading-relaxed text-slate-700">{review.quote}</blockquote>
                  <p className="mt-3 text-sm font-semibold text-slate-900">{review.author}</p>
                  {review.position && <p className="mt-0.5 text-xs text-slate-500">{review.position}</p>}
                </div>
                {canManageReviews && (
                  <div className="flex shrink-0 gap-2">
                    <button type="button" disabled={saving} onClick={() => editReview(index)} className="rounded px-3 py-1.5 text-sm font-medium text-indigo-700 hover:bg-indigo-50 disabled:opacity-50">
                      Edit
                    </button>
                    <button type="button" disabled={saving} onClick={() => setReviewToRemove(index)} className="rounded px-3 py-1.5 text-sm font-medium text-rose-600 hover:bg-rose-50 disabled:opacity-50">
                      Remove
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {reviewToRemove !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !saving) setReviewToRemove(null);
          }}
        >
          <div role="dialog" aria-modal="true" aria-labelledby="remove-review-title" className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 id="remove-review-title" className="text-lg font-semibold text-slate-900">Remove this review?</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">This review will be removed from the home page. This action cannot be undone.</p>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" disabled={saving} onClick={() => setReviewToRemove(null)} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60">Cancel</button>
              <button type="button" disabled={saving} onClick={confirmRemoveReview} className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700 disabled:opacity-60">{saving ? 'Removing…' : 'Remove review'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
