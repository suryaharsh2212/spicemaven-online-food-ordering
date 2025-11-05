export function getOrderConfirmationHtmlBody(orderId, customerName, deliveryTime) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Order Confirmation - Spice Maven</title>
      <style>
          body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background-color: #f9f3eb;
              margin: 0;
              padding: 0;
              color: #333;
          }
          .container {
              max-width: 600px;
              margin: 30px auto;
              background-color: #fff;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }
          .header {
              background-color: #d35400;
              color: #fff;
              text-align: center;
              padding: 25px 20px;
          }
          .header h1 {
              margin: 0;
              font-size: 26px;
          }
          .content {
              padding: 25px 20px;
          }
          .content h2 {
              color: #d35400;
              margin-top: 0;
          }
          .content p {
              font-size: 15px;
              line-height: 1.6;
              color: #555;
          }
          .order-details {
              background-color: #fef5e7;
              border-left: 4px solid #e67e22;
              padding: 15px;
              margin: 20px 0;
              border-radius: 8px;
          }
          .order-details p {
              margin: 5px 0;
              font-weight: 500;
          }
          .footer {
              text-align: center;
              background-color: #fafafa;
              padding: 15px;
              font-size: 13px;
              color: #777;
          }
          .footer a {
              color: #d35400;
              text-decoration: none;
              font-weight: 600;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>Spice Maven</h1>
              <p>Bringing Authentic Flavors to Your Table</p>
          </div>
          <div class="content">
              <h2>Order Confirmed! </h2>
              <p>Hi <strong>${customerName}</strong>,</p>
              <p>Thank you for ordering with <strong>Spice Maven</strong>! We’re excited to let you know that your order has been successfully placed and will be delivered soon.</p>
              
              <div class="order-details">
                  <p><strong>Order ID:</strong> ${orderId}</p>
                  <p><strong>Estimated Delivery:</strong> ${deliveryTime}</p>
              </div>
              
              <p>Our chefs are already preparing your meal with the finest ingredients. You can sit back, relax, and we’ll notify you once your order is on its way.</p>
              
              <p>If you have any questions or want to track your order, simply visit our website or contact our support team.</p>
          </div>
          <div class="footer">
              <p>Thank you for choosing <strong>Spice Maven</strong> </p>
              <p><a href="https://spicemaven.vercel.app">Visit our website</a> | <a href="mailto:support@spicemaven.com">Contact Support</a></p>
          </div>
      </div>
  </body>
  </html>`;
}
