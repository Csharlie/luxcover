import { useEffect } from 'react'
import { X } from 'lucide-react'
import type { LegalDocument } from '../data/legal'

interface LegalModalProps {
  doc: LegalDocument
  onClose: () => void
}

export function LegalModal({ doc, onClose }: LegalModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-obsidian-900 border border-obsidian-700 rounded-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-obsidian-900 border-b border-obsidian-700 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">{doc.title}</h2>
            <p className="text-xs text-gray-500 mt-0.5">Utolsó frissítés: {doc.lastUpdated}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1"
            aria-label="Bezárás"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="px-6 py-6 space-y-6">
          {doc.sections.map((section) => (
            <div key={section.heading}>
              <h3 className="text-sm font-semibold text-gold uppercase tracking-wider mb-3">
                {section.heading}
              </h3>
              <div className="space-y-2">
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="text-sm text-gray-300 leading-relaxed">{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
