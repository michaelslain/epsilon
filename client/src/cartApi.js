const getData = async () => {
    const data = localStorage.getItem('cart')
    const json = await JSON.parse(data)

    return json
}

class Item {
    constructor({ productId, amount, id }) {
        this.productId = productId
        this.amount = amount
        this.id = id
    }
}

export default {
    async storageInit(products = []) {
        console.log(products)

        let data = localStorage.getItem('cart')

        if (data == null || data === '') {
            localStorage.setItem('cart', JSON.stringify([]))
            return
        }

        if (products.length === 0) {
            localStorage.setItem('cart', JSON.stringify([]))
            return
        }

        let productIds = {}
        products.forEach(product => (productIds[product._id] = true))

        let items = await JSON.parse(data)
        items = items.filter(item => productIds[item.productId] === true)

        localStorage.setItem('cart', JSON.stringify(items))

        return
    },
    async getItems() {
        const data = await getData()
        return data
    },
    async addItem({ productId, amount }) {
        const data = await getData()

        data.push(new Item({ id: data.length, productId, amount }))

        localStorage.setItem('cart', JSON.stringify(data))

        return
    },
    async removeItem({ id }) {
        let data = await getData()

        data = data
            .filter(item => item.id !== id)
            .map((item, i) => {
                item.id = i
                return item
            })

        localStorage.setItem('cart', JSON.stringify(data))

        return
    },
    Item,
    getData,
    async clearCart() {
        localStorage.setItem('cart', JSON.stringify([]))

        return
    },
}
