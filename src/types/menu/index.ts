
import { } from '@ant-design/icons';
import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

export const items: MenuItem[] = [
  {
    label: 'Articles',
    key: 'article',
/*     icon: <MailOutlined/>,
 */  },
   {
    label: 'Authors',
    key: 'author',
/*     icon: <MailOutlined/>,
 */  },
   {
    label: 'Tags',
    key: 'tags',
/*     icon: <MailOutlined/>,
 */  },
]

