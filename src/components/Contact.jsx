export default function Contact() {
    return (
        <section style={styles.section}>
            <div style={styles.sectionHeader}>
                <p style={styles.sectionTag}>Get In Touch</p>
                <h2 style={styles.sectionTitle}>Contact <span style={styles.heroAccent}>Us</span></h2>
                <p style={styles.subtitle}>We'd love to hear from you! Whether it's feedback, a question, or a large party order, we're here to help.</p>
            </div>
            <div style={styles.contactGrid}>
                <div style={styles.contactCard}>
                    <h3>📧 Email Us</h3>
                    <p>For support, feedback, or inquiries.</p>
                    <a href="mailto:hello@hotpizza.com" style={styles.contactLink}>hello@hotpizza.com</a>
                </div>
                <div style={styles.contactCard}>
                    <h3>📞 Call Us</h3>
                    <p>For immediate assistance or to place an order.</p>
                    <a href="tel:+919876543210" style={styles.contactLink}>+91 98765 43210</a>
                </div>
                <div style={styles.contactCard}>
                    <h3>📍 Find Us</h3>
                    <p>Visit one of our locations across the city.</p>
                    <a href="/about#locations" style={styles.contactLink}>View Locations</a>
                </div>
            </div>
        </section>
    );
}

const styles = {
    section: { padding: "60px 48px 80px" },
    sectionHeader: { marginBottom: 48, textAlign: "center" },
    sectionTag: { color: "#FF6B00", fontWeight: 700, fontSize: 14, textTransform: "uppercase", letterSpacing: 2, marginBottom: 10 },
    sectionTitle: { fontSize: 42, fontWeight: 900, letterSpacing: -0.5 },
    heroAccent: { color: "#FF6B00" },
    subtitle: {
        color: "#aaa",
        fontSize: 17,
        lineHeight: 1.7,
        marginTop: 12,
        maxWidth: 600,
        margin: "12px auto 0",
    },
    contactGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        maxWidth: '1000px',
        margin: '0 auto',
    },
    contactCard: {
        background: '#141414',
        border: '1px solid #222',
        borderRadius: '18px',
        padding: '32px',
        textAlign: 'center',
    },
    contactLink: {
        color: '#FF6B00',
        textDecoration: 'none',
        fontWeight: '700',
        marginTop: '16px',
        display: 'inline-block'
    }
};