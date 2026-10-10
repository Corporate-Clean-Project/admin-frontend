import { useRef, useState } from 'react';
import { saveContent } from '../api/content';

const initialCredentials = [
  'Master Joinery Guild',
  'Structural Masonry Cert',
  'Architectural Contracting',
];

const initialTags = [
  'Architectural Millwork & Smoked Oak',
  'Fluted Stone & Bookmatched Marble',
  'Hand-Aged Brushed Brass',
];

const initialMilestones = [
  { year: '2010', title: 'Foundation', details: 'Started career with a rigorous focus on quality, meticulous attention to structural carpentry, and residential restorations.' },
  { year: '2015', title: 'Guild & Scale Expansion', details: 'Expanded operational capacity and assembled elite tradesmen, mastering complex bespoke cabinetry and private architectural commissions.' },
  { year: '2018', title: 'Prestige Architecture', details: 'Built a trusted, premier reputation through dedication, executing full-scale penthouse and estate architecture in high-demand metropolitan enclaves.' },
  { year: '2024', title: 'Benchmark (Present)', details: 'Continuing to grow, innovate sustainable luxury fabrication, and set gold benchmarks for high-integrity architectural millwork and finishes.' },
];

const initialGallery = [
  { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=400&h=300', title: 'Highland Kitchen & Wine Vault', category: 'Culinary Architecture' },
  { src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400&h=300', title: 'Noir Marble Sanctuary', category: 'Stonework & Wellness' },
  { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=400&h=300', title: 'Yorkville Monolith Estate', category: 'Private Residence' },
  { src: '', title: '', category: 'Private Residence' },
];

export default function AboutUsCms() {
  const formRef = useRef(null);
  const portraitInputRef = useRef(null);
  const workshopInputRef = useRef(null);
  const galleryInputRefs = useRef([]);
  const bioRef = useRef(null);
  const [credentials, setCredentials] = useState(initialCredentials);
  const [tags, setTags] = useState(initialTags);
  const [milestones, setMilestones] = useState(initialMilestones);
  const [milestoneDraft, setMilestoneDraft] = useState(null);
  const [milestoneError, setMilestoneError] = useState('');
  const [gallery, setGallery] = useState(initialGallery);
  const [portrait, setPortrait] = useState('');
  const [workshopImage, setWorkshopImage] = useState('');
  const [cropWorkshop, setCropWorkshop] = useState(false);
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);

  const addChip = (event, setItems) => {
    if (event.key !== 'Enter' && event.key !== ',') return;
    event.preventDefault();
    const value = event.currentTarget.value.trim().replace(/,$/, '');
    if (value) {
      setItems((items) => items.includes(value) ? items : [...items, value]);
      event.currentTarget.value = '';
    }
  };

  const handleImageSelection = (event, setImage) => {
    const [file] = event.target.files || [];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setStatus('Please select an image file.');
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setStatus('Image must be 20 MB or smaller.');
      return;
    }
    setImage(URL.createObjectURL(file));
    event.target.value = '';
  };

  const handleGallerySelection = (index, event) => {
    const [file] = event.target.files || [];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setStatus('Please select an image file.');
      return;
    }
    const src = URL.createObjectURL(file);
    setGallery((items) => {
      const updated = [...items];
      updated[index] = { ...(updated[index] || { title: '', category: 'Private Residence' }), src };
      return updated;
    });
    event.target.value = '';
  };

  const handleGalleryFiles = (files) => {
    const availableSlots = 4 - gallery.filter((item) => item?.src).length;
    const fileList = Array.from(files);
    const selectedFiles = fileList.filter((file) => file.type.startsWith('image/') && file.size <= 20 * 1024 * 1024).slice(0, availableSlots);
    if (selectedFiles.length === 0) {
      setStatus(availableSlots === 0
        ? 'All four gallery slots are in use. Remove an image before adding another.'
        : fileList.some((file) => file.size > 20 * 1024 * 1024)
          ? 'Image files must be 20 MB or smaller.'
          : 'Please select image files.');
      return;
    }
    setGallery((items) => {
      const updated = [...items];
      for (const file of selectedFiles) {
        const emptyIndex = updated.findIndex((item) => !item?.src);
        const index = emptyIndex === -1 ? updated.length : emptyIndex;
        updated[index] = { src: URL.createObjectURL(file), title: file.name.replace(/\.[^.]+$/, ''), category: 'Private Residence' };
      }
      return updated;
    });
  };

  const addMilestone = () => setMilestoneDraft({ index: null, year: '', title: '', details: '' });

  const editMilestone = (index) => {
    setMilestoneDraft({ index, ...milestones[index] });
  };

  const saveMilestoneDraft = () => {
    const { index, year, title, details } = milestoneDraft;
    const milestone = { year: year.trim(), title: title.trim(), details: details.trim() };
    if (!milestone.year || !milestone.title || !milestone.details) {
      setMilestoneError('Complete all fields before saving.');
      return;
    }
    if (index === null) {
      setMilestones((items) => [...items, milestone]);
    } else {
      setMilestones((items) => items.map((item, itemIndex) => itemIndex === index ? milestone : item));
    }
    setMilestoneDraft(null);
    setMilestoneError('');
  };

  const saveChanges = async (event) => {
    event.preventDefault();
    setSaving(true);
    setStatus('');
    const fields = Array.from(formRef.current.elements).reduce((values, field, index) => {
      if (!['INPUT', 'TEXTAREA', 'SELECT'].includes(field.tagName) || field.type === 'file') return values;
      const label = field.name ||
        field.labels?.[0]?.textContent.trim() ||
        field.closest('div')?.querySelector('label')?.textContent.trim().replace(/\s+/g, '_').toLowerCase() ||
        `field_${index}`;
      values[label] = field.value;
      return values;
    }, {});
    try {
      await saveContent('about-us', {
        ...fields,
        founderPortrait: portrait.startsWith('blob:') ? '' : portrait,
        workshopImage: workshopImage.startsWith('blob:') ? '' : workshopImage,
        credentials,
        tags,
        milestones,
        gallery: gallery.map((project) => ({
          ...project,
          src: project.src.startsWith('blob:') ? '' : project.src,
        })),
      });
      const hasLocalImage = portrait.startsWith('blob:') || workshopImage.startsWith('blob:') || gallery.some((project) => project.src.startsWith('blob:'));
      setStatus(hasLocalImage
        ? 'Content saved. Newly selected images are local previews and were not uploaded.'
        : 'About Us content saved and published.');
    } catch (error) {
      setStatus(error.response?.data?.message || 'Unable to save About Us content. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const discardChanges = () => {
    if (!window.confirm('Discard all unsaved changes?')) return;
    formRef.current?.reset();
    setCredentials(initialCredentials);
    setTags(initialTags);
    setMilestones(initialMilestones);
    setMilestoneDraft(null);
    setGallery(initialGallery);
    setPortrait('');
    setWorkshopImage('');
    setCropWorkshop(false);
    setStatus('Unsaved changes discarded.');
  };

  const applyBioFormatting = (format) => {
    const field = bioRef.current;
    if (!field) return;
    const start = field.selectionStart;
    const end = field.selectionEnd;
    const selectedText = field.value.slice(start, end);
    const wrapper = format === 'link' ? '[' : format === 'quote' ? '> ' : format;
    const suffix = format === 'link' ? '](url)' : format === 'quote' ? '' : format;
    const replacement = format === 'link' ? `${wrapper}${selectedText || 'link text'}${suffix}` : `${wrapper}${selectedText || 'text'}${suffix}`;
    field.setRangeText(replacement, start, end, 'select');
    field.focus();
  };

  return (
    <form ref={formRef} onSubmit={saveChanges} className="p-8 font-sans bg-slate-50 min-h-screen">

      {/* Top Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 opacity-0 hidden">About Us CMS</h1>
        <div className="flex items-center gap-4">
          <button type="button" title="Preview About Us page" onClick={() => window.open('https://toppristine.com/about-us', '_blank', 'noopener,noreferrer')} className="flex items-center gap-2 p-2 rounded hover:bg-slate-200 text-slate-500 transition-colors">
            <span className="material-symbols-outlined text-[18px]">open_in_new</span>
          </button>
          <button type="button" onClick={discardChanges} className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">refresh</span> Discard Changes
          </button>
          <button type="submit" disabled={saving} className="px-5 py-2 text-sm font-bold text-white bg-indigo-700 rounded-lg shadow-sm hover:bg-indigo-800 disabled:opacity-60 flex items-center gap-2 transition-colors">
            <span className="material-symbols-outlined text-[16px]">save</span> {saving ? 'Publishing…' : 'Save & Publish Changes'}
          </button>
        </div>
      </div>
      {status && <p role="status" className="mb-4 rounded-lg bg-white px-4 py-2 text-sm text-slate-700 shadow-sm">{status}</p>}

      <div className="max-w-full mx-auto space-y-8 pb-12">

        {/* Section 1 */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-indigo-600 text-white flex items-center justify-center shadow-inner">
                <span className="material-symbols-outlined text-[18px]">person</span>
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">Section 1: Founder Spotlight & Bio</h2>
                <p className="text-[10px] text-slate-500">Manage principal persona attributes, portrait asset, verified credentials, and editorial narrative.</p>
              </div>
            </div>
            <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Primary Profile</span>
          </div>

          <div className="p-6 flex gap-8">
            <div className="w-1/3 flex flex-col gap-2">
              <p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">Executive Headshot</p>
              <div className="w-full aspect-[3/4] bg-slate-200 rounded-lg overflow-hidden flex flex-col items-center justify-center text-slate-400 relative">
                {portrait ? <img src={portrait} alt="Founder portrait preview" className="w-full h-full object-cover" /> : <span className="font-bold text-xs">No portrait selected</span>}
              </div>
              <input ref={portraitInputRef} type="file" accept="image/*" className="hidden" onChange={(event) => handleImageSelection(event, setPortrait)} />
              <div className="flex items-center gap-2 mt-2">
                <button type="button" onClick={() => portraitInputRef.current?.click()} className="flex-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold py-2 rounded flex items-center justify-center gap-2 transition-colors">
                  <span className="material-symbols-outlined text-[14px]">image</span> Upload New Photo
                </button>
                <button type="button" onClick={() => setPortrait('')} aria-label="Remove founder portrait" className="bg-slate-100 hover:bg-slate-200 text-slate-500 w-8 h-8 rounded flex items-center justify-center transition-colors">
                  <span className="material-symbols-outlined text-[14px]">delete</span>
                </button>
              </div>
            </div>

            <div className="flex-1 space-y-5">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-[10px] font-bold tracking-wider text-slate-500 uppercase block mb-1">Founder Full Name</label>
                  <input name="founderName" type="text" className="w-full text-sm font-medium bg-slate-50 border border-slate-100 rounded px-3 py-2 text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" defaultValue="Julian Vance" />
                </div>
                <div className="flex-1">
                  <label className="text-[10px] font-bold tracking-wider text-slate-500 uppercase block mb-1">Executive Title</label>
                  <input name="founderTitle" type="text" className="w-full text-sm font-medium bg-slate-50 border border-slate-100 rounded px-3 py-2 text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" defaultValue="Principal Craftsman & Founder" />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-1">
                  <label className="text-[10px] font-bold tracking-wider text-slate-500 uppercase block">Credentials & Certifications</label>
                  <span className="text-[10px] text-slate-400">Press Enter or comma to create chip</span>
                </div>
                <div className="w-full bg-slate-50 border border-slate-100 rounded p-2 flex flex-wrap gap-2">
                  {credentials.map((item) => <span key={item} className="bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">{item}<button type="button" onClick={() => setCredentials((items) => items.filter((entry) => entry !== item))} aria-label={`Remove ${item}`} className="material-symbols-outlined text-[12px] hover:text-rose-500">close</button></span>)}
                  <input type="text" placeholder="+ Add certification..." onKeyDown={(event) => addChip(event, setCredentials)} className="bg-transparent text-[11px] outline-none min-w-[120px]" />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold tracking-wider text-slate-500 uppercase block mb-1">Public Biography Narrative</label>
                <div className="w-full border border-slate-200 rounded overflow-hidden">
                  <div className="bg-slate-50 border-b border-slate-200 px-3 py-1.5 flex items-center gap-3 text-slate-500">
                    <button type="button" onClick={() => applyBioFormatting('**')} aria-label="Bold selected text" className="material-symbols-outlined text-[14px] hover:text-slate-900">format_bold</button>
                    <button type="button" onClick={() => applyBioFormatting('_')} aria-label="Italicize selected text" className="material-symbols-outlined text-[14px] hover:text-slate-900">format_italic</button>
                    <button type="button" onClick={() => applyBioFormatting('link')} aria-label="Insert link" className="material-symbols-outlined text-[14px] hover:text-slate-900">link</button>
                    <button type="button" onClick={() => applyBioFormatting('quote')} aria-label="Quote selected text" className="material-symbols-outlined text-[14px] hover:text-slate-900">format_quote</button>
                    <span className="text-[10px] font-mono ml-auto">Markdown & Rich text supported</span>
                  </div>
                  <textarea ref={bioRef} name="biography" className="w-full h-32 p-3 text-sm text-slate-800 bg-indigo-50/30 focus:outline-none resize-none leading-relaxed" defaultValue="Over the past decade and a half, Top Pristine has evolved into a private atelier of elite master carpenters and stonemasons. Under the direct supervision of Julian Vance, every commission marries timeless hand-carved joinery with precise, ultra-modern structural specifications for the world's most discerning residences."></textarea>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold tracking-wider text-slate-500 uppercase block mb-1">Key Performance Stats (Public Badges)</label>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-slate-50 border border-slate-100 rounded p-2">
                    <p className="text-[9px] font-bold uppercase text-slate-400 mb-1">Numeric Stat 1</p>
                    <input name="statOne" type="text" className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-sm font-bold text-slate-900 text-center" defaultValue="15+ Years Mastery" />
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded p-2">
                    <p className="text-[9px] font-bold uppercase text-slate-400 mb-1">Numeric Stat 2</p>
                    <input name="statTwo" type="text" className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-sm font-bold text-slate-900 text-center" defaultValue="180+ Estates Crafted" />
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded p-2">
                    <p className="text-[9px] font-bold uppercase text-slate-400 mb-1">Numeric Stat 3</p>
                    <input name="statThree" type="text" className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-sm font-bold text-slate-900 text-center" defaultValue="100% Direct Oversight" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-teal-600 text-white flex items-center justify-center shadow-inner">
                <span className="material-symbols-outlined text-[18px]">construction</span>
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">Section 2: Workshop &amp; Studio Imagery (&quot;The Alchemy of Raw Materials&quot;)</h2>
                <p className="text-[10px] text-slate-500">Artisanal atelier showcase illustrating bespoke materials, hand tooling, and architectural sample bays.</p>
              </div>
            </div>
            <span className="bg-teal-50 text-teal-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Atelier Feature</span>
          </div>

          <div className="p-6 flex gap-8">
            <div className="w-1/2 flex flex-col gap-2">
              <div className="w-full aspect-[4/3] bg-slate-200 rounded-lg overflow-hidden flex flex-col items-center justify-center text-slate-400 relative">
                {workshopImage ? <img src={workshopImage} alt="Workshop image preview" className={`w-full h-full ${cropWorkshop ? 'object-cover scale-110' : 'object-cover'}`} /> : <span className="font-bold text-xs">No workshop image selected</span>}
                <div className="absolute bottom-3 left-3 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded shadow">Workshop Bench 04 - Fine Joinery</div>
              </div>
              <input ref={workshopInputRef} type="file" accept="image/*" className="hidden" onChange={(event) => handleImageSelection(event, setWorkshopImage)} />
              <div className="flex items-center gap-2 mt-2">
                <button type="button" onClick={() => workshopInputRef.current?.click()} className="flex-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold py-2 rounded flex items-center justify-center gap-2 transition-colors">
                  <span className="material-symbols-outlined text-[14px]">sync</span> Replace Image Asset
                </button>
                <button type="button" onClick={() => setCropWorkshop((cropped) => !cropped)} className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 px-4 py-2 text-xs font-semibold rounded flex items-center justify-center transition-colors">
                  {cropWorkshop ? 'Reset Frame' : 'Crop & Frame'}
                </button>
              </div>
            </div>

            <div className="w-1/2 space-y-5">
              <div>
                <label className="text-[10px] font-bold tracking-wider text-slate-500 uppercase block mb-1">Section Heading</label>
                <input name="workshopHeading" type="text" className="w-full text-sm font-medium bg-slate-50 border border-slate-100 rounded px-3 py-2 text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" defaultValue="The Alchemy of Raw Materials" />
              </div>

              <div>
                <label className="text-[10px] font-bold tracking-wider text-slate-500 uppercase block mb-1">Curatorial Narrative</label>
                <textarea name="workshopNarrative" className="w-full h-28 p-3 text-sm text-slate-800 bg-slate-50 border border-slate-100 rounded focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none leading-relaxed" defaultValue="Our in-house fabrication studio brings centuries of artisanal technique into harmony with contemporary engineering. From fluted Calacatta marble to centuries-old European smoked oak, each raw material is rigorously selected, seasoned, and hand-finished on our bench to achieve unmatched tactile gravity."></textarea>
              </div>

              <div>
                <div className="flex justify-between items-end mb-1">
                  <label className="text-[10px] font-bold tracking-wider text-slate-500 uppercase block">Material & Craft Tags</label>
                  <span className="text-[10px] text-slate-400">Tags shown in public pill group</span>
                </div>
                <div className="w-full bg-slate-50 border border-slate-100 rounded p-2 flex flex-wrap gap-2">
                  {tags.map((tag) => <span key={tag} className="bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold px-2 py-1 rounded flex items-center gap-1.5 shadow-sm">{tag}<button type="button" onClick={() => setTags((items) => items.filter((item) => item !== tag))} aria-label={`Remove ${tag}`} className="material-symbols-outlined text-[12px] hover:text-rose-500 ml-1">close</button></span>)}
                  <input type="text" placeholder="+ Add material tag..." onKeyDown={(event) => addChip(event, setTags)} className="bg-transparent text-[11px] outline-none min-w-[120px] ml-1 mt-1" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-indigo-700 text-white flex items-center justify-center shadow-inner">
                <span className="material-symbols-outlined text-[18px]">timeline</span>
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">Section 3: Journey & Milestones Timeline</h2>
                <p className="text-[10px] text-slate-500">Historical timeline entries displayed on the About Us page in chronological sequence.</p>
              </div>
            </div>
            <button type="button" onClick={addMilestone} className="bg-indigo-700 hover:bg-indigo-800 text-white text-[11px] font-bold px-3 py-1.5 rounded flex items-center gap-1 transition-colors shadow-sm">
              + Add New Milestone
            </button>
          </div>

          <div className="p-4">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-4 py-2 text-[9px] font-bold uppercase text-slate-400 tracking-wider">Order</th>
                  <th className="px-4 py-2 text-[9px] font-bold uppercase text-slate-400 tracking-wider">Year</th>
                  <th className="px-4 py-2 text-[9px] font-bold uppercase text-slate-400 tracking-wider">Milestone Title</th>
                  <th className="px-4 py-2 text-[9px] font-bold uppercase text-slate-400 tracking-wider">Chronicle Details</th>
                  <th className="px-4 py-2 text-[9px] font-bold uppercase text-slate-400 tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {milestones.map((milestone, index) => (
                  <tr className="group" key={`${milestone.year}-${milestone.title}`}>
                    <td className="px-4 py-4 w-12 text-center text-slate-300">{index + 1}</td>
                    <td className="px-4 py-4 w-20"><span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded">{milestone.year}</span></td>
                    <td className="px-4 py-4 w-48 font-bold text-sm text-slate-900">{milestone.title}</td>
                    <td className="px-4 py-4 text-xs text-slate-600 leading-relaxed max-w-sm">{milestone.details}</td>
                    <td className="px-4 py-4 w-24 text-right space-x-2 text-slate-400">
                      <button type="button" onClick={() => editMilestone(index)} aria-label={`Edit ${milestone.title}`} className="material-symbols-outlined text-[16px] hover:text-indigo-600 transition-colors">edit</button>
                      <button type="button" onClick={() => setMilestones((items) => items.filter((_, itemIndex) => itemIndex !== index))} aria-label={`Delete ${milestone.title}`} className="material-symbols-outlined text-[16px] hover:text-rose-500 transition-colors">delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 4 */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-sky-100 text-sky-600 flex items-center justify-center shadow-inner border border-sky-200">
                <span className="material-symbols-outlined text-[18px]">photo_library</span>
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">Section 4: Curated Architectural Project Gallery</h2>
                <p className="text-[10px] text-slate-500">Manage the featured four-slot portfolio grid displaying craftsmanship highlights on the public landing.</p>
              </div>
            </div>
            <div className="text-[10px] font-bold text-slate-600 flex items-center gap-1.5">
              {gallery.filter((item) => item?.src).length} of 4 slots configured <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
              {gallery.map((project, index) => (
                <div key={index} className="bg-slate-50 border border-slate-200 rounded-lg overflow-hidden shadow-sm flex flex-col">
                  <div className="aspect-[4/3] bg-slate-200 relative overflow-hidden group">
                    {project.src ? (
                      <img src={project.src} className="w-full h-full object-cover" alt={project.title || `Gallery project ${index + 1}`} />
                    ) : <span className="flex h-full items-center justify-center text-xs text-slate-500">No image selected</span>}
                    <button type="button" onClick={() => galleryInputRefs.current[index]?.click()} className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 focus:opacity-100 flex items-center justify-center transition-opacity" aria-label={`Change image for gallery slot ${index + 1}`}>
                      <span className="bg-white text-slate-900 text-[10px] font-bold px-3 py-1.5 rounded shadow-lg">Change Image</span>
                    </button>
                    <div className="absolute top-2 left-2 bg-slate-900/70 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow pointer-events-none">Slot {String(index + 1).padStart(2, '0')}</div>
                    <input ref={(element) => { galleryInputRefs.current[index] = element; }} type="file" accept="image/*" className="hidden" onChange={(event) => handleGallerySelection(index, event)} />
                  </div>
                  <div className="p-3 space-y-3 flex-1">
                    <div>
                      <label className="text-[9px] font-bold tracking-wider text-slate-400 uppercase block mb-1" htmlFor={`gallery-title-${index}`}>Project Title</label>
                      <input id={`gallery-title-${index}`} name={`galleryTitle${index + 1}`} type="text" className="w-full text-xs font-semibold bg-white border border-slate-200 rounded px-2 py-1 text-slate-900" value={project.title} onChange={(event) => setGallery((items) => items.map((item, itemIndex) => itemIndex === index ? { ...item, title: event.target.value } : item))} />
                    </div>
                    <div>
                      <label className="text-[9px] font-bold tracking-wider text-slate-400 uppercase block mb-1" htmlFor={`gallery-category-${index}`}>Category</label>
                      <select id={`gallery-category-${index}`} name={`galleryCategory${index + 1}`} className="w-full text-xs font-semibold bg-white border border-slate-200 rounded px-2 py-1 text-slate-900" value={project.category} onChange={(event) => setGallery((items) => items.map((item, itemIndex) => itemIndex === index ? { ...item, category: event.target.value } : item))}>
                        <option>Culinary Architecture</option>
                        <option>Stonework & Wellness</option>
                        <option>Private Residence</option>
                      </select>
                    </div>
                  </div>
                  <div className="px-3 py-2 bg-slate-100 border-t border-slate-200 flex justify-between items-center text-slate-500">
                    <button type="button" onClick={() => galleryInputRefs.current[index]?.click()} className="text-[10px] font-bold flex items-center gap-1 hover:text-indigo-600 transition-colors"><span className="material-symbols-outlined text-[14px]">sync</span> Replace</button>
                    <button type="button" onClick={() => setGallery((items) => items.map((item, itemIndex) => itemIndex === index ? { ...item, src: '' } : item))} aria-label={`Remove gallery image ${index + 1}`} className="material-symbols-outlined text-[14px] hover:text-rose-500 transition-colors">delete</button>
                  </div>
                </div>
              ))}
            </div>

            <input type="file" accept="image/*" multiple className="hidden" id="gallery-upload" onChange={(event) => { handleGalleryFiles(event.target.files); event.target.value = ''; }} />
            <button type="button" onClick={() => document.getElementById('gallery-upload')?.click()} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); handleGalleryFiles(event.dataTransfer.files); }} className="w-full bg-indigo-50/50 border-2 border-dashed border-indigo-200 rounded-xl py-8 flex flex-col items-center justify-center text-slate-500 cursor-pointer hover:bg-indigo-50 transition-colors">
              <span className="material-symbols-outlined text-indigo-500 text-[24px] mb-2">cloud_upload</span>
              <p className="text-sm font-bold text-slate-800">+ Drag and drop new project photos here (PNG, JPG up to 20MB)</p>
              <p className="text-[10px] mt-1">High-resolution architectural photography with aspect ratio 16:10 or 3:2 recommended</p>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 py-4">
          <span className="flex items-center gap-1 text-emerald-600 font-semibold"><span className="material-symbols-outlined text-[14px]">check_circle</span> All edits are validated against public accessibility & responsive guidelines.</span>
          <div className="flex items-center gap-3">
            <button type="button" onClick={discardChanges} className="text-slate-500 hover:text-slate-900 font-semibold">Discard</button>
            <button type="submit" disabled={saving} className="px-4 py-2 bg-indigo-700 hover:bg-indigo-800 text-white font-bold rounded shadow-sm transition-colors disabled:opacity-60 flex items-center gap-2">
              <span className="material-symbols-outlined text-[14px]">save</span> Publish to Live Site
            </button>
          </div>
        </div>

      </div>
      {milestoneDraft && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setMilestoneDraft(null);
              setMilestoneError('');
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="milestone-dialog-title"
            className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl"
          >
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 id="milestone-dialog-title" className="text-lg font-bold text-slate-900">
                  {milestoneDraft.index === null ? 'Add milestone' : 'Edit milestone'}
                </h2>
                <p className="mt-1 text-sm text-slate-500">Enter the timeline year, title, and details.</p>
              </div>
              <button type="button" onClick={() => { setMilestoneDraft(null); setMilestoneError(''); }} aria-label="Close dialog" className="material-symbols-outlined text-slate-400 hover:text-slate-700">close</button>
            </div>
            <div className="space-y-4">
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-slate-600">Year</span>
                <input
                  autoFocus
                  required
                  type="text"
                  inputMode="numeric"
                  value={milestoneDraft.year}
                  onChange={(event) => { setMilestoneDraft((draft) => ({ ...draft, year: event.target.value })); setMilestoneError(''); }}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-slate-600">Milestone title</span>
                <input
                  required
                  type="text"
                  value={milestoneDraft.title}
                  onChange={(event) => { setMilestoneDraft((draft) => ({ ...draft, title: event.target.value })); setMilestoneError(''); }}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-slate-600">Chronicle details</span>
                <textarea
                  required
                  rows={4}
                  value={milestoneDraft.details}
                  onChange={(event) => { setMilestoneDraft((draft) => ({ ...draft, details: event.target.value })); setMilestoneError(''); }}
                  className="w-full resize-y rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </label>
            </div>
            {milestoneError && <p role="alert" className="mt-3 text-sm text-rose-600">{milestoneError}</p>}
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => { setMilestoneDraft(null); setMilestoneError(''); }} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button>
              <button type="button" onClick={saveMilestoneDraft} className="rounded-lg bg-indigo-700 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-800">
                {milestoneDraft.index === null ? 'Add milestone' : 'Save changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
