import SSLCommerzPayment from 'sslcommerz-lts'
import config from '../../../config';

const store_id = config.ssl_storeId; //STORE_ID from the environment variable
const store_passwd = config.ssl_password; //STORE_PASSWORD from the environment variable
const is_live = config.ssl_isLive === 'false' ? false : true; //When it will production level then it will true

/**
 * @description
 * @param {string} data - data will be json type
 * It will give the respose as GatewayPageURL
*/
const sslCommerzConfiguration = (data: any) => {
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    return sslcz.init(data).then((apiResponse: any) => {
        return apiResponse.GatewayPageURL;
    }).catch((error: Error) => {
        console.error('Error initializing SSLCommerz:', error);
        throw new Error('Internal Server Error');
    });
}

export default sslCommerzConfiguration;

/**
 * HERE data variable will be contain these values, you will call the sslCommerzConfiguration function
 * and sent the data to this function.
 * */ 

// const data = {
//     total_amount: 100,
//     currency: 'BDT',
//     tran_id: 'REF123', // use unique tran_id for each api call
//     success_url: 'http://localhost:3030/success', these are server url
//     fail_url: 'http://localhost:3030/fail',
//     cancel_url: 'http://localhost:3030/cancel',
//     ipn_url: 'http://localhost:3030/ipn',
//     shipping_method: 'Courier',
//     product_name: 'Computer.',
//     product_category: 'Electronic',
//     product_profile: 'general',
//     cus_name: 'Customer Name',
//     cus_email: 'customer@example.com',
//     cus_add1: 'Dhaka',
//     cus_add2: 'Dhaka',
//     cus_city: 'Dhaka',
//     cus_state: 'Dhaka',
//     cus_postcode: '1000',
//     cus_country: 'Bangladesh',
//     cus_phone: '01711111111',
//     cus_fax: '01711111111',
//     ship_name: 'Customer Name',
//     ship_add1: 'Dhaka',
//     ship_add2: 'Dhaka',
//     ship_city: 'Dhaka',
//     ship_state: 'Dhaka',
//     ship_postcode: 1000,
//     ship_country: 'Bangladesh',
// };