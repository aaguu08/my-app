import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

    state = {
        orders: [],
        loading: true,
        error: null
    }

    componentDidMount() {
        console.log('[Orders.js] componentDidMount...');
        axios.get('/orders.json')
            .then(res => {
                console.log('[Orders.js] componentDidMount... ', res.data);
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }

                this.setState({ orders: fetchedOrders, loading: false });
                console.log('[Orders.js] componentDidMount... ', this.state);
            })
            .catch(error => {
                console.log('[Orders.js] componentDidMount... ', error);
                this.setState({ error: error });
            });
    }

    render() {
        return (
            <div>
                {
                    this.state.orders.map(order => (
                        <Order
                            key={order.id}
                            ingredients={order.ingredients}
                            price={order.price} />
                    ))
                }
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);