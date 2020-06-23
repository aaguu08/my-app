import React, { Component } from 'react';


import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Input from '../../../components/UI/Input/Input';
import { elementType } from 'prop-types';


class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayedValue: 'Fastest' },
                        { value: 'cheapest', displayedValue: 'Cheapest' }
                    ]
                },
                value: ''
            }
        },
        loading: false,
        error: null
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log('[ContactData.js] orderHandler...', this.props);

        //alert('You continue!');
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            deliveryMethod: 'faster'
        };

        //POST ORDERS
        axios.post('/orders.json', order, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        })
            .then(response => {
                console.log(response);
                console.log(response.data.error.message);
                this.setState({ loading: false })
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error);
                console.log('[ContactData.js] orderHandler...', error);
                this.setState({ loading: false, error: true })
            });
    }

    render() {
        let form = (
            <form>
                <Input elementType="..." elementConfig="..." value="..."/>
                <Button
                    btnType="Success"
                    clicked={this.orderHandler}
                >
                    ORDER
                    </Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        };

        return (
            <div className={classes.ContactData}>
                <h4> Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default withErrorHandler(ContactData, axios);