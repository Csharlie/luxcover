export interface LcGalleryImage {
  src: string
  alt: string
  category?: string
  caption?: string
}

export interface LcGalleryData {
  title: string
  subtitle?: string
  showCategories?: boolean
  perPage?: number
  images: LcGalleryImage[]
}
