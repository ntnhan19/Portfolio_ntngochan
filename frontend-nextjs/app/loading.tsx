export default function Loading() {
    return (
        <div
            className="min-h-screen flex items-center justify-center"
            style={{ background: 'var(--bg-subtle)' }}
        >
            <div className="text-center">
                <div
                    className="w-16 h-16 border-4 rounded-full animate-spin mx-auto mb-4"
                    style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }}
                />
                <p style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Dang tai...</p>
            </div>
        </div>
    );
}
