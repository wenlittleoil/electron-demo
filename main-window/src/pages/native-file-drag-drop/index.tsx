
import './index.scss'

export default function Index() {
  return (
    <div>
      <p>Drag the boxes below to somewhere in your OS (Finder/Explorer, Desktop, etc.) to copy an example markdown file.</p>
      <div 
        className='dd-item'
        draggable="true" id="drag1"
        onDragStart={(event) => {
          event.preventDefault()
          window.dragDrop.startDrag('drag-and-drop-1.md')
        }}
      >
        Drag me - File 1
      </div>
      <div 
        className='dd-item'
        draggable="true" id="drag2"
        onDragStart={(event) => {
          event.preventDefault()
          window.dragDrop.startDrag('drag-and-drop-2.md')
        }}
      >
          Drag me - File 2
      </div>
    </div>
  )
}
