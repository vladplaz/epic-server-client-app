import M from 'materialize-css'

export default class MaterialService {
  static initTabs = (el) => {
    M.Tabs.init(el)
  }
  static initModal = (el) => {
    return M.Modal.init(el)
  }
}
