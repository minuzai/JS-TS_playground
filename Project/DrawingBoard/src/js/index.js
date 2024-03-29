console.log('그림판')

class DrawingBoard {
  MODE = 'NONE' // NONE BRUSH ERASER
  IsMouseDown = false
  IsNavigatorVisible = false
  EraserColor = '#FFFFFF'
  BackgroundColor = '#FFFFFF'
  UndoArray = []

  context
  containerEl
  canvasEl
  toolbarEl
  brushEl
  colorPickerEl
  brushPanelEl
  brushSliderEl
  brushSizePreviewEl
  eraserEl
  navigatorEl
  navigatorImageContainerEl
  navigatorImageEl
  undoEl
  clearEl
  downloadLinkEl

  constructor() {
    this.assignElement()
    this.initContext()
    this.initCanvasBackgroundColor()
    this.addEvent()
  }

  assignElement() {
    this.containerEl = document.getElementById('container')
    this.canvasEl = this.containerEl.querySelector('#canvas')
    this.toolbarEl = this.containerEl.querySelector('#toolbar')
    this.brushEl = this.toolbarEl.querySelector('#brush')
    this.colorPickerEl = this.toolbarEl.querySelector('#colorPicker')
    this.brushPanelEl = this.containerEl.querySelector('#brushPanel')
    this.brushSliderEl = this.brushPanelEl.querySelector('#brushSize')
    this.brushSizePreviewEl =
      this.brushPanelEl.querySelector('#brushSizePreview')
    this.eraserEl = this.toolbarEl.querySelector('#eraser')
    this.navigatorEl = this.toolbarEl.querySelector('#navigator')
    this.navigatorImageContainerEl = this.containerEl.querySelector('#imgNav')
    this.navigatorImageEl =
      this.navigatorImageContainerEl.querySelector('#canvasImg')
    this.undoEl = this.toolbarEl.querySelector('#undo')
    this.clearEl = this.toolbarEl.querySelector('#clear')
    this.downloadLinkEl = this.toolbarEl.querySelector('#download')
  }

  initContext() {
    this.context = this.canvasEl.getContext('2d')
  }

  initCanvasBackgroundColor() {
    this.context.fillStyle = this.BackgroundColor
    this.context.fillRect(0, 0, this.canvasEl.width, this.canvasEl.height)
  }

  addEvent() {
    this.brushEl.addEventListener('click', this.onClickBrush.bind(this))
    this.canvasEl.addEventListener('mousedown', this.onMouseDown.bind(this))
    this.canvasEl.addEventListener('mousemove', this.onMouseMove.bind(this))
    this.canvasEl.addEventListener('mouseup', this.onMouseUp.bind(this))
    this.canvasEl.addEventListener('mouseout', this.onMouseOut.bind(this))
    this.brushSliderEl.addEventListener(
      'input',
      this.onChangeBrushSize.bind(this),
    )
    this.colorPickerEl.addEventListener('input', this.onChangeColor.bind(this))
    this.eraserEl.addEventListener('click', this.onClickEraser.bind(this))
    this.navigatorEl.addEventListener('click', this.onClickNavigator.bind(this))
    this.undoEl.addEventListener('click', this.onClickUndo.bind(this))
    this.clearEl.addEventListener('click', this.onClickClear.bind(this))
    this.downloadLinkEl.addEventListener(
      'click',
      this.onClickDownload.bind(this),
    )
  }

  onClickBrush(event) {
    const isActive = event.currentTarget.classList.contains('active')
    this.MODE = isActive ? 'NONE' : 'BRUSH'
    this.canvasEl.style.cursor = isActive ? 'default' : 'crosshair'
    event.currentTarget.classList.toggle('active')
    this.brushPanelEl.classList.toggle('hide')
    this.eraserEl.classList.remove('active')
  }

  onChangeBrushSize(event) {
    this.brushSizePreviewEl.style.width = `${event.target.value}px`
    this.brushSizePreviewEl.style.height = `${event.target.value}px`
  }

  onClickEraser(event) {
    const isActive = event.currentTarget.classList.contains('active')
    this.MODE = isActive ? 'NONE' : 'ERASER'
    this.canvasEl.style.cursor = isActive ? 'default' : 'crosshair'
    event.currentTarget.classList.toggle('active')
    this.brushPanelEl.classList.add('hide')
    this.brushEl.classList.remove('active')
  }

  onClickNavigator(event) {
    this.IsNavigatorVisible = !event.currentTarget.contains['active']
    event.currentTarget.classList.contains('active')
    event.currentTarget.classList.toggle('active')
    this.navigatorImageContainerEl.classList.toggle('hide')
    this.updateNavigator()
  }

  updateNavigator() {
    if (!this.IsNavigatorVisible) return
    this.navigatorImageEl.src = this.canvasEl.toDataURL()
  }

  onClickUndo() {
    if (this.UndoArray.length === 0) {
      alert('더 이상 실행 취소 불가합니다.')
      return
    }
    let previousDataUrl = this.UndoArray.pop()
    let previousImage = new Image()
    previousImage.onload = () => {
      this.context.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height)
      this.context.drawImage(
        previousImage,
        0,
        0,
        this.canvasEl.width,
        this.canvasEl.height,
        0,
        0,
        this.canvasEl.width,
        this.canvasEl.height,
      )
    }
    previousImage.src = previousDataUrl
  }

  saveState() {
    if (this.UndoArray.length > 4) this.UndoArray.shift()
    this.UndoArray.push(this.canvasEl.toDataURL())
  }

  onClickClear() {
    this.context.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height)
    this.UndoArray = []
    this.updateNavigator()
    this.initCanvasBackgroundColor()
  }

  onClickDownload() {
    this.downloadLinkEl.href = this.canvasEl.toDataURL('image/jpeg', 1)
    this.downloadLinkEl.download = 'example.jpeg'
  }

  onChangeColor(event) {
    this.brushSizePreviewEl.style.background = event.target.value
  }

  onMouseDown(event) {
    if (this.MODE === 'NONE') return
    this.IsMouseDown = true
    const currentPosition = this.getMousePosition(event)
    this.context.beginPath()
    this.context.moveTo(currentPosition.x, currentPosition.y)
    this.context.lineCap = 'round'
    if (this.MODE === 'BRUSH') {
      this.context.strokeStyle = this.colorPickerEl.value
      this.context.lineWidth = this.brushSliderEl.value
    } else if (this.MODE === 'ERASER') {
      this.context.strokeStyle = this.EraserColor
      this.context.lineWidth = 50
    }
    this.saveState()
  }

  onMouseMove(event) {
    if (!this.IsMouseDown) return
    const currentPosition = this.getMousePosition(event)
    this.context.lineTo(currentPosition.x, currentPosition.y)
    this.context.stroke()
  }

  onMouseUp() {
    if (this.MODE === 'NONE') return
    this.IsMouseDown = false
    this.updateNavigator()
  }

  onMouseOut() {
    this.onMouseUp()
  }

  getMousePosition(event) {
    const boundaries = this.canvasEl.getBoundingClientRect()
    return {
      x: event.clientX - boundaries.left,
      y: event.clientY - boundaries.top,
    }
  }
}

new DrawingBoard()
