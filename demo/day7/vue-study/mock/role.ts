export default [
    {
        url: '/api/role/list',
        method: 'get',
        response: () => {

            return {

                code: 0,

                data: [

                    {
                        id: 1,
                        name: '战士',
                        level: 10
                    },

                    {
                        id: 2,
                        name: '法师',
                        level: 8
                    }

                ]

            }

        }
    }
]