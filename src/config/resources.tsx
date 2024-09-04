import { IResourceItem } from "@refinedev/core";

export const resources: IResourceItem[] = [
    {
        name: 'UlawTable',
        list: '/',
        meta: {
            label: 'ULawTable',
        }
    },
    {
        name: 'document',
        list: '/doc',
        meta: {
            label: 'Document',
        }
    }
]