import { useMemo } from 'react'
import {
  ChartBar,
  ChartLine,
  ChartArea,
  ChartRing,
  MainHeader,
  Main,
  StatsCard,
  StatsChart,
  MediaText,
  List,
} from '@duxweb/dux-refine'
import { useTranslate } from '@refinedev/core'
import { Card, Space } from 'tdesign-react/esm'
import { faker } from '@faker-js/faker'

const Index = () => {
  const translate = useTranslate()

  const demoData = [100, 300, 200, 600, 200, 400, 800]

  const listData = useMemo(() => {
    const listData = []
    for (let id = 1; id <= 10; id++) {
      const productName = faker.commerce.productName()
      const listItem = {
        id,
        title: productName,
        price: faker.commerce.price({
          symbol: '$ ',
        }),
        desc: faker.commerce.department(),
        image: faker.image.url(),
      }
      listData.push(listItem)
    }
    return listData
  }, [])

  return (
    <Main>
      <MainHeader></MainHeader>
      <div className='grid mb-4 gap-4 lg:grid-cols-2 xl:grid-cols-4'>
        <div>
          <StatsChart name={translate('dashboard.fields.sourceRate')} data={'1,000'}>
            <div className='h-46.5 w-full'>
              <ChartRing
                data={[
                  { value: 1048, name: 'Search Engine' },
                  { value: 735, name: 'Direct' },
                  { value: 580, name: 'Email' },
                ]}
                single
              />
            </div>
          </StatsChart>
        </div>
        <div>
          <StatsChart name={translate('dashboard.fields.mallRate')} data={'1,000'}>
            <div className='h-46.5 w-full'>
              <ChartRing
                data={[
                  { value: 1048, name: 'Daily necessities' },
                  { value: 735, name: 'Clothing' },
                  { value: 580, name: 'Electron' },
                ]}
              />
            </div>
          </StatsChart>
        </div>
        <div className='grid gap-4 lg:col-span-2 lg:grid-cols-2'>
          <div>
            <StatsCard
              name={translate('dashboard.fields.saleValue')}
              icon='i-tabler:report-money'
              data={demoData}
            >
              <ChartBar
                labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
                data={[{ name: 'test', data: demoData }]}
                min
              />
            </StatsCard>
          </div>
          <div>
            <StatsCard
              name={translate('dashboard.fields.userValue')}
              icon='i-tabler:users'
              data={demoData}
            >
              <ChartArea
                labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
                data={[{ name: 'test', data: demoData }]}
                min
              />
            </StatsCard>
          </div>
          <div>
            <StatsCard
              name={translate('dashboard.fields.mallValue')}
              icon='i-tabler:basket '
              data={demoData}
            >
              <ChartLine
                labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
                data={[{ name: 'test', data: demoData }]}
                min
              />
            </StatsCard>
          </div>
          <div>
            <StatsCard
              name={translate('dashboard.fields.supplyValue')}
              icon='i-tabler:box-seam '
              data={demoData}
            >
              <ChartBar
                labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
                data={[{ name: 'test', data: demoData }]}
                min
              />
            </StatsCard>
          </div>
        </div>
      </div>

      <div className='grid mb-4 gap-4 md:grid-cols-2'>
        <div>
          <Card bordered title={translate('dashboard.fields.userTrend')}>
            <div className='h-100 w-full'>
              <ChartBar
                labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
                data={[
                  { name: 'test', data: demoData },
                  { name: 'test2', data: demoData },
                ]}
                legend
              />
            </div>
          </Card>
        </div>
        <div>
          <Card bordered title={translate('dashboard.fields.saleTrend')}>
            <div className='h-100 w-full'>
              <ChartBar
                labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
                data={[
                  { name: 'test', data: demoData },
                  { name: 'test2', data: demoData },
                ]}
                legend
              />
            </div>
          </Card>
        </div>
      </div>

      <div className='grid mb-4 gap-4 md:grid-cols-2 xl:grid-cols-4'>
        <div className='md:col-span-2'>
          <Card bordered title={translate('dashboard.fields.mallTotalRank')}>
            <List>
              {listData.map((item) => (
                <List.Item append={item.price} key={item.id}>
                  <MediaText size='small'>
                    <MediaText.Image src={item.image} />
                    <MediaText.Title>{item.title}</MediaText.Title>
                    <MediaText.Desc>{item.desc}</MediaText.Desc>
                  </MediaText>
                </List.Item>
              ))}
            </List>
          </Card>
        </div>
        <div>
          <Card bordered title={translate('dashboard.fields.mallDayRank')}>
            <List>
              {listData.map((item) => (
                <List.Item
                  key={item.id}
                  append={
                    <Space>
                      <div className='font-bold'>{item.price}</div>
                      <div className='h-6 w-30'>
                        <ChartArea
                          labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
                          data={[{ name: 'test', data: demoData }]}
                          min
                        />
                      </div>
                    </Space>
                  }
                >
                  <div className='text-secondary'>{item.title}</div>
                </List.Item>
              ))}
            </List>
          </Card>
        </div>
        <div>
          <Card bordered title={translate('dashboard.fields.mallMonthRank')}>
            <List>
              {listData.map((item) => (
                <List.Item
                  key={item.id}
                  append={
                    <Space>
                      <div className='font-bold'>$400.00</div>
                      <div className='h-6 w-30'>
                        <ChartArea
                          labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
                          data={[{ name: 'test', data: demoData }]}
                          min
                        />
                      </div>
                    </Space>
                  }
                >
                  <div className='text-secondary'>{item.title}</div>
                </List.Item>
              ))}
            </List>
          </Card>
        </div>
      </div>
    </Main>
  )
}
export default Index
