import type { NsJsonSchemaForm } from '../../canvas-json-schema-form'

export const defaultFormSchemaService: NsJsonSchemaForm.IFormSchemaService = async args => {
  const { targetType } = args
  const isGroup = args.targetData?.isGroup

  const groupSchema: NsJsonSchemaForm.ISchema = {
    tabs: [
      {
        name: 'Setup',
        groups: [
          {
            name: 'groupName',
            controls: [
              {
                label: 'Group',
                name: 'group-service',
                shape: 'group-service',
                placeholder: 'Group Name',
              },
            ],
          },
        ],
      },
    ],
  }

  const nodeSchema: NsJsonSchemaForm.ISchema = {
    tabs: [
      {
        name: 'Setup',
        groups: [
          {
            name: 'groupName',
            controls: [
              {
                label: 'Node',
                name: 'node-service',
                shape: 'node-service',
                placeholder: 'Node Label',
              },
            ],
          },
        ],
      },
    ],
  }
  const edgeSchema: NsJsonSchemaForm.ISchema = {
    tabs: [
      {
        name: 'Setup',
        groups: [
          {
            name: 'groupName',
            controls: [
              {
                label: 'Edge',
                name: 'edge-service',
                shape: 'edge-service',
                placeholder: 'Edge Label',
              },
            ],
          },
        ],
      },
    ],
  }

  if (isGroup) {
    return groupSchema
  }

  if (targetType === 'node') {
    return nodeSchema
  }

  if (targetType === 'edge') {
    return edgeSchema
  }
  return {
    tabs: [
      {
        name: 'Setup',
        groups: [
          {
            name: 'groupName',
            controls: [
              {
                label: '',
                name: 'canvas-service',
                shape: 'canvas-service',
              },
            ],
          },
        ],
      },
    ],
  } as NsJsonSchemaForm.ISchema
}
