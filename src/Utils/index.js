
import React from 'react';
import _ from 'lodash';
import Faker from 'faker';
import { toast } from 'react-toastify';

/**
 * For providing feedback to the user when
 * an action is performed. We need to trigger
 * the appropriate feedback to let the user know
 * the status of the action performed.
 * @param {*} message 
 * @param {*} type 
 * @param {*} customClassName 
 */
const notifyUser = (message, type, customClassName) => {

    const options = {
        position: toast.POSITION.TOP_LEFT,
        draggable: true,
        autoClose: 3000,
        className: customClassName,
    };

    switch (type) {
    case 'success':
        toast.success(message, options);
        break;
    case 'error':
        toast.error(message, options);
        break;
    case 'warning':
        toast.warn(message, options);
    case 'info':
        toast.info(message, options);
        break;
    case 'custom': // for custom styles and notifications
        toast(message, options);
        break;  
    default:
        toast('Provide a `type` to pass appropriate feedback.');
        break;
    }

    setTimeout(() => {
        toast.dismiss();
    }, options.autoClose);

};

/**
 * For delaying an event for firing too
 * often. This is useful for keyPress(input) and
 * multi scroll in a node/document/window.
 * @param {*} fn
 * @param {*} threshold 
 * @param {*} scope 
 */
const delayScrolling = (fn, threshold, scope) => {

    threshold || (threshold = 250);

    let last, 
        deferTimer;

    return () => {
        const context = scope || this;
        const now = Number(new Date);
        const args = arguments;

        if (last && now < last + threshold) {
            // don't fire, hold on to it
            clearTimeout(deferTimer);
            deferTimer = setTimeout(() => {
                last = now;
                fn.apply(context, args);
            }, threshold);
        } 
        last = now;
        fn.apply(context, args);
        
    };
};

/**
 * For returning a string or comma seperated product codes.
 * The choice param is for making the distinction between
 * whether we want all codes from a container
 * or just selected codes from a container.
 * @param {*} choice 
 * @param {*} allProducts 
 * @param {*} selectedProducts 
 */
const getProductCodeString = (choice, allProducts, selectedProducts) => {
    let productCodes = '';

    if (choice === 'selected' && selectedProducts.length) {
        productCodes = selectedProducts.join(',');
    } else if (choice === 'all' && allProducts.length) {
        productCodes = allProducts.map(x => x.code).join(',');
    }
    return productCodes;
};

/**
 * Generate some test data pending `real` api
 * @param {*} noOfProds 
 */
const prodImages = (noOfProds, toBePublished) => {
    const result = [];
    

    _.times(noOfProds || 25, () => {
        result.push({
            galleryImageMaps: [
                {
                    medium : {
                        url: Faker.image.avatar(),
                    },
                },
                {
                    medium : {
                        url: Faker.image.avatar(),
                    },
                },
            ],
            code: Faker.address.zipCode(),
            name: Faker.commerce.productName(),
            designer: {
                name: Faker.company.companyName(),
            },
            color: Faker.commerce.color(),
            price: {
                formattedValue: Faker.commerce.price(),
            },
            toBePublished,
            refinementColour: Faker.commerce.color(),
            stockFragment: Faker.random.number(),
            stockCount: Faker.random.number(),
            isReadyToMerch: true,
            isComingSoon: false,
            isSoldOut: false,
            isSaleProduct: true,
            formattedFreshnessDate: Faker.date.future().toISOString(),
        });
    });
    return result;
};

export { 
    notifyUser,
    prodImages,
    delayScrolling,
};
