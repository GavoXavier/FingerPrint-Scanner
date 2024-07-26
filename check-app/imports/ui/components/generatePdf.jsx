import jsPDF from 'jspdf';
import 'jspdf-autotable';

const generatePdf = (data, startDate, endDate, totalHours, averageHours) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('Attendance Report', 105, 20, { align: 'center' });

  doc.setFontSize(12);
  doc.text(`Date Range: ${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`, 105, 30, { align: 'center' });
  doc.text(`Employee: ${data.selectedEmployee ? data.employees.find(e => e._id === data.selectedEmployee)?.fullName : 'All Staff'}`, 105, 36, { align: 'center' });
  doc.text(`Total Hours Worked: ${totalHours.toFixed(2)}`, 105, 42, { align: 'center' });
  doc.text(`Average Hours Worked: ${averageHours}`, 105, 48, { align: 'center' });

  const tableData = data.checkLogs.map(log => [
    log.employee?.fullName,
    log.employee?.role,
    log.checkInTimestamp ? new Date(log.checkInTimestamp).toLocaleString() : '',
    log.checkOutTimestamp ? new Date(log.checkOutTimestamp).toLocaleString() : '',
    log.status,
    log.checkInTimestamp && log.checkOutTimestamp ? ((new Date(log.checkOutTimestamp).getTime() - new Date(log.checkInTimestamp).getTime()) / (1000 * 60 * 60)).toFixed(2) : ''
  ]);

  doc.autoTable({
    startY: 60,
    head: [['Full Names', 'Role', 'Checked In', 'Checked Out', 'Status', 'Total Hours']],
    body: tableData,
  });

  doc.save('attendance_report.pdf');
};

export default generatePdf;
