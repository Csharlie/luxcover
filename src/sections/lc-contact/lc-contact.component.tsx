import { useState, type FormEvent } from 'react'
import { Phone, Mail, MapPin } from 'lucide-react'
import { useFormHandler } from '@spektra/runtime'
import type { LcContactData } from './lc-contact.schema'

type SubmitState =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'ok' }
  | { kind: 'error'; message: string; field?: string }
  | { kind: 'rate_limited' }

const RATE_LIMITED_MESSAGE =
  'Túl sok kérés vagy lehetséges spam-jelzés. Kérjük próbálja meg pár perc múlva újra, vagy hívjon minket telefonon.'

const VALIDATION_FALLBACK = 'Kérjük, ellenőrizze a mezőket és próbálja újra.'

export function LcContact({ title, subtitle, description, contactInfo }: LcContactData) {
  const handler = useFormHandler()
  const [state, setState] = useState<SubmitState>({ kind: 'idle' })

  const fieldErrorFor = (name: string): string | undefined =>
    state.kind === 'error' && state.field === name ? state.message : undefined

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (state.kind === 'loading') return

    const formEl = e.currentTarget
    const formData = new FormData(formEl)
    const fields: Record<string, string> = {}
    for (const [key, value] of formData.entries()) {
      if (typeof value === 'string') fields[key] = value
    }

    setState({ kind: 'loading' })
    try {
      const result = await handler.submit('contact', fields)
      switch (result.status) {
        case 'ok':
          setState({ kind: 'ok' })
          formEl.reset()
          break
        case 'error':
          setState({ kind: 'error', message: result.message || VALIDATION_FALLBACK, field: result.field })
          break
        case 'rate_limited':
          setState({ kind: 'rate_limited' })
          break
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Ismeretlen hiba történt'
      setState({ kind: 'error', message })
    }
  }

  function resetForm() { setState({ kind: 'idle' }) }

  const formDisabled = state.kind === 'loading'
  const generalError = state.kind === 'error' && !state.field ? state.message : undefined

  const inputClass = "w-full px-4 py-3 bg-obsidian-950 border border-obsidian-700 rounded-lg text-white placeholder-gray-600 focus:ring-2 focus:ring-gold/50 focus:border-gold/50 transition disabled:opacity-50"

  return (
    <section
      id="contact"
      data-ui-id="section-lc-contact"
      data-ui-component="lc-contact"
      data-ui-role="contact-section"
      className="bg-obsidian-950 py-24 scroll-mt-16"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-14">
          {subtitle && (
            <p
              data-ui-id="contact-subtitle"
              data-ui-role="section-subtitle"
              className="text-xs font-semibold text-gold uppercase tracking-[0.25em] mb-3"
            >
              {subtitle}
            </p>
          )}
          <h2
            data-ui-id="contact-title"
            data-ui-role="section-title"
            className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight"
          >
            {title}
          </h2>
          {description && (
            <p
              data-ui-id="contact-description"
              data-ui-role="section-description"
              className="text-lg text-gray-400"
            >
              {description}
            </p>
          )}
          <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact info panel */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-obsidian-900 border border-obsidian-700 rounded-xl p-8 flex flex-col gap-6 h-full">
              <h3 className="text-sm font-semibold text-gold uppercase tracking-wider">
                Elérhetőségeink
              </h3>

              {contactInfo.phone && (
                <a
                  href={`tel:${contactInfo.phone}`}
                  data-ui-type="link"
                  data-ui-id="contact-phone"
                  data-ui-action="call"
                  data-ui-trigger="click"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                    <Phone className="w-4 h-4 text-gold" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Telefon</p>
                    <p className="text-white font-semibold group-hover:text-gold transition-colors">
                      {contactInfo.phone}
                    </p>
                  </div>
                </a>
              )}

              {contactInfo.email && (
                <a
                  href={`mailto:${contactInfo.email}`}
                  data-ui-type="link"
                  data-ui-id="contact-email"
                  data-ui-action="email"
                  data-ui-trigger="click"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                    <Mail className="w-4 h-4 text-gold" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">E-mail</p>
                    <p className="text-white font-semibold group-hover:text-gold transition-colors break-all">
                      {contactInfo.email}
                    </p>
                  </div>
                </a>
              )}

              {contactInfo.address && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-gold" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Cím</p>
                    <p className="text-white font-semibold">{contactInfo.address}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div
              data-ui-id="contact-form-container"
              data-ui-role="form-container"
              className="bg-obsidian-900 border border-obsidian-700 p-6 md:p-10 rounded-xl"
            >
              {state.kind === 'ok' ? (
                <div
                  data-ui-id="contact-success"
                  data-ui-role="feedback-container"
                  data-ui-state="success"
                  className="flex flex-col items-center justify-center text-center p-8"
                >
                  <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mb-6">
                    <span className="text-gold text-2xl">✓</span>
                  </div>
                  <p className="text-2xl font-bold text-white mb-2">Köszönjük az üzenetet!</p>
                  <p className="text-gray-400 mb-6">Hamarosan felvesszük Önnel a kapcsolatot.</p>
                  <button
                    type="button"
                    data-ui-type="button"
                    data-ui-id="contact-reset"
                    data-ui-action="reset"
                    data-ui-trigger="click"
                    onClick={resetForm}
                    className="text-gold hover:underline font-medium"
                  >
                    Új üzenet küldése
                  </button>
                </div>
              ) : state.kind === 'rate_limited' ? (
                <div
                  data-ui-id="contact-rate-limited"
                  data-ui-role="feedback-container"
                  data-ui-state="rate-limited"
                  className="flex flex-col items-center justify-center text-center p-8"
                >
                  <p className="text-2xl font-bold text-white mb-2">Egy pillanat türelmet kérünk</p>
                  <p className="text-gray-400 mb-6">{RATE_LIMITED_MESSAGE}</p>
                  <button
                    type="button"
                    data-ui-type="button"
                    data-ui-id="contact-rate-limited-reset"
                    data-ui-action="reset"
                    data-ui-trigger="click"
                    onClick={resetForm}
                    className="text-gold hover:underline font-medium"
                  >
                    Próbálom újra
                  </button>
                </div>
              ) : (
                <form
                  data-ui-id="contact-form"
                  data-ui-type="form"
                  data-ui-action="submit-form"
                  data-ui-trigger="submit"
                  data-ui-state={state.kind}
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-5"
                >
                  <div className="grid md:grid-cols-2 gap-5">
                    <div data-ui-id="contact-name-field" data-ui-role="form-field">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Név *</label>
                      <input
                        type="text"
                        name="your-name"
                        required
                        disabled={formDisabled}
                        placeholder="Kovács János"
                        aria-invalid={!!fieldErrorFor('your-name')}
                        data-ui-type="input"
                        data-ui-id="contact-name-input"
                        data-ui-required="true"
                        data-ui-format="text"
                        className={inputClass}
                      />
                      {fieldErrorFor('your-name') && (
                        <p className="mt-2 text-sm text-red-400">{fieldErrorFor('your-name')}</p>
                      )}
                    </div>
                    <div data-ui-id="contact-phone-field" data-ui-role="form-field">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Telefonszám</label>
                      <input
                        type="tel"
                        name="your-phone"
                        disabled={formDisabled}
                        placeholder="+36 30 123 4567"
                        aria-invalid={!!fieldErrorFor('your-phone')}
                        data-ui-type="input"
                        data-ui-id="contact-phone-input"
                        data-ui-format="tel"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div data-ui-id="contact-email-field" data-ui-role="form-field">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                    <input
                      type="email"
                      name="your-email"
                      required
                      disabled={formDisabled}
                      placeholder="kovacs.janos@email.com"
                      aria-invalid={!!fieldErrorFor('your-email')}
                      data-ui-type="input"
                      data-ui-id="contact-email-input"
                      data-ui-required="true"
                      data-ui-format="email"
                      className={inputClass}
                    />
                    {fieldErrorFor('your-email') && (
                      <p className="mt-2 text-sm text-red-400">{fieldErrorFor('your-email')}</p>
                    )}
                  </div>

                  <div data-ui-id="contact-service-field" data-ui-role="form-field">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Érdeklődés tárgya</label>
                    <select
                      name="your-service"
                      disabled={formDisabled}
                      data-ui-type="select"
                      data-ui-id="contact-service-select"
                      className={`${inputClass} cursor-pointer`}
                    >
                      <option value="">Válasszon szolgáltatást…</option>
                      <option value="ablakfolia">Ablakfólia</option>
                      <option value="wrap">Wrap – Színfóliázás</option>
                      <option value="ppf">PPF – Karosszériavédelem</option>
                      <option value="epuletfolia">Épületfóliázás</option>
                      <option value="egyeb">Egyéb</option>
                    </select>
                  </div>

                  <div data-ui-id="contact-message-field" data-ui-role="form-field">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Üzenet *</label>
                    <textarea
                      name="your-message"
                      required
                      disabled={formDisabled}
                      rows={5}
                      placeholder="Írja le kérését, autója típusát és az elvégzendő munkát…"
                      aria-invalid={!!fieldErrorFor('your-message')}
                      data-ui-type="textarea"
                      data-ui-id="contact-message-textarea"
                      data-ui-required="true"
                      data-ui-format="text"
                      className={`${inputClass} resize-none`}
                    />
                    {fieldErrorFor('your-message') && (
                      <p className="mt-2 text-sm text-red-400">{fieldErrorFor('your-message')}</p>
                    )}
                  </div>

                  {/* GDPR */}
                  <div
                    data-ui-id="contact-gdpr-field"
                    data-ui-role="form-field"
                    className="flex items-start gap-3 text-sm text-gray-300"
                  >
                    <input
                      type="checkbox"
                      id="contact-gdpr-checkbox"
                      name="gdpr-accept"
                      value="1"
                      required
                      disabled={formDisabled}
                      aria-invalid={!!fieldErrorFor('gdpr-accept')}
                      data-ui-type="checkbox"
                      data-ui-id="contact-gdpr-input"
                      data-ui-required="true"
                      className="mt-1 w-4 h-4 accent-gold cursor-pointer disabled:opacity-50"
                    />
                    <label htmlFor="contact-gdpr-checkbox" className="leading-relaxed cursor-pointer select-none">
                      Elfogadom az adatvédelmi tájékoztatót (lábléc → Adatvédelem). *
                    </label>
                  </div>
                  {fieldErrorFor('gdpr-accept') && (
                    <p className="-mt-3 text-sm text-red-400">{fieldErrorFor('gdpr-accept')}</p>
                  )}

                  {/* Honeypot */}
                  <div
                    aria-hidden="true"
                    style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}
                  >
                    <label htmlFor="honeypot-field">Ne töltse ki ezt a mezőt</label>
                    <input type="text" id="honeypot-field" name="honeypot-field" tabIndex={-1} autoComplete="off" />
                  </div>

                  {generalError && (
                    <p
                      role="alert"
                      data-ui-id="contact-general-error"
                      data-ui-role="form-error"
                      className="text-sm text-red-400 bg-red-950/40 border border-red-900 rounded px-4 py-3"
                    >
                      {generalError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={formDisabled}
                    data-ui-type="button"
                    data-ui-id="contact-submit-button"
                    data-ui-action="submit-form"
                    data-ui-trigger="click"
                    data-ui-role="submit-button"
                    data-ui-state={state.kind}
                    className="w-full font-bold py-3.5 px-6 rounded-lg bg-gold text-obsidian-950 transition-colors hover:bg-gold-light disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {state.kind === 'loading' ? 'Küldés…' : 'Ajánlatot kérek'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
