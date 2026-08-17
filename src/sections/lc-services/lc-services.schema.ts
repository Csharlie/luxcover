export interface LcServiceItem {
  title: string
  icon: string
  description: string
  backgroundImage?: string
}

export interface LcServicesData {
  title: string
  subtitle?: string
  services: LcServiceItem[]
}
