import React, { useRef } from 'react'
import { useTranslate, useDelete } from '@refinedev/core'
import { PrimaryTableCol, Button, Input, Tag, Link, Popconfirm } from 'tdesign-react/esm'
import { PageTable, FilterItem, CardTableRef, Modal } from '@duxweb/dux-refine'

const List = () => {
  const translate = useTranslate()
  const { mutate } = useDelete()

  const table = useRef<CardTableRef>(null)

  const columns = React.useMemo<PrimaryTableCol[]>(
    () => [
      { colKey: 'row-select', type: 'multiple' },
      {
        colKey: 'id',
        sorter: true,
        sortType: 'all',
        title: 'ID',
        width: 100,
      },
      {
        colKey: 'title',
        title: translate('article.fields.title'),
        minWidth: 200,
      },
      {
        colKey: 'status',
        title: translate('article.fields.status'),
        width: 150,
        filter: {
          type: 'single',
          list: [
            { label: translate('article.tab.published'), value: '1' },
            { label: translate('article.tab.unpublished'), value: '2' },
          ],
        },
        cell: ({ row }) => {
          return (
            <>
              {row.status ? (
                <Tag theme='warning' variant='outline'>
                  {translate('article.tab.published')}
                </Tag>
              ) : (
                <Tag theme='success' variant='outline'>
                  {translate('article.tab.unpublished')}
                </Tag>
              )}
            </>
          )
        },
      },
      {
        colKey: 'created_at',
        title: translate('article.fields.createdAt'),
        sorter: true,
        sortType: 'all',
        width: 200,
        cell: ({ row }) => {
          return new Date(row.created_at).toLocaleString(undefined, {
            timeZone: 'UTC',
          })
        },
      },
      {
        colKey: 'link',
        title: translate('table.actions'),
        fixed: 'right',
        align: 'center',
        width: 120,
        cell: ({ row }) => {
          return (
            <div className='flex justify-center gap-4'>
              <Modal
                title={translate('buttons.edit')}
                trigger={<Link theme='primary'>{translate('buttons.edit')}</Link>}
                component={() => import('./save')}
                componentProps={{ id: row.id }}
              />
              <Popconfirm
                content='确认删除吗'
                destroyOnClose
                placement='top'
                showArrow
                theme='default'
                onConfirm={() => {
                  mutate({
                    resource: 'article',
                    id: row.id,
                  })
                }}
              >
                <Link theme='danger'>{translate('buttons.delete')}</Link>
              </Popconfirm>
            </div>
          )
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [translate]
  )

  return (
    <PageTable
      ref={table}
      columns={columns}
      title={translate('blog_posts.fields.title')}
      tabs={[
        {
          label: translate('article.tab.all'),
          value: '0',
        },
        {
          label: translate('article.tab.published'),
          value: '1',
        },
        {
          label: translate('article.tab.unpublished'),
          value: '2',
        },
      ]}
      headerRender={
        <>
          <Modal
            title={translate('buttons.create')}
            trigger={<Button>{translate('buttons.create')}</Button>}
            component={() => import('./save')}
          ></Modal>
        </>
      }
      filterRender={() => {
        return (
          <>
            <FilterItem name='keyword'>
              <Input />
            </FilterItem>
          </>
        )
      }}
      batchRender={
        <>
          <Button>批量删除</Button>
        </>
      }
    />
  )
}

export default List
