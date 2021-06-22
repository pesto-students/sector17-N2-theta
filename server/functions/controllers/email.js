const sgMail = require('@sendgrid/mail');

const getSuccessMailMessage = ({email, orderId}) => {
    return `
        <div style="padding:30px">
            <h2>Hi There!</h2>
            <h1>Your Order has been succesfully placed!</h1>
            <p>We've received your order from this email ${email}</p>
            <p>Your Order's reference ID is: #${orderId}</p>
        </div>
    `;
};

const sendOrderSuccessEmail = async ({email, orderId}) => {
    sgMail.setApiKey('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');
    const msg = {
        to: email,
        from: 'raghavvnarang@gmail.com',
        subject: 'Sector17: Your order has been placed',
        html: getSuccessMailMessage({email, orderId}),
    }
    
    try {
        await sgMail.send(msg);
    } catch(e) {
        console.log(e);
        return false;
    }
    
    return true;
}

module.exports = {sendOrderSuccessEmail};