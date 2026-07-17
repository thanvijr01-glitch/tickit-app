function Calendar() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const monthName = today.toLocaleString("default", { month: "long" });
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return (
    <div className="calendar-widget">
      <div className="calendar-header">{monthName} {year}</div>
      <div className="calendar-grid">
        {["Su","Mo","Tu","We","Th","Fr","Sa"].map((d) => (
          <div key={d} className="calendar-daylabel">{d}</div>
        ))}
        {cells.map((day, i) => (
          <div key={i} className={`calendar-cell ${day === today.getDate() ? "calendar-today" : ""}`}>{day || ""}</div>
        ))}
      </div>
    </div>
  );
}
export default Calendar;