const prism = require('prismjs')
const FINISH = 'finish'
const EXECUTING = 'executing'
class AutoCode {
  constructor() {
    this._executeStatus = FINISH
    this._code = ''
    this._showEl = null
    this._writeCodeEl = null
    this.speed = 50
    // 执行器队列
    this._executeQueen = []
  }
  // 创建展示区域
  createShowView(el) {
    const _el = document.querySelector(el)
    _el.setAttribute('style', 'transition: all 1s;')
    this._showEl = _el
  }
  // 创建代码自动执行区域
  createWriteCode(el) {
    const _el = document.querySelector(el)
    _el.setAttribute('style', 'transition: all 1s;background-color: #000;color: #fff;font-size: 14px')
    this._writeCodeEl = _el
  }
  // 创建div元素
  createDiv(id, parentId) {
    this._executeQueen.push((cb) => {
      const div = document.createElement('div')
      div.setAttribute('style', 'transition: all 1s;')
      div.setAttribute('id', id)
      if(parentId) {
        const parentDiv = document.getElementById(parentId)
        parentDiv.appendChild(div)
      } else {
        this._showEl.appendChild(div)
      }
      cb()
    })
  }
  // 创建样式
  createStyle(id, styles = {}) {
    this._executeQueen.push((cb) => {
      this.autoWrite(`
        #${id}
        ${
          JSON.stringify(styles)
          // .replace(/{/g, '{<br/>')
          // .replace(/}/g, '<br />}')
          // .replace(/,/g, ',<br />')
        }
        `, () => {
          const box = document.getElementById(id)
          Object.keys(styles).forEach(styleName => {
            box.style[styleName] = styles[styleName]
          })
          setTimeout(() => {
            cb()
          }, 1000)
        })
    })
  }
  // 添加注释
  addText(text) {
    this._executeQueen.push((cb) => {
      this.autoWrite(`/* ${text} */`, () => {
        cb()
      })
    })
  }
  // 执行器
  execute() {
    if(this._executeStatus === FINISH) {
      // 每次执行最后一个函数
      let fn = this._executeQueen.shift()
      // 全部执行完毕
      if(!fn) {
        return
      }
      this._executeStatus = EXECUTING
      fn(() => {
        // 当函数执行完毕再执行下一个
        this._executeStatus = FINISH
        this.execute()
      })
    }
  }
  // 延时器
  delay(time) {
    this._executeQueen.push((cb) => {
      setTimeout(() => {
        cb()
      }, time)
    })
    return this
  }
  // 自动打印代码
  autoWrite(code, cb = () => {}) {
    let pos = 0
    let timer = null
    let box = document.createElement('div')
    let codeStr = ''
    this._writeCodeEl.appendChild(box)
    timer = setInterval(() => {
      codeStr += code[pos]
      box.innerHTML = prism.highlight(codeStr, prism.languages.css, 'css')
      pos++
      if(pos >= code.length) {
        clearInterval(timer)
        this._code += '<br />'
        cb()
      }
    }, this.speed)
  }
}

export default AutoCode
