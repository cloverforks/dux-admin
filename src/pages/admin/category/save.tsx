import { useTranslate, useList } from '@refinedev/core'
import { FormModal } from '@duxweb/dux-refine'
import { Form, Input, Cascader } from 'tdesign-react/esm'

const Page = (props: Record<string, any>) => {
  const translate = useTranslate()

  const { data, isLoading } = useList({
    resource: 'category',
  })
  const list = data?.data || []

  return (
    <FormModal id={props?.id}>
      <Form.FormItem label={translate('category.fields.parent')} name='parent_id'>
        <Cascader
          loading={isLoading}
          options={list}
          keys={{
            label: 'name',
            value: 'id',
          }}
          clearable
        />
      </Form.FormItem>
      <Form.FormItem label={translate('category.fields.name')} name='name'>
        <Input />
      </Form.FormItem>
    </FormModal>
  )
}

export default Page
