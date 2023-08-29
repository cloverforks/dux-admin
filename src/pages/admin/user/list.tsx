import React, { useRef } from 'react'
import { useTranslate, useDelete } from '@refinedev/core'
import { PrimaryTableCol, Button, Link, Popconfirm } from 'tdesign-react/esm'
import { PageTable, CardTableRef, Modal, MediaText } from '@duxweb/dux-refine'

const List = () => {
  const translate = useTranslate()
  const { mutate } = useDelete()

  const table = useRef<CardTableRef>(null)

  const columns = React.useMemo<PrimaryTableCol[]>(
    () => [
      {
        colKey: 'id',
        sorter: true,
        sortType: 'all',
        title: 'ID',
        width: 150,
      },
      {
        colKey: 'nickname',
        title: translate('user.fields.nickname'),
        ellipsis: true,
        cell: ({ row }) => {
          return (
            <MediaText>
              <MediaText.Avatar image={row.avatar} />
              <MediaText.Title>{row.nickname}</MediaText.Title>
            </MediaText>
          )
        },
      },
      {
        colKey: 'username',
        title: translate('user.fields.username'),
        ellipsis: true,
      },
      {
        colKey: 'link',
        title: translate('table.actions'),
        fixed: 'right',
        align: 'center',
        width: 160,
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
                content={translate('buttons.confirm')}
                destroyOnClose
                placement='top'
                showArrow
                theme='default'
                onConfirm={() => {
                  mutate({
                    resource: 'user',
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
      table={{
        rowKey: 'id',
      }}
      title={translate('user.name')}
      headerRender={
        <Modal
          title={translate('buttons.create')}
          trigger={<Button>{translate('buttons.create')}</Button>}
          component={() => import('./save')}
        ></Modal>
      }
    />
  )
}

export default List
