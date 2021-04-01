import { singlecontent } from './singlecontent'
import { multicontent } from './multicontent'

export const content = [
    {
        path: '/content',
        component: {
            render: (h) => h('router-view')
        },
        children: [
            ...multicontent,
            ...singlecontent
        ]
    }
]
