import { useRef, useState, useEffect } from 'react';
import useContentStore from '../stores/contentStore';
import { uploadToCloudinary } from '../lib/cloudinary';

export default function AboutUsCms() {
  const formRef = useRef(null);
  const portraitInputRef = useRef(null);
  const galleryInputRefs = useRef([]);

  const { fetchContent, saveContent: saveContentApi, error: contentError } = useContentStore();

  const [credentials, setCredentials] = useState([]);
  const [tags, setTags] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [milestoneDraft, setMilestoneDraft] = useState(null);
  const [milestoneError, setMilestoneError] = useState('');
  const [gallery, setGallery] = useState([
    { src: '', title: '', category: 'Private Residence' },
    { src: '', title: '', category: 'Private Residence' },
    { src: '', title: '', category: 'Private Residence' },
    { src: '', title: '', category: 'Private Residence' },
  ]);
  const [portrait, setPortrait] = useState('');
  const [portraitFile, setPortraitFile] = useState(null);
  const [workshopContent, setWorkshopContent] = useState({
    image: '',
    heading: 'Our Approach to Facility Care',
    narrative: 'We create dependable cleaning plans around each facility, its people, and its schedule.',
  });
  const [commitments, setCommitments] = useState([
    {
      title: 'Cleaning That Fits Your Needs',
      description: 'Choose from office cleaning, janitorial services, deep sanitization, post-construction cleaning, and floor care.',
    },
    {
      title: 'A Plan for Your Schedule',
      description: 'We work with you to find a cleaning frequency and start date that suit your facility and daily operations.',
    },
    {
      title: 'Responsive Support',
      description: 'Our team aims to respond to inquiries within 24 business hours. 24/7 emergency response is available for contracted clients.',
    },
  ]);
  const [galleryFiles, setGalleryFiles] = useState([null, null, null, null]);
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchContent('about-us').then((data) => {
      if (!data) return;
      if (data.credentials) setCredentials(data.credentials);
      if (data.tags) setTags(data.tags);
      if (data.milestones) setMilestones(data.milestones);
      if (data.founderPortrait) setPortrait(data.founderPortrait);
      setWorkshopContent({
        image: data.workshopImage || '',
        heading: data.workshopHeading || 'Our Approach to Facility Care',
        narrative: data.workshopNarrative || 'We create dependable cleaning plans around each facility, its people, and its schedule.',
      });
      if (Array.isArray(data.commitments) && data.commitments.length) setCommitments(data.commitments);
      if (data.gallery) {
        const g = [...data.gallery];
        while (g.length < 4) g.push({ src: '', title: '', category: 'Private Residence' });
        setGallery(g);
      }
      if (formRef.current && data) {
        const elements = formRef.current.elements;
        if (data.founderName && elements.founderName) elements.founderName.value = data.founderName;
        if (data.founderTitle && elements.founderTitle) elements.founderTitle.value = data.founderTitle;
        if (data.biography && elements.biography) elements.biography.value = data.biography;
        if (data.statOne && elements.statOne) elements.statOne.value = data.statOne;
        if (data.statTwo && elements.statTwo) elements.statTwo.value = data.statTwo;
        if (data.statThree && elements.statThree) elements.statThree.value = data.statThree;
        if (data.commitmentEyebrow && elements.commitmentEyebrow) elements.commitmentEyebrow.value = data.commitmentEyebrow;
        if (data.commitmentHeading && elements.commitmentHeading) elements.commitmentHeading.value = data.commitmentHeading;
        if (data.commitmentNarrative && elements.commitmentNarrative) elements.commitmentNarrative.value = data.commitmentNarrative;
        if (data.commitmentFooter && elements.commitmentFooter) elements.commitmentFooter.value = data.commitmentFooter;
        if (data.commitmentCta && elements.commitmentCta) elements.commitmentCta.value = data.commitmentCta;
      }
      setLoaded(true);
    }).catch(() => setLoaded(true));
  }, [fetchContent]);

  const addChip = (event, setItems) => {
    if (event.key !== 'Enter' && event.key !== ',') return;
    event.preventDefault();
    const value = event.currentTarget.value.trim().replace(/,$/, '');
    if (value) {
      setItems((items) => items.includes(value) ? items : [...items, value]);
      event.currentTarget.value = '';
    }
  };

  const handleImageSelection = (event, setImage, setFile) => {
    const [file] = event.target.files || [];
    if (!file) return;
    if (!file.type.startsWith('image/')) { setStatus('Please select an image file.'); return; }
    if (file.size > 20 * 1024 * 1024) { setStatus('Image must be 20 MB or smaller.'); return; }
    setImage(URL.createObjectURL(file));
    setFile(file);
    event.target.value = '';
  };

  const handleGallerySelection = (index, event) => {
    const [file] = event.target.files || [];
    if (!file) return;
    if (!file.type.startsWith('image/')) { setStatus('Please select an image file.'); return; }
    if (file.size > 20 * 1024 * 1024) { setStatus('Image must be 20 MB or smaller.'); return; }
    const src = URL.createObjectURL(file);
    setGallery((items) => {
      const updated = [...items];
      updated[index] = { ...(updated[index] || { title: '', category: 'Private Residence' }), src };
      return updated;
    });
    setGalleryFiles((files) => {
      const updated = [...files];
      updated[index] = file;
      return updated;
    });
    event.target.value = '';
  };

  const addMilestone = () => setMilestoneDraft({ index: null, year: '', title: '', details: '' });
  const editMilestone = (index) => setMilestoneDraft({ index, ...milestones[index] });

  const saveMilestoneDraft = () => {
    const { index, year, title, details } = milestoneDraft;
    const milestone = { year: year.trim(), title: title.trim(), details: details.trim() };
    if (!milestone.year || !milestone.title || !milestone.details) { setMilestoneError('Complete all fields before saving.'); return; }
    if (index === null) setMilestones((items) => [...items, milestone]);
    else setMilestones((items) => items.map((item, i) => i === index ? milestone : item));
    setMilestoneDraft(null);
    setMilestoneError('');
  };

  const saveChanges = async (event) => {
    event.preventDefault();
    setSaving(true);
    setStatus('');

    try {
      let portraitUrl = portrait;
      if (portraitFile) {
        portraitUrl = await uploadToCloudinary(portraitFile);
        setPortrait(portraitUrl);
        setPortraitFile(null);
      }

      const uploadedGallery = [...gallery];
      const updatedGalleryFiles = [...galleryFiles];
      for (let i = 0; i < galleryFiles.length; i++) {
        if (galleryFiles[i]) {
          const url = await uploadToCloudinary(galleryFiles[i]);
          uploadedGallery[i] = { ...uploadedGallery[i], src: url };
          updatedGalleryFiles[i] = null;
        }
      }
      setGallery(uploadedGallery);
      setGalleryFiles(updatedGalleryFiles);

      const fields = {};
      const elements = formRef.current.elements;
      ['founderName', 'founderTitle', 'biography', 'statOne', 'statTwo', 'statThree', 'commitmentEyebrow', 'commitmentHeading', 'commitmentNarrative', 'commitmentFooter', 'commitmentCta'].forEach((name) => {
        if (elements[name]) fields[name] = elements[name].value;
      });

      await saveContentApi('about-us', {
        ...fields,
        founderPortrait: portraitUrl && !portraitUrl.startsWith('blob:') ? portraitUrl : '',
        workshopImage: workshopContent.image,
        workshopHeading: workshopContent.heading,
        workshopNarrative: workshopContent.narrative,
        commitments,
        credentials,
        tags,
        milestones,
        gallery: uploadedGallery.map((p) => ({
          ...p,
          src: p.src && !p.src.startsWith('blob:') ? p.src : '',
        })),
      });

      setStatus('About Us content saved and published.');
    } catch (error) {
      setStatus(error?.response?.data?.message || error?.message || 'Unable to save About Us content. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const discardChanges = () => {
    if (!window.confirm('Discard all unsaved changes?')) return;
    window.location.reload();
  };

  if (!loaded) {
    return <div className="flex min-h-screen items-center justify-center p-4 text-sm text-slate-500 sm:p-6 lg:p-8">Loading content…</div>;
  }

  return (
    <form ref={formRef} onSubmit={saveChanges} className="min-h-screen bg-slate-50 p-4 font-sans sm:p-6 lg:p-8">
      <div className="mb-8 flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 opacity-0 hidden">About Us CMS</h1>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <button type="button" onClick={discardChanges} className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
            <span className="material-symbols-outlined text-[16px]">refresh</span> Discard Changes
          </button>
          <button type="submit" disabled={saving} className="flex items-center justify-center gap-2 rounded-lg bg-indigo-700 px-5 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-indigo-800 disabled:opacity-60">
            <span className="material-symbols-outlined text-[16px]">save</span> {saving ? 'Publishing…' : 'Save & Publish Changes'}
          </button>
        </div>
      </div>
      {status && <p role="status" className="mb-4 rounded-lg bg-white px-4 py-2 text-sm text-slate-700 shadow-sm">{status}</p>}
      {contentError && <p role="alert" className="mb-4 rounded-lg bg-rose-50 px-4 py-2 text-sm text-rose-700">{contentError}</p>}

      <div className="max-w-full mx-auto space-y-8 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="flex flex-col items-start justify-between gap-3 border-b border-slate-100 bg-slate-50 px-4 py-4 sm:flex-row sm:items-center sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
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

          <div className="flex flex-col gap-6 p-4 sm:p-6 lg:flex-row lg:gap-8">
            <div className="flex w-full flex-col gap-2 lg:w-1/3">
              <p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">Executive Headshot</p>
              <div className="w-full aspect-[3/4] bg-slate-200 rounded-lg overflow-hidden flex flex-col items-center justify-center text-slate-400 relative">
                {portrait ? <img src={portrait} alt="Founder portrait preview" className="w-full h-full object-cover" /> : <span className="font-bold text-xs">No portrait selected</span>}
              </div>
              <input ref={portraitInputRef} type="file" accept="image/*" className="hidden" onChange={(event) => handleImageSelection(event, setPortrait, setPortraitFile)} />
              <div className="flex items-center gap-2 mt-2">
                <button type="button" onClick={() => portraitInputRef.current?.click()} className="flex-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold py-2 rounded flex items-center justify-center gap-2 transition-colors">
                  <span className="material-symbols-outlined text-[14px]">image</span> Upload New Photo
                </button>
                <button type="button" onClick={() => { setPortrait(''); setPortraitFile(null); }} aria-label="Remove founder portrait" className="bg-slate-100 hover:bg-slate-200 text-slate-500 w-8 h-8 rounded flex items-center justify-center transition-colors">
                  <span className="material-symbols-outlined text-[14px]">delete</span>
                </button>
              </div>
            </div>

            <div className="flex-1 space-y-5">
              <div className="flex flex-col gap-4 sm:flex-row">
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
                  {credentials.map((item) => <span key={item} className="bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">{item}<button type="button" onClick={() => setCredentials((items) => items.filter((e) => e !== item))} aria-label={`Remove ${item}`} className="material-symbols-outlined text-[12px] hover:text-rose-500">close</button></span>)}
                  <input type="text" placeholder="+ Add certification..." onKeyDown={(event) => addChip(event, setCredentials)} className="bg-transparent text-[11px] outline-none min-w-[120px]" />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold tracking-wider text-slate-500 uppercase block mb-1">Public Biography Narrative</label>
                <textarea name="biography" className="w-full h-32 rounded border border-slate-200 bg-indigo-50/30 p-3 text-sm leading-relaxed text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500" defaultValue=""></textarea>
              </div>

              <div>
                <label className="text-[10px] font-bold tracking-wider text-slate-500 uppercase block mb-1">Key Performance Stats (Public Badges)</label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
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

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="flex flex-col items-start justify-between gap-3 border-b border-slate-100 bg-slate-50 px-4 py-4 sm:flex-row sm:items-center sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <div className="w-8 h-8 rounded bg-teal-600 text-white flex items-center justify-center shadow-inner">
                <span className="material-symbols-outlined text-[18px]">handshake</span>
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">Section 2: A Fresh Start, Focused on Your Facility</h2>
                <p className="text-[10px] text-slate-500">Edit the commitment heading, introduction, service highlights, and call to action.</p>
              </div>
            </div>
            <span className="bg-teal-50 text-teal-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Our Commitment</span>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-[10px] font-bold tracking-wider text-slate-500 uppercase block mb-1">Eyebrow</label>
                <input name="commitmentEyebrow" type="text" defaultValue="Our Commitment" className="w-full text-sm font-medium bg-slate-50 border border-slate-100 rounded px-3 py-2 text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="text-[10px] font-bold tracking-wider text-slate-500 uppercase block mb-1">Section Heading</label>
                <input name="commitmentHeading" type="text" defaultValue="A Fresh Start, Focused on Your Facility" className="w-full text-sm font-medium bg-slate-50 border border-slate-100 rounded px-3 py-2 text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
              </div>
              <div className="md:col-span-2">
                <label className="text-[10px] font-bold tracking-wider text-slate-500 uppercase block mb-1">Introduction</label>
                <textarea name="commitmentNarrative" rows="3" defaultValue="As a new company, we are focused on earning your trust through attentive service, cleaning plans shaped around your needs, and clear communication from the start." className="w-full p-3 text-sm text-slate-800 bg-slate-50 border border-slate-100 rounded focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-y leading-relaxed" />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {commitments.map((commitment, index) => (
                <div key={index} className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-3">
                  <p className="text-xs font-semibold text-slate-500">Highlight {index + 1}</p>
                  <div>
                    <label htmlFor={`commitment-title-${index}`} className="text-[10px] font-bold tracking-wider text-slate-500 uppercase block mb-1">Title</label>
                    <input id={`commitment-title-${index}`} type="text" value={commitment.title} onChange={(event) => setCommitments((items) => items.map((item, i) => i === index ? { ...item, title: event.target.value } : item))} className="w-full text-sm font-medium bg-white border border-slate-200 rounded px-3 py-2 text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label htmlFor={`commitment-description-${index}`} className="text-[10px] font-bold tracking-wider text-slate-500 uppercase block mb-1">Description</label>
                    <textarea id={`commitment-description-${index}`} rows="4" value={commitment.description} onChange={(event) => setCommitments((items) => items.map((item, i) => i === index ? { ...item, description: event.target.value } : item))} className="w-full p-3 text-sm text-slate-800 bg-white border border-slate-200 rounded focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-y leading-relaxed" />
                  </div>
                </div>
              ))}
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-[10px] font-bold tracking-wider text-slate-500 uppercase block mb-1">Footer Message</label>
                <input name="commitmentFooter" type="text" defaultValue="Looking for a cleaning plan that works for your facility?" className="w-full text-sm font-medium bg-slate-50 border border-slate-100 rounded px-3 py-2 text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="text-[10px] font-bold tracking-wider text-slate-500 uppercase block mb-1">Call-to-Action Button</label>
                <input name="commitmentCta" type="text" defaultValue="Discuss Your Cleaning Needs" className="w-full text-sm font-medium bg-slate-50 border border-slate-100 rounded px-3 py-2 text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="flex flex-col items-start justify-between gap-3 border-b border-slate-100 bg-slate-50 px-4 py-4 sm:flex-row sm:items-center sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
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

          <div className="overflow-x-auto p-3 sm:p-4">
            <table className="w-full min-w-[640px] text-left">
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
                      <button type="button" onClick={() => setMilestones((items) => items.filter((_, i) => i !== index))} aria-label={`Delete ${milestone.title}`} className="material-symbols-outlined text-[16px] hover:text-rose-500 transition-colors">delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="flex flex-col items-start justify-between gap-3 border-b border-slate-100 bg-slate-50 px-4 py-4 sm:flex-row sm:items-center sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <div className="w-8 h-8 rounded bg-sky-100 text-sky-600 flex items-center justify-center shadow-inner border border-sky-200">
                <span className="material-symbols-outlined text-[18px]">photo_library</span>
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">Section 4: Curated Architectural Project Gallery</h2>
                <p className="text-[10px] text-slate-500">Manage the featured four-slot portfolio grid.</p>
              </div>
            </div>
            <div className="text-[10px] font-bold text-slate-600 flex items-center gap-1.5">
              {gallery.filter((item) => item?.src).length} of 4 slots configured <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
            </div>
          </div>

          <div className="p-4 sm:p-6">
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
                    <input ref={(el) => { galleryInputRefs.current[index] = el; }} type="file" accept="image/*" className="hidden" onChange={(event) => handleGallerySelection(index, event)} />
                  </div>
                  <div className="p-3 space-y-3 flex-1">
                    <div>
                      <label className="text-[9px] font-bold tracking-wider text-slate-400 uppercase block mb-1">Project Title</label>
                      <input type="text" className="w-full text-xs font-semibold bg-white border border-slate-200 rounded px-2 py-1 text-slate-900" value={project.title} onChange={(event) => setGallery((items) => items.map((item, i) => i === index ? { ...item, title: event.target.value } : item))} />
                    </div>
                    <div>
                      <label className="text-[9px] font-bold tracking-wider text-slate-400 uppercase block mb-1">Category</label>
                      <select className="w-full text-xs font-semibold bg-white border border-slate-200 rounded px-2 py-1 text-slate-900" value={project.category} onChange={(event) => setGallery((items) => items.map((item, i) => i === index ? { ...item, category: event.target.value } : item))}>
                        <option>Culinary Architecture</option>
                        <option>Stonework & Wellness</option>
                        <option>Private Residence</option>
                      </select>
                    </div>
                  </div>
                  <div className="px-3 py-2 bg-slate-100 border-t border-slate-200 flex justify-between items-center text-slate-500">
                    <button type="button" onClick={() => galleryInputRefs.current[index]?.click()} className="text-[10px] font-bold flex items-center gap-1 hover:text-indigo-600 transition-colors"><span className="material-symbols-outlined text-[14px]">sync</span> Replace</button>
                    <button type="button" onClick={() => { setGallery((items) => items.map((item, i) => i === index ? { ...item, src: '' } : item)); setGalleryFiles((f) => { const u = [...f]; u[index] = null; return u; }); }} aria-label={`Remove gallery image ${index + 1}`} className="material-symbols-outlined text-[14px] hover:text-rose-500 transition-colors">delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 py-4">
          <span className="flex items-center gap-1 text-emerald-600 font-semibold"><span className="material-symbols-outlined text-[14px]">check_circle</span> Images uploaded to Cloudinary. All edits are validated.</span>
          <div className="flex items-center gap-3">
            <button type="button" onClick={discardChanges} className="text-slate-500 hover:text-slate-900 font-semibold">Discard</button>
            <button type="submit" disabled={saving} className="px-4 py-2 bg-indigo-700 hover:bg-indigo-800 text-white font-bold rounded shadow-sm transition-colors disabled:opacity-60 flex items-center gap-2">
              <span className="material-symbols-outlined text-[14px]">save</span> Publish to Live Site
            </button>
          </div>
        </div>
      </div>

      {milestoneDraft && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) { setMilestoneDraft(null); setMilestoneError(''); } }}>
          <div role="dialog" aria-modal="true" className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">{milestoneDraft.index === null ? 'Add milestone' : 'Edit milestone'}</h2>
                <p className="mt-1 text-sm text-slate-500">Enter the timeline year, title, and details.</p>
              </div>
              <button type="button" onClick={() => { setMilestoneDraft(null); setMilestoneError(''); }} aria-label="Close dialog" className="material-symbols-outlined text-slate-400 hover:text-slate-700">close</button>
            </div>
            <div className="space-y-4">
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-slate-600">Year</span>
                <input autoFocus required type="text" inputMode="numeric" value={milestoneDraft.year} onChange={(event) => { setMilestoneDraft((d) => ({ ...d, year: event.target.value })); setMilestoneError(''); }} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-slate-600">Milestone title</span>
                <input required type="text" value={milestoneDraft.title} onChange={(event) => { setMilestoneDraft((d) => ({ ...d, title: event.target.value })); setMilestoneError(''); }} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-slate-600">Chronicle details</span>
                <textarea required rows={4} value={milestoneDraft.details} onChange={(event) => { setMilestoneDraft((d) => ({ ...d, details: event.target.value })); setMilestoneError(''); }} className="w-full resize-y rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
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
