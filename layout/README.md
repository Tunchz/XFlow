## About

Layout algorithms for AntV

## Installation

```shell
# npm
$ npm install @tunchz/xflow/layout --save

# yarn
$ yarn add @tunchz/xflow/layout
```

## Usage

```ts
import { GridLayout } from '@tunchz/xflow/layout'

const model = {
  nodes: [
    {
      id: 'node1',
      x: 0,
      y: 0,
    }, {
      id: 'node2',
      x: 20,
      y: 20,
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
  ],
}

const gridLayout = new GridLayout({
  type: 'grid',
  width: 600,
  height: 400,
  rows: 4,
  cols: 4,
})

const newModel = gridLayout.layout(model)

```

## Documentation

- [G6 Layout](https://g6.antv.vision/zh/docs/api/graphLayout/guide)

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE).
