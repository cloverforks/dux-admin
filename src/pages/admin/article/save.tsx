import { useTranslate, useList } from '@refinedev/core'
import { FormModal, formatUploadSingle, getUploadSingle, useUpload } from '@duxweb/dux-refine'
import { Form, Input, Upload, Radio, Cascader } from 'tdesign-react/esm'

const Page = (props: Record<string, any>) => {
  const uploadParams = useUpload()
  const translate = useTranslate()

  const { data, isLoading } = useList({
    resource: 'category',
  })
  const list = data?.data || []

  return (
    <FormModal
      id={props?.id}
      initFormat={(data) => {
        data.image = data.image && formatUploadSingle(data.image)
        return data
      }}
      saveFormat={(data) => {
        data.image = data.image && getUploadSingle(data.image)
        return data
      }}
    >
      <Form.FormItem label={translate('category.fields.parent')} name='category_id'>
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
      <Form.FormItem label={translate('article.fields.title')} name='title'>
        <Input />
      </Form.FormItem>
      <Form.FormItem label={translate('article.fields.image')} name='image'>
        <Upload {...uploadParams} theme='image' accept='image/*' />
      </Form.FormItem>
      <Form.FormItem label={translate('article.fields.status')} name='status' initialData={true}>
        <Radio.Group>
          <Radio value={true}>{translate('article.tab.published')}</Radio>
          <Radio value={false}>{translate('article.tab.unpublished')}</Radio>
        </Radio.Group>
      </Form.FormItem>
    </FormModal>
  )
}

export default Page
