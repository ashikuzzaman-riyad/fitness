export const generateTrackingId = () => {
const now = new Date();
const y = now.getFullYear();
const m = String(now.getMonth()+1).padStart(2,'0');
const d = String(now.getDate()).padStart(2,'0');
const random = Math.floor(1e6 + Math.random()*9e6); 
return `TRK-${y}${m}${d}-${random}`;
};