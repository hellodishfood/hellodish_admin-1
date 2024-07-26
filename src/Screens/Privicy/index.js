import React from 'react';

const PrivacyPolicy = () => {
    const styles = {
        privacyPolicy: {
            fontFamily: 'Arial, sans-serif',
            margin: '20px',
            lineHeight: '1.6',
            columnCount: '1',  // Change to 1 column
            columnGap: '20px',
        },
        h1: {
            fontSize: '24px',
            marginBottom: '20px',
            textAlign: 'center',
        },
        h2: {
            fontSize: '20px',
            marginTop: '20px',
            borderBottom: '2px solid #000',
            paddingBottom: '5px',
        },
        h3: {
            fontSize: '18px',
            marginTop: '15px',
        },
        p: {
            marginBottom: '15px',
        },
        ul: {
            marginBottom: '15px',
            paddingLeft: '20px', // Ensure padding for list
        },
        li: {
            marginBottom: '10px',
            lineHeight: '1.6', // Ensure line height for readability
        },
        a: {
            color: '#0000EE',
            textDecoration: 'underline',
        },
    };

    return (
        <div style={styles.privacyPolicy}>
            <h1 style={styles.h1}>Privacy Policy</h1>
            <p style={styles.p}>
                HELLODISH ("we," "us," or "our") respects the privacy of our users, both individuals ("Users") and restaurants ("Restaurants"). This Privacy Policy describes the types of information we collect from Users and Restaurants who access or use our mobile application (the "Platform"). This policy also explains how we use, disclose, and protect this information.
            </p>

            <h2 style={styles.h2}>1. Information We Collect</h2>
            <p style={styles.p}>We collect information from Users and Restaurants in a variety of ways when they use the Platform. This information may include:</p>

            <h3 style={styles.h3}>User Information:</h3>
            <ul style={styles.ul}>
                <li style={styles.li}><strong>Account Information:</strong> When Users create an account on HELLODISH, we collect information such as name, phone number, email address, delivery address, and payment information (including credit card details).</li>
                <li style={styles.li}><strong>Location Information:</strong> We collect Users' location information to identify nearby restaurants, track orders, and improve the overall user experience. This information may be collected through GPS, IP address, or Wi-Fi signals. Users can opt out of location tracking through their device settings.</li>
                <li style={styles.li}><strong>Order Information:</strong> We collect information about Users' orders, such as the restaurant chosen, items ordered, special requests, and delivery instructions.</li>
                <li style={styles.li}><strong>Usage Information:</strong> We collect information on how Users interact with the Platform, such as search queries, browsing history, app usage data (e.g., clicks, features used), and device information (e.g., operating system, device type).</li>
            </ul>

            <h3 style={styles.h3}>Restaurant Information:</h3>
            <ul style={styles.ul}>
                <li style={styles.li}><strong>Restaurant Registration:</strong> When Restaurants register on HELLODISH, we collect information such as restaurant name, address, cuisine type, menu items, pricing, operating hours, contact details, and bank account information for receiving payments.</li>
                <li style={styles.li}><strong>Restaurant Performance Data:</strong> We collect data on Restaurant performance on the Platform, such as order volume, customer reviews, and delivery times.</li>
                <li style={styles.li}><strong>Communication Data:</strong> We collect information about communication between Users and Restaurants through the Platform, such as order inquiries and special instructions.</li>
            </ul>

            <h2 style={styles.h2}>2. Use of Information</h2>
            <p style={styles.p}>We use the information we collect from Users and Restaurants for various purposes, including:</p>
            <ul style={styles.ul}>
                <li style={styles.li}><strong>Providing and improving the Platform:</strong> We use the information to process orders, connect Users with Restaurants, personalize user experience (e.g., recommend restaurants and dishes), optimize delivery routes, and improve the overall functionality of the Platform.</li>
                <li style={styles.li}><strong>Marketing and communication:</strong> We may use the information to send Users promotional offers, surveys, updates about the Platform, and account-related notifications. Users can opt-out of marketing communications at any time. We may also contact Restaurants regarding their performance on the Platform and potential marketing opportunities.</li>
                <li style={styles.li}><strong>Fraud prevention and security:</strong> We use the information to detect and prevent fraudulent activity, protect user privacy and security, and enforce our Terms of Use.</li>
                <li style={styles.li}><strong>Compliance with law:</strong> We may use the information to comply with applicable laws and regulations, respond to legal requests, and investigate potential violations of our policies.</li>
            </ul>

            <h2 style={styles.h2}>3. Sharing of Information</h2>
            <p style={styles.p}>We may share User and Restaurant information with third-party service providers who assist us in operating the Platform, such as payment processors, delivery partners, and marketing agencies. These service providers are contractually obligated to keep the information confidential and use it only for the purposes of providing services to HELLODISH.</p>
            <p style={styles.p}>We may also disclose User or Restaurant information if required by law, in response to a court order or subpoena, or to protect the rights and safety of Users, Restaurants, or ourselves.</p>

            <h2 style={styles.h2}>4. User and Restaurant Choices</h2>
            <p style={styles.p}>Users and Restaurants have choices regarding their information:</p>
            <ul style={styles.ul}>
                <li style={styles.li}><strong>Account Information:</strong> Users and Restaurants can access, update, or delete their account information at any time through the Platform settings.</li>
                <li style={styles.li}><strong>Location Information:</strong> Users can opt out of location tracking through their device settings.</li>
                <li style={styles.li}><strong>Marketing Communications:</strong> Users can opt-out of receiving marketing communications from HELLODISH by following the unsubscribe instructions in the communication or through their account settings.</li>
            </ul>

            <h2 style={styles.h2}>5. Data Security</h2>
            <p style={styles.p}>We take reasonable steps to protect the information we collect from Users and Restaurants from unauthorized access, disclosure, alteration, or destruction. However, no Internet transmission or electronic storage method is completely secure. Therefore, we cannot guarantee the absolute security of your information.</p>

            <h2 style={styles.h2}>6. Children's Privacy</h2>
            <p style={styles.p}>The Platform is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us. We will take steps to delete the information from our systems.</p>

            <h2 style={styles.h2}>7. Cookies and Tracking Technologies</h2>
            <p style={styles.p}>We use cookies and similar tracking technologies to collect and use personal information about you, including to serve interest-based advertising. You can control cookies through your browser settings and other tools. However, if you block certain cookies, you may not be able to access certain parts of our services.</p>

            <h2 style={styles.h2}>8. Changes to This Privacy Policy</h2>
            <p style={styles.p}>We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any significant changes by posting the new Privacy Policy on our app and website. Your continued use of our services after the changes take effect will constitute your acceptance of the revised policy.</p>

            <h2 style={styles.h2}>9. Contact Us</h2>
            <p style={styles.p}>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
            <p style={styles.p}>Email: <a style={styles.a} href="mailto:privacy@HELLODISH.com">privacy@HELLODISH.com</a><br />
            Address: [Business Address]</p>

            <p style={styles.p}>By using HELLODISH, you acknowledge that you have read and understood this Privacy Policy and agree to our collection, use, and sharing of your information as described.</p>
        </div>
    );
};

export default PrivacyPolicy;
