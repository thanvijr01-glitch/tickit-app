function Sidebar({ activeView, setActiveView }) {
  const items = [
    { key: "today", label: "Today", icon: "📅" },
    { key: "upcoming", label: "Upcoming", icon: "⏳" },
    { key: "completed", label: "Completed", icon: "✅" },
  ];
  return (
    <aside className="sidebar glass-panel">
      <div className="sidebar-logo">Todo<span>.</span></div>
      <nav>
        {items.map((item) => (
          <button key={item.key} className={`sidebar-item ${activeView === item.key ? "active" : ""}`} onClick={() => setActiveView(item.key)}>
            <span className="sidebar-icon">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
export default Sidebar;