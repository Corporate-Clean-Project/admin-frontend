export default function AboutUsCms() {
  return (
    <div className="p-8 font-sans bg-slate-50 min-h-screen">

      {/* Top Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 opacity-0 hidden">About Us CMS</h1>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 p-2 rounded hover:bg-slate-200 text-slate-500 transition-colors">
            <span className="material-symbols-outlined text-[18px]">open_in_new</span>
          </button>
          <button className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">refresh</span> Discard Changes
          </button>
          <button className="px-5 py-2 text-sm font-bold text-white bg-indigo-700 rounded-lg shadow-sm hover:bg-indigo-800 flex items-center gap-2 transition-colors">
            <span className="material-symbols-outlined text-[16px]">save</span> Save & Publish Changes
          </button>
        </div>
      </div>

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
                <span className="font-bold text-xs">img</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <button className="flex-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold py-2 rounded flex items-center justify-center gap-2 transition-colors">
                  <span className="material-symbols-outlined text-[14px]">image</span> Upload New Photo
                </button>
                <button className="bg-slate-100 hover:bg-slate-200 text-slate-500 w-8 h-8 rounded flex items-center justify-center transition-colors">
                  <span className="material-symbols-outlined text-[14px]">delete</span>
                </button>
              </div>
            </div>

            <div className="flex-1 space-y-5">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-[10px] font-bold tracking-wider text-slate-500 uppercase block mb-1">Founder Full Name</label>
                  <input type="text" className="w-full text-sm font-medium bg-slate-50 border border-slate-100 rounded px-3 py-2 text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" defaultValue="Julian Vance" />
                </div>
                <div className="flex-1">
                  <label className="text-[10px] font-bold tracking-wider text-slate-500 uppercase block mb-1">Executive Title</label>
                  <input type="text" className="w-full text-sm font-medium bg-slate-50 border border-slate-100 rounded px-3 py-2 text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" defaultValue="Principal Craftsman & Founder" />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-1">
                  <label className="text-[10px] font-bold tracking-wider text-slate-500 uppercase block">Credentials & Certifications</label>
                  <span className="text-[10px] text-slate-400">Press Enter or comma to create chip</span>
                </div>
                <div className="w-full bg-slate-50 border border-slate-100 rounded p-2 flex flex-wrap gap-2">
                  <span className="bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">Master Joinery Guild <span className="material-symbols-outlined text-[12px] cursor-pointer hover:text-rose-500">close</span></span>
                  <span className="bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">Structural Masonry Cert <span className="material-symbols-outlined text-[12px] cursor-pointer hover:text-rose-500">close</span></span>
                  <span className="bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">Architectural Contracting <span className="material-symbols-outlined text-[12px] cursor-pointer hover:text-rose-500">close</span></span>
                  <input type="text" placeholder="+ Add certification..." className="bg-transparent text-[11px] outline-none min-w-[120px]" />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold tracking-wider text-slate-500 uppercase block mb-1">Public Biography Narrative</label>
                <div className="w-full border border-slate-200 rounded overflow-hidden">
                  <div className="bg-slate-50 border-b border-slate-200 px-3 py-1.5 flex items-center gap-3 text-slate-500">
                    <span className="material-symbols-outlined text-[14px] cursor-pointer hover:text-slate-900">format_bold</span>
                    <span className="material-symbols-outlined text-[14px] cursor-pointer hover:text-slate-900">format_italic</span>
                    <span className="material-symbols-outlined text-[14px] cursor-pointer hover:text-slate-900">link</span>
                    <span className="material-symbols-outlined text-[14px] cursor-pointer hover:text-slate-900">format_quote</span>
                    <span className="text-[10px] font-mono ml-auto">Markdown & Rich text supported</span>
                  </div>
                  <textarea className="w-full h-32 p-3 text-sm text-slate-800 bg-indigo-50/30 focus:outline-none resize-none leading-relaxed" defaultValue="Over the past decade and a half, Top Pristine has evolved into a private atelier of elite master carpenters and stonemasons. Under the direct supervision of Julian Vance, every commission marries timeless hand-carved joinery with precise, ultra-modern structural specifications for the world's most discerning residences."></textarea>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold tracking-wider text-slate-500 uppercase block mb-1">Key Performance Stats (Public Badges)</label>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-slate-50 border border-slate-100 rounded p-2">
                    <p className="text-[9px] font-bold uppercase text-slate-400 mb-1">Numeric Stat 1</p>
                    <input type="text" className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-sm font-bold text-slate-900 text-center" defaultValue="15+ Years Mastery" />
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded p-2">
                    <p className="text-[9px] font-bold uppercase text-slate-400 mb-1">Numeric Stat 2</p>
                    <input type="text" className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-sm font-bold text-slate-900 text-center" defaultValue="180+ Estates Crafted" />
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded p-2">
                    <p className="text-[9px] font-bold uppercase text-slate-400 mb-1">Numeric Stat 3</p>
                    <input type="text" className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-sm font-bold text-slate-900 text-center" defaultValue="100% Direct Oversight" />
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
                <h2 className="text-sm font-bold text-slate-900">Section 2: Workshop & Studio Imagery ("The Alchemy of Raw Materials")</h2>
                <p className="text-[10px] text-slate-500">Artisanal atelier showcase illustrating bespoke materials, hand tooling, and architectural sample bays.</p>
              </div>
            </div>
            <span className="bg-teal-50 text-teal-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Atelier Feature</span>
          </div>

          <div className="p-6 flex gap-8">
            <div className="w-1/2 flex flex-col gap-2">
              <div className="w-full aspect-[4/3] bg-slate-200 rounded-lg overflow-hidden flex flex-col items-center justify-center text-slate-400 relative">
                <span className="font-bold text-xs">img</span>
                <div className="absolute bottom-3 left-3 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded shadow">Workshop Bench 04 - Fine Joinery</div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <button className="flex-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold py-2 rounded flex items-center justify-center gap-2 transition-colors">
                  <span className="material-symbols-outlined text-[14px]">sync</span> Replace Image Asset
                </button>
                <button className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 px-4 py-2 text-xs font-semibold rounded flex items-center justify-center transition-colors">
                  Crop & Frame
                </button>
              </div>
            </div>

            <div className="w-1/2 space-y-5">
              <div>
                <label className="text-[10px] font-bold tracking-wider text-slate-500 uppercase block mb-1">Section Heading</label>
                <input type="text" className="w-full text-sm font-medium bg-slate-50 border border-slate-100 rounded px-3 py-2 text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" defaultValue="The Alchemy of Raw Materials" />
              </div>

              <div>
                <label className="text-[10px] font-bold tracking-wider text-slate-500 uppercase block mb-1">Curatorial Narrative</label>
                <textarea className="w-full h-28 p-3 text-sm text-slate-800 bg-slate-50 border border-slate-100 rounded focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none leading-relaxed" defaultValue="Our in-house fabrication studio brings centuries of artisanal technique into harmony with contemporary engineering. From fluted Calacatta marble to centuries-old European smoked oak, each raw material is rigorously selected, seasoned, and hand-finished on our bench to achieve unmatched tactile gravity."></textarea>
              </div>

              <div>
                <div className="flex justify-between items-end mb-1">
                  <label className="text-[10px] font-bold tracking-wider text-slate-500 uppercase block">Material & Craft Tags</label>
                  <span className="text-[10px] text-slate-400">Tags shown in public pill group</span>
                </div>
                <div className="w-full bg-slate-50 border border-slate-100 rounded p-2 flex flex-wrap gap-2">
                  <span className="bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold px-2 py-1 rounded flex items-center gap-1.5 shadow-sm"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Architectural Millwork & Smoked Oak <span className="material-symbols-outlined text-[12px] cursor-pointer hover:text-rose-500 ml-1">close</span></span>
                  <span className="bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold px-2 py-1 rounded flex items-center gap-1.5 shadow-sm"><span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span> Fluted Stone & Bookmatched Marble <span className="material-symbols-outlined text-[12px] cursor-pointer hover:text-rose-500 ml-1">close</span></span>
                  <span className="bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold px-2 py-1 rounded flex items-center gap-1.5 shadow-sm">Hand-Aged Brushed Brass <span className="material-symbols-outlined text-[12px] cursor-pointer hover:text-rose-500 ml-1">close</span></span>
                  <input type="text" placeholder="+ Add material tag..." className="bg-transparent text-[11px] outline-none min-w-[120px] ml-1 mt-1" />
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
            <button className="bg-indigo-700 hover:bg-indigo-800 text-white text-[11px] font-bold px-3 py-1.5 rounded flex items-center gap-1 transition-colors shadow-sm">
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

                <tr className="group">
                  <td className="px-4 py-4 w-12 text-center text-slate-300 group-hover:text-slate-500 cursor-grab"><span className="material-symbols-outlined text-[16px]">drag_indicator</span></td>
                  <td className="px-4 py-4 w-20"><span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded">2010</span></td>
                  <td className="px-4 py-4 w-48 font-bold text-sm text-slate-900">Foundation</td>
                  <td className="px-4 py-4 text-xs text-slate-600 leading-relaxed max-w-sm">Started career with a rigorous focus on quality, meticulous attention to structural carpentry, and residential restorations.</td>
                  <td className="px-4 py-4 w-24 text-right space-x-2 text-slate-400">
                    <span className="material-symbols-outlined text-[16px] cursor-pointer hover:text-indigo-600 transition-colors">edit</span>
                    <span className="material-symbols-outlined text-[16px] cursor-pointer hover:text-rose-500 transition-colors">delete</span>
                  </td>
                </tr>

                <tr className="group">
                  <td className="px-4 py-4 w-12 text-center text-slate-300 group-hover:text-slate-500 cursor-grab"><span className="material-symbols-outlined text-[16px]">drag_indicator</span></td>
                  <td className="px-4 py-4 w-20"><span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded">2015</span></td>
                  <td className="px-4 py-4 w-48 font-bold text-sm text-slate-900">Guild & Scale Expansion</td>
                  <td className="px-4 py-4 text-xs text-slate-600 leading-relaxed max-w-sm">Expanded operational capacity and assembled elite tradesmen, mastering complex bespoke cabinetry and private architectural commissions.</td>
                  <td className="px-4 py-4 w-24 text-right space-x-2 text-slate-400">
                    <span className="material-symbols-outlined text-[16px] cursor-pointer hover:text-indigo-600 transition-colors">edit</span>
                    <span className="material-symbols-outlined text-[16px] cursor-pointer hover:text-rose-500 transition-colors">delete</span>
                  </td>
                </tr>

                <tr className="group">
                  <td className="px-4 py-4 w-12 text-center text-slate-300 group-hover:text-slate-500 cursor-grab"><span className="material-symbols-outlined text-[16px]">drag_indicator</span></td>
                  <td className="px-4 py-4 w-20"><span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded">2018</span></td>
                  <td className="px-4 py-4 w-48 font-bold text-sm text-slate-900">Prestige Architecture</td>
                  <td className="px-4 py-4 text-xs text-slate-600 leading-relaxed max-w-sm">Built a trusted, premier reputation through dedication, executing full-scale penthouse and estate architecture in high-demand metropolitan enclaves.</td>
                  <td className="px-4 py-4 w-24 text-right space-x-2 text-slate-400">
                    <span className="material-symbols-outlined text-[16px] cursor-pointer hover:text-indigo-600 transition-colors">edit</span>
                    <span className="material-symbols-outlined text-[16px] cursor-pointer hover:text-rose-500 transition-colors">delete</span>
                  </td>
                </tr>

                <tr className="group">
                  <td className="px-4 py-4 w-12 text-center text-slate-300 group-hover:text-slate-500 cursor-grab"><span className="material-symbols-outlined text-[16px]">drag_indicator</span></td>
                  <td className="px-4 py-4 w-20"><span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">2024</span></td>
                  <td className="px-4 py-4 w-48 font-bold text-sm text-slate-900">Benchmark (Present)</td>
                  <td className="px-4 py-4 text-xs text-slate-600 leading-relaxed max-w-sm">Continuing to grow, innovate sustainable luxury fabrication, and set gold benchmarks for high-integrity architectural millwork and finishes.</td>
                  <td className="px-4 py-4 w-24 text-right space-x-2 text-slate-400">
                    <span className="material-symbols-outlined text-[16px] cursor-pointer hover:text-indigo-600 transition-colors">edit</span>
                    <span className="material-symbols-outlined text-[16px] cursor-pointer hover:text-rose-500 transition-colors">delete</span>
                  </td>
                </tr>

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
              4 of 4 slots configured <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-3 gap-6 mb-8">

              {/* Slot 1 */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg overflow-hidden shadow-sm flex flex-col">
                <div className="aspect-[4/3] bg-slate-200 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center transition-all cursor-pointer">
                    <span className="bg-white text-slate-900 text-[10px] font-bold px-3 py-1.5 rounded shadow-lg">Change Image</span>
                  </div>
                  <div className="absolute top-2 left-2 bg-slate-900/70 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">Slot 01</div>
                  {/* Fake img */}
                  <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=400&h=300" className="w-full h-full object-cover" alt="Gallery 1" />
                </div>
                <div className="p-3 space-y-3 flex-1">
                  <div>
                    <label className="text-[9px] font-bold tracking-wider text-slate-400 uppercase block mb-1">Project Title</label>
                    <input type="text" className="w-full text-xs font-semibold bg-white border border-slate-200 rounded px-2 py-1 text-slate-900" defaultValue="Highland Kitchen & Wine Vault" />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold tracking-wider text-slate-400 uppercase block mb-1">Category</label>
                    <select className="w-full text-xs font-semibold bg-white border border-slate-200 rounded px-2 py-1 text-slate-900">
                      <option>Culinary Architecture</option>
                      <option>Stonework & Wellness</option>
                      <option>Private Residence</option>
                    </select>
                  </div>
                </div>
                <div className="px-3 py-2 bg-slate-100 border-t border-slate-200 flex justify-between items-center text-slate-400">
                  <span className="text-[10px] font-bold flex items-center gap-1 cursor-pointer hover:text-indigo-600 transition-colors"><span className="material-symbols-outlined text-[14px]">sync</span> Replace</span>
                  <span className="material-symbols-outlined text-[14px] cursor-pointer hover:text-rose-500 transition-colors">delete</span>
                </div>
              </div>

              {/* Slot 2 */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg overflow-hidden shadow-sm flex flex-col">
                <div className="aspect-[4/3] bg-slate-200 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center transition-all cursor-pointer">
                    <span className="bg-white text-slate-900 text-[10px] font-bold px-3 py-1.5 rounded shadow-lg">Change Image</span>
                  </div>
                  <div className="absolute top-2 left-2 bg-slate-900/70 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">Slot 02</div>
                  {/* Fake img */}
                  <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400&h=300" className="w-full h-full object-cover" alt="Gallery 2" />
                </div>
                <div className="p-3 space-y-3 flex-1">
                  <div>
                    <label className="text-[9px] font-bold tracking-wider text-slate-400 uppercase block mb-1">Project Title</label>
                    <input type="text" className="w-full text-xs font-semibold bg-white border border-slate-200 rounded px-2 py-1 text-slate-900" defaultValue="Noir Marble Sanctuary" />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold tracking-wider text-slate-400 uppercase block mb-1">Category</label>
                    <select className="w-full text-xs font-semibold bg-white border border-slate-200 rounded px-2 py-1 text-slate-900">
                      <option>Stonework & Wellness</option>
                      <option>Culinary Architecture</option>
                      <option>Private Residence</option>
                    </select>
                  </div>
                </div>
                <div className="px-3 py-2 bg-slate-100 border-t border-slate-200 flex justify-between items-center text-slate-400">
                  <span className="text-[10px] font-bold flex items-center gap-1 cursor-pointer hover:text-indigo-600 transition-colors"><span className="material-symbols-outlined text-[14px]">sync</span> Replace</span>
                  <span className="material-symbols-outlined text-[14px] cursor-pointer hover:text-rose-500 transition-colors">delete</span>
                </div>
              </div>

              {/* Slot 3 */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg overflow-hidden shadow-sm flex flex-col">
                <div className="aspect-[4/3] bg-slate-200 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center transition-all cursor-pointer">
                    <span className="bg-white text-slate-900 text-[10px] font-bold px-3 py-1.5 rounded shadow-lg">Change Image</span>
                  </div>
                  <div className="absolute top-2 left-2 bg-slate-900/70 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">Slot 03</div>
                  {/* Fake img */}
                  <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=400&h=300" className="w-full h-full object-cover" alt="Gallery 3" />
                </div>
                <div className="p-3 space-y-3 flex-1">
                  <div>
                    <label className="text-[9px] font-bold tracking-wider text-slate-400 uppercase block mb-1">Project Title</label>
                    <input type="text" className="w-full text-xs font-semibold bg-white border border-slate-200 rounded px-2 py-1 text-slate-900" defaultValue="Yorkville Monolith Estate" />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold tracking-wider text-slate-400 uppercase block mb-1">Category</label>
                    <select className="w-full text-xs font-semibold bg-white border border-slate-200 rounded px-2 py-1 text-slate-900">
                      <option>Private Residence</option>
                      <option>Culinary Architecture</option>
                      <option>Stonework & Wellness</option>
                    </select>
                  </div>
                </div>
                <div className="px-3 py-2 bg-slate-100 border-t border-slate-200 flex justify-between items-center text-slate-400">
                  <span className="text-[10px] font-bold flex items-center gap-1 cursor-pointer hover:text-indigo-600 transition-colors"><span className="material-symbols-outlined text-[14px]">sync</span> Replace</span>
                  <span className="material-symbols-outlined text-[14px] cursor-pointer hover:text-rose-500 transition-colors">delete</span>
                </div>
              </div>

            </div>

            <div className="w-full bg-indigo-50/50 border-2 border-dashed border-indigo-200 rounded-xl py-8 flex flex-col items-center justify-center text-slate-500 cursor-pointer hover:bg-indigo-50 transition-colors">
              <span className="material-symbols-outlined text-indigo-500 text-[24px] mb-2">cloud_upload</span>
              <p className="text-sm font-bold text-slate-800">+ Drag and drop new project photos here (PNG, JPG up to 20MB)</p>
              <p className="text-[10px] mt-1">High-resolution architectural photography with aspect ratio 16:10 or 3:2 recommended</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 py-4">
          <span className="flex items-center gap-1 text-emerald-600 font-semibold"><span className="material-symbols-outlined text-[14px]">check_circle</span> All edits are validated against public accessibility & responsive guidelines.</span>
          <div className="flex items-center gap-3">
            <button className="text-slate-500 hover:text-slate-900 font-semibold">Discard</button>
            <button className="px-4 py-2 bg-indigo-700 hover:bg-indigo-800 text-white font-bold rounded shadow-sm transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-[14px]">save</span> Publish to Live Site
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
