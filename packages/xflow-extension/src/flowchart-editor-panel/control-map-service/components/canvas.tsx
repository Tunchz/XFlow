import React from 'react'
import { PREFIX } from './constants'

export const CanvasService: React.FC = () => {
  return (
    <div className={`${PREFIX}-canvas-panel`}>
      <span>no object selected</span>
    </div>
  )
}
