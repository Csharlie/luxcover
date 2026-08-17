import { createFormHandler, type FormHandler } from '@spektra/data'

export function createLcFormHandler(): FormHandler {
  const driver = import.meta.env.VITE_FORM_HANDLER ?? 'noop'

  switch (driver) {
    case 'cf7': {
      const apiBase = import.meta.env.VITE_FORM_CF7_API_BASE as string | undefined
      const formId = import.meta.env.VITE_FORM_CF7_FORM_ID as string | undefined
      if (!apiBase) {
        throw new Error('VITE_FORM_CF7_API_BASE is required when VITE_FORM_HANDLER=cf7')
      }
      if (!formId) {
        throw new Error('VITE_FORM_CF7_FORM_ID is required when VITE_FORM_HANDLER=cf7')
      }
      return createFormHandler({ driver: 'cf7', apiBase, formId })
    }

    case 'mailto': {
      const target =
        (import.meta.env.VITE_FORM_MAILTO_TARGET as string | undefined) ??
        'luxcover.info@gmail.com'
      return createFormHandler({
        driver: 'mailto',
        target,
        subjectTemplate: '[luxcover.hu] Új ajánlatkérés ({formId})',
      })
    }

    case 'noop':
      return createFormHandler({ driver: 'noop' })

    default:
      console.warn(`Unknown VITE_FORM_HANDLER "${driver as string}", falling back to noop`)
      return createFormHandler({ driver: 'noop' })
  }
}
