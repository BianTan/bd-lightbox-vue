export interface LightBoxOptions {
  spaceBetween?: number;
}

export interface DataItemProps {
  src: string;
  desc?: string;
  alt?: string;
}

export type DataListProps = (string | DataItemProps)[]

export type EventEmit = (event: 'lightboxOpen' | 'lightboxClose' | 'lightboxNext' | 'lightboxPrev' | 'lightboxSwitch', ...args: any[]) => void
