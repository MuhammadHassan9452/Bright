/* ============================================
   BRIGHT PATH - Main JavaScript
   ============================================ */

(function () {
  'use strict';

  const currentPage = document.body.dataset.page || 'home';

  const SVG_ICONS = {
    logo: `
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 2L3 7l9 5 9-5-9-5z"/>
        <path d="M3 17l9 5 9-5"/>
        <path d="M3 12l9 5 9-5"/>
      </svg>`,
    search: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
    location: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 7-8 13-8 13s-8-6-8-13a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
    university: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
    students: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
    experience: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    arrowRight: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`,
    filter: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>`,
    check: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    star: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    zoom: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>`,
    close: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>`,
    chevronLeft: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`,
    chevronRight: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
    select: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
    apply: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="15" x2="15" y2="15"/></svg>`,
    admission: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    visa: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>`,
    arrival: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>`,
    pickup: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 17h14M5 17a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h11l4 6v4a2 2 0 0 1-2 2"/><circle cx="8" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>`,
    guidance: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
    personalized: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    opportunities: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
    scholarship: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
    transparent: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    support: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
    plane: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>`,
    luggage: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="6" width="12" height="14" rx="2"/><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg>`,
    home: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    phone: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
    mail: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
    map: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/></svg>`,
    whatsapp: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`,
    wechat: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.269-.032-.407-.032zm-2.912 2.874c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/></svg>`,
    instagram: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
    tiktok: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>`,
    facebook: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
    document: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
    alipay: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M7 10h10M12 7v6M9 17c2-3 7-3 9-1"/></svg>`,
    bank: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V10M19 21V10M2 10l10-6 10 6M8 21v-5M12 21v-5M16 21v-5"/></svg>`,
    otherPay: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>`,
    calendar: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    file: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
    money: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
    target: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
    eye: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
    link: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
    document2: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
    consultation: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
    processing: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4.5 4.5 4.5 19.5 19.5 19.5 19.5 4.5 4.5 4.5"/><polyline points="9 5.5 9 19.5"/><path d="M14 5.5h5.5v7"/></svg>`
  };

  const NAV_LINKS = [
    { label: 'Home', href: 'index.html', key: 'home' },
    { label: 'Universities', href: 'universities.html', key: 'universities' },
    { label: 'Services', href: 'services.html', key: 'services' },
    {
      label: 'Scholarships',
      href: 'scholarships.html',
      key: 'scholarships',
      dropdown: [
        {
          label: 'Chinese Government Scholarships',
          href: 'scholarships.html',
          key: 'gov-scholarships',
          desc: 'CSC, Belt & Road, University Awards'
        },
        {
          label: 'New Scholarship Opportunities',
          href: 'new-scholarships.html',
          key: 'new-scholarships',
          desc: 'Latest open scholarships & postings'
        }
      ]
    },
    {
      label: 'About Us',
      href: 'about.html',
      key: 'about',
      dropdown: [
        {
          label: 'Authorization',
          href: 'authorization.html',
          key: 'authorization',
          desc: 'Official authorizations & certifications'
        },
        {
          label: 'Admission / JW Forms',
          href: 'admission-jw-forms.html',
          key: 'admission-jw',
          desc: 'Admission letters, JW202 & required forms'
        },
        {
          label: 'Payment Methods',
          href: 'payment.html',
          key: 'payment',
          desc: 'Available payment options and process'
        }
      ]
    },
    { label: 'Gallery', href: 'gallery.html', key: 'gallery' },
    { label: 'Contact', href: 'contact.html', key: 'contact' }
  ];

  function renderNavigation() {
    const nav = document.getElementById('navbar');
    if (!nav) return;

    nav.className = 'navbar glass';
    nav.innerHTML = `
      <div class="nav-inner">
        <a href="index.html" class="nav-logo">
          <div class="nav-logo-mark">${SVG_ICONS.logo}</div>
          <div class="nav-logo-text">
            BRIGHT PATH
            <span>Education Consultancy</span>
          </div>
        </a>
        <ul class="nav-links">
          ${NAV_LINKS.map(l => `
            <li>
              ${l.dropdown ? `
                <a href="${l.href}" class="nav-link nav-dropdown-toggle ${l.key === currentPage ? 'active' : ''}">
                  ${l.label}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </a>
                <ul class="nav-dropdown">
                  ${l.dropdown.map(d => `
                    <li>
                      <a href="${d.href}" class="nav-dropdown-item ${d.key === currentPage ? 'active' : ''}">
                        <div style="font-weight: 600; color: inherit;">${d.label}</div>
                        ${d.desc ? `<div style="font-size: 0.72rem; font-weight: 400; color: var(--charcoal-500); margin-top: 2px;">${d.desc}</div>` : ''}
                      </a>
                    </li>
                  `).join('')}
                </ul>
              ` : `
                <a href="${l.href}" class="nav-link ${l.key === currentPage ? 'active' : ''}">${l.label}</a>
              `}
            </li>
          `).join('')}
        </ul>
        <div class="nav-cta">
          <a href="contact.html" class="btn btn-primary btn-sm">
            Start Your Journey
            ${SVG_ICONS.arrowRight}
          </a>
          <button class="nav-toggle" id="navToggle" aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    `;

    const toggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    if (toggle && mobileMenu) {
      mobileMenu.innerHTML = `
        <div class="mobile-menu-panel">
          <div class="nav-logo" style="margin-bottom: 0;">
            <div class="nav-logo-mark">${SVG_ICONS.logo}</div>
            <div class="nav-logo-text">
              BRIGHT PATH
              <span>Education Consultancy</span>
            </div>
          </div>
          <ul class="mobile-nav-links">
            ${NAV_LINKS.map(l => `
              <li>
                <a href="${l.href}" class="mobile-nav-link ${l.key === currentPage || (l.dropdown && l.dropdown.some(d => d.key === currentPage)) ? 'active' : ''}">${l.label}</a>
                ${l.dropdown ? `
                  <ul class="mobile-submenu">
                    ${l.dropdown.map(d => `
                      <li>
                        <a href="${d.href}" class="${d.key === currentPage ? 'active' : ''}">${d.label}</a>
                      </li>
                    `).join('')}
                  </ul>
                ` : ''}
              </li>
            `).join('')}
          </ul>
          <div class="mobile-nav-cta">
            <a href="contact.html" class="btn btn-primary w-full">
              Start Your Journey
              ${SVG_ICONS.arrowRight}
            </a>
          </div>
        </div>
      `;

      toggle.addEventListener('click', () => {
        toggle.classList.toggle('open');
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
      });

      mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu || e.target.closest('.mobile-nav-link')) {
          toggle.classList.remove('open');
          mobileMenu.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    }

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    }, { passive: true });
  }

  function renderFooter() {
    const footer = document.getElementById('footer');
    if (!footer) return;

    footer.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand footer-col">
            <div class="footer-logo">
              <div class="nav-logo-mark">${SVG_ICONS.logo}</div>
              <div class="nav-logo-text">
                BRIGHT PATH
                <span>Education Consultancy</span>
              </div>
            </div>
            <p class="footer-desc">
              Your trusted partner for studying in China. We guide international students through university admissions, scholarships, visas, and arrival support with professionalism and care.
            </p>
            <div class="footer-socials">
              <a href="https://www.instagram.com/qadeerahmad175?stkn=MTB4b3p6ZGpza2Y4eQ==" class="social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">${SVG_ICONS.instagram}</a>
              <a href="https://www.tiktok.com/@qadeer5338?_r=1&amp;_d=ek0c7il2ckkjg0&amp;sec_uid=MS4wLjABAAAAtVuTfF1Vuxz4UvQvsZbo78hJ2sTI1nt7CWgf6PB9-02-NrAqb3-YpkznpKj92ya4&amp;share_author_id=7283061619222856709&amp;sharer_language=en&amp;source=h5_m&amp;u_code=ea7hhmde3gbb73&amp;item_author_type=1&amp;utm_source=copy&amp;tt_from=copy&amp;enable_checksum=1&amp;utm_medium=ios&amp;share_link_id=21180A7B-CE01-4018-999D-87DAEB060C48&amp;user_id=7283061619222856709&amp;sec_user_id=MS4wLjABAAAAtVuTfF1Vuxz4UvQvsZbo78hJ2sTI1nt7CWgf6PB9-02-NrAqb3-YpkznpKj92ya4&amp;social_share_type=4&amp;ug_btm=b0,b0&amp;utm_campaign=client_share&amp;share_app_id=1233" class="social-link" aria-label="TikTok" target="_blank" rel="noopener noreferrer">${SVG_ICONS.tiktok}</a>
              <a href="https://www.facebook.com/share/1NU4CkfzSL/?mibextid=wwXIfr" class="social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">${SVG_ICONS.facebook}</a>
            </div>
          </div>

          <div class="footer-col">
            <h5>Quick Links</h5>
            <ul class="footer-links">
              <li><a href="about.html">About CSCA</a></li>
              <li><a href="about.html">About Bright Path</a></li>
              <li><a href="scholarships.html">Belt and Road Scholarship</a></li>
              <li><a href="scholarships.html">Chinese Government Scholarship</a></li>
              <li><a href="universities.html">Top Universities</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h5>Explore</h5>
            <ul class="footer-links">
              <li><a href="https://www.alipay.com/" target="_blank" rel="noopener noreferrer">Alipay</a></li>
              <li><a href="https://www.didiglobal.com/" target="_blank" rel="noopener noreferrer">DiDi</a></li>
              <li><a href="https://www.douyin.com/" target="_blank" rel="noopener noreferrer">Douyin</a></li>
              <li><a href="https://www.meituan.com/" target="_blank" rel="noopener noreferrer">Meituan</a></li>
              <li><a href="https://www.wechat.com/" target="_blank" rel="noopener noreferrer">WeChat</a></li>
              <li><a href="#">Why China?</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h5>Policies</h5>
            <ul class="footer-links">
              <li><a href="policies.html">Refund Policy</a></li>
              <li><a href="policies.html">Privacy Policy</a></li>
              <li><a href="policies.html">Terms &amp; Conditions</a></li>
              <li><a href="payment.html">Payment Process</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h5>Contact</h5>
            <div class="footer-contact-item">
              <div class="footer-contact-icon">${SVG_ICONS.mail}</div>
              <div class="footer-contact-text">
                <span>Email</span>
                <a href="mailto:brightpathinternationaledu@gmail.com">brightpathinternationaledu@gmail.com</a><br>
                <a href="mailto:ahmadqadeer121212@gmail.com">ahmadqadeer121212@gmail.com</a>
              </div>
            </div>
            <div class="footer-contact-item">
              <div class="footer-contact-icon">${SVG_ICONS.phone}</div>
              <div class="footer-contact-text">
                <span>Phone</span>
                <a href="tel:+923055338144">+92 305 5338 144</a>
              </div>
            </div>
            <div class="qr-row">
              <div class="qr-box">
                <div class="qr-placeholder">
                  <img src="Contact%20us/Wechat%20QR.png" alt="WeChat QR code">
                </div>
                <span>WeChat</span>
              </div>
              <div class="qr-box">
                <div class="qr-placeholder">
                  <img src="Contact%20us/Whatsapp%20QR.png" alt="WhatsApp QR code">
                </div>
                <span>WhatsApp</span>
              </div>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p class="footer-copyright">
            &copy; ${new Date().getFullYear()} Bright Path Education Consultancy. All rights reserved.
            &nbsp;&nbsp;<span style="opacity:.45;"><a href="admin-login.html" style="color: inherit; text-decoration: none; font-weight: 500;">Admin</a></span>
          </p>
          <ul class="footer-bottom-links">
            <li><a href="policies.html">Privacy</a></li>
            <li><a href="policies.html">Terms</a></li>
            <li><a href="policies.html">Refunds</a></li>
          </ul>
        </div>
      </div>
    `;
  }

  function renderFloatingContact() {
    const container = document.getElementById('floatingContact');
    if (!container) return;

    container.innerHTML = `
      <button class="floating-btn floating-cta" data-label="Start Application" onclick="window.location.href='contact.html'">
        ${SVG_ICONS.arrowRight}
      </button>
      <a href="https://wa.me/923055338144" class="floating-btn floating-whatsapp" target="_blank" rel="noopener" data-label="WhatsApp">
        ${SVG_ICONS.whatsapp}
      </a>
    `;
  }

  function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(el => observer.observe(el));
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (id.length > 1) {
          const target = document.querySelector(id);
          if (target) {
            e.preventDefault();
            window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
          }
        }
      });
    });
  }

  function initFilterChips() {
    const chips = document.querySelectorAll('.filter-chip');
    document.querySelectorAll('.masonry-gallery .gallery-item').forEach(item => {
      if (item.querySelector('img[src^="https://coresg-normal.trae.ai/"]')) item.remove();
    });
    const items = document.querySelectorAll('.masonry-gallery .gallery-item');
    if (!chips.length || !items.length) return;

    function applyFilter(selectedChip) {
      const selected = selectedChip.textContent.trim().toLowerCase();
      items.forEach(item => {
        const category = item.querySelector('.gallery-item-caption span')?.textContent.toLowerCase() || '';
        item.hidden = selected !== 'all' && !category.includes(selected);
      });
    }

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const group = chip.dataset.group || 'default';
        if (group !== 'single') {
          chip.classList.toggle('active');
        } else {
          const siblings = document.querySelectorAll(`.filter-chip[data-group="single"]`);
          siblings.forEach(s => s.classList.remove('active'));
          chip.classList.add('active');
        }
        applyFilter(chip);
      });
    });
  }

  function initGalleryLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    if (lightbox.dataset.initialized === '1') return;
    lightbox.dataset.initialized = '1';

    lightbox.innerHTML = `
      <button class="lightbox-close" aria-label="Close">${SVG_ICONS.close}</button>
      <button class="lightbox-nav lightbox-prev" aria-label="Previous">${SVG_ICONS.chevronLeft}</button>
      <button class="lightbox-nav lightbox-next" aria-label="Next">${SVG_ICONS.chevronRight}</button>
      <div class="lightbox-content">
        <img src="" alt="" class="lightbox-img">
        <div class="lightbox-caption">
          <h5 class="lightbox-title"></h5>
          <span class="lightbox-category"></span>
        </div>
      </div>
    `;

    const imgEl = lightbox.querySelector('.lightbox-img');
    const titleEl = lightbox.querySelector('.lightbox-title');
    const catEl = lightbox.querySelector('.lightbox-category');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    function collectImages() {
      return Array.from(document.querySelectorAll('.gallery-item:not([hidden])')).map(item => ({
        src: item.querySelector('img')?.src || '',
        title: item.querySelector('h5')?.textContent || '',
        category: item.querySelector('.gallery-item-caption span')?.textContent || ''
      }));
    }

    let images = collectImages();
    let currentIndex = 0;

    function showImage(i) {
      images = collectImages();
      if (!images.length) return;
      currentIndex = (i + images.length) % images.length;
      imgEl.src = images[currentIndex].src;
      imgEl.alt = images[currentIndex].title;
      titleEl.textContent = images[currentIndex].title;
      catEl.textContent = images[currentIndex].category;
    }

    function open(i) {
      images = collectImages();
      if (!images.length) return;
      currentIndex = Math.max(0, Math.min(i | 0, images.length - 1));
      showImage(currentIndex);
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    document.addEventListener('click', (e) => {
      const item = e.target.closest('.gallery-item');
      if (!item) return;
      if (item.querySelector('[data-delete-id]') && e.target.closest('[data-delete-id]')) return;
      const all = Array.from(document.querySelectorAll('.gallery-item:not([hidden])'));
      const idx = all.indexOf(item);
      if (idx >= 0) open(idx);
    });

    closeBtn.addEventListener('click', close);
    prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
    nextBtn.addEventListener('click', () => showImage(currentIndex + 1));
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
      if (e.key === 'ArrowRight') showImage(currentIndex + 1);
    });
  }

  window.setupGalleryLightbox = initGalleryLightbox;
  window.initLightboxForContainer = function () { initGalleryLightbox(); };

  function initSearch() {
    const searchInput = document.getElementById('universitySearch');
    const cards = document.querySelectorAll('.university-card');
    if (!searchInput || !cards.length) return;

    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase().trim();
      cards.forEach(card => {
        const name = card.dataset.name?.toLowerCase() || '';
        const city = card.dataset.city?.toLowerCase() || '';
        const match = !query || name.includes(query) || city.includes(query);
        card.style.display = match ? '' : 'none';
      });
    });
  }

  function initUniversityFilters() {
    const cityFilter = document.getElementById('filterCity');
    const degreeFilter = document.getElementById('filterDegree');
    const cards = document.querySelectorAll('.university-card');
    if (!cards.length) return;

    function applyFilters() {
      const city = cityFilter?.value || '';
      const degree = degreeFilter?.value || '';
      cards.forEach(card => {
        const cardCity = card.dataset.city || '';
        const cardDegree = card.dataset.degree || '';
        const cityMatch = !city || cardCity === city;
        const degreeMatch = !degree || cardDegree.includes(degree);
        card.style.display = cityMatch && degreeMatch ? '' : 'none';
      });
    }

    cityFilter?.addEventListener('change', applyFilters);
    degreeFilter?.addEventListener('change', applyFilters);
  }

  function initFormHandling() {
    const forms = document.querySelectorAll('form[data-contact-form]');
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const requiredFields = Array.from(form.querySelectorAll('[required]'));
        const invalidField = requiredFields.find(field => !field.value.trim());
        if (invalidField) {
          invalidField.focus();
          invalidField.reportValidity?.();
          return;
        }
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }

        const values = (ids) => ids.map(id => document.getElementById(id)?.value.trim() || '');
        const [fullName, email, phone, country, degree, university, major, message] = values([
          'fullName', 'email', 'phone', 'country', 'degree', 'university', 'major', 'message'
        ]);
        const subject = `New Bright Path inquiry from ${fullName}`;
        const body = [
          `Name: ${fullName}`,
          `Email: ${email}`,
          `Phone / WhatsApp: ${phone}`,
          `Country: ${country}`,
          `Desired degree: ${degree}`,
          `Interested university: ${university || 'Not specified'}`,
          `Major / field: ${major || 'Not specified'}`,
          '',
          'Message:',
          message
        ].join('\n');

        if (btn) {
          btn.disabled = true;
          btn.innerHTML = 'Opening Email...';
        }
        window.location.href = `mailto:brightpathinternationaledu@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.setTimeout(() => {
          if (!btn) return;
          btn.innerHTML = 'Send Inquiry';
          btn.disabled = false;
        }, 2000);
      });
    });
  }

  function initAnimatedCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.counter);
        const suffix = el.dataset.suffix || '';
        const duration = 1800;
        const start = performance.now();

        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = target * eased;
          el.textContent = (value >= 1000 ? Math.floor(value) : value.toFixed(value < 10 ? 1 : 0)) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderNavigation();
    renderFooter();
    renderFloatingContact();
    initScrollReveal();
    initSmoothScroll();
    initFilterChips();
    initGalleryLightbox();
    initSearch();
    initUniversityFilters();
    initFormHandling();
    initAnimatedCounters();
  });
})();
