import { ComputedRef } from 'vue'

export type ItemPosition = 'left' | 'right' | 'center'

export interface LightBoxOptions {
  spaceBetween?: number;
  listHeight?: number;
  itemPosition?: ItemPosition;
  isFull?: boolean;
  buttonShowTime?: number;
  isLazyload?: boolean;
}

export interface DataItemProps {
  src: string;
  desc?: string;
  alt?: string;
}

export type DataListProps = (string | DataItemProps)[]

export type EventEmit = (event: 'lightboxOpen' | 'lightboxClose' | 'lightboxNext' | 'lightboxPrev' | 'lightboxSwitch', ...args: any[]) => void

export interface LightBoxState {
  isShow: boolean;
  sidebarIsShow: boolean;
  isLoaded: boolean;
  isButtonShow: boolean;
  currentId: number;
  timer: undefined | number;
}

export interface UseLightBoxProps {
  state: LightBoxState;
  openLightbox: (id?: string | number) => void;
  handleClick: (e: Event) => void;
  onSidebarItemClick: (id: number) => void;
  goPrev: () => void;
  goNext: () => void;
  switchSidebarState: () => void;
}

export interface OptionsExcluedObject {
  [T: string]: string;
}
export type OptionsExcluedItem = string | OptionsExcluedObject
export type OptionsExclued = (OptionsExcluedItem | OptionsExcluedItem[])
export interface OptionProps {
  getImgs?: (imgAry: string[]) => void;
  openLightbox?: (id: string) => void;
  exclude?: OptionsExclued | undefined;
}

export interface ItemStyleProps {
  width?: string;
  maxWidth?: string;
  marginRight: string;
}
export interface ListStyleProps {
  height?: string;
  justifyContent?: string;
}
export interface UseStyleProps {
  itemStyle: ComputedRef<ItemStyleProps>;
  listStyle: ComputedRef<ListStyleProps>;
}
