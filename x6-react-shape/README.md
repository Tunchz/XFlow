# @tunchz/xflow/x6-react-shape

> x6 shape for rendering react components

## Installation

```shell
# npm
$ npm install @tunchz/xflow/x6-react-shape --save

# yarn
$ yarn add @tunchz/xflow/x6-react-shape
```

## Usage

```ts
import { Graph } from '@tunchz/xflow/x6'
import '@tunchz/xflow/x6-react-shape'

// render
graph.addNode({
  shape: 'react-shape',
  x: 32,
  y: 48,
  width: 180,
  height: 40,
  component: (
    <div
      style={{
        color: '#fff',
        width: '100%',
        height: '100%',
        background: '#597ef7',
        textAlign: 'center',
        lineHeight: '40px',
      }}
    >
      This is a react element
    </div>
  ),
})
```

