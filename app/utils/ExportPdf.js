import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const exportPDF = async (charts) => {
  const pdf = new jsPDF("p", "mm", "a4");
  const width = pdf.internal.pageSize.getWidth();
  const height = pdf.internal.pageSize.getHeight();
  let yOffset = 10;

  for (let i = 0; i < charts.length; i++) {
    const chartElement = document.getElementById(`chart-${charts[i].id}`);
    const canvas = await html2canvas(chartElement, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const imgWidth = width - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    if (yOffset + imgHeight > height - 10) {
      pdf.addPage();
      yOffset = 10;
    }

    pdf.addImage(imgData, "PNG", 10, yOffset, imgWidth, imgHeight);
    yOffset += imgHeight + 10;
  }

  pdf.save("charts.pdf");
};

export { exportPDF };
