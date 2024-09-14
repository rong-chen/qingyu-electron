

const vmWindow = {
  mounted:(el)=>{

  }
}


let directives = {
  vmWindow
}

//批量注册
directives.install = function (app) {
  Object.keys(directives).forEach((key) => {
    app.directive(key, directives[key])
  })
}


export default directives;
