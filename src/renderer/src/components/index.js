const componentList = [
  {
    Path: () => import('./AppTabBar/index.vue'),
    Name: 'AppTabBar'
  }
]

export const loadingComponents = (app) => {
  componentList.forEach(async (item) => {
    const component = await item.Path()
    app.component(item.Name, component.default)
  })
}
