import {ElementRef} from '@angular/core'

declare var M

export interface MaterialInstance {
  open(): void
  close(): void
}

export default class MaterializeService {

  static initTabs = (el: ElementRef) => {
    M.Tabs.init(el.nativeElement)
  }

  static initModal = (el: ElementRef): MaterialInstance => {
    return M.Modal.init(el.nativeElement)
  }

}
