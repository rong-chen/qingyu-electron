const componentList = [
  {
    Path: () => import('./AppTabBar/index.vue'),
    Name: 'AppTabBar'
  }, {
    Path: () => import('./contextMenu/index.vue'),
    Name: 'ContextMenu'
  },
]

export const loadingComponents = (app) => {
  componentList.forEach(async (item) => {
    const component = await item.Path()
    app.component(item.Name, component.default)
  })
}
