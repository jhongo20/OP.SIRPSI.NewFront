import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  constructor(private accountService: AccountService) {}

  DownloadPdfFromHTML(data: any) {
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = { background: 'white', scale: 3 };
    html2canvas(data, options)
      .then((canvas) => {
        const img = canvas.toDataURL('image/PNG');
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * 15;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(
          img,
          'PNG',
          15,
          15,
          pdfWidth,
          pdfHeight,
          undefined,
          'FAST'
        );
        return doc;
      })
      .then((docResult) => {
        docResult.save(
          this.accountService.userData.user.names +
            `_${new Date().toISOString()}_factura.pdf`
        );
      });
    return true;
  }
}
