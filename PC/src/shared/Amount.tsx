export default class Amount {
    static USD(amount) {
        if (!amount) {
            return "0.00 USD";
        }
        let formattedAmount = amount.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
        return formattedAmount.replace('$', '') + ' USD';
    }
}
