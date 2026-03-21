const reviews = [
    { name: "Ananya S.", stars: 5, text: "Best pizza in town! Crispy crust, loads of toppings. Always on time!", avatar: "A" },
    { name: "Rahul M.", stars: 5, text: "Pepperoni Feast is absolutely insane. Hot, cheesy, perfect every time.", avatar: "R" },
    { name: "Priya K.", stars: 4, text: "Love the app, love the pizza. Fast delivery and amazing flavors!", avatar: "P" },
    { name: "Vikram C.", stars: 5, text: "The Veggie Supreme is a game-changer. So fresh!", avatar: "V" },
    { name: "Sunita G.", stars: 5, text: "My go-to for Friday nights. Never disappoints.", avatar: "S" },
    { name: "Amit J.", stars: 4, text: "Good pizza, great service. The BBQ Chicken is a must-try.", avatar: "A" },
];

export default function Reviews() {
    return (
        <section style={styles.section}>
            <div style={styles.sectionHeader}>
                <p style={styles.sectionTag}>Testimonials</p>
                <h2 style={styles.sectionTitle}>What Our <span style={styles.heroAccent}>Fans</span> Say</h2>
            </div>
            <div style={styles.reviewsRow}>
                {reviews.map((r, i) => (
                    <div key={i} style={styles.reviewCard}>
                        <div style={styles.reviewStars}>{"⭐".repeat(r.stars)}</div>
                        <p style={styles.reviewText}>"{r.text}"</p>
                        <div style={styles.reviewAuthor}>
                            <div style={styles.reviewAvatar}>{r.avatar}</div>
                            <span style={styles.reviewName}>{r.name}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

const styles = {
    section: { padding: "60px 48px 80px" },
    sectionHeader: { marginBottom: 40, textAlign: "center" },
    sectionTag: { color: "#FF6B00", fontWeight: 700, fontSize: 14, textTransform: "uppercase", letterSpacing: 2, marginBottom: 10 },
    sectionTitle: { fontSize: 42, fontWeight: 900, letterSpacing: -0.5 },
    heroAccent: { color: "#FF6B00" },
    reviewsRow: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 },
    reviewCard: {
        background: "#141414",
        border: "1px solid #222",
        borderRadius: 18,
        padding: 28,
    },
    reviewStars: { fontSize: 18, marginBottom: 14 },
    reviewText: { color: "#bbb", fontSize: 15, lineHeight: 1.7, marginBottom: 20, fontStyle: "italic" },
    reviewAuthor: { display: "flex", alignItems: "center", gap: 12 },
    reviewAvatar: {
        width: 40,
        height: 40,
        borderRadius: "50%",
        background: "#FF6B00",
        color: "#fff",
        fontWeight: 800,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 16,
    },
    reviewName: { fontWeight: 700, fontSize: 15 },
};