import { useTranslate, useList } from '@refinedev/core'
import { FormModal } from '@duxweb/dux-refine'
import { Form, Input, Tree } from 'tdesign-react/esm'
import { useMemo } from 'react'

const Page = (props: Record<string, any>) => {
  const translate = useTranslate()

  const { data } = useList({
    resource: 'permission',
  })

  const treeData = useMemo(() => {
    const list = data?.data || []

    const resultArray = []

    for (const key in list) {
      const label = translate(`${key}.name`)
      const children = list[key].map((action: string) => ({
        label: translate(`buttons.${action}`),
        value: `${key}.${action}`,
      }))
      resultArray.push({ label, value: key, children })
    }

    return resultArray
  }, [data?.data, translate])

  return (
    <FormModal id={props?.id}>
      <Form.FormItem label={translate('role.fields.name')} name='name'>
        <Input />
      </Form.FormItem>
      <Form.FormItem label={translate('role.fields.permission')} name='permission'>
        <Tree checkable data={treeData} />
      </Form.FormItem>
    </FormModal>
  )
}

export default Page
