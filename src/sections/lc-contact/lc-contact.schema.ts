export interface LcContactInfo {
  phone?: string
  email?: string
  address?: string
}

export interface LcContactData {
  title: string
  subtitle?: string
  description?: string
  contactInfo: LcContactInfo
}
