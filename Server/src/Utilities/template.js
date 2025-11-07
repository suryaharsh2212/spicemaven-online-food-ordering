export function getOrderConfirmationHtmlBody(orderId, customerName, deliveryTime) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Order is Confirmed</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
            background-color: #f5f5f5;
            line-height: 1.6;
        }
        
        .email-container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }
        
        /* Header */
        .header {
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            padding: 40px 32px;
            text-align: center;
            border-bottom: 3px solid #d4a574;
        }
        
        .brand {
            font-size: 24px;
            font-weight: 700;
            color: #d4a574;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
        }
        
        .tagline {
            font-size: 13px;
            color: #b0b0b0;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        /* Main Content */
        .content {
            padding: 48px 32px;
        }
        
        .greeting {
            font-size: 24px;
            font-weight: 600;
            color: #1a1a1a;
            margin-bottom: 16px;
            line-height: 1.3;
        }
        
        .description {
            font-size: 15px;
            color: #555555;
            line-height: 1.7;
            margin-bottom: 32px;
        }
        
        /* Order Details */
        .order-section {
            background-color: #fafafa;
            border-left: 3px solid #d4a574;
            padding: 24px;
            margin-bottom: 32px;
            border-radius: 4px;
        }
        
        .order-section-title {
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #888888;
            margin-bottom: 16px;
            font-weight: 600;
        }
        
        .order-detail {
            margin-bottom: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .order-detail:last-child {
            margin-bottom: 0;
        }
        
        .order-label {
            font-size: 13px;
            color: #888888;
            font-weight: 500;
        }
        
        .order-value {
            font-size: 15px;
            color: #1a1a1a;
            font-weight: 600;
        }
        
        /* CTA Button */
        .cta-section {
            text-align: center;
            margin-bottom: 32px;
        }
        
        .btn {
            display: inline-block;
            background-color: #1a1a1a;
            color: #ffffff;
            padding: 14px 40px;
            text-decoration: none;
            border-radius: 4px;
            font-size: 14px;
            font-weight: 600;
            letter-spacing: 0.5px;
            transition: all 0.3s ease;
            border: 2px solid #1a1a1a;
        }
        
        .btn:hover {
            background-color: #333333;
            border-color: #333333;
        }
        
        /* Closing */
        .closing {
            font-size: 14px;
            color: #666666;
            margin-bottom: 24px;
            font-weight: 500;
        }
        
        .accent {
            color: #d4a574;
            font-weight: 600;
        }
        
        /* Footer */
        .footer {
            background-color: #fafafa;
            padding: 32px;
            text-align: center;
            border-top: 1px solid #eeeeee;
        }
        
        .footer-text {
            font-size: 12px;
            color: #999999;
            line-height: 1.6;
        }
        
        .footer-link {
            color: #d4a574;
            text-decoration: none;
            font-weight: 500;
        }
        
        /* Responsive */
        @media (max-width: 600px) {
            .email-container {
                margin: 0;
                border-radius: 0;
            }
            
            .content {
                padding: 32px 20px;
            }
            
            .header {
                padding: 32px 20px;
            }
            
            .greeting {
                font-size: 20px;
            }
            
            .order-detail {
                flex-direction: column;
                align-items: flex-start;
            }
            
            .order-value {
                margin-top: 4px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <div class="brand">SPICE MAVEN</div>
            <div class="tagline">Premium Culinary Experience</div>
        </div>
        
        <!-- Main Content -->
        <div class="content">
            <h1 class="greeting">Hey ${customerName},<br>your order is confirmed!</h1>
            
            <p class="description">
                We're thrilled to let you know that your order has been successfully placed. Our chefs are already busy preparing your delicious meal with love and the finest ingredients.
            </p>
            
            <!-- Order Details -->
            <div class="order-section">
                <div class="order-section-title">Order Details</div>
                <div class="order-detail">
                    <span class="order-label">Order ID</span>
                    <span class="order-value">${orderId}</span>
                </div>
                <div class="order-detail">
                    <span class="order-label">Estimated Delivery</span>
                    <span class="order-value">${deliveryTime}</span>
                </div>
            </div>
            
            <p class="closing">We'll notify you once your order is out for delivery. Until then, sit back, relax, and get ready to enjoy the <span class="accent">Spice Maven experience!</span></p>
            
            <!-- CTA Button -->
            <div class="cta-section">
                <a href="https://spicemaven.vercel.app/" class="btn">Track My Order</a>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <p class="footer-text">
                © 2025 Spice Maven. All rights reserved.<br>
                <a href="#" class="footer-link">Privacy Policy</a> • 
                <a href="#" class="footer-link">Contact Us</a>
            </p>
        </div>
    </div>
</body>
</html>`;
}
