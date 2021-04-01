import MultiContent from '@/components/homepage/multi_content/MultiContent'
import { maincontent } from './maincontent'

export const multicontent = [
    {
        path: '/',
        component: MultiContent,
        children: [
            ...maincontent
        ],
    },
]