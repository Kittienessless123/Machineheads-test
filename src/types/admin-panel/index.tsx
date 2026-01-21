import type { TabsProps } from 'antd';
import { Articles, Tags, Authors } from '../../components';
export const panel: TabsProps['items'] = [
  {
    key: '1',
    label: 'Authors',
    children: <Authors />,
  },
  {
    key: '2',
    label: 'Articles',
    children:  <Articles />,
  },
  {
    key: '3',
    label: 'Tags',
    children:  <Tags />,
  },
];